import type { Meta, StoryObj } from '@storybook/react'
import { IconSunFilled } from '@tabler/icons-react'
import { Check, X } from 'lucide-react'
import { Switch } from '../../../src/components/atoms/switch'

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
    shape: {
      control: 'select',
      options: ['round', 'rectangle', 'linear'],
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Unchecked: Story = {
  args: {
    defaultChecked: false,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    defaultChecked: true,
  },
}

export const Rectangle: Story = {
  args: {
    shape: 'rectangle',
    defaultChecked: true,
  },
}

export const Linear: Story = {
  args: {
    shape: 'linear',
    defaultChecked: true,
  },
}

export const WithThumbIcon: Story = {
  args: {
    defaultChecked: true,
    thumbIcon: <IconSunFilled aria-hidden="true" />,
  },
}

export const WithTrackIcon: Story = {
  args: {
    defaultChecked: true,
    checkedLabel: <Check aria-hidden="true" />,
    uncheckedLabel: <X aria-hidden="true" />,
  },
}

export const WithTrackText: Story = {
  args: {
    defaultChecked: true,
    checkedLabel: 'ON',
    uncheckedLabel: 'OFF',
  },
}

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
}

export const DisabledUnchecked: Story = {
  args: {
    defaultChecked: false,
    disabled: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['round', 'rectangle'] as const).map((shape) => (
        <div key={shape} className="flex flex-col gap-3">
          <span className="text-agentos-sm text-agentos-neutral-text-color-text-secondary">
            {shape}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Switch shape={shape} defaultChecked />
            <Switch shape={shape} defaultChecked={false} />
            <Switch shape={shape} defaultChecked disabled />
            <Switch shape={shape} defaultChecked={false} disabled />
            <Switch
              shape={shape}
              defaultChecked
              checkedLabel={<Check aria-hidden="true" />}
              uncheckedLabel={<X aria-hidden="true" />}
            />
            <Switch
              shape={shape}
              defaultChecked={false}
              checkedLabel={<Check aria-hidden="true" />}
              uncheckedLabel={<X aria-hidden="true" />}
            />
            <Switch
              shape={shape}
              defaultChecked
              checkedLabel="ON"
              uncheckedLabel="OFF"
            />
            <Switch
              shape={shape}
              defaultChecked={false}
              checkedLabel="ON"
              uncheckedLabel="OFF"
            />
            <Switch
              shape={shape}
              defaultChecked
              thumbIcon={<IconSunFilled aria-hidden="true" />}
            />
            <Switch
              shape={shape}
              defaultChecked={false}
              thumbIcon={<IconSunFilled aria-hidden="true" />}
            />
            <Switch shape={shape} size="sm" defaultChecked />
            <Switch shape={shape} size="sm" defaultChecked={false} />
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-3">
        <span className="text-agentos-sm text-agentos-neutral-text-color-text-secondary">
          linear
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Switch shape="linear" defaultChecked />
          <Switch shape="linear" defaultChecked={false} />
          <Switch shape="linear" defaultChecked disabled />
          <Switch shape="linear" defaultChecked={false} disabled />
          <Switch shape="linear" size="sm" defaultChecked />
          <Switch shape="linear" size="sm" defaultChecked={false} />
        </div>
      </div>
    </div>
  ),
}
