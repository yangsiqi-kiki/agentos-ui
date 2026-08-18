import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { KnowledgeBaseLayout } from '../layouts/knowledge-base-layout'
import { KnowledgeBaseDetailShell } from '../organisms/knowledge-base-detail-shell'
import { KnowledgeRetrievalView } from '../organisms/knowledge-retrieval-view'
import type { WorkspaceTabItem } from '../organisms/workspace-tabs-bar'

export interface KnowledgeRetrievalPageProps
  extends HTMLAttributes<HTMLDivElement> {
  orgName?: string
  breadcrumbParent?: string
  breadcrumbCurrent?: string
  pageTitle?: string
  statusLabel?: string
  cuiPlaceholder?: string
  workspaceTabs?: WorkspaceTabItem[]
  contentTabs?: Array<{
    value: string
    label: string
  }>
  defaultWorkspaceTab?: string
  defaultContentTab?: string
  retrievalTitle?: string
  representationLabel?: string
  crossLanguageLabel?: string
  metadataFilterLabel?: string
  hybridStrategyLabel?: string
  initialRecallLabel?: string
  rerankModelLabel?: string
  similarityLabel?: string
  resultCountLabel?: string
  highlightLabel?: string
  searchPlaceholder?: string
  searchButtonLabel?: string
  emptyTitle?: string
  emptyDescription?: string
  onBack?: () => void
  onSearch?: (query: string) => void
  sidebarSlot?: ReactNode
}

const defaultContentTabs = [
  { value: 'original', label: 'Original content' },
  { value: 'processed', label: 'Processing results' },
  { value: 'retrieval', label: 'Knowledge retrieval' },
]

export const KnowledgeRetrievalPage = forwardRef<
  HTMLDivElement,
  KnowledgeRetrievalPageProps
>(
  (
    {
      className,
      orgName = 'AgentOS Org',
      breadcrumbParent = 'Knowledge base',
      breadcrumbCurrent = 'All knowledge bases',
      pageTitle = 'Knowledge base title',
      statusLabel = 'Deployed',
      cuiPlaceholder,
      workspaceTabs,
      contentTabs = defaultContentTabs,
      defaultWorkspaceTab = 'knowledge',
      defaultContentTab = 'retrieval',
      retrievalTitle,
      representationLabel,
      crossLanguageLabel,
      metadataFilterLabel,
      hybridStrategyLabel,
      initialRecallLabel,
      rerankModelLabel,
      similarityLabel,
      resultCountLabel,
      highlightLabel,
      searchPlaceholder,
      searchButtonLabel,
      emptyTitle,
      emptyDescription,
      onBack,
      onSearch,
      sidebarSlot,
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
        sidebarSlot={sidebarSlot}
        {...props}
      >
        <KnowledgeBaseDetailShell
          title={pageTitle}
          statusLabel={statusLabel}
          contentTabs={contentTabs}
          defaultTab={defaultContentTab}
          onBack={onBack}
        >
          <KnowledgeRetrievalView
            state="empty"
            retrievalTitle={retrievalTitle}
            representationLabel={representationLabel}
            crossLanguageLabel={crossLanguageLabel}
            metadataFilterLabel={metadataFilterLabel}
            hybridStrategyLabel={hybridStrategyLabel}
            initialRecallLabel={initialRecallLabel}
            rerankModelLabel={rerankModelLabel}
            similarityLabel={similarityLabel}
            resultCountLabel={resultCountLabel}
            highlightLabel={highlightLabel}
            searchPlaceholder={searchPlaceholder}
            searchButtonLabel={searchButtonLabel}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            onSearch={onSearch}
          />
        </KnowledgeBaseDetailShell>
      </KnowledgeBaseLayout>
    )
  },
)

KnowledgeRetrievalPage.displayName = 'KnowledgeRetrievalPage'
