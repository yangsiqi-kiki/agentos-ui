import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '../../../src/components/atoms/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableSize,
  type TableSortDirection,
} from '../../../src/components/molecules/table'

const meta = {
  title: 'Molecules/Table',
  component: Table,
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'mini'] satisfies TableSize[],
    },
    bordered: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const rows = [
  { id: '1', name: 'AgentOS Design', status: 'Active', owner: 'Alice', role: 'Admin' },
  { id: '2', name: 'Workflow Canvas', status: 'Draft', owner: 'Bob', role: 'Editor' },
  { id: '3', name: 'Knowledge Base', status: 'Active', owner: 'Carol', role: 'Viewer' },
  { id: '4', name: 'Runtime Bridge', status: 'Paused', owner: 'Dave', role: 'Editor' },
  { id: '5', name: 'Shared i18n', status: 'Active', owner: 'Eve', role: 'Admin' },
]

export const Default: Story = {
  args: {
    size: 'large',
    bordered: false,
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.owner}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>Basic table primitives</TableCaption>
    </Table>
  ),
}

export const Bordered: Story = {
  args: {
    size: 'large',
    bordered: true,
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead align="center">Status</TableHead>
          <TableHead align="right">Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.slice(0, 3).map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell align="center">{row.status}</TableCell>
            <TableCell align="right">{row.owner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-agentos-margin-margin-lg24">
      {(['large', 'medium', 'small', 'mini'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-agentos-gap-gap-xs8">
          <p className="font-agentos-en text-agentos-sm font-agentos-semibold text-agentos-neutral-text-color-text-secondary">
            size={size}
          </p>
          <Table size={size}>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice(0, 2).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
}

export const Sortable: Story = {
  render: function SortableStory() {
    const [sortKey, setSortKey] = useState<'name' | 'status' | null>('name')
    const [direction, setDirection] = useState<TableSortDirection>('asc')

    const toggleSort = (key: 'name' | 'status') => {
      if (sortKey === key) {
        if (direction === 'asc') setDirection('desc')
        else if (direction === 'desc') {
          setSortKey(null)
          setDirection(false)
        } else setDirection('asc')
        return
      }
      setSortKey(key)
      setDirection('asc')
    }

    const sorted = [...rows].sort((a, b) => {
      if (!sortKey || !direction) return 0
      const left = a[sortKey]
      const right = b[sortKey]
      const cmp = left.localeCompare(right)
      return direction === 'asc' ? cmp : -cmp
    })

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={sortKey === 'name' ? direction : false}
              onSort={() => toggleSort('name')}
            >
              Name
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortKey === 'status' ? direction : false}
              onSort={() => toggleSort('status')}
            >
              Status
            </TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

export const SelectedRows: Story = {
  render: function SelectedRowsStory() {
    const [selected, setSelected] = useState<string[]>(['2'])

    let allChecked: boolean | 'indeterminate' = false
    if (selected.length === rows.length) allChecked = true
    else if (selected.length > 0) allChecked = 'indeterminate'

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all"
                checked={allChecked}
                onCheckedChange={(checked) => {
                  if (checked === true) setSelected(rows.map((r) => r.id))
                  else setSelected([])
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const isSelected = selected.includes(row.id)
            return (
              <TableRow key={row.id} selected={isSelected}>
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${row.name}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        setSelected((prev) => [...prev, row.id])
                        return
                      }
                      setSelected((prev) => prev.filter((id) => id !== row.id))
                    }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.owner}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  },
}

const wideRows = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  name: `Project ${i + 1}`,
  colA: `Alpha value ${i + 1}`,
  colB: `Beta value ${i + 1}`,
  colC: `Gamma value ${i + 1}`,
  colD: `Delta value ${i + 1}`,
  colE: `Epsilon value ${i + 1}`,
  colF: `Zeta value ${i + 1}`,
  action: 'Action',
}))

/** 左固定选择列 + 名称列，右固定操作列；横向滚动时边缘出阴影 */
export const FixedColumns: Story = {
  render: () => (
    <Table containerClassName="max-w-[640px] rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border">
      <TableHeader>
        <TableRow>
          <TableHead fixed="left" stickyOffset={0} className="w-10">
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead
            fixed="left"
            stickyOffset={40}
            fixedEdge
            sortable
            sortDirection={false}
            className="min-w-[180px]"
          >
            Name
          </TableHead>
          <TableHead className="min-w-[160px]">Column A</TableHead>
          <TableHead className="min-w-[160px]">Column B</TableHead>
          <TableHead className="min-w-[160px]">Column C</TableHead>
          <TableHead className="min-w-[160px]">Column D</TableHead>
          <TableHead className="min-w-[160px]">Column E</TableHead>
          <TableHead className="min-w-[160px]">Column F</TableHead>
          <TableHead
            fixed="right"
            stickyOffset={0}
            fixedEdge
            align="center"
            className="min-w-[100px]"
          >
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wideRows.map((row) => (
          <TableRow key={row.id}>
            <TableCell fixed="left" stickyOffset={0}>
              <Checkbox aria-label={`Select ${row.name}`} />
            </TableCell>
            <TableCell fixed="left" stickyOffset={40} fixedEdge>
              {row.name}
            </TableCell>
            <TableCell>{row.colA}</TableCell>
            <TableCell>{row.colB}</TableCell>
            <TableCell>{row.colC}</TableCell>
            <TableCell>{row.colD}</TableCell>
            <TableCell>{row.colE}</TableCell>
            <TableCell>{row.colF}</TableCell>
            <TableCell fixed="right" stickyOffset={0} fixedEdge align="center">
              <button
                type="button"
                className="cursor-pointer bg-transparent font-agentos-en text-agentos-md text-agentos-brand-link-color-link hover:text-agentos-brand-link-color-link-hover"
              >
                {row.action}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
