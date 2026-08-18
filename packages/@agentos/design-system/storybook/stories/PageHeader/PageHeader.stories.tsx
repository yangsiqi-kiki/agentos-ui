import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from '../../../src/components/organisms/page-header'

const meta = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-agentos-neutral-bg-color-bg-layout p-agentos-padding-padding16">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'single-select'],
    },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const SingleSelect: Story = {
  args: {
    variant: 'single-select',
  },
}

export const Minimal: Story = {
  args: {
    title: 'Knowledge base',
    showBreadcrumbs: false,
    showTags: false,
    showDescription: false,
  },
}
