import type { Meta, StoryObj } from '@storybook/react'
import { File, Folder } from 'lucide-react'
import { useState } from 'react'
import {
  Tree,
  type TreeNodeData,
} from '../../../src/components/molecules/tree'

const meta = {
  title: 'Molecules/Tree',
  component: Tree,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    switcher: {
      control: 'select',
      options: ['caret', 'chevron', 'button'],
    },
  },
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

const basicData: TreeNodeData[] = [
  {
    key: '0',
    title: 'Branch',
    children: [
      { key: '0-0', title: 'Branch' },
      { key: '0-1', title: 'Branch' },
    ],
  },
  {
    key: '1',
    title: 'Branch',
    children: [{ key: '1-0', title: 'Branch' }],
  },
]

const iconData: TreeNodeData[] = [
  {
    key: '0',
    title: 'Branch',
    icon: <Folder aria-hidden="true" />,
    children: [
      {
        key: '0-0',
        title: 'Branch',
        icon: <File aria-hidden="true" />,
      },
      {
        key: '0-1',
        title: 'Branch',
        icon: <File aria-hidden="true" />,
      },
      {
        key: '0-2',
        title: 'Branch',
        icon: <File aria-hidden="true" />,
      },
      {
        key: '0-3',
        title: 'Branch',
        icon: <File aria-hidden="true" />,
      },
      {
        key: '0-4',
        title: 'Branch',
        icon: <File aria-hidden="true" />,
      },
    ],
  },
]

const nestedData: TreeNodeData[] = [
  {
    key: 'docs',
    title: 'Documents',
    icon: <Folder aria-hidden="true" />,
    children: [
      {
        key: 'docs-design',
        title: 'Design',
        icon: <Folder aria-hidden="true" />,
        children: [
          {
            key: 'docs-design-spec',
            title: 'Spec.pdf',
            icon: <File aria-hidden="true" />,
            isLeaf: true,
          },
          {
            key: 'docs-design-tokens',
            title: 'Tokens.md',
            icon: <File aria-hidden="true" />,
            isLeaf: true,
          },
        ],
      },
      {
        key: 'docs-readme',
        title: 'README.md',
        icon: <File aria-hidden="true" />,
        isLeaf: true,
      },
    ],
  },
  {
    key: 'src',
    title: 'src',
    icon: <Folder aria-hidden="true" />,
    children: [
      {
        key: 'src-index',
        title: 'index.ts',
        icon: <File aria-hidden="true" />,
        isLeaf: true,
      },
    ],
  },
  {
    key: 'disabled',
    title: 'Disabled branch',
    disabled: true,
    children: [{ key: 'disabled-child', title: 'Child' }],
  },
]

export const Default: Story = {
  args: {
    treeData: basicData,
    showLine: true,
    defaultExpandedKeys: ['0', '1'],
  },
}

export const WithIcons: Story = {
  args: {
    treeData: iconData,
    showLine: true,
    defaultExpandedKeys: ['0'],
    defaultSelectedKeys: ['0'],
  },
}

export const Checkable: Story = {
  args: {
    treeData: basicData,
    checkable: true,
    showLine: true,
    defaultExpandedKeys: ['0', '1'],
  },
}

export const Sizes: Story = {
  args: {
    treeData: basicData,
  },
  render: () => (
    <div className="flex flex-wrap gap-agentos-gap-gap16">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="w-[200px]">
          <p className="mb-agentos-margin-margin-xs8 font-agentos-en text-agentos-sm text-agentos-neutral-text-color-text-secondary">
            size={size}
          </p>
          <Tree
            size={size}
            treeData={basicData}
            showLine
            defaultExpandedKeys={['0', '1']}
          />
        </div>
      ))}
    </div>
  ),
}

export const SwitcherTypes: Story = {
  args: {
    treeData: basicData,
  },
  render: () => (
    <div className="flex flex-wrap gap-agentos-gap-gap16">
      {(['caret', 'chevron', 'button'] as const).map((switcher) => (
        <div key={switcher} className="w-[200px]">
          <p className="mb-agentos-margin-margin-xs8 font-agentos-en text-agentos-sm text-agentos-neutral-text-color-text-secondary">
            switcher={switcher}
          </p>
          <Tree
            switcher={switcher}
            treeData={basicData}
            showLine
            defaultExpandedKeys={['0']}
          />
        </div>
      ))}
    </div>
  ),
}

export const NestedControlled: Story = {
  args: {
    treeData: nestedData,
  },
  render: function NestedControlledStory() {
    const [expandedKeys, setExpandedKeys] = useState(['docs', 'docs-design'])
    const [selectedKeys, setSelectedKeys] = useState(['docs-design-spec'])
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])

    return (
      <Tree
        className="w-[240px]"
        treeData={nestedData}
        checkable
        showLine
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        checkedKeys={checkedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        onSelect={(keys) => setSelectedKeys(keys)}
        onCheck={(keys) => setCheckedKeys(keys)}
      />
    )
  },
}
