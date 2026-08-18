import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '../../../src/components/molecules/pagination'

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'large', 'small', 'mini'],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-max p-agentos-padding-padding16">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    total: 200,
    defaultCurrentPage: 1,
    defaultPageSize: 10,
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col items-start gap-agentos-gap-gap16">
      {(['medium', 'large', 'small', 'mini'] as const).map((size) => (
        <Pagination
          key={size}
          size={size}
          total={200}
          defaultPageSize={10}
        />
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    total: 200,
    disabled: true,
  },
}

export const Simple: Story = {
  args: {
    total: 50,
    defaultCurrentPage: 1,
    defaultPageSize: 10,
    simple: true,
  },
}

export const NavigationOnly: Story = {
  args: {
    total: 200,
    defaultCurrentPage: 10,
    showTotalCount: false,
    showPageSizeSelector: false,
    showQuickJumper: false,
  },
}
