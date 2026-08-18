import { ChevronLeft, Maximize, Search } from 'lucide-react'
import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import {
  Breadcrumb,
  type BreadcrumbItem,
  Button,
  Divider,
  Tag,
} from '../atoms'

export interface PageHeaderOption {
  value: string
  label: ReactNode
}

export interface PageHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  variant?: 'default' | 'single-select'
  title?: ReactNode
  description?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  tags?: ReactNode
  actions?: ReactNode
  options?: PageHeaderOption[]
  value?: string
  defaultValue?: string
  showBreadcrumbs?: boolean
  showBackButton?: boolean
  showSearch?: boolean
  showFullscreen?: boolean
  showDescription?: boolean
  showTags?: boolean
  showActions?: boolean
  backButtonLabel?: string
  searchButtonLabel?: string
  fullscreenButtonLabel?: string
  singleSelectLabel?: string
  cancelLabel?: ReactNode
  saveLabel?: ReactNode
  onBack?: () => void
  onSearch?: () => void
  onFullscreen?: () => void
  onCancel?: () => void
  onSave?: () => void
  onValueChange?: (value: string) => void
}

const defaultBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Channel', href: '#' },
  { label: 'News' },
]

const defaultOptions: PageHeaderOption[] = [
  { value: 'large', label: 'Large' },
  { value: 'medium', label: 'Medium' },
  { value: 'small', label: 'Small' },
]

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      variant = 'default',
      title = 'AgentOS Design System',
      description = 'This is a description',
      breadcrumbs = defaultBreadcrumbs,
      tags,
      actions,
      options = defaultOptions,
      value,
      defaultValue = 'large',
      showBreadcrumbs = true,
      showBackButton = true,
      showSearch = true,
      showFullscreen = true,
      showDescription = true,
      showTags = true,
      showActions = true,
      backButtonLabel = 'Go back',
      searchButtonLabel = 'Search',
      fullscreenButtonLabel = 'Enter fullscreen',
      singleSelectLabel = 'Display size',
      cancelLabel = 'Cancel',
      saveLabel = 'Save',
      onBack,
      onSearch,
      onFullscreen,
      onCancel,
      onSave,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const groupName = useId()
    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const selectedValue = isControlled ? value : uncontrolledValue

    const handleValueChange = (nextValue: string) => {
      if (!isControlled) setUncontrolledValue(nextValue)
      onValueChange?.(nextValue)
    }

    const resolvedTags =
      tags !== undefined ? (
        tags
      ) : (
        <>
          <Tag bordered>V1.0</Tag>
          <Tag
            bordered
            color="green"
            className="border-agentos-base-green-600 bg-agentos-base-green-50 text-agentos-base-green-600"
          >
            Deployed
          </Tag>
        </>
      )

    const resolvedActions =
      actions !== undefined ? (
        actions
      ) : (
        <>
          <Button
            type="button"
            theme="black"
            appearance="outline"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button type="button" theme="black" onClick={onSave}>
            {saveLabel}
          </Button>
        </>
      )

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full flex-col items-start gap-agentos-gap-gap-xs8',
          'bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding-sm12',
          className,
        )}
        {...props}
      >
        {showBreadcrumbs ? (
          <div className="flex h-agentos-control-control-height-sm24 w-full items-center justify-between">
            <Breadcrumb className="max-w-none min-w-0 flex-1" items={breadcrumbs} />
            <div className="flex shrink-0 items-center">
              {showSearch ? (
                <Button
                  type="button"
                  theme="black"
                  appearance="ghost"
                  size="sm"
                  leadingIcon={<Search aria-hidden="true" />}
                  aria-label={searchButtonLabel}
                  onClick={onSearch}
                />
              ) : null}
              {showFullscreen ? (
                <Button
                  type="button"
                  theme="black"
                  appearance="ghost"
                  size="sm"
                  leadingIcon={<Maximize aria-hidden="true" />}
                  aria-label={fullscreenButtonLabel}
                  onClick={onFullscreen}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="flex w-full items-center">
          <div className="flex h-agentos-control-control-height-md32 min-w-0 flex-1 items-center gap-agentos-gap-gap-xs8">
            {showBackButton ? (
              <Button
                type="button"
                theme="black"
                appearance="ghost"
                size="sm"
                leadingIcon={<ChevronLeft aria-hidden="true" />}
                aria-label={backButtonLabel}
                onClick={onBack}
              />
            ) : null}
            <h2 className="shrink-0 whitespace-nowrap font-agentos-en text-agentos-xl font-agentos-semibold leading-agentos-28 tracking-agentos-normal text-agentos-neutral-text-color-text">
              {title}
            </h2>
            {showTags ? (
              <div className="flex shrink-0 items-center gap-agentos-gap-gap-xxs4">
                {resolvedTags}
              </div>
            ) : null}
            {showDescription && description != null && description !== '' ? (
              <>
                <Divider
                  orientation="vertical"
                  className="h-agentos-icon-icon-size-sm12 min-h-0 bg-agentos-neutral-border-color-split"
                />
                <p className="min-w-0 truncate whitespace-nowrap font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text-tertiary">
                  {description}
                </p>
              </>
            ) : null}
          </div>

          {variant === 'default' && showActions ? (
            <div className="ml-agentos-margin-margin-xs8 flex shrink-0 items-center gap-agentos-gap-gap-xs8">
              {resolvedActions}
            </div>
          ) : null}
          {variant === 'single-select' ? (
            <div
              role="radiogroup"
              aria-label={singleSelectLabel}
              className="ml-agentos-margin-margin-xs8 flex shrink-0 items-center rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-content p-[3px]"
            >
              {options.map((option, index) => {
                const isSelected = option.value === selectedValue
                const previousOption = options[index - 1]
                const previousIsSelected = previousOption?.value === selectedValue
                const showSeparator =
                  index > 0 && !isSelected && !previousIsSelected

                return (
                  <label
                    key={option.value}
                    className={cn(
                      'relative cursor-pointer overflow-hidden rounded-agentos-rounded-md6 px-agentos-padding-padding-sm12 py-agentos-padding-padding-xxs4',
                      'font-agentos-en text-agentos-md leading-agentos-18 tracking-agentos-normal',
                      isSelected
                        ? 'bg-agentos-neutral-bg-color-bg-container font-agentos-semibold text-agentos-brand-primary-color-primary'
                        : 'font-agentos-normal text-agentos-neutral-text-color-text-secondary',
                      showSeparator &&
                        'before:absolute before:left-0 before:top-1/2 before:h-agentos-icon-icon-size-sm12 before:w-px before:-translate-y-1/2 before:bg-agentos-neutral-border-color-split before:content-[""]',
                    )}
                  >
                    <input
                      type="radio"
                      name={groupName}
                      value={option.value}
                      checked={isSelected}
                      className="sr-only"
                      onChange={() => handleValueChange(option.value)}
                    />
                    {option.label}
                  </label>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    )
  },
)

PageHeader.displayName = 'PageHeader'
