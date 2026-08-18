import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '../../../src/components/atoms/progress'

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'circle', 'mini'],
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'not-started'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    percent: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const LineStatuses: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-agentos-gap-gap-xs8">
      <Progress type="line" percent={66} status="default" />
      <Progress type="line" percent={66} status="success" />
      <Progress type="line" percent={66} status="error" />
      <Progress type="line" status="not-started" />
    </div>
  ),
}

export const LineSizes: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-agentos-gap-gap-sm12">
      <Progress type="line" size="lg" percent={66} />
      <Progress type="line" size="default" percent={66} />
      <Progress type="line" size="sm" percent={66} />
    </div>
  ),
}

export const Circle: Story = {
  args: {
    type: 'circle',
    percent: 18,
    status: 'default',
    size: 'default',
    showInfo: true,
  },
}

export const CircleMatrix: Story = {
  args: {
    type: "mini",
    percent: 4,
    status: "success"
  },

  render: () => (
    <div className="flex flex-col gap-agentos-gap-gap16">
      {(['lg', 'default', 'sm'] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-agentos-gap-gap16">
          <Progress type="circle" size={size} percent={30} status="default" />
          <Progress type="circle" size={size} percent={100} status="success" />
          <Progress type="circle" size={size} percent={50} status="error" />
          <Progress type="circle" size={size} status="not-started" />
          <Progress
            type="circle"
            size={size}
            percent={30}
            status="default"
            showInfo={false}
          />
          <Progress
            type="circle"
            size={size}
            percent={100}
            status="success"
            showInfo={false}
          />
          <Progress
            type="circle"
            size={size}
            percent={50}
            status="error"
            showInfo={false}
          />
          <Progress
            type="circle"
            size={size}
            status="not-started"
            showInfo={false}
          />
        </div>
      ))}
    </div>
  )
}

export const Mini: Story = {
  args: {
    type: 'mini',
    percent: 20,
    status: 'default',
    circular: false,
    showInfo: true,
  },
}

export const MiniAll: Story = {
  render: () => (
    <div className="flex flex-col gap-agentos-gap-gap-sm12">
      <div className="flex flex-wrap items-center gap-agentos-gap-gap16">
        <Progress type="mini" percent={20} status="default" />
        <Progress type="mini" percent={0} status="not-started" />
        <Progress type="mini" percent={20} status="warning" />
        <Progress type="mini" percent={20} status="error" />
        <Progress type="mini" percent={20} status="success" />
      </div>
      <div className="flex flex-wrap items-center gap-agentos-gap-gap16">
        <Progress type="mini" percent={20} status="default" circular />
        <Progress type="mini" percent={0} status="not-started" circular />
        <Progress type="mini" percent={20} status="warning" circular />
        <Progress type="mini" percent={20} status="error" circular />
        <Progress type="mini" percent={20} status="success" circular />
      </div>
    </div>
  ),
}
