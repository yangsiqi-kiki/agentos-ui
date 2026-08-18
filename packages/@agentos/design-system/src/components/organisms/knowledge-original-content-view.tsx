import { ChevronDown, FileText, Plus, Search } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Avatar } from '../atoms/avatar'
import { Button } from '../atoms/button'
import { Checkbox } from '../atoms/checkbox'
import { Input } from '../atoms/input'
import { Switch } from '../atoms/switch'
import {
  Pagination,
} from '../molecules/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../molecules/table'
import { Tree, type TreeNodeData } from '../molecules/tree'

export interface KnowledgeOriginalRow {
  id: string
  title: string
  description?: string
  statusLabel?: string
  statusTone?: 'success' | 'info' | 'warning' | 'danger'
  avatarFallback?: string
  enabled?: boolean
  actionLabel?: string
}

export interface KnowledgeOriginalContentViewProps
  extends HTMLAttributes<HTMLDivElement> {
  treeData?: TreeNodeData[]
  filesLabel?: string
  searchPlaceholder?: string
  bulkActionLabel?: string
  createLabel?: string
  newLabel?: string
  rows?: KnowledgeOriginalRow[]
  total?: number
  pageSize?: number
  selectedCountLabel?: string
  onBulkAction?: () => void
  onCreate?: () => void
  onNew?: () => void
  onRowAction?: (id: string) => void
}

const defaultTreeData: TreeNodeData[] = [
  {
    key: 'root-1',
    title: 'Branch',
    icon: <FileText aria-hidden="true" />,
    children: [
      {
        key: 'child-1',
        title: 'Branch',
        icon: <FileText aria-hidden="true" />,
        children: [
          { key: 'leaf-1', title: 'Branch', icon: <FileText aria-hidden="true" />, isLeaf: true },
          { key: 'leaf-2', title: 'Branch', icon: <FileText aria-hidden="true" />, isLeaf: true },
        ],
      },
      { key: 'child-2', title: 'Branch', icon: <FileText aria-hidden="true" />, isLeaf: true },
    ],
  },
  {
    key: 'root-2',
    title: 'Branch',
    icon: <FileText aria-hidden="true" />,
    children: [
      { key: 'leaf-3', title: 'Branch', icon: <FileText aria-hidden="true" />, isLeaf: true },
    ],
  },
]

const defaultRows: KnowledgeOriginalRow[] = Array.from({ length: 8 }, (_, index) => {
  let statusTone: KnowledgeOriginalRow['statusTone'] = 'info'
  let statusLabel = 'Ready'
  if (index % 3 === 0) {
    statusTone = 'warning'
    statusLabel = '20%'
  } else if (index % 2 === 0) {
    statusTone = 'success'
  }

  return {
    id: `row-${index + 1}`,
    title: 'AgentOS',
    description: 'Title',
    statusLabel,
    statusTone,
    avatarFallback: 'A',
    enabled: index % 2 === 0,
    actionLabel: 'Action',
  }
})

function StatusDot({ tone }: { tone?: KnowledgeOriginalRow['statusTone'] }) {
  let toneClass = 'bg-agentos-brand-success-color-success'
  if (tone === 'danger') {
    toneClass = 'bg-agentos-brand-error-color-error'
  } else if (tone === 'warning') {
    toneClass = 'bg-agentos-brand-warning-color-warning'
  } else if (tone === 'info') {
    toneClass = 'bg-agentos-brand-info-color-info'
  }

  return (
    <span
      aria-hidden="true"
      className={cn('inline-block size-2 shrink-0 rounded-agentos-rounded-full999', toneClass)}
    />
  )
}

export const KnowledgeOriginalContentView = forwardRef<
  HTMLDivElement,
  KnowledgeOriginalContentViewProps
>(
  (
    {
      className,
      treeData = defaultTreeData,
      filesLabel = 'Files',
      searchPlaceholder = 'Please enter',
      bulkActionLabel = 'Bulk actions',
      createLabel = 'Create',
      newLabel = 'New',
      rows = defaultRows,
      total = 50,
      pageSize = 20,
      selectedCountLabel = '2 selected',
      onBulkAction,
      onCreate,
      onNew,
      onRowAction,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-0 min-w-0 flex-1 gap-agentos-gap-gap-xs8 overflow-hidden p-agentos-margin-margin-sm12',
          className,
        )}
        {...props}
      >
        <section className="flex w-[240px] shrink-0 flex-col gap-agentos-gap-gap-xs8 overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding-sm12">
          <Input
            placeholder={searchPlaceholder}
            prefixIcon={<Search aria-hidden="true" />}
          />
          <p className="text-agentos-md font-agentos-semibold leading-agentos-18">
            {filesLabel}
          </p>
          <div className="min-h-0 flex-1 overflow-auto">
            <Tree
              treeData={treeData}
              defaultExpandedKeys={['root-1', 'child-1']}
              size="md"
            />
          </div>
        </section>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8 overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding-sm12">
          <div className="flex items-center justify-between">
            <Button
              theme="black"
              appearance="outline"
              trailingIcon={<ChevronDown aria-hidden="true" />}
              onClick={onBulkAction}
            >
              {bulkActionLabel}
            </Button>
            <div className="flex items-center gap-agentos-gap-gap-xs8">
              <Button theme="black" appearance="outline" onClick={onCreate}>
                {createLabel}
              </Button>
              <Button
                theme="black"
                leadingIcon={<Plus aria-hidden="true" />}
                onClick={onNew}
              >
                {newLabel}
              </Button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            <Table size="medium" bordered>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox aria-label="Select all" />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Title</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox aria-label={`Select ${row.title}`} />
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        className="text-agentos-brand-link-color-link hover:text-agentos-brand-link-color-link-hover"
                        onClick={() => onRowAction?.(row.id)}
                      >
                        {row.title}
                      </button>
                    </TableCell>
                    <TableCell>{row.description ?? 'Title'}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-agentos-gap-gap-xxs4">
                        <StatusDot tone={row.statusTone} />
                        {row.statusLabel}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Avatar size="sm" fallback={row.avatarFallback ?? 'A'} />
                    </TableCell>
                    <TableCell>{row.description ?? 'Title'}</TableCell>
                    <TableCell>
                      <Switch
                        defaultChecked={row.enabled}
                        aria-label={`Toggle ${row.title}`}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        className="text-agentos-brand-link-color-link hover:text-agentos-brand-link-color-link-hover"
                        onClick={() => onRowAction?.(row.id)}
                      >
                        {row.actionLabel ?? 'Action'}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between gap-agentos-gap-gap-xs8">
            <span className="text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-secondary">
              {selectedCountLabel}
            </span>
            <Pagination total={total} pageSize={pageSize} showTotalCount showPageSizeSelector />
          </div>
        </section>
      </div>
    )
  },
)

KnowledgeOriginalContentView.displayName = 'KnowledgeOriginalContentView'
