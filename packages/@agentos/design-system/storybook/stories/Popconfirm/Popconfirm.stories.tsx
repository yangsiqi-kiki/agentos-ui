import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../../src/components/atoms/button'
import {
  Popconfirm,
  type PopconfirmProps,
} from '../../../src/components/molecules/popconfirm'
import type { PopoverPlacement } from '../../../src/components/molecules/popover'

const placements: PopoverPlacement[] = [
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
]

const meta = {
  title: 'Molecules/Popconfirm',
  component: Popconfirm,
  argTypes: {
    placement: {
      control: 'select',
      options: placements,
    },
  },
} satisfies Meta<typeof Popconfirm>

export default meta
type Story = StoryObj<typeof meta>

function PopconfirmDemo(props: Omit<PopconfirmProps, 'children'>) {
  return (
    <Popconfirm {...props}>
      <Button theme="danger" appearance="outline">
        Delete
      </Button>
    </Popconfirm>
  )
}

export const Default: Story = {
  render: (args) => <PopconfirmDemo {...args} />,
  args: {
    title: 'Confirm',
    description: 'Are you sure you want to delete?',
    placement: 'top',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    children: <span />,
  },
}

export const Bottom: Story = {
  render: () => (
    <PopconfirmDemo
      title="Confirm"
      description="Are you sure you want to delete?"
      placement="bottom"
    />
  ),
  args: {
    children: <span />,
  },
}

export const WithoutIcon: Story = {
  render: () => (
    <PopconfirmDemo
      title="Confirm"
      description="Are you sure you want to delete?"
      showIcon={false}
      placement="bottom"
    />
  ),
  args: {
    children: <span />,
  },
}

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-3 place-items-center gap-20 p-20">
      {placements.map((placement) => (
        <Popconfirm
          key={placement}
          title="Confirm"
          description="Are you sure you want to delete?"
          placement={placement}
          defaultOpen
        >
          <Button theme="black" appearance="outline" size="sm">
            {placement}
          </Button>
        </Popconfirm>
      ))}
    </div>
  ),
  args: {
    children: <span />,
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-agentos-gap-gap16 p-8">
      <Popconfirm
        title="Confirm"
        description="Are you sure you want to delete?"
        placement="bottom"
        defaultOpen
      >
        <span className="inline-block size-4" />
      </Popconfirm>
      <Popconfirm
        title="Confirm"
        description="Are you sure you want to delete?"
        showIcon={false}
        placement="bottom"
        defaultOpen
      >
        <span className="inline-block size-4" />
      </Popconfirm>
    </div>
  ),
  args: {
    children: <span />,
  },
}
