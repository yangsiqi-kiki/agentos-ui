import type { Meta, StoryObj } from '@storybook/react'
import { Info } from 'lucide-react'
import { Input } from '../../../src/components/atoms/input'
import { FormItem } from '../../../src/components/molecules/form-item'

const meta = {
  title: 'Molecules/FormItem',
  component: FormItem,
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormItem>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    label: 'Label',
    children: <Input placeholder="Please enter" />,
  },
}

export const Vertical: Story = {
  args: {
    layout: 'vertical',
    label: 'Label',
    children: <Input placeholder="Please enter" />,
  },
}

export const RequiredWithHelp: Story = {
  args: {
    label: 'Project name',
    labelWidth: 88,
    required: true,
    showColon: true,
    helpText: 'Use a short, recognizable name.',
    children: (
      <Input
        id="project-name"
        placeholder="Please enter"
        required
        aria-describedby="project-name-help"
      />
    ),
    htmlFor: 'project-name',
    helpTextId: 'project-name-help',
  },
}

export const WithTooltip: Story = {
  args: {
    layout: 'vertical',
    label: 'API endpoint',
    tooltip: (
      <button
        type="button"
        aria-label="About API endpoint"
        title="The endpoint used for requests"
      >
        <Info aria-hidden="true" />
      </button>
    ),
    children: <Input placeholder="https://example.com/api" />,
  },
}
