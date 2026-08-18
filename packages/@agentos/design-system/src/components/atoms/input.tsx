import { cva, type VariantProps } from 'class-variance-authority'
import { CircleAlert, CircleCheck, CircleX, type LucideIcon } from 'lucide-react'
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const inputContainerVariants = cva(
  cn(
    'flex w-full items-center border border-solid transition-colors',
    'bg-agentos-neutral-bg-color-bg-container',
    'gap-agentos-gap-gap-xs8',
    'focus-within:outline-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_button]:pointer-events-auto [&_button_svg]:pointer-events-none',
  ),
  {
    variants: {
      size: {
        sm: cn(
          'h-agentos-control-control-height-sm24 px-agentos-padding-padding-xs8',
          'rounded-agentos-rounded-sm4',
          '[&_svg]:size-agentos-icon-icon-size-sm12',
        ),
        default: cn(
          'h-agentos-control-control-height-md32 px-agentos-padding-padding-sm12',
          'rounded-agentos-rounded-lg8',
          '[&_svg]:size-agentos-icon-icon-size-md16',
        ),
        lg: cn(
          'h-agentos-control-control-height-lg40 px-agentos-padding-padding-sm12',
          'rounded-agentos-rounded-lg8',
          '[&_svg]:size-agentos-icon-icon-size-md16',
        ),
      },
      status: {
        default: cn(
          'border-agentos-neutral-border-color-border',
          'hover:border-agentos-neutral-border-color-border-hover',
          'hover:bg-[linear-gradient(var(--agentos-neutral-fill-color-fill-tertiary),var(--agentos-neutral-fill-color-fill-tertiary)),linear-gradient(var(--agentos-neutral-bg-color-bg-container),var(--agentos-neutral-bg-color-bg-container))]',
          'focus-within:border-agentos-brand-primary-color-primary',
          'focus-within:shadow-[0_0_0_2px_var(--agentos-brand-primary-color-primary-outline)]',
          'focus-within:hover:bg-agentos-neutral-bg-color-bg-container',
        ),
        danger: cn(
          'border-agentos-brand-error-color-error',
          'focus-within:shadow-[0_0_0_2px_var(--agentos-brand-error-color-error-outline)]',
        ),
        warning: cn(
          'border-agentos-brand-warning-color-warning',
          'focus-within:shadow-[0_0_0_2px_var(--agentos-brand-warning-color-warning-border)]',
        ),
        success: cn(
          'border-agentos-brand-success-color-success',
          'focus-within:shadow-[0_0_0_2px_var(--agentos-brand-success-color-success-outline)]',
        ),
      },
    },
    defaultVariants: {
      size: 'default',
      status: 'default',
    },
  },
)

const inputContainerDisabledClass = cn(
  'border-agentos-neutral-border-color-border',
  'bg-agentos-neutral-bg-color-bg-container-disabled',
  'hover:border-agentos-neutral-border-color-border',
  'hover:bg-agentos-neutral-bg-color-bg-container-disabled',
  'focus-within:shadow-none',
)

const inputFieldVariants = cva(
  cn(
    'min-w-0 flex-1 border-0 bg-transparent p-0 outline-none',
    'font-agentos-en font-agentos-normal tracking-agentos-normal',
    'text-agentos-neutral-text-color-text',
    'placeholder:text-agentos-neutral-text-color-text-placeholder',
    'disabled:cursor-not-allowed disabled:text-agentos-neutral-text-color-text-disabled',
    'disabled:placeholder:text-agentos-neutral-text-color-text-disabled',
  ),
  {
    variants: {
      size: {
        sm: 'text-agentos-sm leading-agentos-18',
        default: 'text-agentos-base leading-agentos-20',
        lg: 'text-agentos-lg leading-agentos-24',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const adornmentTextVariants = cva(
  'shrink-0 whitespace-nowrap font-agentos-en font-agentos-normal tracking-agentos-normal text-agentos-neutral-text-color-text',
  {
    variants: {
      size: {
        sm: 'text-agentos-sm leading-agentos-18',
        default: 'text-agentos-md leading-agentos-18',
        lg: 'text-agentos-lg leading-agentos-24',
      },
      disabled: {
        true: 'text-agentos-neutral-text-color-text-disabled',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      disabled: false,
    },
  },
)

const inputStatusIconMap: Record<
  'danger' | 'warning' | 'success',
  { Icon: LucideIcon; className: string }
> = {
  danger: {
    Icon: CircleX,
    className: 'text-agentos-brand-error-color-error',
  },
  warning: {
    Icon: CircleAlert,
    className: 'text-agentos-brand-warning-color-warning',
  },
  success: {
    Icon: CircleCheck,
    className: 'text-agentos-brand-success-color-success',
  },
}

function InputStatusIcon({
  status,
  className,
}: {
  status: 'danger' | 'warning' | 'success'
  className?: string
}) {
  const { Icon, className: colorClass } = inputStatusIconMap[status]
  return <Icon aria-hidden="true" className={cn(colorClass, className)} />
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputContainerVariants> {
  prefixIcon?: ReactNode
  suffixIcon?: ReactNode
  prefixText?: ReactNode
  suffixText?: ReactNode
  /** 非 default 语义态时是否展示状态图标 */
  showStatusIcon?: boolean
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      size = 'default',
      status = 'default',
      disabled,
      prefixIcon,
      suffixIcon,
      prefixText,
      suffixText,
      showStatusIcon = true,
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled)
    const resolvedStatus = status ?? 'default'
    const resolvedSize = size ?? 'default'

    return (
      <div
        className={cn(
          inputContainerVariants({
            size: resolvedSize,
            status: resolvedStatus,
          }),
          isDisabled && inputContainerDisabledClass,
          containerClassName,
        )}
      >
        {prefixIcon}
        {prefixText != null && prefixText !== '' && (
          <span
            className={adornmentTextVariants({
              size: resolvedSize,
              disabled: isDisabled,
            })}
          >
            {prefixText}
          </span>
        )}
        <input
          ref={ref}
          disabled={isDisabled}
          className={cn(
            inputFieldVariants({ size: resolvedSize }),
            'caret-[var(--agentos-brand-primary-color-primary)]',
            className,
          )}
          {...props}
        />
        {suffixText != null && suffixText !== '' && (
          <span
            className={adornmentTextVariants({
              size: resolvedSize,
              disabled: isDisabled,
            })}
          >
            {suffixText}
          </span>
        )}
        {suffixIcon}
        {showStatusIcon && resolvedStatus !== 'default' && (
          <InputStatusIcon status={resolvedStatus} />
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
