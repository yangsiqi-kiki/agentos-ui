import { MoreHorizontal, Plus } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from '../atoms/button'
import { Select, type SelectOption } from '../atoms/select'
import { Tag, type TagProps } from '../atoms/tag'
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../molecules/card'
import { KnowledgeBaseLayout } from '../layouts/knowledge-base-layout'
import type { WorkspaceTabItem } from '../organisms/workspace-tabs-bar'

export interface KnowledgeDocCardItem {
  id: string
  title: string
  /** 主摘要（深色正文） */
  summary: string
  /** 次级摘要（描述色，单行截断），常用于本地化译文 */
  secondarySummary?: string
  statusLabel: string
  statusColor?: TagProps['color']
  /** 状态标签之后的元信息标签，如 ID、字符数 */
  metaTags?: string[]
}

export interface KnowledgeBaseListPageProps
  extends HTMLAttributes<HTMLDivElement> {
  orgName?: string
  breadcrumbParent?: string
  breadcrumbCurrent?: string
  workspaceTabs?: WorkspaceTabItem[]
  defaultWorkspaceTab?: string
  statusOptions?: SelectOption[]
  defaultStatus?: string
  newButtonLabel?: string
  items?: KnowledgeDocCardItem[]
  cuiPlaceholder?: string
  chatPlaceholder?: string
  modelLabel?: string
  moreActionLabel?: string
  searchButtonLabel?: string
  fullscreenButtonLabel?: string
  sidebarSlot?: ReactNode
  onSearch?: () => void
  onFullscreen?: () => void
  onNew?: () => void
  onItemAction?: (id: string) => void
}

const defaultStatusOptions: SelectOption[] = [
  { value: 'all', label: 'All status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
]

const sampleSummary =
  'Provided AI-powered sales enablement for 539 direct-operated Li Auto ' +
  'retail stores through three core capabilities: knowledge Q&A, ' +
  'intelligent customer follow-up, and one-click quotation generation.'

const sampleSecondary =
  'AI sales enablement for 539 Li Auto stores covering Q&A, follow-up, and one-click quotes.'

const defaultItems: KnowledgeDocCardItem[] = Array.from(
  { length: 9 },
  (_, index) => ({
    id: `doc-${index + 1}`,
    title: `Docname.doc #${index + 1}`,
    summary: sampleSummary,
    secondarySummary: sampleSecondary,
    statusLabel: 'Published',
    statusColor: 'green',
    metaTags: ['ID:827736512', 'Chars 5,000'],
  }),
)

export const KnowledgeBaseListPage = forwardRef<
  HTMLDivElement,
  KnowledgeBaseListPageProps
>(
  (
    {
      className,
      orgName = 'AgentOS Org',
      breadcrumbParent = 'Knowledge base',
      breadcrumbCurrent = 'All knowledge bases',
      workspaceTabs,
      defaultWorkspaceTab = 'knowledge',
      statusOptions = defaultStatusOptions,
      defaultStatus = 'all',
      newButtonLabel = 'New',
      items = defaultItems,
      cuiPlaceholder,
      chatPlaceholder,
      modelLabel,
      moreActionLabel = 'More actions',
      searchButtonLabel,
      fullscreenButtonLabel,
      sidebarSlot,
      onSearch,
      onFullscreen,
      onNew,
      onItemAction,
      ...props
    },
    ref,
  ) => {
    return (
      <KnowledgeBaseLayout
        ref={ref}
        className={className}
        orgName={orgName}
        breadcrumbItems={[
          { label: breadcrumbParent },
          { label: breadcrumbCurrent },
        ]}
        workspaceTabs={workspaceTabs}
        defaultWorkspaceTab={defaultWorkspaceTab}
        cuiPlaceholder={cuiPlaceholder}
        chatPlaceholder={chatPlaceholder}
        modelLabel={modelLabel}
        sidebarSlot={sidebarSlot}
        searchButtonLabel={searchButtonLabel}
        fullscreenButtonLabel={fullscreenButtonLabel}
        onSearch={onSearch}
        onFullscreen={onFullscreen}
        {...props}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-agentos-gap-gap-xs8 px-agentos-margin-margin-sm12 py-agentos-padding-padding-xs8">
          <div className="flex items-center justify-between py-agentos-padding-padding-xxs4">
            <div className="flex items-center gap-agentos-gap-gap-xs8">
              <div className="w-[98px]">
                <Select options={statusOptions} defaultValue={defaultStatus} />
              </div>
            </div>
            <Button
              theme="black"
              leadingIcon={<Plus aria-hidden="true" />}
              onClick={onNew}
            >
              {newButtonLabel}
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            <div className="grid grid-cols-1 gap-agentos-gap-gap-xs8 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardTitle>
                    <div className="flex w-full items-center justify-between gap-agentos-gap-gap-xs8">
                      <span className="min-w-0 truncate text-agentos-md font-agentos-semibold leading-agentos-18 text-agentos-neutral-text-color-text">
                        {item.title}
                      </span>
                      <Button
                        theme="black"
                        appearance="ghost"
                        size="sm"
                        aria-label={moreActionLabel}
                        onClick={() => onItemAction?.(item.id)}
                      >
                        <MoreHorizontal aria-hidden="true" />
                      </Button>
                    </div>
                  </CardTitle>

                  <CardContent className="flex flex-col gap-agentos-gap-gap-xs8">
                    <p className="line-clamp-4 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text">
                      {item.summary}
                    </p>
                    {item.secondarySummary ? (
                      <p className="truncate text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
                        {item.secondarySummary}
                      </p>
                    ) : null}
                  </CardContent>

                  <CardFooter showDivider>
                    <div className="flex flex-wrap items-center gap-agentos-gap-gap-xxs4">
                      <Tag
                        color={item.statusColor ?? 'green'}
                        bordered
                        shape="rounded"
                      >
                        {item.statusLabel}
                      </Tag>
                      {item.metaTags?.map((meta) => (
                        <Tag key={meta} shape="rounded">
                          {meta}
                        </Tag>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </KnowledgeBaseLayout>
    )
  },
)

KnowledgeBaseListPage.displayName = 'KnowledgeBaseListPage'
