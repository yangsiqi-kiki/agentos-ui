import { cva, type VariantProps } from 'class-variance-authority'
import { CircleAlert, CircleCheck, CircleX, Info, X } from 'lucide-react'
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const tagVariants = cva(
  cn(
    'inline-flex max-w-[120px] min-w-12 items-center gap-agentos-gap-gap-xxs4 overflow-hidden',
    'font-agentos-en font-agentos-normal tracking-agentos-normal',
    '[&_svg]:shrink-0',
  ),
  {
    variants: {
      size: {
        sm: 'h-4 px-agentos-padding-padding6 text-agentos-sm leading-agentos-14 [&_svg]:size-agentos-icon-icon-size-sm12',
        default:
          'h-[22px] px-agentos-padding-padding-xs8 text-agentos-md leading-agentos-18 [&_svg]:size-agentos-icon-icon-size-sm12',
        lg: 'h-agentos-control-control-height-md32 px-agentos-padding-padding-sm12 text-agentos-base leading-agentos-20 [&_svg]:size-agentos-icon-icon-size-md16',
      },
      shape: {
        rounded: 'rounded-agentos-rounded-full999',
        rectangle: 'rounded-agentos-rounded-sm4',
      },
      color: {
        default:
          'bg-agentos-neutral-fill-color-fill-tertiary text-agentos-neutral-text-color-text-tertiary',
        blue: 'bg-agentos-base-blue-50 text-agentos-base-blue-600',
        green:
          'bg-agentos-brand-success-color-success-bg text-agentos-brand-success-color-success',
        purple: 'bg-agentos-base-purple-50 text-agentos-base-purple-500',
        dusk: 'bg-agentos-base-gold-50 text-agentos-base-gold-500',
        'autumn-red': 'bg-agentos-base-orange-50 text-agentos-base-orange-500',
        'romantic-red':
          'bg-agentos-base-pink-50 text-agentos-base-pink-600',
        info: 'bg-agentos-brand-info-color-info-bg text-agentos-brand-info-color-info',
        success:
          'bg-agentos-brand-success-color-success-bg text-agentos-brand-success-color-success',
        warning:
          'bg-agentos-brand-warning-color-warning-bg text-agentos-brand-warning-color-warning',
        danger:
          'bg-agentos-brand-error-color-error-bg text-agentos-brand-error-color-error',
      },
      bordered: {
        true: 'border border-solid',
        false: 'border border-transparent',
      },
      appearance: {
        soft: '',
        outline: 'bg-transparent',
        dashed: 'bg-transparent border-dashed',
        ghost: 'bg-transparent border-transparent',
      },
    },
    compoundVariants: [
      {
        color: 'default',
        bordered: true,
        className: 'border-agentos-neutral-border-color-border',
      },
      {
        color: 'blue',
        bordered: true,
        className: 'border-agentos-base-blue-200',
      },
      {
        color: 'green',
        bordered: true,
        className: 'border-agentos-brand-success-color-success-border',
      },
      {
        color: 'purple',
        bordered: true,
        className: 'border-agentos-base-purple-200',
      },
      {
        color: 'dusk',
        bordered: true,
        className: 'border-agentos-base-gold-200',
      },
      {
        color: 'autumn-red',
        bordered: true,
        className: 'border-agentos-base-orange-200',
      },
      {
        color: 'romantic-red',
        bordered: true,
        className: 'border-agentos-base-pink-200',
      },
      {
        color: 'info',
        bordered: true,
        className: 'border-agentos-brand-info-color-info-border',
      },
      {
        color: 'success',
        bordered: true,
        className: 'border-agentos-brand-success-color-success-border',
      },
      {
        color: 'warning',
        bordered: true,
        className: 'border-agentos-brand-warning-color-warning-border',
      },
      {
        color: 'danger',
        bordered: true,
        className: 'border-agentos-brand-error-color-error-border',
      },
    ],
    defaultVariants: {
      size: 'default',
      shape: 'rounded',
      color: 'default',
      bordered: false,
      appearance: 'soft',
    },
  },
)

const semanticIconMap = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  danger: CircleX,
} as const

export interface TagProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof tagVariants> {
  icon?: ReactNode
  suffix?: ReactNode
  closable?: boolean
  closeLabel?: string
  onClose?: () => void
  showSemanticIcon?: boolean
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      size = 'default',
      shape = 'rounded',
      color = 'default',
      bordered = false,
      appearance = 'soft',
      icon,
      suffix,
      closable = false,
      closeLabel = 'Remove',
      onClose,
      showSemanticIcon = false,
      children,
      ...props
    },
    ref,
  ) => {
    const semanticColor =
      color === 'info' ||
      color === 'success' ||
      color === 'warning' ||
      color === 'danger'
        ? color
        : null
    const SemanticIcon =
      showSemanticIcon && semanticColor
        ? semanticIconMap[semanticColor]
        : null

    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({
            size,
            shape,
            color,
            bordered: bordered || appearance === 'outline' || appearance === 'dashed',
            appearance,
          }),
          className,
        )}
        {...props}
      >
        {icon}
        {SemanticIcon ? <SemanticIcon aria-hidden="true" /> : null}
        <span className="min-w-0 flex-1 truncate text-center">{children}</span>
        {suffix != null ? (
          <span className="inline-flex shrink-0 items-center">{suffix}</span>
        ) : null}
        {closable ? (
          <button
            type="button"
            aria-label={closeLabel}
            className="inline-flex shrink-0 text-current hover:opacity-80"
            onClick={(event) => {
              event.stopPropagation()
              onClose?.()
            }}
          >
            <X aria-hidden="true" />
          </button>
        ) : null}
      </span>
    )
  },
)

Tag.displayName = 'Tag'
