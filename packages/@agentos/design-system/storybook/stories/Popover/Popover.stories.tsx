import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../../src/components/atoms/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverTitle,
  PopoverTrigger,
  SimplePopover,
  type PopoverPlacement,
} from '../../../src/components/molecules/popover'

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
  title: 'Molecules/Popover',
  component: SimplePopover,
  argTypes: {
    placement: {
      control: 'select',
      options: placements,
    },
  },
} satisfies Meta<typeof SimplePopover>

export default meta
type Story = StoryObj<typeof meta>

const infoDescription =
  'This is a lightweight container for supplementary information.'

const actionDescription =
  'This card supports short helper text and lightweight follow-up actions.'

export const Default: Story = {
  render: (args) => (
    <SimplePopover
      {...args}
      title="Popover title"
      description={infoDescription}
      trigger={
        <Button theme="black" appearance="outline">
          Open Popover
        </Button>
      }
    />
  ),
  args: {
    placement: 'top',
    title: 'Popover title',
    description: infoDescription,
    trigger: <Button theme="black" appearance="outline">Open</Button>,
  },
}

export const WithTitle: Story = {
  render: () => (
    <SimplePopover
      title="Popover title"
      description={infoDescription}
      placement="bottom"
      trigger={
        <Button theme="black" appearance="outline">
          With Title
        </Button>
      }
    />
  ),
  args: {
    trigger: <span />,
  },
}

export const NoTitle: Story = {
  render: () => (
    <SimplePopover
      description={infoDescription}
      placement="bottom"
      trigger={
        <Button theme="black" appearance="outline">
          No Title
        </Button>
      }
    />
  ),
  args: {
    trigger: <span />,
  },
}

export const WithActions: Story = {
  render: () => (
    <SimplePopover
      title="Popover title"
      description={actionDescription}
      placement="bottom"
      actions={
        <>
          <PopoverClose asChild>
            <Button theme="black" appearance="ghost" size="sm">
              Dismiss
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button theme="primary" appearance="ghost" size="sm">
              Primary action
            </Button>
          </PopoverClose>
        </>
      }
      trigger={
        <Button theme="black" appearance="outline">
          With Actions
        </Button>
      }
    />
  ),
  args: {
    trigger: <span />,
  },
}

export const NoTitleWithActions: Story = {
  render: () => (
    <SimplePopover
      description={actionDescription}
      placement="bottom"
      actions={
        <>
          <PopoverClose asChild>
            <Button theme="black" appearance="ghost" size="sm">
              Dismiss
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button theme="primary" appearance="ghost" size="sm">
              Primary action
            </Button>
          </PopoverClose>
        </>
      }
      trigger={
        <Button theme="black" appearance="outline">
          No Title + Actions
        </Button>
      }
    />
  ),
  args: {
    trigger: <span />,
  },
}

export const Compound: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button theme="black" appearance="outline">
          Compound Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent placement="bottom">
        <PopoverTitle>Popover title</PopoverTitle>
        <PopoverDescription>{infoDescription}</PopoverDescription>
        <PopoverFooter>
          <PopoverClose asChild>
            <Button theme="black" appearance="ghost" size="sm">
              Dismiss
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button theme="primary" appearance="ghost" size="sm">
              Primary action
            </Button>
          </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
  args: {
    trigger: <span />,
  },
}

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-3 place-items-center gap-16 p-16">
      {placements.map((placement) => (
        <SimplePopover
          key={placement}
          title="Popover title"
          description={infoDescription}
          placement={placement}
          defaultOpen
          trigger={
            <Button theme="black" appearance="outline" size="sm">
              {placement}
            </Button>
          }
        />
      ))}
    </div>
  ),
  args: {
    trigger: <span />,
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-agentos-gap-gap-sm12 p-8">
      <SimplePopover
        title="Popover title"
        description={infoDescription}
        placement="bottom"
        defaultOpen
        trigger={<span className="inline-block size-4" />}
      />
      <SimplePopover
        title="Popover title"
        description={actionDescription}
        placement="bottom"
        defaultOpen
        actions={
          <>
            <Button theme="black" appearance="ghost" size="sm">
              Dismiss
            </Button>
            <Button theme="primary" appearance="ghost" size="sm">
              Primary action
            </Button>
          </>
        }
        trigger={<span className="inline-block size-4" />}
      />
      <SimplePopover
        description={infoDescription}
        placement="bottom"
        defaultOpen
        trigger={<span className="inline-block size-4" />}
      />
      <SimplePopover
        description={actionDescription}
        placement="bottom"
        defaultOpen
        actions={
          <>
            <Button theme="black" appearance="ghost" size="sm">
              Dismiss
            </Button>
            <Button theme="primary" appearance="ghost" size="sm">
              Primary action
            </Button>
          </>
        }
        trigger={<span className="inline-block size-4" />}
      />
    </div>
  ),
  args: {
    trigger: <span />,
  },
}
