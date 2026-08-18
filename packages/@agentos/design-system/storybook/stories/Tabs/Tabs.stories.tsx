import type { Meta, StoryObj } from '@storybook/react'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../../src/components/atoms/button'
import { Tab, Tabs, TabsContent, TabsList } from '../../../src/components/atoms/tabs'

const meta = {
  title: 'Atoms/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'rounded', 'text', 'card', 'card-gutter'],
    },
    size: {
      control: 'select',
      options: ['lg', 'default', 'sm', 'mini'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'tab-1',
    variant: 'line',
    size: 'default',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1">Tab 1</Tab>
        <Tab value="tab-2">Tab</Tab>
        <Tab value="tab-3">Tab</Tab>
      </TabsList>
      <TabsContent value="tab-1">Content for Tab 1</TabsContent>
      <TabsContent value="tab-2">Content for Tab 2</TabsContent>
      <TabsContent value="tab-3">Content for Tab 3</TabsContent>
    </Tabs>
  ),
}

export const WithIconAndCount: Story = {
  args: {
    defaultValue: 'tab-1',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab
          value="tab-1"
          icon={<Settings aria-hidden="true" />}
          count="99"
        >
          Tab 1
        </Tab>
        <Tab value="tab-2" icon={<Settings aria-hidden="true" />} count="12">
          Tab
        </Tab>
        <Tab value="tab-3" icon={<Settings aria-hidden="true" />}>
          Tab
        </Tab>
      </TabsList>
      <TabsContent value="tab-1">Content for Tab 1</TabsContent>
      <TabsContent value="tab-2">Content for Tab 2</TabsContent>
      <TabsContent value="tab-3">Content for Tab 3</TabsContent>
    </Tabs>
  ),
}

export const WithExtra: Story = {
  args: {
    defaultValue: 'tab-1',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList
        extra={
          <Button theme="primary" size="sm">
            Extra
          </Button>
        }
      >
        <Tab value="tab-1">Tab 1</Tab>
        <Tab value="tab-2">Tab</Tab>
        <Tab value="tab-3">Tab</Tab>
      </TabsList>
      <TabsContent value="tab-1">Content for Tab 1</TabsContent>
      <TabsContent value="tab-2">Content for Tab 2</TabsContent>
      <TabsContent value="tab-3">Content for Tab 3</TabsContent>
    </Tabs>
  ),
}

export const Rounded: Story = {
  args: {
    defaultValue: 'tab-1',
    variant: 'rounded',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1" icon={<Settings aria-hidden="true" />}>
          Tab
        </Tab>
        <Tab value="tab-2" icon={<Settings aria-hidden="true" />}>
          Tab
        </Tab>
        <Tab value="tab-3" icon={<Settings aria-hidden="true" />}>
          Tab
        </Tab>
      </TabsList>
      <TabsContent value="tab-1">Rounded style content</TabsContent>
      <TabsContent value="tab-2">Tab 2</TabsContent>
      <TabsContent value="tab-3">Tab 3</TabsContent>
    </Tabs>
  ),
}

export const Text: Story = {
  args: {
    defaultValue: 'tab-1',
    variant: 'text',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1">Tab</Tab>
        <Tab value="tab-2">Tab</Tab>
        <Tab value="tab-3">Tab</Tab>
      </TabsList>
      <TabsContent value="tab-1">Text style content</TabsContent>
      <TabsContent value="tab-2">Tab 2</TabsContent>
      <TabsContent value="tab-3">Tab 3</TabsContent>
    </Tabs>
  ),
}

export const Card: Story = {
  args: {
    defaultValue: 'tab-1',
    variant: 'card',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1">Tab</Tab>
        <Tab value="tab-2">Tab</Tab>
        <Tab value="tab-3" closable>
          Tab
        </Tab>
      </TabsList>
      <TabsContent value="tab-1">Card style content</TabsContent>
      <TabsContent value="tab-2">Tab 2</TabsContent>
      <TabsContent value="tab-3">Tab 3</TabsContent>
    </Tabs>
  ),
}

