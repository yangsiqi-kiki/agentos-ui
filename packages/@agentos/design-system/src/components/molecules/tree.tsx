import { cva, type VariantProps } from 'class-variance-authority'
import {
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
  Triangle,
} from 'lucide-react'
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Checkbox, type CheckboxState } from '../atoms/checkbox'

/** Figma：Size Medium / Large / Small（Mini 并入 sm） */
export type TreeSize = 'sm' | 'md' | 'lg'

/** Figma switcher：CornerMark / VShape / Button */
export type TreeSwitcherType = 'caret' | 'chevron' | 'button'

export interface TreeNodeData {
  key: string
  title: ReactNode
  icon?: ReactNode
  disabled?: boolean
  /** 显式叶子：不渲染展开钮，仍占位对齐 */
  isLeaf?: boolean
  children?: TreeNodeData[]
  checkable?: boolean
}

export interface TreeExpandInfo {
  node: TreeNodeData
  expanded: boolean
}

export interface TreeSelectInfo {
  node: TreeNodeData
  selected: boolean
}

export interface TreeCheckInfo {
  node: TreeNodeData
  checked: CheckboxState
}

export interface TreeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  treeData: TreeNodeData[]
  size?: TreeSize
  /** 默认 caret（Figma CornerMark） */
  switcher?: TreeSwitcherType
  showLine?: boolean
  checkable?: boolean
  selectable?: boolean
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  onExpand?: (keys: string[], info: TreeExpandInfo) => void
  defaultSelectedKeys?: string[]
  selectedKeys?: string[]
  onSelect?: (keys: string[], info: TreeSelectInfo) => void
  defaultCheckedKeys?: string[]
  checkedKeys?: string[]
  halfCheckedKeys?: string[]
  onCheck?: (keys: string[], info: TreeCheckInfo) => void
  expandToggleLabel?: {
    expand: string
    collapse: string
  }
}

interface TreeContextValue {
  size: TreeSize
  switcher: TreeSwitcherType
  showLine: boolean
  checkable: boolean
  selectable: boolean
  expandedKeys: Set<string>
  selectedKeys: Set<string>
  checkedKeys: Set<string>
  halfCheckedKeys: Set<string>
  expandToggleLabel: { expand: string; collapse: string }
  toggleExpand: (node: TreeNodeData) => void
  selectNode: (node: TreeNodeData) => void
  checkNode: (node: TreeNodeData, checked: CheckboxState) => void
}

const TreeContext = createContext<TreeContextValue | null>(null)

function useTreeContext() {
  const ctx = useContext(TreeContext)
  if (!ctx) throw new Error('Tree internals require Tree')
  return ctx
}

const treeNodeVariants = cva(
  [
    'group/node relative flex w-full items-center rounded-agentos-rounded-xs2',
    'pr-agentos-padding-padding-xxs4',
    'font-agentos-en font-agentos-normal tracking-agentos-normal',
    'outline-none transition-colors',
  ],
  {
    variants: {
      size: {
        // Figma Mini+Small → sm；Medium → md；Large → lg
        sm: 'py-px text-agentos-sm leading-agentos-14',
        md: 'py-0.5 text-agentos-md leading-agentos-18',
        lg: 'py-agentos-padding-padding-xxs4 text-agentos-base leading-agentos-22',
      },
      selected: {
        true: 'text-agentos-brand-primary-color-primary',
        false: 'text-agentos-neutral-text-color-text',
      },
      disabled: {
        true: 'cursor-not-allowed text-agentos-neutral-text-color-text-disabled',
        false:
          'hover:bg-agentos-neutral-fill-color-fill-tertiary focus-visible:bg-agentos-neutral-fill-color-fill-tertiary',
      },
    },
    defaultVariants: {
      size: 'md',
      selected: false,
      disabled: false,
    },
  },
)

type TreeNodeVariants = VariantProps<typeof treeNodeVariants>

function collectChildKeys(node: TreeNodeData): string[] {
  if (!node.children?.length) return []
  return node.children.flatMap((child) => [
    child.key,
    ...collectChildKeys(child),
  ])
}

