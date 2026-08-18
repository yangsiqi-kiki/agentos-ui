import { cn } from '@agentos/design-system'
import { useMemo } from 'react'
import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const remarkPlugins = [remarkGfm]

const headingClassName = {
  h1: 'text-agentos-2xl font-agentos-semibold leading-agentos-32',
  h2: 'text-agentos-xl font-agentos-semibold leading-agentos-28',
  h3: 'text-agentos-lg font-agentos-semibold leading-agentos-24',
  h4: 'text-agentos-md font-agentos-semibold leading-agentos-18',
  h5: 'text-agentos-md font-agentos-semibold leading-agentos-18',
  h6: 'text-agentos-md font-agentos-semibold leading-agentos-18',
} as const

function markdownComponents(bodyClassName: string): Components {
  return {
    p: ({ children }) => (
      <p className={cn('mb-agentos-margin-margin-sm12 last:mb-0', bodyClassName)}>{children}</p>
    ),
    strong: ({ children }) => <strong className="font-agentos-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    h1: ({ children }) => (
      <h1 className={cn('mb-agentos-margin-margin-sm12 text-agentos-neutral-text-color-text-heading last:mb-0', headingClassName.h1)}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className={cn('mb-agentos-margin-margin-sm12 text-agentos-neutral-text-color-text-heading last:mb-0', headingClassName.h2)}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={cn('mb-agentos-margin-margin-sm12 text-agentos-neutral-text-color-text-heading last:mb-0', headingClassName.h3)}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={cn('mb-agentos-margin-margin-sm12 text-agentos-neutral-text-color-text-heading last:mb-0', headingClassName.h4)}>
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className={cn('mb-agentos-margin-margin-sm12 text-agentos-neutral-text-color-text-heading last:mb-0', headingClassName.h5)}>
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className={cn('mb-agentos-margin-margin-sm12 text-agentos-neutral-text-color-text-heading last:mb-0', headingClassName.h6)}>
        {children}
      </h6>
    ),
    ul: ({ children }) => (
      <ul className="mb-agentos-margin-margin-sm12 flex list-disc flex-col gap-agentos-gap-gap-xxs4 pl-agentos-padding-padding16 last:mb-0">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-agentos-margin-margin-sm12 flex list-decimal flex-col gap-agentos-gap-gap-xxs4 pl-agentos-padding-padding16 last:mb-0">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-agentos-padding-padding-xxs4">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-agentos-brand-link-color-link hover:text-agentos-brand-link-color-link-hover"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-agentos-margin-margin-sm12 border-l-2 border-agentos-neutral-border-color-border pl-agentos-padding-padding-sm12 text-agentos-neutral-text-color-text-secondary last:mb-0">
        {children}
      </blockquote>
    ),
    code: ({ className, children }) => {
      const isBlock = Boolean(className?.includes('language-'))
      if (isBlock) {
        return (
          <code className={cn('font-agentos-en text-agentos-sm leading-agentos-18', className)}>
            {children}
          </code>
        )
      }
      return (
        <code className="rounded-agentos-rounded-sm4 bg-agentos-neutral-fill-color-fill-tertiary px-agentos-padding-padding-xxs4 py-px font-agentos-en text-agentos-sm leading-agentos-18">
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre className="mb-agentos-margin-margin-sm12 overflow-x-auto rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-tertiary p-agentos-padding-padding-sm12 last:mb-0">
        {children}
      </pre>
    ),
  }
}

export function MarkdownContent({
  content,
  size = 'md',
  className,
}: {
  content: string
  size?: 'md' | 'base'
  className?: string
}) {
  const bodyClassName =
    size === 'base' ? 'text-agentos-base leading-agentos-20' : 'text-agentos-md leading-agentos-18'
  const components = useMemo(() => markdownComponents(bodyClassName), [bodyClassName])

  return (
    <div className={cn('min-w-0 break-words text-agentos-neutral-text-color-text-heading', bodyClassName, className)}>
      <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
