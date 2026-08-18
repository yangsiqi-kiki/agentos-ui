import { useState, type ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../src/components/molecules/table'
import {
  getComponentMeta,
  type ComponentMetaEntry,
} from './component-meta.anti-pattern'
import { getCopyTokenTitle, COPYABLE_CODE_DEFAULT_LABEL, COPYABLE_CODE_COPY_LABEL, COPYABLE_CODE_COPIED_LABEL } from './storybook-copy.anti-pattern'

const categoryLabel: Record<string, string> = {
  atoms: 'Atoms',
  molecules: 'Molecules',
  organisms: 'Organisms',
  layouts: 'Layouts',
  pages: 'Pages',
}

export function DocHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <header className="mb-8">
      {eyebrow ? (
        <p className="mb-1 text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="m-0 text-agentos-2xl font-agentos-semibold leading-agentos-32 text-agentos-neutral-text-color-text-heading">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 mb-0 text-agentos-base leading-agentos-22 text-agentos-neutral-text-color-text-secondary">
          {description}
        </p>
      ) : null}
    </header>
  )
}

export function DocTable({
  columns,
  rows,
}: {
  columns: ReactNode[]
  rows: ReactNode[][]
}) {
  return (
    <Table size="small" bordered>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function StoryLink({
  storyId,
  label,
}: {
  storyId: string
  label: string
}) {
  return (
    <p className="mt-3 mb-0 text-agentos-sm">
      <a
        href={`./?path=/story/${storyId}`}
        target="_top"
        className="text-agentos-brand-link-color-link hover:text-agentos-brand-link-color-link-hover"
      >
        {label} →
      </a>
    </p>
  )
}

function MetaBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-agentos-rounded-sm4 bg-agentos-neutral-fill-color-fill-tertiary px-2 py-0.5 text-agentos-xs font-agentos-medium text-agentos-neutral-text-color-text-secondary">
      {children}
    </span>
  )
}

export function ComponentMeta({ id }: { id: string }) {
  const meta = getComponentMeta(id)
  if (!meta) {
    return (
      <p className="text-agentos-sm text-agentos-brand-error-color-error">
        未找到组件元数据：{id}
      </p>
    )
  }

  return <ComponentMetaCard meta={meta} />
}

function ComponentMetaCard({ meta }: { meta: ComponentMetaEntry }) {
  return (
    <div className="mb-8 rounded-agentos-rounded-xl12 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-base p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <MetaBadge>{categoryLabel[meta.category] ?? meta.category}</MetaBadge>
        <MetaBadge>{meta.group}</MetaBadge>
      </div>
      <h1 className="m-0 text-agentos-2xl font-agentos-semibold leading-agentos-32 text-agentos-neutral-text-color-text-heading">
        {meta.nameZh}
        <span className="ml-2 text-agentos-lg font-agentos-normal text-agentos-neutral-text-color-text-secondary">
          {meta.name}
        </span>
      </h1>
      <p className="mt-2 mb-0 text-agentos-base leading-agentos-22 text-agentos-neutral-text-color-text-secondary">
        {meta.description}
      </p>
      {meta.figmaUrl ? (
        <p className="mt-3 mb-0 text-agentos-sm">
          <a
            href={meta.figmaUrl}
            target="_blank"
            rel="noreferrer"
            className="text-agentos-brand-link-color-link hover:text-agentos-brand-link-color-link-hover"
          >
            在 Figma 中查看设计稿 →
          </a>
        </p>
      ) : null}
    </div>
  )
}

function TokenChip({ cssVar }: { cssVar: string }) {
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-2 rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-base px-2.5 py-1.5 text-left outline-none transition-colors hover:border-agentos-brand-primary-color-primary-border focus-visible:ring-2 focus-visible:ring-agentos-brand-primary-color-primary"
      title={getCopyTokenTitle(cssVar)}
      onClick={() => {
        void navigator.clipboard?.writeText(cssVar)
      }}
    >
      <span
        className="inline-block size-3.5 shrink-0 rounded-agentos-rounded-xs2 ring-1 ring-inset ring-black/10"
        style={{ backgroundColor: `var(${cssVar})` }}
        aria-hidden
      />
      <code className="text-agentos-xs text-agentos-neutral-text-color-text">
        {cssVar}
      </code>
    </button>
  )
}

export function DownloadLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <p className="mt-3 mb-0 text-agentos-sm">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="agentos-docs-download-link inline-flex items-center rounded-agentos-rounded-lg8 border border-agentos-brand-primary-color-primary bg-agentos-brand-primary-color-primary px-3 py-1.5 font-agentos-medium no-underline hover:bg-agentos-brand-primary-color-primary-hover"
      >
        {label}
      </a>
    </p>
  )
}

export function CopyableCodeBlock({
  content,
  label = COPYABLE_CODE_DEFAULT_LABEL,
}: {
  content: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="relative my-4 overflow-hidden rounded-agentos-rounded-xl12 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-base">
      <div className="flex items-center justify-between border-b border-agentos-neutral-border-color-border-secondary px-3 py-2">
        <span className="text-agentos-xs font-agentos-medium text-agentos-neutral-text-color-text-secondary">
          {label}
        </span>
        <button
          type="button"
          className="cursor-pointer rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container px-2.5 py-1 text-agentos-xs font-agentos-medium text-agentos-neutral-text-color-text outline-none transition-colors hover:border-agentos-brand-primary-color-primary-border focus-visible:ring-2 focus-visible:ring-agentos-brand-primary-color-primary"
          onClick={() => {
            void navigator.clipboard?.writeText(content).then(() => {
              setCopied(true)
              window.setTimeout(() => setCopied(false), 2000)
            })
          }}
        >
          {copied ? COPYABLE_CODE_COPIED_LABEL : COPYABLE_CODE_COPY_LABEL}
        </button>
      </div>
      <pre className="m-0 max-h-[32rem] overflow-auto p-4 text-agentos-xs leading-agentos-20 text-agentos-neutral-text-color-text">
        <code>{content}</code>
      </pre>
    </div>
  )
}

export function TokenUsage({
  id,
  color,
  font,
}: {
  id: string
  color?: boolean
  font?: boolean
}) {
  const meta = getComponentMeta(id)
  const colorTokens = color ? (meta?.tokens?.color ?? []) : []
  const fontTokens = font ? (meta?.tokens?.font ?? []) : []

  if (colorTokens.length === 0 && fontTokens.length === 0) {
    return (
      <p className="text-agentos-sm text-agentos-neutral-text-color-text-tertiary">
        暂无关联 token 清单。完整对照见 Tokens 分区与 DESIGN.md。
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {colorTokens.length > 0 ? (
        <div>
          <p className="mb-2 mt-0 text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {colorTokens.map((cssVar) => (
              <TokenChip key={cssVar} cssVar={cssVar} />
            ))}
          </div>
        </div>
      ) : null}
      {fontTokens.length > 0 ? (
        <div>
          <p className="mb-2 mt-0 text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text">
            Font
          </p>
          <div className="flex flex-wrap gap-2">
            {fontTokens.map((cssVar) => (
              <code
                key={cssVar}
                className="rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-base px-2.5 py-1.5 text-agentos-xs text-agentos-neutral-text-color-text"
              >
                {cssVar}
              </code>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
