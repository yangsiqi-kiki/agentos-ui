import type { Meta, StoryObj } from '@storybook/react'
import { InputTag } from '../../../src/components/atoms/input-tag'

const meta = {
  title: 'Atoms/InputTag',
  component: InputTag,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof InputTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-60',
  },
}

export const Filled: Story = {
  args: {
    className: 'w-60',
    defaultTags: [
      { value: 'beijing', label: 'Beijing' },
      { value: 'shanghai', label: 'Shanghai' },
    ],
  },
}

export const CustomTags: Story = {
  args: {
    className: 'w-60',
    defaultTags: [
      { value: 'owner', label: 'Owner', color: 'blue' },
      { value: 'reviewer', label: 'Reviewer', color: 'romantic-red' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    className: 'w-60',
    disabled: true,
    defaultTags: [
      { value: 'beijing', label: 'Beijing' },
      { value: 'shanghai', label: 'Shanghai' },
    ],
  },
}
