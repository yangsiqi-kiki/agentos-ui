import { CircleAlert } from 'lucide-react'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  type PopoverPlacement,
} from './popover'

export interface PopconfirmProps
  extends Omit<ComponentPropsWithoutRef<typeof Popover>, 'children'> {
  title?: ReactNode
  description?: ReactNode
  /** 标题左侧语义图标，默认警告 */
  icon?: ReactNode
  showIcon?: boolean
  placement?: PopoverPlacement
  cancelLabel?: string
  confirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
  contentClassName?: string
  children: ReactElement
}

/** Figma Popconfirm：带警告图标与取消/确认按钮的确认气泡 */
export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(
  (
    {
      title = 'Confirm',
      description = 'Are you sure you want to delete?',
      icon,
      showIcon = true,
      placement = 'top',
      cancelLabel = 'Cancel',
      confirmLabel = 'Confirm',
      onCancel,
      onConfirm,
      contentClassName,
      children,
      ...rootProps
    },
    ref,
  ) => {
    const resolvedIcon = icon ?? (
      <CircleAlert
        aria-hidden="true"
        className="text-agentos-brand-warning-color-warning"
      />
    )

    return (
      <Popover {...rootProps}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          ref={ref}
          placement={placement}
          width="auto"
          className={cn('min-w-[240px] items-end gap-4', contentClassName)}
        >
          <div className="flex w-full items-start gap-agentos-gap-gap-xs8">
            {showIcon ? (
              <span
                className={cn(
                  'inline-flex h-6 shrink-0 items-center justify-center',
                  '[&_svg]:size-agentos-icon-icon-size-md16',
                )}
                aria-hidden={icon == null}
              >
                {resolvedIcon}
              </span>
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col gap-agentos-gap-gap-xxs4">
              <p
                className={cn(
                  'm-0 font-agentos-en text-agentos-lg font-agentos-semibold',
                  'leading-agentos-24 tracking-agentos-normal',
                  'text-agentos-neutral-text-color-text',
                )}
              >
                {title}
              </p>
              {description != null && description !== '' ? (
                <p
                  className={cn(
                    'm-0 font-agentos-en text-agentos-md font-agentos-normal',
                    'leading-agentos-18 tracking-agentos-normal',
                    'text-agentos-neutral-text-color-text-description',
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <PopoverClose asChild>
              <Button
                theme="black"
                appearance="outline"
                size="sm"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                theme="black"
                appearance="solid"
                size="sm"
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
)

Popconfirm.displayName = 'Popconfirm'
