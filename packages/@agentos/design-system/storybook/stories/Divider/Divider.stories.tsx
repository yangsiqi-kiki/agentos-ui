import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '../../../src/components/atoms/divider'

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <div className="w-[252px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    children: 'Text',
  },
}

export const LabelLeft: Story = {
  args: {
    children: 'Text',
    labelAlign: 'left',
  },
}

export const LabelRight: Story = {
  args: {
    children: 'Text',
    labelAlign: 'right',
  },
}

export const Dashed: Story = {
  args: {
    dashed: true,
    children: 'Text',
  },
}

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-12 items-center gap-4">
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
  args: {
    orientation: 'vertical',
  },
}
