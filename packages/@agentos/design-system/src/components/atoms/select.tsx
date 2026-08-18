import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, X } from 'lucide-react'
import {
  forwardRef,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const selectTriggerVariants = cva(
  cn(
    'flex w-full items-center border border-solid transition-colors',
    'bg-agentos-neutral-bg-color-bg-container',
    'gap-agentos-gap-gap-xxs4',
    'font-agentos-en font-agentos-normal tracking-agentos-normal',
    'focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:bg-agentos-neutral-bg-color-bg-container-disabled',
    'disabled:border-agentos-neutral-border-color-border',
    'disabled:text-agentos-neutral-text-color-text-disabled',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ),
  {
    variants: {
      size: {
        sm: cn(
          'h-agentos-control-control-height-sm24 px-agentos-padding-padding-xs8',
          'rounded-agentos-rounded-sm4 text-agentos-sm leading-agentos-18',
          '[&_svg]:size-agentos-icon-icon-size-sm12',
        ),
        default: cn(
          'h-agentos-control-control-height-md32 px-agentos-padding-padding-sm12',
          'rounded-agentos-rounded-lg8 text-agentos-md leading-agentos-18',
          '[&_svg]:size-agentos-icon-icon-size-sm12',
        ),
        lg: cn(
          'h-agentos-control-control-height-lg40 px-agentos-padding-padding-sm12',
          'rounded-agentos-rounded-lg8 text-agentos-lg leading-agentos-24',
          '[&_svg]:size-agentos-icon-icon-size-md16',
        ),
      },
      open: {
        true: cn(
          'border-agentos-brand-primary-color-primary',
          'shadow-[0_0_0_2px_var(--agentos-brand-primary-color-primary-outline)]',
        ),
        false: cn(
          'border-agentos-neutral-border-color-border',
          'hover:border-agentos-neutral-border-color-border-hover',
          'hover:bg-[linear-gradient(var(--agentos-neutral-fill-color-fill-tertiary),var(--agentos-neutral-fill-color-fill-tertiary)),linear-gradient(var(--agentos-neutral-bg-color-bg-container),var(--agentos-neutral-bg-color-bg-container))]',
        ),
      },
    },
    defaultVariants: {
      size: 'default',
      open: false,
    },
  },
)

export interface SelectOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'>,
    VariantProps<typeof selectTriggerVariants> {
  options: SelectOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  multiple?: boolean
  placeholder?: string
  clearable?: boolean
  clearLabel?: string
  emptyText?: string
  onValueChange?: (value: string | string[]) => void
}

function toArray(value?: string | string[]) {
  if (value == null) return [] as string[]
  return Array.isArray(value) ? value : [value]
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      size = 'default',
      options,
      value,
      defaultValue,
      multiple = false,
      placeholder = 'Please select',
      clearable = false,
      clearLabel = 'Clear',
      emptyText = 'No options',
      disabled,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const listboxId = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(
      toArray(defaultValue),
    )
    const [open, setOpen] = useState(false)

    const selectedValues = isControlled
      ? toArray(value)
      : uncontrolledValue

    const selectedOptions = useMemo(
      () => options.filter((option) => selectedValues.includes(option.value)),
      [options, selectedValues],
    )

    const commitValue = (nextValues: string[]) => {
      if (!isControlled) setUncontrolledValue(nextValues)
      if (multiple) {
        onValueChange?.(nextValues)
      } else {
        onValueChange?.(nextValues[0] ?? '')
      }
    }

    const toggleOption = (optionValue: string) => {
      if (multiple) {
        const exists = selectedValues.includes(optionValue)
        const next = exists
          ? selectedValues.filter((item) => item !== optionValue)
          : [...selectedValues, optionValue]
        commitValue(next)
        return
      }
      commitValue([optionValue])
      setOpen(false)
    }

    const clearSelection = () => {
      commitValue([])
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    return (
      <div ref={rootRef} className="relative w-full">
        <button
          ref={ref}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          disabled={disabled}
          className={cn(
            selectTriggerVariants({ size, open }),
            className,
          )}
          onClick={() => {
            if (disabled) return
            setOpen((prev) => !prev)
          }}
          onKeyDown={handleKeyDown}
          onBlur={(event) => {
            if (!rootRef.current?.contains(event.relatedTarget as Node)) {
              setOpen(false)
            }
          }}
          {...props}
        >
          <span className="flex min-w-0 flex-1 items-center gap-agentos-gap-gap-xxs4 overflow-hidden text-left">
            {selectedOptions.length === 0 ? (
              <span className="truncate text-agentos-neutral-text-color-text-placeholder">
                {placeholder}
              </span>
            ) : multiple ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className={cn(
                    'inline-flex max-w-full items-center gap-0.5 truncate',
                    'rounded-agentos-rounded-sm4 bg-agentos-neutral-fill-color-fill-secondary',
                    'px-agentos-padding-padding-xxs4 text-agentos-neutral-text-color-text',
                  )}
                >
                  <span className="truncate">{option.label}</span>
                </span>
              ))
            ) : (
              <span className="truncate text-agentos-neutral-text-color-text">
                {selectedOptions[0]?.label}
              </span>
            )}
          </span>
          {clearable && selectedValues.length > 0 && !disabled ? (
            <span
              role="button"
              tabIndex={-1}
              aria-label={clearLabel}
              className="pointer-events-auto text-agentos-neutral-icon-color-icon"
              onClick={(event) => {
                event.stopPropagation()
                clearSelection()
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  event.stopPropagation()
                  clearSelection()
                }
              }}
            >
              <X aria-hidden="true" />
            </span>
          ) : (
            <ChevronDown
              aria-hidden="true"
              className="text-agentos-neutral-icon-color-icon"
            />
          )}
        </button>
        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className={cn(
              'absolute z-50 mt-1 max-h-60 w-full overflow-auto',
              'rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border',
              'bg-agentos-neutral-bg-color-bg-container py-1 shadow-md',
            )}
          >
            {options.length === 0 ? (
              <li className="px-agentos-padding-padding-sm12 py-agentos-padding-padding-xs8 text-agentos-md text-agentos-neutral-text-color-text-secondary">
                {emptyText}
              </li>
            ) : (
              options.map((option) => {
                const selected = selectedValues.includes(option.value)
                return (
                  <li key={option.value} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      disabled={option.disabled}
                      className={cn(
                        'flex w-full items-center px-agentos-padding-padding-sm12 py-agentos-padding-padding-xs8 text-left',
                        'font-agentos-en text-agentos-md leading-agentos-18',
                        'hover:bg-agentos-neutral-fill-color-fill-tertiary',
                        'disabled:cursor-not-allowed disabled:text-agentos-neutral-text-color-text-disabled',
                        selected
                          ? 'bg-agentos-brand-primary-color-primary-bg text-agentos-brand-primary-color-primary'
                          : 'text-agentos-neutral-text-color-text',
                      )}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        if (option.disabled) return
                        toggleOption(option.value)
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'
