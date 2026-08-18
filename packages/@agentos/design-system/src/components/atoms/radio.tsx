import { cva } from 'class-variance-authority'
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ForwardedRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

export type RadioGroupVariant = 'default' | 'button'
export type RadioButtonSize = 'lg' | 'md' | 'sm' | 'mini'

const RadioGroupContext = createContext<{
  name: string
  value?: string
  disabled?: boolean
  variant: RadioGroupVariant
  size: RadioButtonSize
  onValueChange?: (value: string) => void
} | null>(null)

const radioIndicatorVariants = cva(
  cn(
    'relative flex size-agentos-icon-icon-size-md16 shrink-0 items-center justify-center',
    'rounded-agentos-rounded-full999 border border-solid transition-colors',
    'after:absolute after:size-2 after:rounded-agentos-rounded-full999 after:opacity-0 after:content-[""]',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-agentos-brand-primary-color-primary-outline',
  ),
  {
    variants: {
      checked: {
        true: 'after:opacity-100',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        checked: false,
        disabled: false,
        className:
          'border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container after:bg-agentos-brand-primary-color-primary',
      },
      {
        checked: true,
        disabled: false,
        className:
          'border-agentos-brand-primary-color-primary bg-agentos-neutral-bg-color-bg-container after:bg-agentos-brand-primary-color-primary',
      },
      {
        checked: false,
        disabled: true,
        className:
          'border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container-disabled after:bg-agentos-neutral-text-color-text-disabled',
      },
      {
        checked: true,
        disabled: true,
        className:
          'border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container-disabled after:bg-agentos-neutral-text-color-text-disabled',
      },
    ],
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  },
)

const radioButtonVariants = cva(
  cn(
    'relative inline-flex shrink-0 cursor-pointer items-center overflow-hidden',
    'rounded-agentos-rounded-md6 px-agentos-padding-padding-sm12',
    'font-agentos-en tracking-agentos-normal transition-colors',
  ),
  {
    variants: {
      size: {
        lg: 'py-agentos-padding-padding-xxs4 text-agentos-md leading-agentos-18',
        md: 'py-0.5 text-agentos-md leading-agentos-18',
        sm: 'py-0 text-agentos-md leading-agentos-18',
        mini: 'h-[18px] py-0 text-agentos-sm leading-4',
      },
      checked: {
        true:
          'font-agentos-semibold text-agentos-brand-primary-color-primary',
        false:
          'font-agentos-normal text-agentos-neutral-text-color-text-secondary hover:text-agentos-neutral-text-color-text',
      },
      disabled: {
        true: 'cursor-not-allowed bg-transparent text-agentos-neutral-text-color-text-disabled hover:bg-transparent hover:text-agentos-neutral-text-color-text-disabled',
        false: '',
      },
      showSeparator: {
        true: 'before:absolute before:left-0 before:top-1/2 before:h-agentos-icon-icon-size-sm12 before:w-px before:-translate-y-1/2 before:bg-agentos-neutral-border-color-split before:content-[""]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'lg',
      checked: false,
      disabled: false,
      showSeparator: false,
    },
  },
)

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  name?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  /** `button` 为胶囊分段控件（Figma radio-button-group） */
  variant?: RadioGroupVariant
  /** 仅 `variant="button"` 时生效 */
  size?: RadioButtonSize
  /** 仅 `variant="button"` 时生效，控制按钮之间是否显示分隔线 */
  showSeparator?: boolean
  onValueChange?: (value: string) => void
}

