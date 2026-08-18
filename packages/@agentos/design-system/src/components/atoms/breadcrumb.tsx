import { IconSlash } from '@tabler/icons-react'
import { ChevronRight, Dot } from 'lucide-react'
import {
  Fragment,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

export type BreadcrumbSeparator = 'slash' | 'dot' | 'arrow'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
  onClick?: () => void
}

export interface BreadcrumbProps
  extends Omit<ComponentPropsWithoutRef<'nav'>, 'children'> {
  items?: BreadcrumbItem[]
  separator?: BreadcrumbSeparator
  maxItems?: number
  ellipsisLabel?: string
}

const defaultItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'News' },
]

function getVisibleItems(items: BreadcrumbItem[], maxItems: number, ellipsisLabel: string) {
  if (items.length <= maxItems) return items

  return [
    items[0],
    { label: ellipsisLabel },
    ...items.slice(-(maxItems - 2)),
  ]
}

function renderSeparator(separator: BreadcrumbSeparator) {
  if (separator === 'dot') return <Dot aria-hidden="true" />
  if (separator === 'arrow') return <ChevronRight aria-hidden="true" />
  return <IconSlash aria-hidden="true" />
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      items = defaultItems,
      separator = 'slash',
      maxItems = 4,
      ellipsisLabel = '...',
      'aria-label': ariaLabel = 'Breadcrumb',
      ...props
    },
    ref,
  ) => {
    const visibleItems = getVisibleItems(items, Math.max(3, maxItems), ellipsisLabel)

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'flex max-w-[240px] items-center overflow-hidden py-px',
          'font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal',
          className,
        )}
        {...props}
      >
        {visibleItems.map((item, index) => {
          const isCurrent = index === visibleItems.length - 1
          const itemClassName = cn(
            'flex min-w-0 items-center gap-agentos-gap-gap-xxs4 truncate',
            isCurrent
              ? 'text-agentos-neutral-text-color-text'
              : 'text-agentos-neutral-text-color-text-description',
          )

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex shrink-0 items-center justify-center',
                    'text-agentos-neutral-text-color-text-description',
                    '[&_svg]:size-agentos-icon-icon-size-sm12',
                  )}
                >
                  {renderSeparator(separator)}
                </span>
              ) : null}
              {isCurrent ? (
                <span aria-current="page" className={itemClassName}>
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : item.href ? (
                <a href={item.href} className={itemClassName} onClick={item.onClick}>
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </a>
              ) : item.onClick ? (
                <button type="button" className={itemClassName} onClick={item.onClick}>
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              ) : (
                <span className={itemClassName}>
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </Fragment>
          )
        })}
      </nav>
    )
  },
)

Breadcrumb.displayName = 'Breadcrumb'
