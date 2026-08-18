import type { Meta, StoryObj } from '@storybook/react'
import {
  Radio,
  RadioButton,
  RadioGroup,
} from '../../../src/components/atoms/radio'

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Option',
    name: 'demo',
    value: 'a',
  },
}

export const Checked: Story = {
  args: {
    label: 'Option',
    name: 'demo-checked',
    value: 'a',
    defaultChecked: true,
  },
}

export const DisabledUnchecked: Story = {
  args: {
    label: 'Option',
    name: 'demo-disabled',
    value: 'a',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Option',
    name: 'demo-disabled-checked',
    value: 'a',
    defaultChecked: true,
    disabled: true,
  },
}

export const GroupHorizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="1" name="group-h">
      <Radio value="1" label="Option" />
      <Radio value="2" label="Option" />
      <Radio value="3" label="Option" />
    </RadioGroup>
  ),
}

export const GroupVertical: Story = {
  render: () => (
    <RadioGroup defaultValue="1" name="group-v" orientation="vertical">
      <Radio value="1" label="Option" />
      <Radio value="2" label="Option" />
      <Radio value="3" label="Option" />
    </RadioGroup>
  ),
}

export const ButtonGroupLarge: Story = {
  render: () => (
    <RadioGroup variant="button" size="lg" defaultValue="beijing" name="btn-lg">
      <RadioButton value="beijing" label="Beijing" />
      <RadioButton value="shanghai" label="Shanghai" />
      <RadioButton value="guangzhou" label="Guangzhou" />
      <RadioButton value="shenzhen" label="Shenzhen" />
    </RadioGroup>
  ),
}

export const ButtonGroupWithSeparator: Story = {
  render: () => (
    <RadioGroup
      variant="button"
      size="lg"
      defaultValue="beijing"
      name="btn-with-separator"
      showSeparator
    >
      <RadioButton value="beijing" label="Beijing" />
      <RadioButton value="shanghai" label="Shanghai" />
      <RadioButton value="guangzhou" label="Guangzhou" />
      <RadioButton value="shenzhen" label="Shenzhen" />
    </RadioGroup>
  ),
}

export const ButtonGroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-agentos-gap-gap-xs8">
      {(['lg', 'md', 'sm', 'mini'] as const).map((size) => (
        <RadioGroup
          key={size}
          variant="button"
          size={size}
          defaultValue="beijing"
          name={`btn-${size}`}
        >
          <RadioButton value="beijing" label="Beijing" />
          <RadioButton value="shanghai" label="Shanghai" />
          <RadioButton value="guangzhou" label="Guangzhou" />
        </RadioGroup>
      ))}
    </div>
  ),
}

export const ButtonDisabled: Story = {
  render: () => (
    <RadioGroup
      variant="button"
      size="lg"
      defaultValue="beijing"
      disabled
      name="btn-disabled"
    >
      <RadioButton value="beijing" label="Beijing" />
      <RadioButton value="shanghai" label="Shanghai" />
      <RadioButton value="guangzhou" label="Guangzhou" />
    </RadioGroup>
  ),
}