const assignRef = <T,>(ref: ForwardedRef<T>, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value)
    return
  }

  if (ref) ref.current = value
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      name,
      value,
      defaultValue,
      disabled,
      orientation = 'horizontal',
      variant = 'default',
      size = 'lg',
      showSeparator = false,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId()
    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const containerRef = useRef<HTMLDivElement>(null)
    const [thumbPosition, setThumbPosition] = useState<{
      left: number
      width: number
    } | null>(null)

    const resolvedValue = isControlled ? value : uncontrolledValue

    const handleValueChange = (next: string) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    }

    const isButton = variant === 'button'
    const childArray = Children.toArray(children)
    const updateThumbPosition = useCallback(() => {
      const container = containerRef.current
      if (!container || !isButton || resolvedValue == null || disabled) {
        setThumbPosition(null)
        return
      }

      const selectedButton = Array.from(
        container.querySelectorAll<HTMLElement>('[data-radio-value]'),
      ).find((button) => button.dataset.radioValue === resolvedValue)

      if (!selectedButton) {
        setThumbPosition(null)
        return
      }

      const nextPosition = {
        left: selectedButton.offsetLeft,
        width: selectedButton.offsetWidth,
      }
      setThumbPosition((current) => {
        if (
          current?.left === nextPosition.left &&
          current.width === nextPosition.width
        ) {
          return current
        }
        return nextPosition
      })
    }, [disabled, isButton, resolvedValue])

    useLayoutEffect(() => {
      updateThumbPosition()

      const container = containerRef.current
      if (!container || typeof ResizeObserver === 'undefined') return

      const observer = new ResizeObserver(updateThumbPosition)
      observer.observe(container)
      return () => observer.disconnect()
    }, [updateThumbPosition])

    return (
      <RadioGroupContext.Provider
        value={{
          name: name ?? generatedName,
          value: resolvedValue,
          disabled,
          variant,
          size,
          onValueChange: handleValueChange,
        }}
      >
        <div
          ref={(node) => {
            containerRef.current = node
            assignRef(ref, node)
          }}
          role="radiogroup"
          className={cn(
            isButton
              ? 'relative inline-flex items-center rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-content p-[3px]'
              : cn(
                  'flex gap-agentos-gap-gap-xs8',
                  orientation === 'vertical'
                    ? 'flex-col'
                    : 'flex-row flex-wrap',
                ),
            className,
          )}
          {...props}
        >
          {isButton && thumbPosition ? (
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-y-[3px] left-0 rounded-agentos-rounded-md6',
                'bg-agentos-neutral-bg-color-bg-container',
                'transition-[transform,width] duration-200 ease-out motion-reduce:transition-none',
              )}
              style={{
                transform: `translateX(${thumbPosition.left}px)`,
                width: thumbPosition.width,
              }}
            />
          ) : null}
          {isButton && showSeparator
            ? childArray.map((child, index) => {
                if (!isValidElement<RadioButtonProps>(child)) return child

                const childValue =
                  child.props.value == null
                    ? undefined
                    : String(child.props.value)
                const isSelected =
                  childValue != null && resolvedValue === childValue
                const previous = childArray[index - 1]
                const previousValue =
                  isValidElement<RadioButtonProps>(previous) &&
                  previous.props.value != null
                    ? String(previous.props.value)
                    : undefined
                const previousIsSelected =
                  previousValue != null && resolvedValue === previousValue
                const showSeparator =
                  index > 0 && !isSelected && !previousIsSelected

                return cloneElement(child, {
                  showSeparator: child.props.showSeparator ?? showSeparator,
                })
              })
            : children}
        </div>
      </RadioGroupContext.Provider>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      label,
      value,
      checked,
      defaultChecked = false,
      disabled,
      name,
      onChange,
      children,
      ...props
    },
    ref,
  ) => {
    const group = useContext(RadioGroupContext)
    const isDisabled = Boolean(disabled ?? group?.disabled)
    const stringValue = value == null ? undefined : String(value)
    const isGrouped = Boolean(group && stringValue != null)
    const isControlled = checked !== undefined || isGrouped
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked)

    const isChecked = isGrouped
      ? group?.value === stringValue
      : (checked ?? uncontrolledChecked)

    return (
      <label
        className={cn(
          'inline-flex cursor-pointer items-center gap-agentos-margin-margin-xs8',
          isDisabled && 'cursor-not-allowed',
          className,
        )}
      >
        <span className="relative inline-flex size-agentos-icon-icon-size-md16 shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="radio"
            className="peer absolute inset-0 m-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            name={name ?? group?.name}
            value={value}
            checked={isControlled ? Boolean(isChecked) : undefined}
            defaultChecked={isControlled ? undefined : defaultChecked}
            disabled={isDisabled}
            onChange={(event) => {
              if (!isControlled) setUncontrolledChecked(event.target.checked)
              if (isGrouped && stringValue != null) {
                group?.onValueChange?.(stringValue)
              }
              onChange?.(event)
            }}
            {...props}
          />
          <span
            aria-hidden="true"
            className={radioIndicatorVariants({
              checked: Boolean(isChecked),
              disabled: isDisabled,
            })}
          />
        </span>
        {(label ?? children) != null ? (
          <span
            className={cn(
              'font-agentos-en font-agentos-normal text-agentos-md leading-agentos-18 tracking-agentos-normal',
              isDisabled
                ? 'text-agentos-neutral-text-color-text-disabled'
                : 'text-agentos-neutral-text-color-text',
            )}
          >
            {label ?? children}
          </span>
        ) : null}
      </label>
    )
  },
)

Radio.displayName = 'Radio'

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode
  size?: RadioButtonSize
  /** 由 RadioGroup(button) 注入；独立使用时可手动控制 */
  showSeparator?: boolean
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      className,
      label,
      value,
      checked,
      defaultChecked = false,
      disabled,
      name,
      size,
      showSeparator = false,
      onChange,
      children,
      ...props
    },
    ref,
  ) => {
    const group = useContext(RadioGroupContext)
    const isDisabled = Boolean(disabled ?? group?.disabled)
    const stringValue = value == null ? undefined : String(value)
    const isGrouped = Boolean(group && stringValue != null)
    const isControlled = checked !== undefined || isGrouped
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked)

    const isChecked = isGrouped
      ? group?.value === stringValue
      : (checked ?? uncontrolledChecked)
    const resolvedSize = size ?? group?.size ?? 'lg'
    const content = label ?? children

    return (
      <label
        data-radio-value={stringValue}
        className={cn(
          radioButtonVariants({
            size: resolvedSize,
            checked: Boolean(isChecked),
            disabled: isDisabled,
            showSeparator: showSeparator && !isChecked,
          }),
          className,
        )}
      >
        <input
          ref={ref}
          type="radio"
          className="peer absolute inset-0 m-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          name={name ?? group?.name}
          value={value}
          checked={isControlled ? Boolean(isChecked) : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={isDisabled}
          onChange={(event) => {
            if (!isControlled) setUncontrolledChecked(event.target.checked)
            if (isGrouped && stringValue != null) {
              group?.onValueChange?.(stringValue)
            }
            onChange?.(event)
          }}
          {...props}
        />
        <span className="relative z-[1] grid">
          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 font-agentos-semibold"
          >
            {content}
          </span>
          <span className="col-start-1 row-start-1">{content}</span>
        </span>
      </label>
    )
  },
)

RadioButton.displayName = 'RadioButton'
