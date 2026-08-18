import type { Meta, StoryObj } from '@storybook/react'
import { Columns2, Ellipsis, Maximize } from 'lucide-react'
import { Button } from '../../../src/components/atoms/button'
import { WorkspaceTabsBar } from '../../../src/components/organisms/workspace-tabs-bar'

const meta = {
  title: 'Organisms/WorkspaceTabsBar',
  component: WorkspaceTabsBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WorkspaceTabsBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomTabs: Story = {
  args: {
    defaultValue: 'overview',
    tabs: [
      { value: 'overview', label: 'Overview', closable: true },
      { value: 'activity', label: 'Activity', closable: true },
      { value: 'settings', label: 'Settings', closable: true },
    ],
  },
}

export const WithoutAddButton: Story = {
  args: {
    showAddButton: false,
  },
}

export const Dimmed: Story = {
  args: {
    dimmed: true,
    defaultValue: 'overview',
    tabs: [
      { value: 'overview', label: 'Overview', closable: true },
      { value: 'activity', label: 'Activity', closable: true },
      { value: 'settings', label: 'Settings', closable: true },
    ],
  },
}

export const WithRightActions: Story = {
  args: {
    showAddButton: false,
    rightActions: (
      <div className="flex shrink-0 items-center gap-agentos-gap-gap-xs8">
        <Button
          type="button"
          theme="black"
          appearance="ghost"
          size="default"
          leadingIcon={<Columns2 aria-hidden="true" />}
          aria-label="Column layout"
          disabled
        />
        <Button
          type="button"
          theme="black"
          appearance="ghost"
          size="default"
          leadingIcon={<Ellipsis aria-hidden="true" />}
          aria-label="More tab actions"
        />
        <Button
          type="button"
          theme="black"
          appearance="ghost"
          size="default"
          leadingIcon={<Maximize aria-hidden="true" />}
          aria-label="Enter full screen"
        />
      </div>
    ),
  },
}