function TreeSwitcher({
  expanded,
  switcher,
  disabled,
  labels,
  onToggle,
}: {
  expanded: boolean
  switcher: TreeSwitcherType
  disabled?: boolean
  labels: { expand: string; collapse: string }
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const iconClass =
    'block size-agentos-icon-icon-size-sm12 text-agentos-neutral-icon-color-icon'

  let icon: ReactNode
  if (switcher === 'button') {
    icon = (
      <span
        className={cn(
          'inline-flex size-agentos-icon-icon-size-sm12 items-center justify-center',
          'rounded-agentos-rounded-xs2 bg-agentos-mask-base',
          'text-agentos-neutral-text-color-text-light-solid',
          '[&_svg]:size-[10px]',
        )}
      >
        {expanded ? (
          <Minus aria-hidden="true" />
        ) : (
          <Plus aria-hidden="true" />
        )}
      </span>
    )
  } else if (switcher === 'chevron') {
    icon = expanded ? (
      <ChevronDown aria-hidden="true" className={iconClass} />
    ) : (
      <ChevronRight aria-hidden="true" className={iconClass} />
    )
  } else {
    // CornerMark：实心三角 caret
    icon = (
      <Triangle
        aria-hidden="true"
        className={cn(
          iconClass,
          'fill-current',
          expanded ? 'rotate-180' : 'rotate-90',
        )}
      />
    )
  }

  return (
    <button
      type="button"
      tabIndex={-1}
      disabled={disabled}
      aria-label={expanded ? labels.collapse : labels.expand}
      className={cn(
        'inline-flex size-agentos-icon-icon-size-xl24 shrink-0 items-center justify-center',
        'text-agentos-neutral-icon-color-icon',
        disabled
          ? 'cursor-not-allowed text-agentos-neutral-text-color-text-disabled'
          : 'cursor-pointer hover:text-agentos-neutral-icon-color-icon-hover',
      )}
      onClick={onToggle}
    >
      {icon}
    </button>
  )
}

function TreeNodeItem({
  node,
  level,
}: {
  node: TreeNodeData
  level: number
}) {
  const {
    size,
    switcher,
    showLine,
    checkable,
    selectable,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    halfCheckedKeys,
    expandToggleLabel,
    toggleExpand,
    selectNode,
    checkNode,
  } = useTreeContext()

  const hasChildren = Boolean(node.children?.length)
  const isExpandable = hasChildren && !node.isLeaf
  const expanded = isExpandable && expandedKeys.has(node.key)
  const selected = selectedKeys.has(node.key)
  const disabled = Boolean(node.disabled)
  const nodeCheckable =
    node.checkable !== undefined ? node.checkable : checkable
  const checked = halfCheckedKeys.has(node.key)
    ? 'indeterminate'
    : checkedKeys.has(node.key)

  const handleSwitcherClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (disabled || !isExpandable) return
    toggleExpand(node)
  }

  const handleRowClick = () => {
    if (disabled) return
    if (selectable) selectNode(node)
  }

  const handleRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (selectable) selectNode(node)
    }
    if (event.key === 'ArrowRight' && isExpandable && !expanded) {
      event.preventDefault()
      toggleExpand(node)
    }
    if (event.key === 'ArrowLeft' && isExpandable && expanded) {
      event.preventDefault()
      toggleExpand(node)
    }
  }

  return (
    <div className="relative flex w-full flex-col items-stretch">
      <div
        role="treeitem"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isExpandable ? expanded : undefined}
        aria-selected={selectable ? selected : undefined}
        aria-disabled={disabled || undefined}
        data-level={level}
        className={cn(
          treeNodeVariants({
            size,
            selected: selected && !disabled,
            disabled,
          } satisfies TreeNodeVariants),
        )}
        onClick={handleRowClick}
        onKeyDown={handleRowKeyDown}
      >
        {isExpandable ? (
          <TreeSwitcher
            expanded={expanded}
            switcher={switcher}
            disabled={disabled}
            labels={expandToggleLabel}
            onToggle={handleSwitcherClick}
          />
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex size-agentos-icon-icon-size-xl24 shrink-0"
          />
        )}

        {nodeCheckable ? (
          <span
            className="shrink-0"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <Checkbox
              checked={checked}
              disabled={disabled}
              onCheckedChange={(next) => checkNode(node, next)}
            />
          </span>
        ) : null}

        {node.icon != null ? (
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex shrink-0 items-center justify-center',
              'size-agentos-icon-icon-size-md16',
              '[&_svg]:size-agentos-icon-icon-size-md16',
              selected && !disabled
                ? 'text-agentos-brand-primary-color-primary'
                : 'text-agentos-neutral-icon-color-icon',
              disabled && 'text-agentos-neutral-text-color-text-disabled',
            )}
          >
            {node.icon}
          </span>
        ) : null}

        <span className="min-w-0 flex-1 overflow-hidden pl-agentos-padding-padding-xxs4 text-left break-words">
          {node.title}
        </span>
      </div>

      {expanded && hasChildren ? (
        <div
          role="group"
          className={cn(
            'relative flex w-full flex-col items-start',
            'pl-agentos-margin-margin-md20',
          )}
        >
          {showLine ? (
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute left-[11px] top-0 bottom-1 w-px',
                'bg-agentos-neutral-border-color-split',
              )}
            />
          ) : null}
          {node.children?.map((child) => (
            <TreeNodeItem key={child.key} node={child} level={level + 1} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

/** Figma Tree（Data Display）：层级列表，合并 Size/Icon/Checkbox/RootCount 矩阵为 props */
export const Tree = forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      className,
      treeData,
      size = 'md',
      switcher = 'caret',
      showLine = false,
      checkable = false,
      selectable = true,
      defaultExpandedKeys,
      expandedKeys: controlledExpandedKeys,
      onExpand,
      defaultSelectedKeys,
      selectedKeys: controlledSelectedKeys,
      onSelect,
      defaultCheckedKeys,
      checkedKeys: controlledCheckedKeys,
      halfCheckedKeys: controlledHalfCheckedKeys,
      onCheck,
      expandToggleLabel = {
        expand: 'Expand',
        collapse: 'Collapse',
      },
      ...props
    },
    ref,
  ) => {
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(
      () => new Set(defaultExpandedKeys ?? []),
    )
    const [uncontrolledSelected, setUncontrolledSelected] = useState(
      () => new Set(defaultSelectedKeys ?? []),
    )
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      () => new Set(defaultCheckedKeys ?? []),
    )
    const [uncontrolledHalfChecked, setUncontrolledHalfChecked] = useState(
      () => new Set<string>(),
    )

    const expandedKeys = useMemo(
      () =>
        new Set(
          controlledExpandedKeys !== undefined
            ? controlledExpandedKeys
            : [...uncontrolledExpanded],
        ),
      [controlledExpandedKeys, uncontrolledExpanded],
    )
    const selectedKeys = useMemo(
      () =>
        new Set(
          controlledSelectedKeys !== undefined
            ? controlledSelectedKeys
            : [...uncontrolledSelected],
        ),
      [controlledSelectedKeys, uncontrolledSelected],
    )
    const checkedKeys = useMemo(
      () =>
        new Set(
          controlledCheckedKeys !== undefined
            ? controlledCheckedKeys
            : [...uncontrolledChecked],
        ),
      [controlledCheckedKeys, uncontrolledChecked],
    )
    const halfCheckedKeys = useMemo(
      () =>
        new Set(
          controlledHalfCheckedKeys !== undefined
            ? controlledHalfCheckedKeys
            : [...uncontrolledHalfChecked],
        ),
      [controlledHalfCheckedKeys, uncontrolledHalfChecked],
    )

    const toggleExpand = useCallback(
      (node: TreeNodeData) => {
        const next = new Set(expandedKeys)
        const willExpand = !next.has(node.key)
        if (willExpand) next.add(node.key)
        else next.delete(node.key)

        if (controlledExpandedKeys === undefined) {
          setUncontrolledExpanded(next)
        }
        onExpand?.([...next], { node, expanded: willExpand })
      },
      [controlledExpandedKeys, expandedKeys, onExpand],
    )

    const selectNode = useCallback(
      (node: TreeNodeData) => {
        if (node.disabled) return
        const next = new Set<string>()
        const willSelect = !selectedKeys.has(node.key)
        if (willSelect) next.add(node.key)

        if (controlledSelectedKeys === undefined) {
          setUncontrolledSelected(next)
        }
        onSelect?.([...next], { node, selected: willSelect })
      },
      [controlledSelectedKeys, onSelect, selectedKeys],
    )

    const checkNode = useCallback(
      (node: TreeNodeData, checked: CheckboxState) => {
        if (node.disabled) return
        const nextChecked = new Set(checkedKeys)
        const nextHalf = new Set(halfCheckedKeys)
        const descendantKeys = collectChildKeys(node)

        nextHalf.delete(node.key)
        for (const key of descendantKeys) nextHalf.delete(key)

        if (checked === true) {
          nextChecked.add(node.key)
          for (const key of descendantKeys) nextChecked.add(key)
        } else {
          nextChecked.delete(node.key)
          for (const key of descendantKeys) nextChecked.delete(key)
        }

        if (controlledCheckedKeys === undefined) {
          setUncontrolledChecked(nextChecked)
          setUncontrolledHalfChecked(nextHalf)
        }
        onCheck?.([...nextChecked], { node, checked })
      },
      [
        checkedKeys,
        controlledCheckedKeys,
        halfCheckedKeys,
        onCheck,
      ],
    )

    const contextValue = useMemo<TreeContextValue>(
      () => ({
        size,
        switcher,
        showLine,
        checkable,
        selectable,
        expandedKeys,
        selectedKeys,
        checkedKeys,
        halfCheckedKeys,
        expandToggleLabel,
        toggleExpand,
        selectNode,
        checkNode,
      }),
      [
        size,
        switcher,
        showLine,
        checkable,
        selectable,
        expandedKeys,
        selectedKeys,
        checkedKeys,
        halfCheckedKeys,
        expandToggleLabel,
        toggleExpand,
        selectNode,
        checkNode,
      ],
    )

    return (
      <TreeContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="tree"
          className={cn(
            'flex w-full flex-col items-stretch',
            'text-agentos-neutral-text-color-text',
            className,
          )}
          {...props}
        >
          {treeData.map((node) => (
            <TreeNodeItem key={node.key} node={node} level={0} />
          ))}
        </div>
      </TreeContext.Provider>
    )
  },
)

Tree.displayName = 'Tree'
