import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeBaseDetailPage } from '../../../../src/components/pages/knowledge-base-detail-page'
import { KnowledgeOriginalContentView } from '../../../../src/components/organisms/knowledge-original-content-view'
import { KnowledgeProcessingResultView } from '../../../../src/components/organisms/knowledge-processing-result-view'
import { KnowledgeRetrievalView } from '../../../../src/components/organisms/knowledge-retrieval-view'

const meta = {
  title: 'Pages/KnowledgeBase/KnowledgeBaseDetailPage',
  component: KnowledgeBaseDetailPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KnowledgeBaseDetailPage>

export default meta
type Story = StoryObj<typeof meta>

const sharedArgs = {
  title: 'Knowledge base title',
  statusLabel: 'Deployed',
  breadcrumbItems: [
    { label: 'Knowledge base' },
    { label: 'All knowledge bases' },
  ],
}

export const OriginalContent: Story = {
  args: {
    ...sharedArgs,
    defaultContentTab: 'original',
    children: <KnowledgeOriginalContentView />,
  },
}

export const ProcessingSemantic: Story = {
  args: {
    ...sharedArgs,
    defaultContentTab: 'processed',
    children: <KnowledgeProcessingResultView defaultMode="semantic" />,
  },
}

export const ProcessingStructure: Story = {
  args: {
    ...sharedArgs,
    defaultContentTab: 'processed',
    children: <KnowledgeProcessingResultView defaultMode="structure" />,
  },
}

export const RetrievalEmpty: Story = {
  args: {
    ...sharedArgs,
    defaultContentTab: 'retrieval',
    children: <KnowledgeRetrievalView state="empty" />,
  },
}

export const RetrievalResults: Story = {
  args: {
    ...sharedArgs,
    defaultContentTab: 'retrieval',
    children: (
      <KnowledgeRetrievalView state="results" defaultQuery="BMW" />
    ),
  },
}

export const RetrievalDetail: Story = {
  args: {
    ...sharedArgs,
    defaultContentTab: 'retrieval',
    children: <KnowledgeRetrievalView state="detail" />,
  },
}

export const StructureFullscreen: Story = {
  args: {
    ...sharedArgs,
    fullscreen: true,
    defaultContentTab: 'processed',
    children: <KnowledgeProcessingResultView defaultMode="structure" />,
  },
}
