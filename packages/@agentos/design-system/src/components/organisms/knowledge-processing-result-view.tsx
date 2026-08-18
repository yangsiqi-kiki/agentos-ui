import { FileText, MoreHorizontal, Plus, Search } from 'lucide-react'
import { forwardRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'
import { Checkbox } from '../atoms/checkbox'
import { Input } from '../atoms/input'
import { Select, type SelectOption } from '../atoms/select'
import { Tag, type TagProps } from '../atoms/tag'
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../molecules/card'
import { Divider } from '../atoms/divider'
import { Tree, type TreeNodeData } from '../molecules/tree'

export interface KnowledgeProcessingDocItem {
  id: string
  title: string
  summary: string
  secondarySummary?: string
  statusLabel: string
  statusColor?: TagProps['color']
  metaTags?: string[]
}

export interface KnowledgeDetailField {
  label: string
  value: string
}

export interface KnowledgeProcessingResultViewProps
  extends HTMLAttributes<HTMLDivElement> {
  mode?: 'semantic' | 'structure'
  defaultMode?: 'semantic' | 'structure'
  onModeChange?: (mode: 'semantic' | 'structure') => void
  semanticLabel?: string
  structureLabel?: string
  statusOptions?: SelectOption[]
  fileOptions?: SelectOption[]
  defaultStatus?: string
  defaultFile?: string
  selectAllLabel?: string
  newLabel?: string
  items?: KnowledgeProcessingDocItem[]
  moreActionLabel?: string
  onNew?: () => void
  onItemAction?: (id: string) => void
  treeData?: TreeNodeData[]
  filesLabel?: string
  searchPlaceholder?: string
  detailFields?: KnowledgeDetailField[]
  detailParagraphs?: string[]
}

const defaultStatusOptions: SelectOption[] = [
  { value: 'all', label: 'All status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

const defaultFileOptions: SelectOption[] = [
  { value: 'all', label: 'All files' },
  { value: 'doc', label: 'Documents' },
]

const sampleSummary =
  'Provided AI-powered sales enablement for 539 direct-operated Li Auto ' +
  'retail stores through three core capabilities: knowledge Q&A, ' +
  'intelligent customer follow-up, and one-click quotation generation.'

const sampleSecondary =
  'AI sales enablement for 539 Li Auto stores covering Q&A, follow-up, and one-click quotes.'

const defaultItems: KnowledgeProcessingDocItem[] = Array.from(
  { length: 9 },
  (_, index) => ({
    id: `doc-${index + 1}`,
    title: `Docname.doc #${index + 1}`,
    summary: sampleSummary,
    secondarySummary: sampleSecondary,
    statusLabel: 'Published',
    statusColor: 'green',
    metaTags: ['ID:827736512', 'Chars 5,000'],
  }),
)

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

const defaultDetailFields: KnowledgeDetailField[] = [
  { label: 'Name', value: 'Socrates' },
  { label: 'Phone', value: '123-1234-1234' },
  { label: 'Residence', value: 'Beijing' },
  { label: 'Hometown', value: 'Beijing' },
  { label: 'Address', value: 'Yingdu Building, Zhichun Road, Beijing' },
]

const defaultDetailParagraphs = [
  'Design is a plan or specification for the construction of an object or system, or the result of that plan or specification in the form of a prototype, product, or process. The verb to design expresses the process of developing a design.',
  'In some cases, the direct construction of an object without an explicit prior plan may also be considered to be a design activity. Design has different connotations in different fields.',
]

export const KnowledgeProcessingResultView = forwardRef<
  HTMLDivElement,
  KnowledgeProcessingResultViewProps
>(
  (
    {
      className,
      mode: controlledMode,
      defaultMode = 'semantic',
      onModeChange,
      semanticLabel = 'Semantic vector',
      structureLabel = 'Structure tree',
      statusOptions = defaultStatusOptions,
      fileOptions = defaultFileOptions,
      defaultStatus = 'all',
      defaultFile = 'all',
      selectAllLabel = 'Select all',
      newLabel = 'New',
      items = defaultItems,
      moreActionLabel = 'More actions',
      onNew,
      onItemAction,
      treeData = defaultTreeData,
      filesLabel = 'Files',
      searchPlaceholder = 'Please enter',
      detailFields = defaultDetailFields,
      detailParagraphs = defaultDetailParagraphs,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledMode, setUncontrolledMode] = useState(defaultMode)
    const mode = controlledMode ?? uncontrolledMode

    const setMode = (next: 'semantic' | 'structure') => {
      if (controlledMode === undefined) setUncontrolledMode(next)
      onModeChange?.(next)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-0 min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8 overflow-hidden p-agentos-margin-margin-sm12',
          className,
        )}
        {...props}
      >
        <div
          role="tablist"
          aria-label="Processing result mode"
          className="inline-flex shrink-0 items-center self-start rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-content p-[3px]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'semantic'}
            className={cn(
              'rounded-agentos-rounded-md6 px-agentos-padding-padding-sm12 py-agentos-padding-padding-xxs4',
              'text-agentos-md leading-agentos-18',
              mode === 'semantic'
                ? 'bg-agentos-neutral-bg-color-bg-container font-agentos-semibold text-agentos-brand-primary-color-primary'
                : 'font-agentos-normal text-agentos-neutral-text-color-text-secondary',
            )}
            onClick={() => setMode('semantic')}
          >
            {semanticLabel}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'structure'}
            className={cn(
              'rounded-agentos-rounded-md6 px-agentos-padding-padding-sm12 py-agentos-padding-padding-xxs4',
              'text-agentos-md leading-agentos-18',
              mode === 'structure'
                ? 'bg-agentos-neutral-bg-color-bg-container font-agentos-semibold text-agentos-brand-primary-color-primary'
                : 'font-agentos-normal text-agentos-neutral-text-color-text-secondary',
            )}
            onClick={() => setMode('structure')}
          >
            {structureLabel}
          </button>
        </div>

        {mode === 'semantic' ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8 overflow-hidden">
            <div className="flex shrink-0 items-center justify-between py-agentos-padding-padding-xxs4">
              <div className="flex items-center gap-agentos-gap-gap-xs8">
                <div className="w-[110px]">
                  <Select options={statusOptions} defaultValue={defaultStatus} />
                </div>
                <div className="w-[110px]">
                  <Select options={fileOptions} defaultValue={defaultFile} />
                </div>
                <Checkbox label={selectAllLabel} />
              </div>
              <Button
                theme="black"
                leadingIcon={<Plus aria-hidden="true" />}
                onClick={onNew}
              >
                {newLabel}
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              <div className="grid grid-cols-1 gap-agentos-gap-gap-xs8 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardTitle>
                      <div className="flex w-full items-center justify-between gap-agentos-gap-gap-xs8">
                        <div className="flex min-w-0 items-center gap-agentos-gap-gap-xs8">
                          <Checkbox aria-label={`Select ${item.title}`} />
                          <span className="min-w-0 truncate text-agentos-md font-agentos-semibold leading-agentos-18">
                            {item.title}
                          </span>
                        </div>
                        <Button
                          theme="black"
                          appearance="ghost"
                          size="sm"
                          aria-label={moreActionLabel}
                          onClick={() => onItemAction?.(item.id)}
                        >
                          <MoreHorizontal aria-hidden="true" />
                        </Button>
                      </div>
                    </CardTitle>
                    <CardContent className="flex gap-agentos-gap-gap-xs8">
                      <div className="flex min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8">
                        <p className="line-clamp-4 text-agentos-md leading-agentos-18">
                          {item.summary}
                        </p>
                        {item.secondarySummary ? (
                          <p className="truncate text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
                            {item.secondarySummary}
                          </p>
                        ) : null}
                      </div>
                      <div
                        aria-hidden="true"
                        className="size-16 shrink-0 rounded-agentos-rounded-sm4 bg-agentos-neutral-fill-color-fill-tertiary"
                      />
                    </CardContent>
                    <CardFooter showDivider>
                      <div className="flex flex-wrap items-center gap-agentos-gap-gap-xxs4">
                        <Tag
                          color={item.statusColor ?? 'green'}
                          bordered
                          shape="rounded"
                        >
                          {item.statusLabel}
                        </Tag>
                        {item.metaTags?.map((meta) => (
                          <Tag key={meta} shape="rounded">
                            {meta}
                          </Tag>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 min-w-0 flex-1 gap-agentos-gap-gap-xs8 overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container">
            <section className="flex w-[240px] shrink-0 flex-col gap-agentos-gap-gap-xs8 border-r border-agentos-neutral-border-color-border-secondary p-agentos-padding-padding-sm12">
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
            <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8 overflow-auto p-agentos-padding-padding16">
              <div className="grid grid-cols-1 gap-agentos-gap-gap-xs8 sm:grid-cols-2">
                {detailFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex gap-agentos-gap-gap-xs8 text-agentos-md leading-agentos-18"
                  >
                    <span className="shrink-0 text-agentos-neutral-text-color-text-description">
                      {field.label}
                    </span>
                    <span className="min-w-0 text-agentos-neutral-text-color-text">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
              <Divider />
              <div className="flex flex-col gap-agentos-gap-gap-xs8">
                {detailParagraphs.map((paragraph, index) => (
                  <p
                    key={`${index}-${paragraph.slice(0, 12)}`}
                    className="text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    )
  },
)

KnowledgeProcessingResultView.displayName = 'KnowledgeProcessingResultView'
