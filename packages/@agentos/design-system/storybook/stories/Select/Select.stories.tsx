import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../../../src/components/atoms/select'

const options = [
  { value: 'design', label: 'AgentOS Design' },
  { value: 'runtime', label: 'AgentOS Runtime' },
  { value: 'studio', label: 'AgentOS Studio' },
]

const meta = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[220px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options,
    placeholder: 'Please select',
  },
}

export const Filled: Story = {
  args: {
    options,
    defaultValue: 'design',
  },
}

export const Multiple: Story = {
  args: {
    options,
    multiple: true,
    defaultValue: ['design', 'runtime'],
  },
}

export const Disabled: Story = {
  args: {
    options,
    defaultValue: 'design',
    disabled: true,
  },
}

export const AllSizes: Story = {
  args: {
    options,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Select key={size} size={size} options={options} placeholder="Please select" />
      ))}
    </div>
  ),
}
