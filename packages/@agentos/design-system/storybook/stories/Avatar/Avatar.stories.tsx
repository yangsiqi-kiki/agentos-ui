import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../../../src/components/atoms/avatar'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fallback: 'A',
  },
}

export const Square: Story = {
  args: {
    shape: 'square',
    fallback: 'A',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size} fallback="A" />
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  args: {
    src: 'https://picsum.photos/seed/agentos/80',
    alt: 'User avatar',
    fallback: 'A',
  },
}
