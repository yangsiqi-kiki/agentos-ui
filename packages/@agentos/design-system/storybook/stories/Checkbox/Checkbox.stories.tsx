import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../../../src/components/atoms/checkbox'
import { CheckboxGroup } from '../../../src/components/atoms/checkbox-group'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'star'],
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Option',
  },
}

export const Checked: Story = {
  args: {
    label: 'Option',
    defaultChecked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    label: 'Option',
    defaultChecked: 'indeterminate',
  },
}

export const Star: Story = {
  args: {
    label: 'Option',
    variant: 'star',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Option',
    defaultChecked: true,
    disabled: true,
  },
}

export const Group: Story = {
  args: {},
  render: () => (
    <CheckboxGroup
      defaultValue={['option-1']}
      options={[
        { value: 'option-1', label: 'Option' },
        { value: 'option-2', label: 'Option' },
        { value: 'option-3', label: 'Option' },
      ]}
    />
  ),
}

export const VerticalGroup: Story = {
  args: {},
  render: () => (
    <CheckboxGroup
      orientation="vertical"
      defaultValue={['option-1']}
      options={[
        { value: 'option-1', label: 'Option' },
        { value: 'option-2', label: 'Option' },
        { value: 'option-3', label: 'Option' },
      ]}
    />
  ),
}
