import { ChevronLeft, Search } from 'lucide-react'
import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'
import { Input } from '../atoms/input'
import { Select } from '../atoms/select'
import { Slider } from '../atoms/slider'
import { Switch } from '../atoms/switch'
import { Tag } from '../atoms/tag'
import { Title } from '../atoms/title'
import { Divider } from '../atoms/divider'
import {
  Card,
  CardContent,
  CardFooter,
} from '../molecules/card'

function FormField({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex w-full flex-col gap-agentos-gap-gap-xs8', className)}>
      <label className="font-agentos-en font-agentos-normal text-agentos-md leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text">
        {label}
      </label>
      {children}
    </div>
  )
}

export interface KnowledgeRetrievalResultItem {
  id: string
  summary: string
  secondarySummary?: string
  recallScore?: string
  charCount?: string
  detailLabel?: string
}

export interface KnowledgeRetrievalDetail {
  title: string
  source?: string
  recallScore?: string
  docId?: string
  charCount?: string
  paragraphs?: string[]
}

export interface KnowledgeRetrievalViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'results'> {
  state?: 'empty' | 'results' | 'detail'
  retrievalTitle?: string
  representationLabel?: string
  crossLanguageLabel?: string
  metadataFilterLabel?: string
  hybridStrategyLabel?: string
  initialRecallLabel?: string
  rerankModelLabel?: string
  similarityLabel?: string
  resultCountLabel?: string
  highlightLabel?: string
  searchPlaceholder?: string
  searchButtonLabel?: string
  emptyTitle?: string
  emptyDescription?: string
  resultsMetaLabel?: string
  results?: KnowledgeRetrievalResultItem[]
  detail?: KnowledgeRetrievalDetail
  backLabel?: string
  onBackFromDetail?: () => void
  onSearch?: (query: string) => void
  onDetailClick?: (id: string) => void
  defaultQuery?: string
}

const defaultResults: KnowledgeRetrievalResultItem[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: `hit-${index + 1}`,
    summary:
      'Provided AI-powered sales enablement for 539 direct-operated Li Auto retail stores through three core capabilities: knowledge Q&A, intelligent customer follow-up, and one-click quotation generation.',
    secondarySummary:
      'AI sales enablement for 539 Li Auto stores covering Q&A, follow-up, and one-click quotes.',
    recallScore: '0.3838',
    charCount: '5,000',
    detailLabel: 'Details',
  }),
)

const defaultDetail: KnowledgeRetrievalDetail = {
  title: 'Overview of Nexperia and BMW supply relationship',
  source: 'Nexperia or other suppliers',
  recallScore: '0.3838',
  docId: '827736512',
  charCount: '5,000',
  paragraphs: [
    'Design is a plan or specification for the construction of an object or system, or the result of that plan or specification in the form of a prototype, product, or process.',
    'In some cases, the direct construction of an object without an explicit prior plan may also be considered to be a design activity.',
    'Design has different connotations in different fields. In some fields, the final product is a physical object, while in others it may be a process or a system.',
  ],
}

export const KnowledgeRetrievalView = forwardRef<
  HTMLDivElement,
  KnowledgeRetrievalViewProps
