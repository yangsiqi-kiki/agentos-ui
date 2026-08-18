import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from '../../../src/components/atoms/radio'
import { Title } from '../../../src/components/atoms/title'

const meta = {
  title: 'Atoms/Title',
  component: Title,
  argTypes: {
    level: {
      control: 'select',
      options: ['s2', 's1', 'h5', 'h4', 'h3'],
    },
    align: {
      control: 'select',
      options: ['left', 'center'],
    },
  },
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    level: 'h5',
  },
}

export const WithAction: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    level: 'h5',
    showInfoIcon: true,
    onActionClick: () => undefined,
    actionLabel: 'Reset',
  },
}

export const WithLeading: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    level: 's2',
    showInfoIcon: true,
    leading: <Radio name="title-leading" value="1" />,
    onActionClick: () => undefined,
  },
}

export const Centered: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    level: 'h3',
    align: 'center',
    showInfoIcon: true,
  },
}

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['s2', 's1', 'h5', 'h4', 'h3'] as const).map((level) => (
        <Title
          key={level}
          level={level}
          title={`Title ${level.toUpperCase()}`}
          description="Description"
        />
      ))}
    </div>
  ),
}
