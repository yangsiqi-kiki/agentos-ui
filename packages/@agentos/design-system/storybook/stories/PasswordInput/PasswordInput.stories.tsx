import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from '../../../src/components/atoms/password-input'

const meta = {
  title: 'Atoms/PasswordInput',
  component: PasswordInput,
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
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithValue: Story = {
  args: {
    defaultValue: 'secret-password',
  },
}

export const Danger: Story = {
  args: {
    status: 'danger',
    defaultValue: 'wrong-password',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'secret-password',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <PasswordInput key={size} size={size} />
      ))}
    </div>
  ),
}
