import { IconApps, IconBulb, IconTargetArrow } from '@tabler/icons-react'
import {
  Atom,
  Brain,
  Database,
  Folder,
  Link,
  Plus,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'
import { Tab, Tabs, TabsList } from '../atoms/tabs'

export interface WorkspaceTabItem {
  value: string
  label: string
  icon?: ReactNode
  closable?: boolean
  closeLabel?: string
  onClose?: () => void
}

export interface WorkspaceTabsBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  tabs?: WorkspaceTabItem[]
  value?: string
  defaultValue?: string
  appsButtonLabel?: string
  appsButtonIcon?: ReactNode
  addButtonLabel?: string
  showAppsButton?: boolean
  showAddButton?: boolean
  /** 渲染在标签栏最右侧的自定义操作区 */
  rightActions?: ReactNode
  /** 置灰但仍可点击：用于多分屏场景下非 focus 分屏的标签栏，整体调暗并抑制选中态主色高亮。 */
  dimmed?: boolean
  onValueChange?: (value: string) => void
  onAppsClick?: () => void
  onAdd?: () => void
}

const createIcon = (Icon: LucideIcon) => <Icon aria-hidden="true" />

const defaultTabs: WorkspaceTabItem[] = [
  { value: 'knowledge', label: 'Knowledge', icon: createIcon(Folder), closable: true },
  { value: 'ontology', label: 'Ontology', icon: createIcon(Atom), closable: true },
  { value: 'agent', label: 'Agent', icon: createIcon(Sparkles), closable: true },
  {
    value: 'skills',
    label: 'Skills',
    icon: <IconBulb aria-hidden="true" />,
    closable: true,
  },
  { value: 'mcp', label: 'MCP', icon: createIcon(Link), closable: true },
  { value: 'data-source', label: 'Data source', icon: createIcon(Database), closable: true },
  { value: 'knowledge-2', label: 'Knowledge', icon: createIcon(Folder), closable: true },
  {
    value: 'scenario',
    label: 'Scenario',
    icon: <IconTargetArrow aria-hidden="true" />,
    closable: true,
  },
  { value: 'memory', label: 'Memory', icon: createIcon(Brain), closable: true },
]

export const WorkspaceTabsBar = forwardRef<HTMLDivElement, WorkspaceTabsBarProps>(
  (
    {
      className,
      tabs = defaultTabs,
      value,
      defaultValue = 'knowledge',
      appsButtonLabel = 'Open apps',
      appsButtonIcon,
      addButtonLabel = 'Add tab',
      showAppsButton = true,
      showAddButton = true,
      rightActions,
      dimmed = false,
      onValueChange,
      onAppsClick,
      onAdd,
      ...props
    },
    ref,
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const activeValue = value ?? defaultValue

    // 保证激活 tab 始终可见：value 变化或滚动区因 rightActions 出现等原因变窄时都重新滚入。
    useEffect(() => {
      const container = scrollContainerRef.current
      if (!container) {
        return
      }

      const scrollActiveTabIntoView = () => {
        const activeTab = container.querySelector<HTMLElement>(
          `[data-value="${activeValue}"]`,
        )
        // jsdom（测试环境）未实现 scrollIntoView，需要判空避免测试报错。
        activeTab?.scrollIntoView?.({ inline: 'nearest', block: 'nearest' })
      }

      scrollActiveTabIntoView()

      const observer = new ResizeObserver(scrollActiveTabIntoView)
      observer.observe(container)
      return () => observer.disconnect()
    }, [activeValue])

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full min-w-0 items-center gap-agentos-gap-gap-xs8 overflow-hidden',
          'border-b border-agentos-neutral-border-color-border-secondary',
          'bg-agentos-neutral-bg-color-bg-elevated px-agentos-padding-padding-xs8 py-agentos-padding-padding-xxs4',
          dimmed && [
            'opacity-60',
            '[&_[role="tab"][aria-selected="true"]]:!border-agentos-neutral-border-color-border-secondary',
            '[&_[role="tab"][aria-selected="true"]]:!bg-transparent',
            '[&_[role="tab"][aria-selected="true"]]:!font-agentos-normal',
            '[&_[role="tab"][aria-selected="true"]]:!text-agentos-neutral-text-color-text-secondary',
          ],
          className,
        )}
        {...props}
      >
        {showAppsButton ? (
          <Button
            type="button"
            theme="black"
            appearance="ghost"
            size="default"
            leadingIcon={appsButtonIcon ?? <IconApps aria-hidden="true" />}
            aria-label={appsButtonLabel}
            onClick={onAppsClick}
          />
        ) : null}
        <div
          ref={scrollContainerRef}
          className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Tabs
            value={value}
            defaultValue={defaultValue}
            variant="card-gutter"
            size="lg"
            onValueChange={onValueChange}
          >
            <TabsList className="w-max">
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  closable={tab.closable}
                  closeLabel={tab.closeLabel}
                  onClose={tab.onClose}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabsList>
          </Tabs>
        </div>
        {showAddButton ? (
          <Button
            type="button"
            theme="black"
            appearance="ghost"
            size="default"
            leadingIcon={<Plus aria-hidden="true" />}
            aria-label={addButtonLabel}
            onClick={onAdd}
          />
        ) : null}
        {rightActions}
      </div>
    )
  },
)

WorkspaceTabsBar.displayName = 'WorkspaceTabsBar'
