import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Input } from '../atoms/input'
import { Select } from '../atoms/select'
import { cn } from '../../lib/utils'

const paginationItemVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center border font-agentos-en',
    'font-agentos-semibold tracking-agentos-normal transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-agentos-brand-primary-color-primary-outline',
  ),
  {
    variants: {
      size: {
        medium: cn(
          'size-agentos-control-control-height-md32',
          'rounded-agentos-rounded-lg8 text-agentos-md leading-agentos-18',
        ),
        large: cn(
          'size-[calc(var(--agentos-control-height-control-height-md32)+var(--agentos-spacing-gap-xxs4))]',
          'rounded-agentos-rounded-lg8 text-agentos-md leading-agentos-18',
        ),
        small: cn(
          'size-[calc(var(--agentos-control-height-control-height-md32)-var(--agentos-spacing-gap-xxs4))]',
          'rounded-agentos-rounded-lg8 text-agentos-md leading-agentos-18',
        ),
        mini: cn(
          'size-agentos-control-control-height-sm24',
          'rounded-agentos-rounded-lg8 text-agentos-sm leading-agentos-18',
        ),
      },
      selected: {
        true: cn(
          'border-agentos-brand-primary-color-primary-border',
          'bg-agentos-brand-primary-color-primary-bg',
          'text-agentos-brand-primary-color-primary',
        ),
        false: cn(
          'border-agentos-neutral-border-color-border bg-transparent',
          'text-agentos-neutral-text-color-text-description',
          'hover:bg-agentos-neutral-fill-color-fill-tertiary',
        ),
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        selected: false,
        disabled: true,
        className: cn(
          'border-transparent bg-transparent',
          'text-agentos-neutral-text-color-text-disabled',
          'hover:bg-transparent',
        ),
      },
      {
        selected: true,
        disabled: true,
        className: cn(
          'border-agentos-neutral-border-color-border',
          'bg-agentos-neutral-bg-color-bg-container-disabled',
          'text-agentos-neutral-text-color-text-disabled',
        ),
      },
    ],
    defaultVariants: {
      size: 'medium',
      selected: false,
      disabled: false,
    },
  },
)

const paginationControlVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center rounded-agentos-rounded-sm4',
    'text-agentos-neutral-icon-color-icon transition-colors',
    'hover:bg-agentos-neutral-fill-color-fill-tertiary',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-agentos-brand-primary-color-primary-outline',
    'disabled:cursor-not-allowed disabled:bg-transparent',
    'disabled:text-agentos-neutral-text-color-text-disabled',
    '[&_svg]:size-agentos-icon-icon-size-sm12',
  ),
  {
    variants: {
      size: {
        medium: 'size-agentos-control-control-height-md32',
        large:
          'size-[calc(var(--agentos-control-height-control-height-md32)+var(--agentos-spacing-gap-xxs4))]',
        small:
          'size-[calc(var(--agentos-control-height-control-height-md32)-var(--agentos-spacing-gap-xxs4))]',
        mini: 'size-agentos-control-control-height-sm24',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
)

export type PaginationSize = NonNullable<
  VariantProps<typeof paginationItemVariants>['size']
>

export interface PaginationLabels {
  total: (total: number) => ReactNode
  itemsPerPage: (pageSize: number) => string
  goTo: string
  previous: string
  next: string
  page: (page: number) => string
  ellipsis: string
}

export interface PaginationProps
  extends Omit<ComponentPropsWithoutRef<'nav'>, 'children'> {
  total?: number
  currentPage?: number
  defaultCurrentPage?: number
  pageSize?: number
  defaultPageSize?: number
  pageSizeOptions?: number[]
  size?: PaginationSize
  disabled?: boolean
  simple?: boolean
  showTotalCount?: boolean
  showPageSizeSelector?: boolean
  showQuickJumper?: boolean
  labels?: Partial<PaginationLabels>
  onPageChange?: (page: number, pageSize: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

type PageToken = number | 'ellipsis'

const defaultLabels: PaginationLabels = {
  total: (total) => `${total} in total`,
  itemsPerPage: (pageSize) => `${pageSize} items`,
  goTo: 'Go to',
  previous: 'Previous page',
  next: 'Next page',
  page: (page) => `Page ${page}`,
  ellipsis: '...',
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(1, page), totalPages)
}

function getPageTokens(currentPage: number, totalPages: number): PageToken[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ]
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      total = 50,
      currentPage,
      defaultCurrentPage = 1,
      pageSize,
      defaultPageSize = 10,
      pageSizeOptions = [10, 20, 50, 100],
      size = 'medium',
      disabled = false,
      simple = false,
      showTotalCount = true,
      showPageSizeSelector = true,
      showQuickJumper = true,
      labels,
      onPageChange,
      onPageSizeChange,
      'aria-label': ariaLabel = 'Pagination',
      ...props
    },
    ref,
  ) => {
    const [uncontrolledPage, setUncontrolledPage] = useState(defaultCurrentPage)
    const [uncontrolledPageSize, setUncontrolledPageSize] =
      useState(defaultPageSize)
    const [quickJumpValue, setQuickJumpValue] = useState('')

    const activePageSize = Math.max(1, pageSize ?? uncontrolledPageSize)
    const totalPages = Math.max(1, Math.ceil(Math.max(0, total) / activePageSize))
    const activePage = clampPage(currentPage ?? uncontrolledPage, totalPages)
    const resolvedLabels = { ...defaultLabels, ...labels }
    const pageTokens = getPageTokens(activePage, totalPages)

    const commitPage = (nextPage: number) => {
      if (disabled) return
      const clampedPage = clampPage(nextPage, totalPages)
      if (currentPage === undefined) setUncontrolledPage(clampedPage)
      onPageChange?.(clampedPage, activePageSize)
    }

    const commitPageSize = (nextPageSize: number) => {
      if (disabled || nextPageSize < 1) return
      if (pageSize === undefined) setUncontrolledPageSize(nextPageSize)
      onPageSizeChange?.(nextPageSize)

      const nextTotalPages = Math.max(
        1,
        Math.ceil(Math.max(0, total) / nextPageSize),
      )
      const nextPage = clampPage(activePage, nextTotalPages)
      if (currentPage === undefined) setUncontrolledPage(nextPage)
      onPageChange?.(nextPage, nextPageSize)
    }

    const commitQuickJump = () => {
      if (!quickJumpValue) return
      commitPage(Number(quickJumpValue))
      setQuickJumpValue('')
    }

    const handleQuickJumpKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      commitQuickJump()
    }

    const renderPageItem = (
      page: number,
      itemSize: PaginationSize = size ?? 'medium',
    ) => {
      const selected = page === activePage
      return (
        <button
          key={page}
          type="button"
          disabled={disabled}
          aria-current={selected ? 'page' : undefined}
          aria-label={resolvedLabels.page(page)}
          className={paginationItemVariants({
            size: itemSize,
            selected,
            disabled,
          })}
          onClick={() => commitPage(page)}
        >
          {page}
        </button>
      )
    }

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'flex items-center font-agentos-en tracking-agentos-normal',
          simple
            ? 'gap-agentos-gap-gap-xxs4'
            : 'gap-agentos-gap-gap-xs8',
          className,
        )}
        {...props}
      >
        {!simple && showTotalCount ? (
          <span
            className={cn(
              'shrink-0 whitespace-nowrap font-agentos-normal',
              size === 'mini'
                ? 'text-agentos-sm leading-agentos-18'
                : 'text-agentos-md leading-agentos-18',
              'text-agentos-neutral-text-color-text',
            )}
          >
            {resolvedLabels.total(total)}
          </span>
        ) : null}

        <button
          type="button"
          disabled={disabled || activePage <= 1}
          aria-label={resolvedLabels.previous}
          className={paginationControlVariants({
            size: simple ? 'mini' : size,
          })}
          onClick={() => commitPage(activePage - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        {simple ? (
          <>
            <span
              aria-current="page"
              aria-label={resolvedLabels.page(activePage)}
              className={cn(
                paginationItemVariants({
                  size: 'mini',
                  selected: false,
                  disabled,
                }),
                'cursor-default',
                !disabled && 'bg-agentos-neutral-fill-color-fill-tertiary',
              )}
            >
              {activePage}
            </span>
            <span
              aria-hidden="true"
              className="text-agentos-sm leading-agentos-18 text-agentos-neutral-text-color-text-description"
            >
              /
            </span>
            <span
              aria-label={resolvedLabels.page(totalPages)}
              className={cn(
                paginationItemVariants({
                  size: 'mini',
                  selected: false,
                  disabled,
                }),
                'cursor-default hover:bg-transparent',
              )}
            >
              {totalPages}
            </span>
          </>
        ) : (
          pageTokens.map((token, index) =>
            token === 'ellipsis' ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className={cn(
                  'inline-flex shrink-0 items-center justify-center',
                  'font-agentos-semibold text-agentos-neutral-text-color-text-description',
                  size === 'mini'
                    ? 'size-agentos-control-control-height-sm24 text-agentos-sm'
                    : 'size-agentos-control-control-height-md32 text-agentos-md',
                )}
              >
                {resolvedLabels.ellipsis}
              </span>
            ) : (
              renderPageItem(token)
            ),
          )
        )}

        <button
          type="button"
          disabled={disabled || activePage >= totalPages}
          aria-label={resolvedLabels.next}
          className={paginationControlVariants({
            size: simple ? 'mini' : size,
          })}
          onClick={() => commitPage(activePage + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>

        {!simple && showPageSizeSelector ? (
          <div className="w-[calc(var(--agentos-control-height-control-height-lg40)*2+var(--agentos-spacing-gap-sm12))] shrink-0">
            <Select
              size={size === 'mini' ? 'sm' : 'default'}
              disabled={disabled}
              value={String(activePageSize)}
              aria-label={resolvedLabels.itemsPerPage(activePageSize)}
              options={pageSizeOptions.map((option) => ({
                value: String(option),
                label: resolvedLabels.itemsPerPage(option),
              }))}
              className={cn(
                size === 'large' &&
                  'h-[calc(var(--agentos-control-height-control-height-md32)+var(--agentos-spacing-gap-xxs4))]',
                size === 'small' &&
                  'h-[calc(var(--agentos-control-height-control-height-md32)-var(--agentos-spacing-gap-xxs4))]',
              )}
              onValueChange={(value) => {
                const nextValue = Array.isArray(value) ? value[0] : value
                commitPageSize(Number(nextValue))
              }}
            />
          </div>
        ) : null}

        {!simple && showQuickJumper ? (
          <label className="flex shrink-0 items-center gap-agentos-gap-gap-xs8">
            <span
              className={cn(
                'whitespace-nowrap font-agentos-normal',
                'text-agentos-neutral-text-color-text-description',
                size === 'mini'
                  ? 'text-agentos-sm leading-agentos-18'
                  : 'text-agentos-md leading-agentos-18',
              )}
            >
              {resolvedLabels.goTo}
            </span>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              size={size === 'mini' ? 'sm' : 'default'}
              disabled={disabled}
              value={quickJumpValue}
              aria-label={resolvedLabels.goTo}
              containerClassName={cn(
                'w-agentos-control-control-height-lg40 shrink-0',
                size === 'large' &&
                  'h-[calc(var(--agentos-control-height-control-height-md32)+var(--agentos-spacing-gap-xxs4))]',
                size === 'small' &&
                  'h-[calc(var(--agentos-control-height-control-height-md32)-var(--agentos-spacing-gap-xxs4))]',
              )}
              className="text-center"
              onChange={(event) => {
                const nextValue = event.target.value
                if (/^\d*$/.test(nextValue)) setQuickJumpValue(nextValue)
              }}
              onBlur={commitQuickJump}
              onKeyDown={handleQuickJumpKeyDown}
            />
          </label>
        ) : null}
      </nav>
    )
  },
)

Pagination.displayName = 'Pagination'
