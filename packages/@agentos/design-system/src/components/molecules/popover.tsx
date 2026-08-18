import * as PopoverPrimitive from '@radix-ui/react-popover'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Divider } from '../atoms/divider'

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverClose = PopoverPrimitive.Close
const PopoverPortal = PopoverPrimitive.Portal

/** Figma Popover placement：12 向箭头位置 */
export type PopoverPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'

type RadixSide = NonNullable<
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>['side']
>
type RadixAlign = NonNullable<
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>['align']
>

const placementMap: Record<
  PopoverPlacement,
  { side: RadixSide; align: RadixAlign }
> = {
  top: { side: 'top', align: 'center' },
  topLeft: { side: 'top', align: 'start' },
  topRight: { side: 'top', align: 'end' },
  bottom: { side: 'bottom', align: 'center' },
  bottomLeft: { side: 'bottom', align: 'start' },
  bottomRight: { side: 'bottom', align: 'end' },
  left: { side: 'left', align: 'center' },
  leftTop: { side: 'left', align: 'start' },
  leftBottom: { side: 'left', align: 'end' },
  right: { side: 'right', align: 'center' },
  rightTop: { side: 'right', align: 'start' },
  rightBottom: { side: 'right', align: 'end' },
}

export function resolvePopoverPlacement(placement: PopoverPlacement = 'top') {
  return placementMap[placement]
}

export interface PopoverContentProps
  extends Omit<
    ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    'side' | 'align'
  > {
  placement?: PopoverPlacement
  showArrow?: boolean
  /** 卡片宽度，Figma 默认 240px */
  width?: number | string
}

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      children,
      placement = 'top',
      showArrow = true,
      width = 240,
      sideOffset = 8,
      collisionPadding = 8,
      style,
      ...props
    },
    ref,
  ) => {
    const { side, align } = resolvePopoverPlacement(placement)
    const resolvedWidth = typeof width === 'number' ? `${width}px` : width

    return (
      <PopoverPortal>
        <PopoverPrimitive.Content
          ref={ref}
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          style={{ width: resolvedWidth, ...style }}
          className={cn(
            'z-[1100] flex flex-col gap-agentos-gap-gap-xs8',
            'rounded-agentos-rounded-lg8 bg-agentos-neutral-bg-color-bg-elevated',
            'p-agentos-padding-padding16 shadow-md outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
            'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
            className,
          )}
          {...props}
        >
          {children}
          {showArrow ? (
            <PopoverPrimitive.Arrow
              width={14}
              height={7}
              className="fill-agentos-neutral-bg-color-bg-elevated"
            />
          ) : null}
        </PopoverPrimitive.Content>
      </PopoverPortal>
    )
  },
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export interface PopoverTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'm-0 w-full font-agentos-en text-agentos-md font-agentos-semibold',
        'leading-agentos-18 tracking-agentos-normal',
        'text-agentos-neutral-text-color-text-heading',
        className,
      )}
      {...props}
    />
  ),
)
PopoverTitle.displayName = 'PopoverTitle'

export interface PopoverDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const PopoverDescription = forwardRef<
  HTMLParagraphElement,
  PopoverDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'm-0 w-full font-agentos-en text-agentos-base font-agentos-normal',
      'leading-agentos-20 tracking-agentos-normal',
      'text-agentos-neutral-text-color-text-secondary',
      className,
    )}
    {...props}
  />
))
PopoverDescription.displayName = 'PopoverDescription'

export interface PopoverFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** 页脚顶部是否展示分割线 */
  showDivider?: boolean
}

const PopoverFooter = forwardRef<HTMLDivElement, PopoverFooterProps>(
  ({ className, showDivider = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex w-full flex-col items-start gap-agentos-gap-gap-xs8',
        className,
      )}
      {...props}
    >
      {showDivider ? (
        <Divider className="border-agentos-neutral-border-color-split bg-agentos-neutral-border-color-split" />
      ) : null}
      <div className="flex w-full items-center justify-between">{children}</div>
    </div>
  ),
)
PopoverFooter.displayName = 'PopoverFooter'

export interface SimplePopoverProps
  extends Omit<ComponentPropsWithoutRef<typeof Popover>, 'children'> {
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  placement?: PopoverPlacement
  showArrow?: boolean
  width?: number | string
  contentClassName?: string
  trigger: ReactNode
  children?: ReactNode
}

/** 便捷拼装：覆盖 WithTitle/NoTitle × Info/Action */
function SimplePopover({
  title,
  description,
  actions,
  placement = 'top',
  showArrow = true,
  width = 240,
  contentClassName,
  trigger,
  children,
  ...rootProps
}: SimplePopoverProps) {
  const hasTitle = title != null && title !== ''
  const hasDescription = description != null && description !== ''
  const hasActions = actions != null

  return (
    <Popover {...rootProps}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        placement={placement}
        showArrow={showArrow}
        width={width}
        className={contentClassName}
      >
        {children ?? (
          <>
            {hasTitle ? <PopoverTitle>{title}</PopoverTitle> : null}
            {hasDescription ? (
              <PopoverDescription
                className={cn(
                  !hasTitle &&
                    'text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-secondary',
                )}
              >
                {description}
              </PopoverDescription>
            ) : null}
            {hasActions ? <PopoverFooter>{actions}</PopoverFooter> : null}
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

SimplePopover.displayName = 'SimplePopover'

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
  SimplePopover,
}
