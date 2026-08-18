import { Plus, Upload } from 'lucide-react'
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Button } from './button'

export type UploadTriggerVariant = 'button' | 'drag'

export interface UploadTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'title'> {
  variant?: UploadTriggerVariant
  /** button 态按钮文案 */
  label?: ReactNode
  /** drag 态主提示 */
  title?: ReactNode
  /** drag 态副提示 */
  description?: ReactNode
  hovered?: boolean
}

export const UploadTrigger = forwardRef<HTMLButtonElement, UploadTriggerProps>(
  (
    {
      className,
      variant = 'button',
      label = 'Upload',
      title = 'Click or drag file to this area to upload',
      description = 'Only pdf, png, jpg can be uploaded, and the size does not exceed 100MB',
      hovered = false,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    if (variant === 'button') {
      return (
        <Button
          ref={ref}
          type={type}
          theme="primary"
          appearance="solid"
          size="default"
          disabled={disabled}
          leadingIcon={<Upload aria-hidden="true" />}
          className={className}
          {...props}
        >
          {label}
        </Button>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-6',
          'rounded-agentos-rounded-lg8 border border-dashed px-4 py-[50px]',
          'bg-agentos-neutral-bg-color-bg-layout',
          'border-agentos-neutral-border-color-border',
          'transition-colors',
          'hover:border-agentos-brand-primary-color-primary',
          'hover:bg-agentos-brand-primary-color-primary-bg',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-agentos-brand-primary-color-primary',
          'disabled:cursor-not-allowed disabled:opacity-60',
          hovered &&
            'border-agentos-brand-primary-color-primary bg-agentos-brand-primary-color-primary-bg',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-flex shrink-0 text-agentos-neutral-icon-color-icon',
            '[&_svg]:size-agentos-icon-icon-size-md16',
          )}
          aria-hidden="true"
        >
          <Plus />
        </span>
        <span className="flex w-full flex-col items-center gap-agentos-gap-gap-xxs4 overflow-hidden text-center">
          <span
            className={cn(
              'w-full font-agentos-en font-agentos-normal',
              'text-agentos-md leading-agentos-18 tracking-agentos-normal',
              'text-agentos-neutral-text-color-text',
            )}
          >
            {title}
          </span>
          {description != null && description !== '' ? (
            <span
              className={cn(
                'w-full font-agentos-en font-agentos-normal',
                'text-agentos-sm leading-4 tracking-agentos-normal',
                'text-agentos-neutral-text-color-text-description',
              )}
            >
              {description}
            </span>
          ) : null}
        </span>
      </button>
    )
  },
)

UploadTrigger.displayName = 'UploadTrigger'
