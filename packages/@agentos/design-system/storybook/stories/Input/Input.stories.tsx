import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../../../src/components/atoms/input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    status: {
      control: 'select',
      options: ['default', 'danger', 'warning', 'success'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Please enter',
  },
}

export const WithPrefixAndSuffix: Story = {
  args: {
    placeholder: 'Please enter',
    prefixText: 'Prefix',
    suffixText: 'Suffix',
    prefixIcon: (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    suffixIcon: (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 3v10M3 8h10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Please enter',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Please enter',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Please enter',
    disabled: true,
  },
}

export const Danger: Story = {
  args: {
    placeholder: 'Please enter',
    status: 'danger',
  },
}

export const Warning: Story = {
  args: {
    placeholder: 'Please enter',
    status: 'warning',
  },
}

export const Success: Story = {
  args: {
    placeholder: 'Please enter',
    status: 'success',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Input key={size} size={size} placeholder="Please enter" />
      ))}
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['default', 'danger', 'warning', 'success'] as const).map((status) => (
        <Input key={status} status={status} placeholder="Please enter" />
      ))}
    </div>
  ),
}
