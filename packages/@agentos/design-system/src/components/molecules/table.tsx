import {
  IconCaretDownFilled,
  IconCaretUpFilled,
} from '@tabler/icons-react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'
import { cn } from '../../lib/utils'

export type TableSize = 'large' | 'medium' | 'small' | 'mini'
export type TableAlign = 'left' | 'center' | 'right'
export type TableFixed = 'left' | 'right'
export type TableSortDirection = 'asc' | 'desc' | false

type TableContextValue = {
  size: TableSize
  bordered: boolean
  pingLeft: boolean
  pingRight: boolean
}

const TableContext = createContext<TableContextValue>({
  size: 'large',
  bordered: false,
  pingLeft: false,
  pingRight: false,
})

function useTableContext() {
  return useContext(TableContext)
}

const tableCellSizeVariants = cva('', {
  variants: {
    size: {
      large: 'h-[41px] px-agentos-margin-margin16',
      medium: 'h-[37px] px-agentos-margin-margin16',
      small: 'h-[33px] px-agentos-margin-margin-sm12',
      mini: 'h-[25px] px-agentos-margin-margin-xs8',
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

const tableHeadSizeVariants = cva('', {
  variants: {
    size: {
      large: 'h-10 px-agentos-margin-margin16',
      medium: 'h-[37px] px-agentos-margin-margin16',
      small: 'h-[33px] px-agentos-margin-margin-sm12',
      mini: 'h-[25px] px-agentos-margin-margin-xs8',
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

const alignVariants: Record<TableAlign, string> = {
  left: 'text-left justify-start items-start',
  center: 'text-center justify-center items-center',
  right: 'text-right justify-end items-end',
}

function resolveFixedStyle(
  fixed: TableFixed | undefined,
  stickyOffset: number | undefined,
): CSSProperties | undefined {
  if (!fixed) return undefined
  const offset = stickyOffset ?? 0
  if (fixed === 'left') {
    return { left: offset }
  }
  return { right: offset }
}

function fixedShadowClass(
  fixed: TableFixed | undefined,
  fixedEdge: boolean,
  pingLeft: boolean,
  pingRight: boolean,
) {
  if (!fixed || !fixedEdge) return undefined
  if (fixed === 'left' && pingLeft) {
    return 'after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-2.5 after:translate-x-full after:content-[""] after:shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.15)]'
  }
  if (fixed === 'right' && pingRight) {
    return 'after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-2.5 after:-translate-x-full after:content-[""] after:shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.15)]'
  }
  return undefined
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  size?: TableSize
  bordered?: boolean
  /** 横向滚动容器 className */
  containerClassName?: string
}

/** Figma Table：滚动容器 + table 语义结构，支持固定列 ping 阴影 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      size = 'large',
      bordered = false,
      containerClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [pingLeft, setPingLeft] = useState(false)
    const [pingRight, setPingRight] = useState(false)

    const updatePing = useCallback(() => {
      const el = scrollRef.current
      if (!el) return
      const { scrollLeft, scrollWidth, clientWidth } = el
      setPingLeft(scrollLeft > 0)
      setPingRight(scrollLeft + clientWidth < scrollWidth - 1)
    }, [])

    useEffect(() => {
      const el = scrollRef.current
      if (!el) return
      updatePing()
      const observer = new ResizeObserver(updatePing)
      observer.observe(el)
      return () => observer.disconnect()
    }, [updatePing])

    return (
      <TableContext.Provider value={{ size, bordered, pingLeft, pingRight }}>
        <div
          ref={scrollRef}
          className={cn('relative w-full overflow-auto', containerClassName)}
          data-ping-left={pingLeft || undefined}
          data-ping-right={pingRight || undefined}
          onScroll={updatePing}
        >
          <table
            ref={ref}
            className={cn(
              // border-separate 比 collapse 更稳定地支持 sticky 固定列
              'w-full caption-bottom border-separate border-spacing-0',
              'font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal',
              'text-agentos-neutral-text-color-text',
              bordered && 'border border-solid border-agentos-neutral-border-color-border',
              className,
            )}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    )
  },
)
Table.displayName = 'Table'

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child_td]:border-b-0', className)}
      {...props}
    />
  ),
)
TableBody.displayName = 'TableBody'

export interface TableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-solid border-agentos-neutral-border-color-border',
      'bg-agentos-neutral-bg-color-bg-layout font-agentos-medium',
      className,
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, ...props }, ref) => (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={cn(
        // 禁止给 tr 设 z-index/relative：会破坏 sticky 固定列层叠，导致滚动列盖住固定列
        'group transition-colors',
        'hover:bg-agentos-neutral-bg-color-bg-text-hover',
        selected && 'bg-agentos-brand-primary-color-primary-bg',
        className,
      )}
      {...props}
    />
  ),
)
TableRow.displayName = 'TableRow'

export interface TableHeadProps
  extends ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadSizeVariants> {
  align?: TableAlign
  fixed?: TableFixed
  /** sticky 偏移（多列固定时累加前序列宽） */
  stickyOffset?: number
  /** 固定列组最外侧单元格，滚动时展示分隔阴影 */
  fixedEdge?: boolean
  sortable?: boolean
  sortDirection?: TableSortDirection
  onSort?: () => void
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      align = 'left',
      fixed,
      stickyOffset,
      fixedEdge = false,
      sortable = false,
      sortDirection = false,
      onSort,
      size: sizeProp,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const { size: ctxSize, bordered, pingLeft, pingRight } = useTableContext()
    const size = sizeProp ?? ctxSize
    const isFixed = Boolean(fixed)

    let ariaSort: 'ascending' | 'descending' | 'none' | undefined
    if (sortable) {
      if (sortDirection === 'asc') ariaSort = 'ascending'
      else if (sortDirection === 'desc') ariaSort = 'descending'
      else ariaSort = 'none'
    }

    const content = (
      <>
        <span className="min-w-0 truncate">{children}</span>
        {sortable ? (
          <TableSorter direction={sortDirection} className="shrink-0" />
        ) : null}
      </>
    )

    return (
      <th
        ref={ref}
        data-fixed={fixed}
        data-fixed-edge={fixedEdge || undefined}
        aria-sort={ariaSort}
        style={{ ...resolveFixedStyle(fixed, stickyOffset), ...style }}
        className={cn(
          'whitespace-nowrap bg-agentos-neutral-bg-color-bg-layout',
          'font-agentos-semibold text-agentos-neutral-text-color-text',
          'align-middle',
          size === 'mini' ? 'text-agentos-sm' : 'text-agentos-md',
          tableHeadSizeVariants({ size }),
          alignVariants[align],
          bordered &&
            'border border-solid border-agentos-neutral-border-color-border',
          !bordered &&
            'border-b border-solid border-agentos-neutral-border-color-border',
          isFixed && 'sticky z-[3]',
          fixedShadowClass(fixed, fixedEdge, pingLeft, pingRight),
          className,
        )}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            className={cn(
              'inline-flex w-full max-w-full items-center gap-agentos-gap-gap-xxs4',
              alignVariants[align],
              'cursor-pointer bg-transparent font-inherit text-inherit',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-agentos-brand-primary-color-primary-outline',
            )}
            onClick={onSort}
          >
            {content}
          </button>
        ) : (
          <div
            className={cn(
              'inline-flex w-full max-w-full items-center gap-agentos-gap-gap-xxs4',
              alignVariants[align],
            )}
          >
            {content}
          </div>
        )}
      </th>
    )
  },
)
TableHead.displayName = 'TableHead'

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellSizeVariants> {
  align?: TableAlign
  fixed?: TableFixed
  stickyOffset?: number
  fixedEdge?: boolean
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      align = 'left',
      fixed,
      stickyOffset,
      fixedEdge = false,
      size: sizeProp,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { size: ctxSize, bordered, pingLeft, pingRight } = useTableContext()
    const size = sizeProp ?? ctxSize
    const isFixed = Boolean(fixed)

    return (
      <td
        ref={ref}
        data-fixed={fixed}
        data-fixed-edge={fixedEdge || undefined}
        style={{ ...resolveFixedStyle(fixed, stickyOffset), ...style }}
        className={cn(
          'relative align-middle overflow-hidden',
          // 固定列必须始终不透明，否则滚动列会透过半透明 hover 底色显现
          'bg-agentos-neutral-bg-color-bg-container',
          size === 'mini' ? 'text-agentos-sm' : 'text-agentos-md',
          'font-agentos-normal text-agentos-neutral-text-color-text',
          tableCellSizeVariants({ size }),
          bordered &&
            'border border-solid border-agentos-neutral-border-color-border',
          !bordered &&
            'border-b border-solid border-agentos-neutral-border-color-border',
          'group-data-[selected]:bg-agentos-brand-primary-color-primary-bg',
          isFixed && 'sticky z-[2]',
          // hover 色调（半透明）作为叠加层盖在不透明底上，不改变底色不透明度
          'before:pointer-events-none before:absolute before:inset-0 before:content-[""]',
          'group-hover:before:bg-agentos-neutral-bg-color-bg-text-hover',
          fixedShadowClass(fixed, fixedEdge, pingLeft, pingRight),
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'relative z-[1] min-w-0 max-w-full truncate',
            align === 'center' && 'text-center',
            align === 'right' && 'text-right',
            align === 'left' && 'text-left',
          )}
        >
          {children}
        </div>
      </td>
    )
  },
)
TableCell.displayName = 'TableCell'

export interface TableCaptionProps
  extends HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      'mt-agentos-margin-margin-xs8 font-agentos-en text-agentos-sm',
      'font-agentos-normal leading-agentos-18 tracking-agentos-normal',
      'text-agentos-neutral-text-color-text-description',
      className,
    )}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export interface TableSorterProps extends HTMLAttributes<HTMLSpanElement> {
  direction?: TableSortDirection
}

/** Pixso `.sorter`：12×16 组合 caret，上下各 8px 槽位并向中心各偏移 1px */
export const TableSorter = forwardRef<HTMLSpanElement, TableSorterProps>(
  ({ className, direction = false, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'inline-flex h-4 w-3 shrink-0 flex-col items-center justify-center',
        className,
      )}
      {...props}
    >
      <span className="flex h-2 w-3 items-center justify-center overflow-hidden">
        <IconCaretUpFilled
          className={cn(
            'block size-2 translate-y-px',
            direction === 'asc'
              ? 'text-agentos-brand-primary-color-primary'
              : 'text-agentos-neutral-fill-color-fill',
          )}
        />
      </span>
      <span className="flex h-2 w-3 items-center justify-center overflow-hidden">
        <IconCaretDownFilled
          className={cn(
            'block size-2 -translate-y-px',
            direction === 'desc'
              ? 'text-agentos-brand-primary-color-primary'
              : 'text-agentos-neutral-fill-color-fill',
          )}
        />
      </span>
    </span>
  ),
)
TableSorter.displayName = 'TableSorter'
