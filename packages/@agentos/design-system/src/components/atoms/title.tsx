import { cva, type VariantProps } from 'class-variance-authority'
import { Info } from 'lucide-react'
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Button } from './button'

const titleTextVariants = cva(
  'font-agentos-en font-agentos-semibold tracking-agentos-normal text-agentos-neutral-text-color-text',
  {
    variants: {
      level: {
        s2: 'text-agentos-md leading-agentos-18',
        s1: 'text-agentos-lg leading-agentos-24',
        h5: 'text-agentos-xl leading-agentos-28',
        h4: 'text-agentos-2xl leading-agentos-32',
        h3: 'text-agentos-4xl leading-agentos-48',
      },
    },
    defaultVariants: {
      level: 'h5',
    },
  },
)

const descriptionVariants = cva(
  'font-agentos-en font-agentos-normal tracking-agentos-normal text-agentos-neutral-text-color-text-secondary',
  {
    variants: {
      level: {
        s2: 'text-agentos-base leading-agentos-20',
        s1: 'text-agentos-base leading-agentos-20',
        h5: 'text-agentos-base leading-agentos-20',
        h4: 'text-agentos-base leading-agentos-20',
        h3: 'text-agentos-lg leading-agentos-24',
      },
    },
    defaultVariants: {
      level: 'h5',
    },
  },
)

const headingTagMap = {
  s2: 'h6',
  s1: 'h6',
  h5: 'h5',
  h4: 'h4',
  h3: 'h3',
} as const

export interface TitleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof titleTextVariants> {
  title?: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  leading?: ReactNode
  action?: ReactNode
  showInfoIcon?: boolean
  infoIconLabel?: string
  actionLabel?: string
  onActionClick?: () => void
}

export const Title = forwardRef<HTMLDivElement, TitleProps>(
  (
    {
      className,
      level = 'h5',
      title,
      description,
      align = 'left',
      leading,
      action,
      showInfoIcon = false,
      infoIconLabel = 'More information',
      actionLabel = 'Reset',
      onActionClick,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedLevel = level ?? 'h5'
    const HeadingTag = headingTagMap[resolvedLevel]
    const resolvedAction =
      action !== undefined ? (
        action
      ) : onActionClick ? (
        <Button theme="black" size="default" onClick={onActionClick}>
          {actionLabel}
        </Button>
      ) : null

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-agentos-gap-gap-xs8',
          align === 'center' ? 'flex-col items-center text-center' : 'items-start',
          className,
        )}
        {...props}
      >
        {leading ? (
          <div className="flex items-center self-stretch shrink-0">{leading}</div>
        ) : null}
        <div
          className={cn(
            'flex min-w-0 flex-col',
            align === 'center' && 'items-center',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-agentos-gap-gap-xxs4',
              align === 'center' && 'justify-center',
            )}
          >
            <HeadingTag className={titleTextVariants({ level: resolvedLevel })}>
              {title ?? children}
            </HeadingTag>
            {showInfoIcon ? (
              <span
                className="inline-flex text-agentos-neutral-icon-color-icon [&_svg]:size-agentos-icon-icon-size-md16"
                aria-label={infoIconLabel}
                title={infoIconLabel}
              >
                <Info aria-hidden="true" />
              </span>
            ) : null}
            {resolvedAction}
          </div>
          {description != null && description !== '' ? (
            <p className={descriptionVariants({ level: resolvedLevel })}>
              {description}
            </p>
          ) : null}
        </div>
      </div>
    )
  },
)

Title.displayName = 'Title'
