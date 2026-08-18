import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeOriginalContentView } from '../../../src/components/organisms/knowledge-original-content-view'

const meta = {
  title: 'Organisms/KnowledgeOriginalContentView',
  component: KnowledgeOriginalContentView,
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
} satisfies Meta<typeof KnowledgeOriginalContentView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex h-screen flex-col">
      <KnowledgeOriginalContentView />
    </div>
  ),
}