export const CardGutter: Story = {
  args: {
    defaultValue: 'tab-1',
    variant: 'card-gutter',
    size: 'default',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1">Tab 1</Tab>
        <Tab value="tab-2">Tab 2</Tab>
        <Tab value="tab-3">Tab 3</Tab>
      </TabsList>
      <TabsContent value="tab-1">Card gutter content</TabsContent>
      <TabsContent value="tab-2">Tab 2</TabsContent>
      <TabsContent value="tab-3">Tab 3</TabsContent>
    </Tabs>
  ),
}

export const CardGutterClosable: Story = {
  args: {
    defaultValue: 'tab-1',
    variant: 'card-gutter',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1" closable>
          Tab 1
        </Tab>
        <Tab value="tab-2" closable>
          Tab 2
        </Tab>
        <Tab value="tab-3" closable>
          Tab 3
        </Tab>
      </TabsList>
      <TabsContent value="tab-1">Closable card gutter</TabsContent>
      <TabsContent value="tab-2">Tab 2</TabsContent>
      <TabsContent value="tab-3">Tab 3</TabsContent>
    </Tabs>
  ),
}

export const CardGutterSizes: Story = {
  args: {
    defaultValue: 'tab-1',
    variant: 'card-gutter',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['lg', 'default', 'sm', 'mini'] as const).map((size) => (
        <Tabs key={size} defaultValue="tab-1" variant="card-gutter" size={size}>
          <TabsList>
            <Tab value="tab-1">{size}</Tab>
            <Tab value="tab-2">Tab 2</Tab>
            <Tab value="tab-3" closable>
              Tab 3
            </Tab>
          </TabsList>
        </Tabs>
      ))}
    </div>
  ),
}

export const CardGutterCompare: Story = {
  args: {
    defaultValue: 'compare',
    variant: 'card-gutter',
    size: 'default',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="compare" compareLabel="Tab" closable>
          Tab
        </Tab>
        <Tab value="tab-2" compareLabel="Tab">
          Tab
        </Tab>
        <Tab value="tab-3" compareLabel="Tab" disabled>
          Tab
        </Tab>
      </TabsList>
      <TabsContent value="compare">Compare tab content</TabsContent>
      <TabsContent value="tab-2">Tab 2</TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  args: {
    defaultValue: 'tab-1',
    orientation: 'vertical',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1" icon={<Settings aria-hidden="true" />}>
          Tab
        </Tab>
        <Tab value="tab-2" icon={<Settings aria-hidden="true" />}>
          Tab
        </Tab>
        <Tab value="tab-3" icon={<Settings aria-hidden="true" />}>
          Tab
        </Tab>
      </TabsList>
      <TabsContent value="tab-1">Vertical content 1</TabsContent>
      <TabsContent value="tab-2">Vertical content 2</TabsContent>
      <TabsContent value="tab-3">Vertical content 3</TabsContent>
    </Tabs>
  ),
}

export const AllSizes: Story = {
  args: {
    defaultValue: 'tab-1',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['lg', 'default', 'sm', 'mini'] as const).map((size) => (
        <Tabs key={size} defaultValue="tab-1" size={size}>
          <TabsList>
            <Tab value="tab-1">{size}</Tab>
            <Tab value="tab-2">Tab</Tab>
            <Tab value="tab-3">Tab</Tab>
          </TabsList>
        </Tabs>
      ))}
    </div>
  ),
}

export const Controlled: Story = {
  args: {
    defaultValue: 'tab-1',
  },
  render: function ControlledTabs() {
    const [value, setValue] = useState('tab-1')
    return (
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <Tab value="tab-1">Tab 1</Tab>
          <Tab value="tab-2">Tab 2</Tab>
          <Tab value="tab-3">Tab 3</Tab>
        </TabsList>
        <TabsContent value="tab-1">Active: {value}</TabsContent>
        <TabsContent value="tab-2">Active: {value}</TabsContent>
        <TabsContent value="tab-3">Active: {value}</TabsContent>
      </Tabs>
    )
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'tab-1',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="tab-1">Tab 1</Tab>
        <Tab value="tab-2" disabled>
          Disabled
        </Tab>
        <Tab value="tab-3">Tab</Tab>
      </TabsList>
      <TabsContent value="tab-1">Enabled content</TabsContent>
      <TabsContent value="tab-3">Tab 3</TabsContent>
    </Tabs>
  ),
}
