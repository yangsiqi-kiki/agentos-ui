import type { Meta, StoryObj } from '@storybook/react'
import { InputNumber } from '../../../src/components/atoms/input-number'

const meta = {
  title: 'Atoms/InputNumber',
  component: InputNumber,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof InputNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
}

export const ButtonMode: Story = {
  args: {
    buttonMode: true,
    defaultValue: 50,
  },
}

export const WithoutAffixes: Story = {
  args: {
    defaultValue: 50,
    prefix: null,
    suffix: null,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
  },
}
