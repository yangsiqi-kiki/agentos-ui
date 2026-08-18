import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Tag } from './tag'

type TabsOrientation = 'horizontal' | 'vertical'
type TabsVariant = 'line' | 'rounded' | 'text' | 'card' | 'card-gutter'
type TabsSize = 'lg' | 'default' | 'sm' | 'mini'

interface TabsContextValue {
  value: string
  orientation: TabsOrientation
  variant: TabsVariant
  size: TabsSize
  disabled?: boolean
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(component: string) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error(`${component} must be used within Tabs`)
  }
  return context
}

const tabsListVariants = cva('relative flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-end',
      vertical: 'flex-col items-stretch',
    },
    variant: {
      line: '',
      rounded: 'gap-agentos-gap-gap-xs8',
      text: 'gap-agentos-gap-gap-xs8',
      card: 'gap-0',
      'card-gutter': 'items-center gap-agentos-gap-gap-xxs4',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      variant: 'line',
      className: cn(
        'w-full gap-agentos-margin-margin-xl32 border-b border-agentos-neutral-border-color-border-secondary',
        'pl-agentos-margin-margin-sm12',
      ),
    },
    {
      orientation: 'vertical',
      variant: 'line',
      className:
        'w-[100px] gap-0 border-r border-agentos-neutral-border-color-border-secondary',
    },
    {
      orientation: 'horizontal',
      variant: 'card',
      className:
        'w-full border-b border-agentos-neutral-border-color-border-secondary',
    },
    {
      orientation: 'horizontal',
      variant: 'card-gutter',
      className: 'w-full items-center',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'line',
  },
})

const tabTriggerVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors',
    'font-agentos-en tracking-agentos-normal',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agentos-brand-primary-color-primary focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:text-agentos-neutral-text-color-text-disabled',
    '[&_svg]:shrink-0',
  ),
  {
    variants: {
      size: {
        lg: 'h-10 gap-agentos-gap-gap-xs8 text-agentos-base leading-agentos-20 [&_svg]:size-agentos-icon-icon-size-md16',
        default:
          'h-9 gap-agentos-gap-gap-xs8 text-agentos-md leading-agentos-18 [&_svg]:size-agentos-icon-icon-size-md16',
        sm: 'h-8 gap-agentos-gap-gap-xs8 text-agentos-md leading-agentos-18 [&_svg]:size-agentos-icon-icon-size-sm12',
        mini: 'h-7 gap-agentos-gap-gap-xxs4 text-agentos-sm leading-agentos-18 [&_svg]:size-agentos-icon-icon-size-sm12',
      },
      variant: {
        line: '',
        rounded: 'rounded-agentos-rounded-full999 px-agentos-padding-padding16',
        text: 'px-agentos-padding-padding-xs8',
        card: 'gap-agentos-gap-gap-xxs4 px-agentos-padding-padding16',
        'card-gutter': cn(
          'gap-agentos-gap-gap-xs8 border border-solid',
          'border-agentos-neutral-border-color-border-secondary',
          'bg-agentos-neutral-bg-color-bg-container',
          'rounded-agentos-rounded-lg8 px-agentos-padding-padding16',
        ),
      },
      orientation: {
        horizontal: '',
        vertical: 'w-full justify-start',
      },
      selected: {
        true: 'font-agentos-semibold text-agentos-brand-primary-color-primary',
        false:
          'font-agentos-normal text-agentos-neutral-text-color-text-secondary hover:text-agentos-neutral-text-color-text',
      },
    },
    compoundVariants: [
      {
        variant: 'line',
        orientation: 'horizontal',
        selected: true,
        className: 'border-b-2 border-agentos-brand-primary-color-primary',
      },
      {
        variant: 'line',
        orientation: 'horizontal',
        selected: false,
        className: 'border-b-2 border-transparent',
      },
      {
        variant: 'line',
        orientation: 'vertical',
        selected: true,
        className:
          'border-r-2 border-agentos-brand-primary-color-primary px-agentos-padding-padding16',
      },
      {
        variant: 'line',
        orientation: 'vertical',
        selected: false,
        className: 'border-r-2 border-transparent px-agentos-padding-padding16',
      },
      {
        variant: 'rounded',
        selected: true,
        className: 'bg-agentos-brand-primary-color-primary-bg',
      },
      {
        variant: 'rounded',
        selected: false,
        className: 'hover:bg-agentos-neutral-fill-color-fill-tertiary',
      },
      {
        variant: 'card',
        selected: true,
        className: cn(
          'relative -mb-px bg-agentos-neutral-bg-color-bg-container',
          'border border-b-0 border-agentos-neutral-border-color-border-secondary',
          'rounded-t-agentos-rounded-sm4',
        ),
      },
      {
        variant: 'card',
        selected: false,
        className: 'border border-transparent',
      },
      {
        variant: 'card-gutter',
        size: 'lg',
        className: 'h-agentos-control-control-height-md32 py-0',
      },
      {
        variant: 'card-gutter',
        size: 'default',
        className: 'h-7 py-0',
      },
      {
        variant: 'card-gutter',
        size: 'sm',
        className: 'h-agentos-control-control-height-sm24 py-0',
      },
      {
        variant: 'card-gutter',
        size: 'mini',
        className:
          'h-5 py-0 text-agentos-sm leading-agentos-14 [&_svg]:size-agentos-icon-icon-size-sm12',
      },
      {
        variant: 'card-gutter',
        selected: false,
        className: 'hover:bg-agentos-neutral-fill-color-fill-tertiary',
      },
      {
        variant: 'card-gutter',
        selected: true,
        className: cn(
          'border-agentos-brand-primary-color-primary-border',
          'bg-agentos-neutral-bg-color-bg-container',
        ),
      },
    ],
    defaultVariants: {
      size: 'default',
      variant: 'line',
      orientation: 'horizontal',
      selected: false,
    },
  },
)

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    VariantProps<typeof tabsListVariants> {
  value?: string
  defaultValue?: string
  size?: TabsSize
  disabled?: boolean
  onValueChange?: (value: string) => void
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value,
      defaultValue,
      orientation = 'horizontal',
      variant = 'line',
      size = 'default',
      disabled,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? '',
    )
    const resolvedValue = isControlled ? value : uncontrolledValue

    const contextValue = useMemo<TabsContextValue>(
      () => ({
        value: resolvedValue,
        orientation: orientation ?? 'horizontal',
        variant: variant ?? 'line',
        size: size ?? 'default',
        disabled,
        onValueChange: (next) => {
          if (!isControlled) setUncontrolledValue(next)
          onValueChange?.(next)
        },
      }),
      [
        resolvedValue,
        orientation,
        variant,
        size,
        disabled,
        isControlled,
        onValueChange,
      ],
    )

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            orientation === 'vertical' ? 'flex gap-agentos-gap-gap-xs8' : 'flex flex-col',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)

Tabs.displayName = 'Tabs'

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  extra?: ReactNode
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, extra, children, ...props }, ref) => {
    const { orientation, variant } = useTabsContext('TabsList')

    return (
      <div
        className={cn(
          'flex w-full items-end',
          orientation === 'vertical' && 'w-auto flex-col items-stretch',
          className,
        )}
      >
        <div
          ref={ref}
          role="tablist"
          aria-orientation={orientation}
          className={cn(
            tabsListVariants({ orientation, variant }),
            orientation === 'horizontal' && extra != null && 'flex-1',
          )}
          {...props}
        >
          {children}
        </div>
        {extra != null && orientation === 'horizontal' ? (
          <div className="mb-1 ml-auto shrink-0 pl-agentos-padding-padding-xs8">
            {extra}
          </div>
        ) : null}
      </div>
    )
  },
)

TabsList.displayName = 'TabsList'

