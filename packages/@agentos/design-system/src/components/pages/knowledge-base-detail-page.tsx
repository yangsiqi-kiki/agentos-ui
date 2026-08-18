import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { KnowledgeBaseLayout } from '../layouts/knowledge-base-layout'
import type { BreadcrumbItem } from '../atoms/breadcrumb'
import {
  KnowledgeBaseDetailShell,
  type KnowledgeBaseContentTab,
} from '../organisms/knowledge-base-detail-shell'
import type { WorkspaceTabItem } from '../organisms/workspace-tabs-bar'
import type { TagProps } from '../atoms/tag'

export interface KnowledgeBaseDetailPageProps
  extends HTMLAttributes<HTMLDivElement> {
  fullscreen?: boolean
  orgName?: string
  breadcrumbItems?: BreadcrumbItem[]
  workspaceTabs?: WorkspaceTabItem[]
  defaultWorkspaceTab?: string
  title?: string
  statusLabel?: string
  statusColor?: TagProps['color']
  showBackButton?: boolean
  onBack?: () => void
  contentTabs?: KnowledgeBaseContentTab[]
  activeContentTab?: string
  defaultContentTab?: string
  onContentTabChange?: (value: string) => void
  cuiPlaceholder?: string
  sidebarSlot?: ReactNode
  showSearch?: boolean
  showFullscreen?: boolean
  onSearch?: () => void
  onFullscreen?: () => void
  children?: ReactNode
}

export const KnowledgeBaseDetailPage = forwardRef<
  HTMLDivElement,
  KnowledgeBaseDetailPageProps
>(
  (
    {
      className,
      fullscreen = false,
      orgName,
      breadcrumbItems,
      workspaceTabs,
      defaultWorkspaceTab,
      title,
      statusLabel,
      statusColor,
      showBackButton,
      onBack,
      contentTabs,
      activeContentTab,
      defaultContentTab,
      onContentTabChange,
      cuiPlaceholder,
      sidebarSlot,
      showSearch,
      showFullscreen,
      onSearch,
      onFullscreen,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <KnowledgeBaseLayout
        ref={ref}
        className={className}
        orgName={orgName}
        breadcrumbItems={breadcrumbItems}
        workspaceTabs={workspaceTabs}
        defaultWorkspaceTab={defaultWorkspaceTab}
        cuiPlaceholder={cuiPlaceholder}
        sidebarSlot={sidebarSlot}
        showHeader={!fullscreen}
        showSidebar={!fullscreen}
        showSearch={showSearch}
        showFullscreen={showFullscreen}
        onSearch={onSearch}
        onFullscreen={onFullscreen}
        {...props}
      >
        <KnowledgeBaseDetailShell
          title={title}
          statusLabel={statusLabel}
          statusColor={statusColor}
          showBackButton={showBackButton}
          onBack={onBack}
          contentTabs={contentTabs}
          activeTab={activeContentTab}
          defaultTab={defaultContentTab}
          onTabChange={onContentTabChange}
        >
          {children}
        </KnowledgeBaseDetailShell>
      </KnowledgeBaseLayout>
    )
  },
)

KnowledgeBaseDetailPage.displayName = 'KnowledgeBaseDetailPage'
