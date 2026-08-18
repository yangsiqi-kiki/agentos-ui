import type { ReactNode } from 'react'

export type FlatToken = {
  /** Tailwind token key, e.g. `agentos-neutral-text-color-text` */
  key: string
  /** CSS variable name, e.g. `--agentos-neutral-text-color-text` */
  cssVar: string
  /** Group path, e.g. `neutral / text` */
  group: string
  /** Leaf name, e.g. `color-text` */
  name: string
  /** Raw value from generated-theme (usually `var(--agentos-...)`) */
  value: string
}

type TokenTree = Record<string, unknown>

function isTokenLeaf(value: unknown): value is string | string[] {
  if (typeof value === 'string') return true
  if (Array.isArray(value) && typeof value[0] === 'string') return true
  return false
}

function leafCssVar(value: string | string[]): string {
  const raw = Array.isArray(value) ? value[0] : value
  const match = raw.match(/var\((--[\w-]+)\)/)
  return match?.[1] ?? raw
}

/** Flatten generated-theme nested objects into a displayable token list */
export function flattenTokens(
  tree: TokenTree,
  options?: { prefix?: string; groupPrefix?: string },
): FlatToken[] {
  const prefix = options?.prefix ?? ''
  const groupPrefix = options?.groupPrefix ?? ''
  const result: FlatToken[] = []

  for (const [segment, value] of Object.entries(tree)) {
    const key = prefix ? `${prefix}-${segment}` : segment
    const group = groupPrefix ? `${groupPrefix} / ${segment}` : segment

    if (isTokenLeaf(value)) {
      const cssVar = leafCssVar(value)
      result.push({
        key,
        cssVar,
        group: groupPrefix || 'root',
        name: segment,
        value: Array.isArray(value) ? value[0] : value,
      })
      continue
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result.push(
        ...flattenTokens(value as TokenTree, {
          prefix: key,
          groupPrefix: group,
        }),
      )
    }
  }

  return result
}

export function TokenPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="box-border w-full bg-agentos-neutral-bg-color-bg-layout px-12 py-10 font-agentos text-agentos-neutral-text-color-text">
      <header className="mb-8 max-w-5xl">
        <p className="mb-1 text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text-secondary">
          Tokens
        </p>
        <h1 className="m-0 text-agentos-2xl font-agentos-semibold leading-agentos-32">
          {title}
        </h1>
        <p className="mt-2 mb-0 text-agentos-base text-agentos-neutral-text-color-text-secondary leading-agentos-22">
          {description}
        </p>
      </header>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  )
}

export function TokenSection({
  title,
  children,
  wide = false,
}: {
  title: string
  children: ReactNode
  /** Use wide for palette boards; default keeps a readable measure */
  wide?: boolean
}) {
  return (
    <section className={wide ? 'w-full max-w-[96rem]' : 'max-w-6xl'}>
      <h2 className="mb-4 mt-0 text-agentos-lg font-agentos-semibold leading-agentos-28">
        {title}
      </h2>
      {children}
    </section>
  )
}
