import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from '../../../src/components/atoms/breadcrumb'

const meta = {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separator: {
      control: 'select',
      options: ['slash', 'dot', 'arrow'],
    },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Channel', href: '#' },
      { label: 'News' },
    ],
  },
}

export const Collapsed: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Workspace', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Channel', href: '#' },
      { label: 'News' },
    ],
  },
}

export const AllSeparators: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-agentos-gap-gap16">
      {(['slash', 'dot', 'arrow'] as const).map((separator) => (
        <Breadcrumb
          key={separator}
          separator={separator}
          items={[
            { label: 'Home', href: '#' },
            { label: 'Channel', href: '#' },
            { label: 'News' },
          ]}
        />
      ))}
    </div>
  ),
}
