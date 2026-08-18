import { IconCheck, IconMinus } from '@tabler/icons-react'
import { Minus, Star } from 'lucide-react'
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

export type CheckboxState = boolean | 'indeterminate'

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'defaultChecked' | 'onChange' | 'size' | 'type'
  > {
  checked?: CheckboxState
  defaultChecked?: CheckboxState
  label?: ReactNode
  variant?: 'default' | 'star'
  onCheckedChange?: (checked: CheckboxState) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      label,
      variant = 'default',
      disabled = false,
      onCheckedChange,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] =
      useState<CheckboxState>(defaultChecked)
    const resolvedChecked = checked ?? internalChecked
    const inputRef = useRef<HTMLInputElement>(null)
    const isIndeterminate = resolvedChecked === 'indeterminate'
    const isChecked = resolvedChecked === true

    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = isIndeterminate
    }, [isIndeterminate])

    return (
      <label
        className={cn(
          'inline-flex items-center gap-agentos-margin-margin-xs8',
          'font-agentos-en font-agentos-normal text-agentos-md leading-agentos-18 tracking-agentos-normal',
          disabled
            ? 'cursor-not-allowed text-agentos-neutral-text-color-text-disabled'
            : 'cursor-pointer text-agentos-neutral-text-color-text',
          className,
        )}
      >
        <span className="relative inline-flex size-agentos-icon-icon-size-md16 shrink-0 items-center justify-center">
          <input
            ref={(node) => {
              inputRef.current = node
              if (typeof forwardedRef === 'function') forwardedRef(node)
              else if (forwardedRef) forwardedRef.current = node
            }}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            aria-checked={isIndeterminate ? 'mixed' : isChecked}
            className="peer absolute inset-0 m-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            onChange={(event) => {
              const nextChecked = event.target.checked
              if (!isControlled) setInternalChecked(nextChecked)
              onCheckedChange?.(nextChecked)
            }}
            {...props}
          />
          {variant === 'star' ? (
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-0 inline-flex items-center justify-center',
                'text-agentos-neutral-border-color-border',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-agentos-brand-primary-color-primary-outline',
                (isChecked || isIndeterminate) &&
                  'text-agentos-brand-warning-color-warning',
                disabled && 'text-agentos-neutral-text-color-text-disabled',
                '[&_svg]:block [&_svg]:size-agentos-icon-icon-size-md16',
              )}
            >
              <Star
                className={cn((isChecked || isIndeterminate) && 'fill-current')}
              />
              {isIndeterminate ? (
                <Minus className="absolute !size-agentos-icon-icon-size-sm12 text-agentos-neutral-text-color-text-light-solid" />
              ) : null}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-0 inline-flex items-center justify-center',
                'rounded-agentos-rounded-sm4 border border-solid',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-agentos-brand-primary-color-primary-outline',
                isChecked || isIndeterminate
                  ? 'border-agentos-brand-primary-color-primary bg-agentos-brand-primary-color-primary text-agentos-neutral-text-color-text-light-solid'
                  : 'border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container',
                disabled &&
                  'border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container-disabled text-agentos-neutral-text-color-text-disabled',
                '[&_svg]:block [&_svg]:size-agentos-icon-icon-size-sm12',
              )}
            >
              {isIndeterminate ? <IconMinus /> : isChecked ? <IconCheck /> : null}
            </span>
          )}
        </span>
        {(label ?? children) != null ? <span>{label ?? children}</span> : null}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
