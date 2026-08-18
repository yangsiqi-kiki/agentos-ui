import { cva, type VariantProps } from 'class-variance-authority'
import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const switchVariants = cva(
  cn(
    'relative inline-flex shrink-0 cursor-pointer items-center transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-agentos-brand-primary-color-primary focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
  ),
  {
    variants: {
      size: {
        default: '',
        sm: '',
      },
      shape: {
        round: 'rounded-agentos-rounded3-xl24',
        rectangle: 'rounded-agentos-rounded-lg8',
        linear: 'rounded-agentos-rounded-none0 bg-transparent',
      },
      layout: {
        plain: '',
        labeled: 'w-auto gap-[6px]',
        linear: '',
      },
    },
    compoundVariants: [
      {
        layout: 'plain',
        size: 'default',
        className:
          'h-agentos-control-control-height-sm24 w-10 p-agentos-padding-padding-xxs4',
      },
      {
        layout: 'plain',
        size: 'sm',
        className: 'h-4 w-7 p-0.5',
      },
      {
        layout: 'labeled',
        size: 'default',
        className: 'h-agentos-control-control-height-sm24 py-agentos-padding-padding-xxs4',
      },
      {
        layout: 'labeled',
        size: 'sm',
        className: 'h-4 py-0.5',
      },
      {
        layout: 'linear',
        size: 'default',
        className: 'h-6 w-9 p-0',
      },
      {
        layout: 'linear',
        size: 'sm',
        className: 'h-4 w-7 p-0',
      },
    ],
    defaultVariants: {
      size: 'default',
      shape: 'round',
      layout: 'plain',
    },
  },
)

const thumbVariants = cva(
  cn(
    'pointer-events-none relative z-[1] flex shrink-0 items-center justify-center',
    'bg-agentos-neutral-text-color-text-light-solid',
    'rounded-agentos-rounded-full999 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]',
    'transition-transform [&_svg]:size-agentos-icon-icon-size-sm12',
  ),
  {
    variants: {
      size: {
        default: 'size-4',
        sm: 'size-3',
      },
      shape: {
        round: '',
        rectangle: '',
        linear: '',
      },
      checked: {
        true: '',
        false: 'translate-x-0',
      },
      sliding: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        sliding: true,
        shape: ['round', 'rectangle'],
        size: 'default',
        checked: true,
        className: 'translate-x-4',
      },
      {
        sliding: true,
        shape: ['round', 'rectangle'],
        size: 'sm',
        checked: true,
        className: 'translate-x-3',
      },
      {
        shape: 'linear',
        size: 'default',
        className: 'absolute left-0 top-0.5 size-5',
      },
      {
        shape: 'linear',
        size: 'sm',
        className: 'absolute left-0 top-0 size-4',
      },
      {
        shape: 'linear',
        size: 'default',
        checked: true,
        className: 'translate-x-4',
      },
      {
        shape: 'linear',
        size: 'sm',
        checked: true,
        className: 'translate-x-3',
      },
    ],
    defaultVariants: {
      size: 'default',
      shape: 'round',
      checked: false,
      sliding: true,
    },
  },
)

function resolveTrackTone({
  checked,
  disabled,
}: {
  checked: boolean
  disabled?: boolean
}) {
  if (checked) {
    if (disabled) {
      return 'bg-agentos-brand-primary-color-primary-border'
    }
    return cn(
      'bg-agentos-brand-primary-color-primary',
      'hover:bg-agentos-brand-primary-color-primary-hover',
    )
  }

  if (disabled) {
    return 'bg-agentos-neutral-bg-color-bg-container-disabled'
  }

  return 'bg-agentos-neutral-border-color-border'
}

function resolveTrackContentTone({
  checked,
  disabled,
}: {
  checked: boolean
  disabled?: boolean
}) {
  if (!checked && disabled) {
    return 'text-agentos-neutral-text-color-text-disabled'
  }
  return 'text-agentos-neutral-text-color-text-light-solid'
}

function resolveThumbIconTone({
  checked,
  disabled,
}: {
  checked: boolean
  disabled?: boolean
}) {
  if (disabled) {
    return 'text-agentos-neutral-text-color-text-disabled'
  }
  if (checked) {
    return 'text-agentos-brand-primary-color-primary'
  }
  return 'text-agentos-neutral-icon-color-icon'
}

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'children'>,
    Omit<VariantProps<typeof switchVariants>, 'layout'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Icon rendered inside the thumb */
  thumbIcon?: ReactNode
  /** Track content when checked (icon or text such as "ON") */
  checkedLabel?: ReactNode
  /** Track content when unchecked (icon or text such as "OFF") */
  uncheckedLabel?: ReactNode
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size = 'default',
      shape = 'round',
      checked,
      defaultChecked = false,
      disabled,
      onCheckedChange,
      thumbIcon,
      checkedLabel,
      uncheckedLabel,
      ...props
    },
    ref,
  ) => {
    const isControlled = checked !== undefined
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked)
    const isChecked = isControlled ? Boolean(checked) : uncontrolledChecked
    const isLinear = shape === 'linear'
    const trackContent = isChecked ? checkedLabel : uncheckedLabel
    const hasTrackContent =
      !isLinear && trackContent != null && trackContent !== false
    const sliding = !hasTrackContent

    let layout: 'plain' | 'labeled' | 'linear' = 'plain'
    if (isLinear) {
      layout = 'linear'
    } else if (hasTrackContent) {
      layout = 'labeled'
    }

    const handleToggle = () => {
      if (disabled) return
      const next = !isChecked
      if (!isControlled) setUncontrolledChecked(next)
      onCheckedChange?.(next)
    }

    const trackTone = resolveTrackTone({
      checked: isChecked,
      disabled,
    })

    let labeledPadding: string | undefined
    if (hasTrackContent) {
      if (isChecked) {
        labeledPadding =
          'pl-agentos-padding-padding-xs8 pr-agentos-padding-padding-xxs4'
      } else {
        labeledPadding =
          'pl-agentos-padding-padding-xxs4 pr-agentos-padding-padding-xs8'
      }
    }

    let linearTrackTop = 'top-[5px]'
    if (size === 'default') {
      linearTrackTop = 'top-[9px]'
    }

    const trackLabel = hasTrackContent ? (
      <span
        className={cn(
          'flex shrink-0 items-center font-agentos-en text-agentos-sm',
          'font-agentos-normal leading-4 tracking-agentos-normal',
          '[&_svg]:size-agentos-icon-icon-size-sm12',
          resolveTrackContentTone({ checked: isChecked, disabled }),
        )}
      >
        {trackContent}
      </span>
    ) : null

    const thumb = (
      <span
        className={cn(
          thumbVariants({
            size,
            shape,
            checked: isChecked,
            sliding,
          }),
          thumbIcon != null &&
            resolveThumbIconTone({ checked: isChecked, disabled }),
        )}
      >
        {thumbIcon}
      </span>
    )

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        className={cn(
          switchVariants({ size, shape, layout }),
          !isLinear && trackTone,
          labeledPadding,
          className,
        )}
        onClick={handleToggle}
        {...props}
      >
        {isLinear ? (
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-x-0 h-1.5 rounded-agentos-rounded3-xl24',
              linearTrackTop,
              trackTone,
            )}
          />
        ) : null}

        {isChecked ? trackLabel : null}
        {thumb}
        {!isChecked ? trackLabel : null}
      </button>
    )
  },
)

Switch.displayName = 'Switch'
