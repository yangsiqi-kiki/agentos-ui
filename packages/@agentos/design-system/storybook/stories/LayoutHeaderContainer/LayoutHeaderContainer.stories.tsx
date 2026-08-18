import type { Meta, StoryObj } from '@storybook/react'
import { LayoutHeaderContainer } from '../../../src/components/layouts/layout-header-container'

const meta = {
  title: 'Layouts/LayoutHeaderContainer',
  component: LayoutHeaderContainer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LayoutHeaderContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: (
      <span className="text-agentos-md font-agentos-semibold">Header</span>
    ),
    children: (
      <div className="flex flex-1 items-center justify-center text-agentos-md text-agentos-neutral-text-color-text-secondary">
        Main content
      </div>
    ),
  },
}

export const WithSidebar: Story = {
  args: {
    header: (
      <div className="flex w-full items-center justify-between">
        <span className="text-agentos-md font-agentos-semibold">AgentOS</span>
        <span className="text-agentos-sm text-agentos-neutral-text-color-text-secondary">
          Actions
        </span>
      </div>
    ),
    children: (
      <>
        <aside className="flex w-[240px] shrink-0 items-center justify-center self-stretch bg-agentos-neutral-bg-color-bg-elevated text-agentos-md">
          Sidebar
        </aside>
        <main className="flex min-w-0 flex-1 items-center justify-center border-l border-agentos-neutral-border-color-split text-agentos-md">
          Main panel
        </main>
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-agentos-gap-gap16">
      <LayoutHeaderContainer
        className="min-h-[200px]"
        header={
          <span className="text-agentos-md font-agentos-semibold">Header only</span>
        }
      >
        <div className="flex flex-1 items-center justify-center text-agentos-sm text-agentos-neutral-text-color-text-secondary">
          Empty main
        </div>
      </LayoutHeaderContainer>
      <LayoutHeaderContainer
        className="min-h-[200px]"
        header={
          <div className="flex w-full items-center justify-between">
            <span className="text-agentos-md font-agentos-semibold">Split layout</span>
            <span className="text-agentos-sm text-agentos-neutral-text-color-text-secondary">
              Right
            </span>
          </div>
        }
      >
        <aside className="flex w-[160px] shrink-0 items-center justify-center self-stretch bg-agentos-neutral-bg-color-bg-elevated text-agentos-sm">
          Side
        </aside>
        <main className="flex min-w-0 flex-1 items-center justify-center border-l border-agentos-neutral-border-color-split text-agentos-sm">
          Content
        </main>
      </LayoutHeaderContainer>
    </div>
  ),
}
