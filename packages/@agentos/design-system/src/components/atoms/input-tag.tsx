import { cva, type VariantProps } from 'class-variance-authority'
import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Tag, type TagProps } from './tag'

const inputTagVariants = cva(
  cn(
    'flex w-full items-center overflow-hidden border border-solid',
    'bg-agentos-neutral-bg-color-bg-container transition-colors',
    'border-agentos-neutral-border-color-border hover:border-agentos-neutral-border-color-border-hover',
    'focus-within:border-agentos-brand-primary-color-primary',
    'focus-within:shadow-[0_0_0_2px_var(--agentos-brand-primary-color-primary-outline)]',
  ),
  {
    variants: {
      size: {
        sm: 'min-h-agentos-control-control-height-sm24 rounded-agentos-rounded-sm4 px-agentos-padding-padding-xxs4',
        default:
          'min-h-agentos-control-control-height-md32 rounded-agentos-rounded-lg8 px-agentos-padding-padding-xxs4',
        lg: 'min-h-agentos-control-control-height-lg40 rounded-agentos-rounded-lg8 px-agentos-padding-padding-xxs4',
      },
      disabled: {
        true: cn(
          'cursor-not-allowed border-agentos-neutral-border-color-border',
          'bg-agentos-neutral-bg-color-bg-container-disabled shadow-none',
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

export interface InputTagItem {
  value: string
  label: string
  color?: TagProps['color']
}

export interface InputTagProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    VariantProps<typeof inputTagVariants> {
  tags?: InputTagItem[]
  defaultTags?: InputTagItem[]
  inputValue?: string
  defaultInputValue?: string
  placeholder?: string
  inputAriaLabel?: string
  disabled?: boolean
  removeLabel?: (item: InputTagItem) => string
  onTagsChange?: (tags: InputTagItem[]) => void
  onInputValueChange?: (value: string) => void
  renderTag?: (item: InputTagItem, remove: () => void) => ReactNode
}

export const InputTag = forwardRef<HTMLDivElement, InputTagProps>(
  (
    {
      className,
      tags,
      defaultTags = [],
      inputValue,
      defaultInputValue = '',
      placeholder = 'Please input',
      inputAriaLabel = 'Tag input',
      size = 'default',
      disabled = false,
      removeLabel = (item) => `Remove ${item.label}`,
      onTagsChange,
      onInputValueChange,
      renderTag,
      ...props
    },
    ref,
  ) => {
    const isTagsControlled = tags !== undefined
    const isInputControlled = inputValue !== undefined
    const [internalTags, setInternalTags] = useState(defaultTags)
    const [internalInputValue, setInternalInputValue] = useState(defaultInputValue)
    const resolvedTags = isTagsControlled ? tags : internalTags
    const resolvedInputValue = isInputControlled ? inputValue : internalInputValue

    const updateTags = (nextTags: InputTagItem[]) => {
      if (!isTagsControlled) setInternalTags(nextTags)
      onTagsChange?.(nextTags)
    }

    const updateInputValue = (nextValue: string) => {
      if (!isInputControlled) setInternalInputValue(nextValue)
      onInputValueChange?.(nextValue)
    }

    const removeTag = (value: string) => {
      if (disabled) return
      updateTags(resolvedTags.filter((item) => item.value !== value))
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (
        event.key === 'Backspace' &&
        resolvedInputValue === '' &&
        resolvedTags.length > 0
      ) {
        removeTag(resolvedTags[resolvedTags.length - 1].value)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(inputTagVariants({ size, disabled }), className)}
        {...props}
      >
        <div className="flex min-w-0 flex-1 items-center gap-agentos-gap-gap-xxs4 overflow-hidden">
          {resolvedTags.map((item) => {
            const remove = () => removeTag(item.value)
            if (renderTag) return <span key={item.value}>{renderTag(item, remove)}</span>

            return (
              <Tag
                key={item.value}
                size={size === 'sm' ? 'sm' : 'default'}
                color={item.color ?? 'default'}
                shape={item.color ? 'rectangle' : 'rounded'}
                closable={!disabled}
                closeLabel={removeLabel(item)}
                onClose={remove}
              >
                {item.label}
              </Tag>
            )
          })}
          <input
            value={resolvedInputValue}
            disabled={disabled}
            aria-label={inputAriaLabel}
            placeholder={resolvedTags.length === 0 ? placeholder : undefined}
            className={cn(
              'min-w-8 flex-1 border-0 bg-transparent p-0 outline-none',
              'font-agentos-en font-agentos-normal tracking-agentos-normal',
              'text-agentos-neutral-text-color-text placeholder:text-agentos-neutral-text-color-text-placeholder',
              'disabled:cursor-not-allowed disabled:text-agentos-neutral-text-color-text-disabled',
              size === 'lg'
                ? 'text-agentos-lg leading-agentos-24'
                : 'text-agentos-md leading-agentos-18',
            )}
            onChange={(event) => updateInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    )
  },
)

InputTag.displayName = 'InputTag'
