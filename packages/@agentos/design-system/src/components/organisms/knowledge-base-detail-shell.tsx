import { ChevronLeft } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'
import { Tab, Tabs, TabsList } from '../atoms/tabs'
import { Tag, type TagProps } from '../atoms/tag'
import { Title } from '../atoms/title'

export interface KnowledgeBaseContentTab {
  value: string
  label: string
}

export interface KnowledgeBaseDetailShellProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string
  statusLabel?: string
  statusColor?: TagProps['color']
  showBackButton?: boolean
  backButtonLabel?: string
  onBack?: () => void
  contentTabs?: KnowledgeBaseContentTab[]
  activeTab?: string
  defaultTab?: string
  onTabChange?: (value: string) => void
  children?: ReactNode
}

const defaultContentTabs: KnowledgeBaseContentTab[] = [
  { value: 'original', label: 'Original content' },
  { value: 'processed', label: 'Processing results' },
  { value: 'retrieval', label: 'Knowledge retrieval' },
]

export const KnowledgeBaseDetailShell = forwardRef<
  HTMLDivElement,
  KnowledgeBaseDetailShellProps
>(
  (
    {
      className,
      title = 'Knowledge base title',
      statusLabel = 'Deployed',
      statusColor = 'green',
      showBackButton = true,
      backButtonLabel = 'Go back',
      onBack,
      contentTabs = defaultContentTabs,
      activeTab,
      defaultTab = 'original',
      onTabChange,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex min-h-0 min-w-0 flex-1 flex-col', className)}
        {...props}
      >
        <div className="flex shrink-0 items-center gap-agentos-gap-gap-xs8 bg-agentos-neutral-bg-color-bg-container px-agentos-margin-margin-sm12 pb-agentos-padding-padding-xs8">
          {showBackButton ? (
            <Button
              theme="black"
              appearance="ghost"
              size="icon"
              aria-label={backButtonLabel}
              onClick={onBack}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
          ) : null}
          <Title level="h5" title={title} />
          <Tag color={statusColor} bordered shape="rounded">
            {statusLabel}
          </Tag>
        </div>

        <Tabs
          className="flex min-h-0 min-w-0 flex-1 flex-col"
          value={activeTab}
          defaultValue={defaultTab}
          variant="line"
          size="default"
          onValueChange={onTabChange}
        >
          <TabsList>
            {contentTabs.map((tab) => (
              <Tab key={tab.value} value={tab.value}>
                {tab.label}
              </Tab>
            ))}
          </TabsList>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </Tabs>
      </div>
    )
  },
)

KnowledgeBaseDetailShell.displayName = 'KnowledgeBaseDetailShell'
