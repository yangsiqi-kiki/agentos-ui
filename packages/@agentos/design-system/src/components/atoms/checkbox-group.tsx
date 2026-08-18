import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Checkbox } from './checkbox'

export interface CheckboxGroupOption {
  value: string
  label: ReactNode
  disabled?: boolean
  variant?: 'default' | 'star'
}

export interface CheckboxGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  options: CheckboxGroupOption[]
  value?: string[]
  defaultValue?: string[]
  name?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  onValueChange?: (value: string[]) => void
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      className,
      options,
      value,
      defaultValue = [],
      name,
      disabled = false,
      orientation = 'horizontal',
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const resolvedValue = value ?? internalValue

    const updateValue = (nextValue: string[]) => {
      if (!isControlled) setInternalValue(nextValue)
      onValueChange?.(nextValue)
    }

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex gap-agentos-gap-gap16',
          orientation === 'vertical' ? 'flex-col items-start' : 'flex-row flex-wrap',
          className,
        )}
        {...props}
      >
        {options.map((option) => {
          const isChecked = resolvedValue.includes(option.value)

          return (
            <Checkbox
              key={option.value}
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={disabled || option.disabled}
              variant={option.variant}
              label={option.label}
              onCheckedChange={(nextChecked) => {
                if (nextChecked === true) {
                  updateValue([...resolvedValue, option.value])
                  return
                }
                updateValue(resolvedValue.filter((item) => item !== option.value))
              }}
            />
          )
        })}
      </div>
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'
