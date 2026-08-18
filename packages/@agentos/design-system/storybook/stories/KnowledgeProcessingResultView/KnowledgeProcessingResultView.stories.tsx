import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeProcessingResultView } from '../../../src/components/organisms/knowledge-processing-result-view'

const meta = {
  title: 'Organisms/KnowledgeProcessingResultView',
  component: KnowledgeProcessingResultView,
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
    mode: {
      control: 'select',
      options: ['semantic', 'structure'],
    },
  },
} satisfies Meta<typeof KnowledgeProcessingResultView>

export default meta
type Story = StoryObj<typeof meta>

export const Semantic: Story = {
  args: {
    defaultMode: 'semantic',
  },
}

export const Structure: Story = {
  args: {
    defaultMode: 'structure',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex h-screen flex-col gap-agentos-gap-gap16">
      <KnowledgeProcessingResultView className="min-h-0 flex-1" defaultMode="semantic" />
    </div>
  ),
}
