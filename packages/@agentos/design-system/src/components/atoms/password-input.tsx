import { Eye, EyeOff } from 'lucide-react'
import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react'
import { cn } from '../../lib/utils'
import { Input, type InputProps } from './input'

export interface PasswordInputProps
  extends Omit<InputProps, 'type' | 'suffixIcon' | 'showStatusIcon'> {
  defaultVisible?: boolean
  onVisibilityChange?: (visible: boolean) => void
  visibilityToggleLabel?: {
    show: string
    hide: string
  }
  suffixIcon?: InputProps['suffixIcon']
  showVisibilityToggle?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      defaultVisible = false,
      onVisibilityChange,
      visibilityToggleLabel = {
        show: 'Show password',
        hide: 'Hide password',
      },
      showVisibilityToggle = true,
      suffixIcon,
      disabled,
      placeholder = 'Please enter password',
      className,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(defaultVisible)

    const handleToggleVisibility = () => {
      if (disabled) return
      const next = !visible
      setVisible(next)
      onVisibilityChange?.(next)
    }

    const toggleButton = showVisibilityToggle ? (
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label={visible ? visibilityToggleLabel.hide : visibilityToggleLabel.show}
        onClick={handleToggleVisibility}
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          'text-agentos-neutral-icon-color-icon',
          'hover:text-agentos-neutral-icon-color-icon-hover',
          'disabled:pointer-events-none disabled:text-agentos-neutral-text-color-text-disabled',
        )}
      >
        {visible ? <Eye aria-hidden="true" /> : <EyeOff aria-hidden="true" />}
      </button>
    ) : null

    return (
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        suffixIcon={suffixIcon ?? toggleButton}
        showStatusIcon={props.status !== 'default'}
        {...props}
      />
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export type PasswordInputNativeProps = ComponentPropsWithoutRef<typeof PasswordInput>
