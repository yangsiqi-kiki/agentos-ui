import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeBaseDetailShell } from '../../../src/components/organisms/knowledge-base-detail-shell'

const meta = {
  title: 'Organisms/KnowledgeBaseDetailShell',
  component: KnowledgeBaseDetailShell,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KnowledgeBaseDetailShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultTab: 'original',
    children: (
      <div className="flex flex-1 items-center justify-center p-agentos-padding-padding16 text-agentos-md text-agentos-neutral-text-color-text-secondary">
        Tab body
      </div>
    ),
  },
}

export const RetrievalTab: Story = {
  args: {
    defaultTab: 'retrieval',
    children: (
      <div className="flex flex-1 items-center justify-center p-agentos-padding-padding16 text-agentos-md text-agentos-neutral-text-color-text-secondary">
        Retrieval body
      </div>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex h-[480px] flex-col gap-agentos-gap-gap16">
      <KnowledgeBaseDetailShell defaultTab="original">
        <div className="p-agentos-padding-padding16 text-agentos-sm">Original</div>
      </KnowledgeBaseDetailShell>
      <KnowledgeBaseDetailShell defaultTab="processed">
        <div className="p-agentos-padding-padding16 text-agentos-sm">Processed</div>
      </KnowledgeBaseDetailShell>
    </div>
  ),
}
