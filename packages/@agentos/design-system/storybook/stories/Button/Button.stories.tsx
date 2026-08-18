import type { Meta, StoryObj } from '@storybook/react'
import { Star } from 'lucide-react'
import { Button } from '../../../src/components/atoms/button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'danger'],
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'rounded'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const PrimarySolid: Story = {
  args: {
    children: 'Button',
    theme: 'primary',
    appearance: 'solid',
    size: 'default',
    shape: 'rectangle',
  },
}

export const PrimaryOutline: Story = {
  args: {
    children: 'Button',
    theme: 'primary',
    appearance: 'outline',
  },
}

export const PrimaryGhost: Story = {
  args: {
    children: 'Button',
    theme: 'primary',
    appearance: 'ghost',
  },
}

export const SecondarySolid: Story = {
  args: {
    children: 'Button',
    theme: 'secondary',
    appearance: 'solid',
  },
}

export const BlackSolid: Story = {
  args: {
    children: 'Button',
    theme: 'black',
    appearance: 'solid',
  },
}

export const BlackOutline: Story = {
  args: {
    children: 'Button',
    theme: 'black',
    appearance: 'outline',
  },
}

export const DangerSolid: Story = {
  args: {
    children: 'Button',
    theme: 'danger',
    appearance: 'solid',
  },
}

export const DangerOutline: Story = {
  args: {
    children: 'Button',
    theme: 'danger',
    appearance: 'outline',
  },
}

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="sm" leadingIcon={<Star aria-hidden="true" />}>
        Small 13
      </Button>
      <Button size="default" leadingIcon={<Star aria-hidden="true" />}>
        Default 13
      </Button>
      <Button size="lg" leadingIcon={<Star aria-hidden="true" />}>
        Large 16
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
}

export const WithLeadingIcon: Story = {
  args: {
    children: 'Button',
    leadingIcon: <Star aria-hidden="true" />,
  },
}

export const Rounded: Story = {
  args: {
    children: 'Button',
    theme: 'primary',
    appearance: 'solid',
    shape: 'rounded',
    leadingIcon: <Star aria-hidden="true" />,
  },
}

export const AllThemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'black', 'danger'] as const).map((theme) => (
        <div key={theme} className="flex flex-wrap items-center gap-2">
          <span className="w-20 text-agentos-sm text-agentos-neutral-text-color-text-secondary">
            {theme}
          </span>
          <Button theme={theme} appearance="solid">
            Solid
          </Button>
          {theme !== 'secondary' && (
            <>
              <Button theme={theme} appearance="outline">
                Outline
              </Button>
              <Button theme={theme} appearance="ghost">
                Ghost
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  ),
}

export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['rectangle', 'rounded'] as const).map((shape) => (
        <div key={shape} className="flex flex-col gap-3">
          <span className="text-agentos-sm font-agentos-semibold text-agentos-neutral-text-color-text">
            shape={shape}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Button shape={shape} size="sm" leadingIcon={<Star aria-hidden="true" />}>
              Small
            </Button>
            <Button shape={shape} size="default" leadingIcon={<Star aria-hidden="true" />}>
              Default
            </Button>
            <Button shape={shape} size="lg" leadingIcon={<Star aria-hidden="true" />}>
              Large
            </Button>
            <Button
              shape={shape}
              theme="primary"
              appearance="outline"
              leadingIcon={<Star aria-hidden="true" />}
            >
              Outline
            </Button>
            <Button
              shape={shape}
              theme="black"
              appearance="solid"
              leadingIcon={<Star aria-hidden="true" />}
            >
              Black
            </Button>
            <Button
              shape={shape}
              theme="danger"
              appearance="solid"
              leadingIcon={<Star aria-hidden="true" />}
            >
              Danger
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
}
