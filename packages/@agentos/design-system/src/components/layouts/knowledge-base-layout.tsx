import {
  ArrowUp,
  ChevronDown,
  Copy,
  FileText,
  Maximize2,
  Paperclip,
  Search,
  UserRound,
} from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Avatar } from '../atoms/avatar'
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '../atoms/breadcrumb'
import { Button } from '../atoms/button'
import { Tag } from '../atoms/tag'
import { LayoutHeaderContainer } from './layout-header-container'
import {
  WorkspaceTabsBar,
  type WorkspaceTabItem,
} from '../organisms/workspace-tabs-bar'

export interface KnowledgeBaseLayoutProps
  extends HTMLAttributes<HTMLDivElement> {
  orgName?: string
  breadcrumbItems?: BreadcrumbItem[]
  workspaceTabs?: WorkspaceTabItem[]
  defaultWorkspaceTab?: string
  workspaceTabValue?: string
  onWorkspaceTabChange?: (value: string) => void
  onAppsClick?: () => void
  onAdd?: () => void
  cuiPlaceholder?: string
  chatPlaceholder?: string
  modelLabel?: string
  attachLabel?: string
  sendLabel?: string
  sidebarSlot?: ReactNode
  showChatInput?: boolean
  showHeader?: boolean
  showSidebar?: boolean
  showSearch?: boolean
  showFullscreen?: boolean
  searchButtonLabel?: string
  fullscreenButtonLabel?: string
  onSearch?: () => void
  onFullscreen?: () => void
  children?: ReactNode
}

const defaultBreadcrumbItems: BreadcrumbItem[] = [
  { label: 'Knowledge base' },
  { label: 'All knowledge bases' },
]

export const KnowledgeBaseLayout = forwardRef<
  HTMLDivElement,
  KnowledgeBaseLayoutProps
