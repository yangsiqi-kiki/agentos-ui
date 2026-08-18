import type { Meta, StoryObj } from '@storybook/react'
import { KnowledgeBaseLayout } from '../../../src/components/layouts/knowledge-base-layout'

const meta = {
  title: 'Layouts/KnowledgeBaseLayout',
  component: KnowledgeBaseLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KnowledgeBaseLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-1 items-center justify-center text-agentos-md text-agentos-neutral-text-color-text-secondary">
        Content below breadcrumb
      </div>
    ),
  },
}

export const WithoutSidebar: Story = {
  args: {
    showSidebar: false,
    children: (
      <div className="flex flex-1 items-center justify-center text-agentos-md text-agentos-neutral-text-color-text-secondary">
        Full-width content
      </div>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-agentos-gap-gap16">
      <KnowledgeBaseLayout className="!h-[360px]">
        <div className="flex flex-1 items-center justify-center text-agentos-sm">
          Default
        </div>
      </KnowledgeBaseLayout>
      <KnowledgeBaseLayout className="!h-[360px]" showSidebar={false}>
        <div className="flex flex-1 items-center justify-center text-agentos-sm">
          No sidebar
        </div>
      </KnowledgeBaseLayout>
    </div>
  ),
}