export interface TabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string
  icon?: ReactNode
  count?: ReactNode
  /** When set, renders Figma Compare layout: label | compareLabel */
  compareLabel?: ReactNode
  closable?: boolean
  closeLabel?: string
  onClose?: () => void
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      className,
      value,
      icon,
      count,
      compareLabel,
      closable = false,
      closeLabel = 'Close tab',
      onClose,
      disabled,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const {
      value: selectedValue,
      orientation,
      variant,
      size,
      disabled: tabsDisabled,
      onValueChange,
    } = useTabsContext('Tab')
    const isSelected = selectedValue === value
    const isDisabled = Boolean(disabled || tabsDisabled)
    const isCompare = compareLabel != null && compareLabel !== ''
    // Disabled must not keep Selected chrome (primary border / semibold brand text).
    const visualSelected = isSelected && !isDisabled

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return

      const list = event.currentTarget.closest('[role="tablist"]')
      if (!list) return

      const tabs = Array.from(
        list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
      )
      const index = tabs.indexOf(event.currentTarget)
      if (index < 0) return

      const isHorizontal = orientation === 'horizontal'
      let nextIndex = index

      if (
        (isHorizontal && event.key === 'ArrowRight') ||
        (!isHorizontal && event.key === 'ArrowDown')
      ) {
        nextIndex = (index + 1) % tabs.length
      } else if (
        (isHorizontal && event.key === 'ArrowLeft') ||
        (!isHorizontal && event.key === 'ArrowUp')
      ) {
        nextIndex = (index - 1 + tabs.length) % tabs.length
      } else if (event.key === 'Home') {
        nextIndex = 0
      } else if (event.key === 'End') {
        nextIndex = tabs.length - 1
      } else {
        return
      }

      event.preventDefault()
      const next = tabs[nextIndex]
      next?.focus()
      const nextValue = next?.dataset.value
      if (nextValue) onValueChange(nextValue)
    }

    const closeControl = closable ? (
      <span
        role="button"
        tabIndex={-1}
        aria-label={closeLabel}
        className={cn(
          'inline-flex text-current hover:opacity-80',
          '[&_svg]:size-agentos-icon-icon-size-sm12',
        )}
        onClick={(event) => {
          event.stopPropagation()
          onClose?.()
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            event.stopPropagation()
            onClose?.()
          }
        }}
      >
        <X aria-hidden="true" />
      </span>
    ) : null

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        data-value={value}
        aria-selected={isSelected}
        tabIndex={isSelected ? 0 : -1}
        disabled={isDisabled}
        className={cn(
          tabTriggerVariants({
            size,
            variant,
            orientation,
            selected: visualSelected,
          }),
          variant === 'card-gutter' &&
            closable &&
            'pl-agentos-padding-padding16 pr-agentos-padding-padding-sm12',
          className,
        )}
        onClick={() => {
          if (isDisabled) return
          onValueChange(value)
        }}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {icon}
        <span>{children}</span>
        {count != null && count !== '' ? (
          <Tag size="sm" color="blue" className="min-w-0 px-agentos-padding-padding-xs8">
            {count}
          </Tag>
        ) : null}
        {closeControl}
        {isCompare ? (
          <>
            <span
              aria-hidden="true"
              className="h-agentos-icon-icon-size-sm12 w-px shrink-0 bg-agentos-neutral-border-color-split"
            />
            <span>{compareLabel}</span>
            {closeControl}
          </>
        ) : null}
      </button>
    )
  },
)

Tab.displayName = 'Tab'

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  forceMount?: boolean
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, forceMount = false, children, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext('TabsContent')
    const contentId = useId()
    const isSelected = selectedValue === value

    if (!forceMount && !isSelected) return null

    return (
      <div
        ref={ref}
        id={contentId}
        role="tabpanel"
        hidden={!isSelected}
        className={cn(
          'pt-agentos-padding-padding-xs8 font-agentos-en text-agentos-base leading-agentos-20',
          'text-agentos-neutral-text-color-text',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

TabsContent.displayName = 'TabsContent'