>(
  (
    {
      className,
      orgName = 'AgentOS Org',
      breadcrumbItems = defaultBreadcrumbItems,
      workspaceTabs,
      defaultWorkspaceTab = 'knowledge',
      workspaceTabValue,
      onWorkspaceTabChange,
      onAppsClick,
      onAdd,
      cuiPlaceholder = 'CUI Placeholder\nmin-width: 452',
      chatPlaceholder = 'AgentOS cook every agent for you',
      modelLabel = 'Auto',
      attachLabel = 'Attach file',
      sendLabel = 'Send',
      sidebarSlot,
      showChatInput = true,
      showHeader = true,
      showSidebar = true,
      showSearch = true,
      showFullscreen = true,
      searchButtonLabel = 'Search',
      fullscreenButtonLabel = 'Enter fullscreen',
      onSearch,
      onFullscreen,
      children,
      ...props
    },
    ref,
  ) => {
    const header = (
      <>
        <div className="flex items-center gap-agentos-gap-gap16">
          <div className="flex items-center gap-agentos-padding-padding-xs8">
            <span className="inline-flex size-agentos-icon-icon-size-xl24 items-center justify-center rounded-agentos-rounded-sm4 bg-agentos-brand-primary-color-primary text-agentos-neutral-text-color-text-light-solid text-agentos-sm font-agentos-semibold">
              A
            </span>
            <span className="text-agentos-md font-agentos-semibold leading-agentos-18">
              AgentOS
            </span>
            <Tag size="sm" color="default">
              1.0 beta
            </Tag>
          </div>
          <Button
            theme="black"
            appearance="ghost"
            size="sm"
            trailingIcon={<ChevronDown aria-hidden="true" />}
          >
            {orgName}
          </Button>
        </div>
        <div className="flex items-center gap-agentos-gap-gap-xs8">
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <Button
              theme="black"
              appearance="ghost"
              size="icon"
              aria-label="Documents"
            >
              <FileText aria-hidden="true" />
            </Button>
            <Button
              theme="black"
              appearance="ghost"
              size="icon"
              aria-label="Workspaces"
            >
              <Copy aria-hidden="true" />
            </Button>
            <Button
              theme="black"
              appearance="ghost"
              size="icon"
              aria-label="Account"
            >
              <UserRound aria-hidden="true" />
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-agentos-margin-margin-xxs4 rounded-agentos-rounded-full999 p-agentos-padding-padding-xxs4"
          >
            <Avatar size="sm" fallback="A" />
            <ChevronDown
              aria-hidden="true"
              className="size-agentos-icon-icon-size-sm12 text-agentos-neutral-icon-color-icon"
            />
          </button>
        </div>
      </>
    )

    const sidebar = showSidebar ? (
      <aside className="relative flex w-[452px] min-w-[452px] shrink-0 flex-col items-center justify-center self-stretch bg-agentos-neutral-bg-color-bg-elevated p-agentos-margin-margin16">
        {sidebarSlot ?? (
          <>
            <p className="whitespace-pre-line text-center text-agentos-xl font-agentos-semibold leading-agentos-28 text-agentos-neutral-text-color-text-tertiary">
              {cuiPlaceholder}
            </p>
            {showChatInput ? (
              <div className="absolute bottom-agentos-margin-margin-lg24 left-1/2 flex w-[420px] max-w-[478px] min-w-[400px] -translate-x-1/2 flex-col gap-agentos-gap-gap16 rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding-sm12">
                <p className="text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
                  {chatPlaceholder}
                </p>
                <div className="flex items-center justify-between">
                  <Button
                    theme="black"
                    appearance="ghost"
                    size="sm"
                    trailingIcon={<ChevronDown aria-hidden="true" />}
                  >
                    {modelLabel}
                  </Button>
                  <div className="flex items-center gap-agentos-gap-gap-xxs4">
                    <Button
                      theme="black"
                      appearance="ghost"
                      size="sm"
                      aria-label={attachLabel}
                    >
                      <Paperclip aria-hidden="true" />
                    </Button>
                    <Button theme="black" size="sm" aria-label={sendLabel}>
                      <ArrowUp aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </aside>
    ) : null

    const main = (
      <main
        className={cn(
          'flex min-h-0 min-w-0 flex-1 flex-col',
          showSidebar && 'border-l border-agentos-neutral-border-color-split',
        )}
      >
        <WorkspaceTabsBar
          tabs={workspaceTabs}
          value={workspaceTabValue}
          defaultValue={defaultWorkspaceTab}
          onValueChange={onWorkspaceTabChange}
          onAppsClick={onAppsClick}
          onAdd={onAdd}
        />

        <div className="flex shrink-0 flex-col gap-agentos-gap-gap-xs8 border-b border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container px-agentos-margin-margin-sm12 py-agentos-padding-padding-sm12">
          <div className="flex h-agentos-control-control-height-sm24 items-center justify-between">
            <Breadcrumb
              className="max-w-none min-w-0 flex-1"
              items={breadcrumbItems}
            />
            <div className="flex shrink-0 items-center">
              {showSearch ? (
                <Button
                  theme="black"
                  appearance="ghost"
                  size="sm"
                  aria-label={searchButtonLabel}
                  onClick={onSearch}
                >
                  <Search aria-hidden="true" />
                </Button>
              ) : null}
              {showFullscreen ? (
                <Button
                  theme="black"
                  appearance="ghost"
                  size="sm"
                  aria-label={fullscreenButtonLabel}
                  onClick={onFullscreen}
                >
                  <Maximize2 aria-hidden="true" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </main>
    )

    return (
      <LayoutHeaderContainer
        ref={ref}
        className={className}
        header={showHeader ? header : undefined}
        headerClassName={showHeader ? undefined : 'hidden'}
        {...props}
      >
        {sidebar}
        {main}
      </LayoutHeaderContainer>
    )
  },
)

KnowledgeBaseLayout.displayName = 'KnowledgeBaseLayout'
