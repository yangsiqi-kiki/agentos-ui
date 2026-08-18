import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Divider } from '../atoms/divider'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

/** Figma Card：容器包裹（Neutral.Bg.colorBgContainer + Border + radius.roundedLg8） */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex w-full flex-col gap-agentos-margin-margin-xs8',
        'rounded-agentos-rounded-lg8 border border-solid border-agentos-neutral-border-color-border',
        'bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding16',
        'text-agentos-neutral-text-color-text',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export interface CardTitleProps extends HTMLAttributes<HTMLDivElement> {
  /** 标题区底部是否展示分割线（Neutral.Border.colorSplit） */
  showDivider?: boolean
}

/** Figma CardTitle：标题槽位，内部结构完全自定义 */
export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, showDivider = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex w-full flex-col items-start justify-center gap-agentos-gap-gap-xs8',
        className,
      )}
      {...props}
    >
      {children}
      {showDivider ? (
        <Divider className="border-agentos-neutral-border-color-split bg-agentos-neutral-border-color-split" />
      ) : null}
    </div>
  ),
)
CardTitle.displayName = 'CardTitle'

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

/** Figma CardContent：内容槽位，内部结构完全自定义 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('w-full min-w-0', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** 页脚顶部是否展示分割线（Neutral.Border.colorSplit） */
  showDivider?: boolean
}

/** Figma CardFooter：底部槽位，内部结构完全自定义 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, showDivider = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex w-full flex-col items-start gap-agentos-margin-margin-sm12',
        className,
      )}
      {...props}
    >
      {showDivider ? (
        <Divider className="border-agentos-neutral-border-color-split bg-agentos-neutral-border-color-split" />
      ) : null}
      {children}
    </div>
  ),
)
CardFooter.displayName = 'CardFooter'
