import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeRetrievalPage } from '../../../../src/components/pages/knowledge-retrieval-page'

const meta = {
  title: 'Pages/KnowledgeBase/KnowledgeRetrievalPage',
  component: KnowledgeRetrievalPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KnowledgeRetrievalPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomCopy: Story = {
  args: {
    pageTitle: 'Product FAQ Base',
    statusLabel: 'Deployed',
    emptyTitle: 'No matches yet',
    emptyDescription: 'Try a different query or lower the similarity threshold.',
  },
}
