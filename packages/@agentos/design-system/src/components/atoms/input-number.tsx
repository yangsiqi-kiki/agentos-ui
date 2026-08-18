import { cva } from 'class-variance-authority'
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const inputNumberVariants = cva(
  cn(
    'group flex w-40 items-center overflow-hidden border border-solid',
    'border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container',
    'font-agentos-en font-agentos-normal tracking-agentos-normal text-agentos-neutral-text-color-text',
    'transition-colors hover:border-agentos-neutral-border-color-border-hover',
    'focus-within:border-agentos-brand-primary-color-primary',
    'focus-within:shadow-[0_0_0_2px_var(--agentos-brand-primary-color-primary-outline)]',
    '[&_svg]:shrink-0',
  ),
  {
    variants: {
      size: {
        sm: cn(
          'h-agentos-control-control-height-sm24 rounded-agentos-rounded-sm4',
          'text-agentos-md leading-agentos-18 [&_svg]:size-agentos-icon-icon-size-sm12',
        ),
        default: cn(
          'h-agentos-control-control-height-md32 rounded-agentos-rounded-lg8',
          'text-agentos-md leading-agentos-18 [&_svg]:size-agentos-icon-icon-size-md16',
        ),
        lg: cn(
          'h-agentos-control-control-height-lg40 rounded-agentos-rounded-lg8',
          'text-agentos-lg leading-agentos-24 [&_svg]:size-agentos-icon-icon-size-md16',
        ),
      },
      disabled: {
        true: cn(
          'cursor-not-allowed border-agentos-neutral-border-color-border',
          'bg-agentos-neutral-bg-color-bg-container-disabled text-agentos-neutral-text-color-text-disabled',
          'shadow-none hover:border-agentos-neutral-border-color-border',
        ),
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      disabled: false,
    },
  },
)

export interface InputNumberProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'onChange' | 'prefix' | 'size' | 'type' | 'value'
  > {
  value?: number
  defaultValue?: number
  size?: 'sm' | 'default' | 'lg'
  prefix?: ReactNode
  suffix?: ReactNode
  buttonMode?: boolean
  containerClassName?: string
  decrementLabel?: string
  incrementLabel?: string
  onValueChange?: (value: number) => void
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      value,
      defaultValue = 0,
      min = Number.NEGATIVE_INFINITY,
      max = Number.POSITIVE_INFINITY,
      step = 1,
      prefix = '¥',
      suffix = '%',
      buttonMode = false,
      containerClassName,
      size = 'default',
      disabled = false,
      decrementLabel = 'Decrease value',
      incrementLabel = 'Increase value',
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const resolvedValue = value ?? internalValue
    const numericMin = Number(min)
    const numericMax = Number(max)
    const numericStep = Number(step)

    const updateValue = (nextValue: number) => {
      const clampedValue = Math.min(numericMax, Math.max(numericMin, nextValue))
      if (!isControlled) setInternalValue(clampedValue)
      onValueChange?.(clampedValue)
    }

    const controlClassName = cn(
      'inline-flex h-full shrink-0 items-center justify-center',
      'text-agentos-neutral-icon-color-icon-hover transition-colors',
      'hover:bg-agentos-neutral-fill-color-fill-tertiary disabled:cursor-not-allowed',
      'disabled:text-agentos-neutral-text-color-text-disabled',
      size === 'sm'
        ? 'w-agentos-control-control-height-sm24'
        : 'w-agentos-control-control-height-md32',
    )

    return (
      <div
        className={cn(
          inputNumberVariants({ size, disabled }),
          containerClassName,
        )}
      >
        {buttonMode ? (
          <button
            type="button"
            className={controlClassName}
            aria-label={decrementLabel}
            disabled={disabled || resolvedValue <= numericMin}
            onClick={() => updateValue(resolvedValue - numericStep)}
          >
            <Minus aria-hidden="true" />
          </button>
        ) : null}
        <div
          className={cn(
            'flex min-w-0 flex-1 items-center gap-agentos-gap-gap-sm12',
            buttonMode
              ? 'h-full border-x border-agentos-neutral-border-color-split px-agentos-padding-padding-sm12'
              : 'px-agentos-padding-padding-sm12',
          )}
        >
          {prefix != null && prefix !== '' ? <span className="shrink-0">{prefix}</span> : null}
          <input
            ref={ref}
            type="number"
            value={resolvedValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={cn(
              'min-w-0 flex-1 border-0 bg-transparent p-0 outline-none',
              'text-agentos-neutral-text-color-text disabled:text-agentos-neutral-text-color-text-disabled',
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              buttonMode && 'text-center',
              className,
            )}
            onChange={(event) => {
              const nextValue = event.target.valueAsNumber
              if (!Number.isNaN(nextValue)) updateValue(nextValue)
            }}
            {...props}
          />
          {suffix != null && suffix !== '' ? <span className="shrink-0">{suffix}</span> : null}
        </div>
        {!buttonMode && !disabled ? (
          <span
            className={cn(
              'flex h-full w-[18px] shrink-0 flex-col border-l border-agentos-neutral-border-color-split',
              'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
              '[&_svg]:size-agentos-icon-icon-size-sm12',
            )}
          >
            <button
              type="button"
              className="inline-flex min-h-0 flex-1 items-center justify-center hover:bg-agentos-neutral-fill-color-fill-tertiary"
              aria-label={incrementLabel}
              disabled={resolvedValue >= numericMax}
              onClick={() => updateValue(resolvedValue + numericStep)}
            >
              <ChevronUp aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex min-h-0 flex-1 items-center justify-center border-t border-agentos-neutral-border-color-split hover:bg-agentos-neutral-fill-color-fill-tertiary"
              aria-label={decrementLabel}
              disabled={resolvedValue <= numericMin}
              onClick={() => updateValue(resolvedValue - numericStep)}
            >
              <ChevronDown aria-hidden="true" />
            </button>
          </span>
        ) : null}
        {buttonMode ? (
          <button
            type="button"
            className={controlClassName}
            aria-label={incrementLabel}
            disabled={disabled || resolvedValue >= numericMax}
            onClick={() => updateValue(resolvedValue + numericStep)}
          >
            <Plus aria-hidden="true" />
          </button>
        ) : null}
      </div>
    )
  },
)

InputNumber.displayName = 'InputNumber'
