import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from '../../../src/components/atoms/tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'blue',
        'green',
        'purple',
        'dusk',
        'autumn-red',
        'romantic-red',
        'info',
        'success',
        'warning',
        'danger',
      ],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'rectangle'],
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'default',
  },
}

export const Bordered: Story = {
  args: {
    children: 'default',
    bordered: true,
  },
}

export const Closable: Story = {
  args: {
    children: 'default',
    closable: true,
  },
}

export const WithSuffix: Story = {
  args: {
    children: 'very-long-document-name.md',
    color: 'blue',
    bordered: true,
    shape: 'rectangle',
    suffix: 'L12–30',
  },
}

export const SemanticInfo: Story = {
  args: {
    children: 'Info',
    color: 'info',
    shape: 'rectangle',
    showSemanticIcon: true,
  },
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          'default',
          'green',
          'blue',
          'purple',
          'dusk',
          'autumn-red',
          'romantic-red',
        ] as const
      ).map((color) => (
        <Tag key={color} color={color}>
          {color}
        </Tag>
      ))}
    </div>
  ),
}

export const SemanticVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['info', 'success', 'warning', 'danger'] as const).map((color) => (
        <Tag
          key={color}
          color={color}
          shape="rectangle"
          showSemanticIcon
        >
          {color}
        </Tag>
      ))}
    </div>
  ),
}
