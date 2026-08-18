import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeRetrievalView } from '../../../src/components/organisms/knowledge-retrieval-view'

const meta = {
  title: 'Organisms/KnowledgeRetrievalView',
  component: KnowledgeRetrievalView,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen flex-col">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    state: {
      control: 'select',
      options: ['empty', 'results', 'detail'],
    },
  },
} satisfies Meta<typeof KnowledgeRetrievalView>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    state: 'empty',
  },
}

export const Results: Story = {
  args: {
    state: 'results',
    defaultQuery: 'BMW',
  },
}

export const Detail: Story = {
  args: {
    state: 'detail',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex h-screen flex-col">
      <KnowledgeRetrievalView state="empty" />
    </div>
  ),
}
