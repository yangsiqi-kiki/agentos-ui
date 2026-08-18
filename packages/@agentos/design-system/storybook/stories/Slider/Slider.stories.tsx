import type { Meta, StoryObj } from '@storybook/react'
import { Volume2, VolumeX } from 'lucide-react'
import { Slider } from '../../../src/components/atoms/slider'

const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 32,
  },
}

export const WithoutInput: Story = {
  args: {
    defaultValue: 50,
    showInput: false,
  },
}

export const WithIcons: Story = {
  args: {
    defaultValue: 40,
    leadingIcon: <VolumeX aria-hidden="true" />,
    trailingIcon: <Volume2 aria-hidden="true" />,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 32,
    disabled: true,
  },
}