>(
  (
    {
      className,
      state = 'empty',
      retrievalTitle = 'Retrieval configuration',
      representationLabel = 'Knowledge representation types',
      crossLanguageLabel = 'Cross-language retrieval',
      metadataFilterLabel = 'Metadata filter rules',
      hybridStrategyLabel = 'Hybrid retrieval strategy',
      initialRecallLabel = 'Initial recall count',
      rerankModelLabel = 'Rerank model',
      similarityLabel = 'Semantic similarity',
      resultCountLabel = 'Result count',
      highlightLabel = 'Highlight results',
      searchPlaceholder = 'Enter a query to test search results...',
      searchButtonLabel = 'Test search',
      emptyTitle = 'No search results',
      emptyDescription = 'Adjust parameters and enter a query to see matched snippets, previews, and scores.',
      resultsMetaLabel = 'Retrieval results · 0.852s · 8 hits',
      results = defaultResults,
      detail = defaultDetail,
      backLabel = 'Back',
      onBackFromDetail,
      onSearch,
      onDetailClick,
      defaultQuery = '',
      ...props
    },
    ref,
  ) => {
    const [query, setQuery] = useState(defaultQuery)
    const [similarity, setSimilarity] = useState(0.3)
    const [resultCount, setResultCount] = useState(10)
    const [highlight, setHighlight] = useState(true)

    if (state === 'detail') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-agentos-margin-margin-sm12',
            className,
          )}
          {...props}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8 overflow-auto rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding16">
            <Button
              theme="black"
              appearance="ghost"
              size="sm"
              leadingIcon={<ChevronLeft aria-hidden="true" />}
              className="self-start"
              onClick={onBackFromDetail}
            >
              {backLabel}
            </Button>
            <Title level="h5" title={detail.title} />
            <div className="flex flex-wrap items-center gap-agentos-gap-gap-xs8 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
              {detail.source ? <span>Source: {detail.source}</span> : null}
              {detail.recallScore ? (
                <Tag shape="rounded">Recall score: {detail.recallScore}</Tag>
              ) : null}
              {detail.docId ? <Tag shape="rounded">ID: {detail.docId}</Tag> : null}
              {detail.charCount ? (
                <Tag shape="rounded">Chars {detail.charCount}</Tag>
              ) : null}
            </div>
            <Divider />
            <div className="flex flex-col gap-agentos-gap-gap-xs8">
              {detail.paragraphs?.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 16)}`}
                  className="text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-0 min-w-0 flex-1 gap-agentos-margin-margin-sm12 overflow-hidden p-agentos-margin-margin-sm12',
          className,
        )}
        {...props}
      >
        <section className="flex w-[279px] shrink-0 flex-col gap-agentos-margin-margin16 overflow-auto rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-elevated p-agentos-margin-margin-sm12">
          <Title level="s2" title={retrievalTitle} />

          <FormField label={representationLabel}>
            <Select
              multiple
              defaultValue={['default']}
              options={[{ value: 'default', label: 'default' }]}
            />
          </FormField>

          <FormField label={crossLanguageLabel}>
            <Select
              multiple
              defaultValue={['zh', 'en']}
              options={[
                { value: 'zh', label: 'Chinese' },
                { value: 'en', label: 'English' },
              ]}
            />
          </FormField>

          <FormField label={metadataFilterLabel}>
            <Select
              defaultValue="disabled"
              options={[{ value: 'disabled', label: 'Disabled' }]}
            />
          </FormField>

          <FormField label={hybridStrategyLabel}>
            <Select
              defaultValue="rrg"
              options={[{ value: 'rrg', label: 'RRG' }]}
            />
          </FormField>

          <FormField label={initialRecallLabel}>
            <Input defaultValue="1024" />
          </FormField>

          <FormField label={rerankModelLabel}>
            <Select
              placeholder="Please select"
              options={[
                { value: 'model-a', label: 'Model A' },
                { value: 'model-b', label: 'Model B' },
              ]}
            />
          </FormField>

          <FormField label={similarityLabel}>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={similarity}
              onValueChange={setSimilarity}
            />
          </FormField>

          <FormField label={resultCountLabel}>
            <Slider
              min={1}
              max={50}
              step={1}
              value={resultCount}
              onValueChange={setResultCount}
            />
          </FormField>

          <div className="flex items-center justify-between gap-agentos-gap-gap-xs8">
            <span className="text-agentos-md leading-agentos-18">
              {highlightLabel}
            </span>
            <Switch
              checked={highlight}
              onCheckedChange={setHighlight}
              aria-label={highlightLabel}
            />
          </div>
        </section>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8 overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-margin-margin-sm12">
          <div className="flex shrink-0 items-center gap-agentos-gap-gap-xs8">
            <Input
              className="flex-1"
              containerClassName="flex-1"
              placeholder={searchPlaceholder}
              prefixIcon={<Search aria-hidden="true" />}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button theme="black" onClick={() => onSearch?.(query)}>
              {searchButtonLabel}
            </Button>
          </div>

          {state === 'empty' ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-agentos-gap-gap-xxs4 text-center">
              <p className="text-agentos-base font-agentos-medium leading-agentos-20 text-agentos-neutral-text-color-text-secondary">
                {emptyTitle}
              </p>
              <p className="max-w-[360px] text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
                {emptyDescription}
              </p>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col gap-agentos-gap-gap-xs8 overflow-auto">
              <p className="text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
                {resultsMetaLabel}
              </p>
              {results.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex gap-agentos-gap-gap-xs8">
                    <div className="flex min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8">
                      <p className="text-agentos-md leading-agentos-18">
                        {item.summary}
                      </p>
                      {item.secondarySummary ? (
                        <p className="text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
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
                    <div className="flex w-full items-center justify-between gap-agentos-gap-gap-xs8">
                      <div className="flex flex-wrap items-center gap-agentos-gap-gap-xxs4">
                        {item.recallScore ? (
                          <Tag shape="rounded">
                            Recall score: {item.recallScore}
                          </Tag>
                        ) : null}
                        <Tag shape="rounded">ID: {item.id}</Tag>
                        {item.charCount ? (
                          <Tag shape="rounded">Chars {item.charCount}</Tag>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        className="shrink-0 text-agentos-md text-agentos-brand-link-color-link hover:text-agentos-brand-link-color-link-hover"
                        onClick={() => onDetailClick?.(item.id)}
                      >
                        {item.detailLabel ?? 'Details'}
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    )
  },
)

KnowledgeRetrievalView.displayName = 'KnowledgeRetrievalView'
