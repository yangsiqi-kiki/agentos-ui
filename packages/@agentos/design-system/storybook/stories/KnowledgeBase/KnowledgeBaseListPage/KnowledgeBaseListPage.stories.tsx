import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeBaseListPage } from '../../../../src/components/pages/knowledge-base-list-page'

const meta = {
  title: 'Pages/KnowledgeBase/KnowledgeBaseListPage',
  component: KnowledgeBaseListPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KnowledgeBaseListPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomCopy: Story = {
  args: {
    breadcrumbParent: 'Knowledge base',
    breadcrumbCurrent: 'Sales enablement',
    newButtonLabel: 'Create',
    items: [
      {
        id: 'faq',
        title: 'Product FAQ.doc',
        summary:
          'Frequently asked questions covering onboarding, billing, and troubleshooting for the AgentOS platform.',
        secondarySummary: 'Common questions covering onboarding, billing, and troubleshooting.',
        statusLabel: 'Draft',
        statusColor: 'default',
        metaTags: ['ID:100238841', 'Chars 2,300'],
      },
      {
        id: 'policy',
        title: 'Return policy.doc',
        summary:
          'Detailed return and refund policy for direct-operated retail stores, including approval workflows.',
        secondarySummary: 'Return and refund policy for retail stores, including approval flows.',
        statusLabel: 'Published',
        statusColor: 'green',
        metaTags: ['ID:100238842', 'Chars 5,000'],
      },
    ],
  },
}
