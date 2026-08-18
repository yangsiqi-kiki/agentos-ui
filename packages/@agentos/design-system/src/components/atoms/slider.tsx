import { cva } from 'class-variance-authority'
import {
  forwardRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Input } from './input'

const sliderRootVariants = cva(
  'flex w-full items-center gap-agentos-margin-margin-md20',
  {
    variants: {
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export interface SliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'onChange'
  > {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  showInput?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  onValueChange?: (value: number) => void
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      disabled,
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      showInput = true,
      leadingIcon,
      trailingIcon,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const resolvedValue = isControlled ? Number(value) : uncontrolledValue
    const percent =
      max === min ? 0 : ((resolvedValue - min) / (max - min)) * 100

    const commitValue = (next: number) => {
      const clamped = Math.min(max, Math.max(min, next))
      if (!isControlled) setUncontrolledValue(clamped)
      onValueChange?.(clamped)
    }

    const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
      commitValue(Number(event.target.value))
    }

    return (
      <div
        className={cn(
          sliderRootVariants({ disabled: Boolean(disabled) }),
          className,
        )}
      >
        {leadingIcon ? (
          <span className="shrink-0 text-agentos-neutral-icon-color-icon [&_svg]:size-agentos-icon-icon-size-md16">
            {leadingIcon}
          </span>
        ) : null}
        <div className="relative min-w-0 flex-1 py-[15px]">
          <div className="relative h-0.5 w-full rounded-[10px] bg-agentos-neutral-border-color-border">
            <div
              className="absolute inset-y-0 left-0 rounded-[10px] bg-agentos-brand-primary-color-primary"
              style={{ width: `${percent}%` }}
            />
          </div>
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            value={resolvedValue}
            className={cn(
              'absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent',
              'disabled:cursor-not-allowed',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:size-3',
              '[&::-webkit-slider-thumb]:rounded-agentos-rounded-full999',
              '[&::-webkit-slider-thumb]:bg-agentos-brand-primary-color-primary',
              '[&::-webkit-slider-thumb]:border-0',
              '[&::-moz-range-thumb]:size-3',
              '[&::-moz-range-thumb]:rounded-agentos-rounded-full999',
              '[&::-moz-range-thumb]:border-0',
              '[&::-moz-range-thumb]:bg-agentos-brand-primary-color-primary',
            )}
            onChange={handleRangeChange}
            {...props}
          />
        </div>
        {trailingIcon ? (
          <span className="shrink-0 text-agentos-neutral-icon-color-icon [&_svg]:size-agentos-icon-icon-size-md16">
            {trailingIcon}
          </span>
        ) : null}
        {showInput ? (
          <Input
            type="number"
            size="default"
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            value={resolvedValue}
            containerClassName="w-[60px] shrink-0"
            showStatusIcon={false}
            onChange={(event) => {
              const next = Number(event.target.value)
              if (Number.isNaN(next)) return
              commitValue(next)
            }}
          />
        ) : null}
      </div>
    )
  },
)

Slider.displayName = 'Slider'
