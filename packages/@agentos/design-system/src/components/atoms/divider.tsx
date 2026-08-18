import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

const dividerVariants = cva('shrink-0 border-0', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px min-h-agentos-icon-icon-size-md16',
    },
    dashed: {
      true: 'border-dashed',
      false: 'border-solid',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    dashed: false,
  },
})

const dividerLineClass = cn(
  'border-agentos-neutral-border-color-border',
  'bg-agentos-neutral-border-color-border',
)

export interface DividerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof dividerVariants> {
  children?: ReactNode
  labelAlign?: 'left' | 'center' | 'right'
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = 'horizontal',
      dashed = false,
      children,
      labelAlign = 'center',
      ...props
    },
    ref,
  ) => {
    const resolvedOrientation = orientation ?? 'horizontal'
    const isDashed = Boolean(dashed)
    const hasLabel = children != null && children !== ''

    if (resolvedOrientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            dividerVariants({ orientation: 'vertical', dashed: isDashed }),
            isDashed
              ? 'w-0 border-l bg-transparent'
              : dividerLineClass,
            isDashed && 'border-agentos-neutral-border-color-border',
            className,
          )}
          {...props}
        />
      )
    }

    if (!hasLabel) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn(
            dividerVariants({ orientation: 'horizontal', dashed: isDashed }),
            isDashed
              ? 'h-0 border-t bg-transparent'
              : dividerLineClass,
            isDashed && 'border-agentos-neutral-border-color-border',
            className,
          )}
          {...props}
        />
      )
    }

    const lineClass = cn(
      'min-w-0 flex-1',
      isDashed
        ? 'h-0 border-t border-dashed border-agentos-neutral-border-color-border'
        : cn('h-px', dividerLineClass),
    )

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          'flex w-full items-center gap-agentos-padding-padding16',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            lineClass,
            labelAlign === 'left' && 'flex-[0.15]',
            labelAlign === 'right' && 'flex-[0.85]',
          )}
        />
        <span className="shrink-0 font-agentos-en font-agentos-normal text-agentos-md leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text-secondary">
          {children}
        </span>
        <div
          className={cn(
            lineClass,
            labelAlign === 'left' && 'flex-[0.85]',
            labelAlign === 'right' && 'flex-[0.15]',
          )}
        />
      </div>
    )
  },
)

Divider.displayName = 'Divider'
