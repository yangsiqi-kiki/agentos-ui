import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface LayoutHeaderContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  /** 顶部条内容 */
  header?: ReactNode
  headerClassName?: string
  mainClassName?: string
  children?: ReactNode
}

/** 上下结构：顶栏 header + 下方主体 container */
export const LayoutHeaderContainer = forwardRef<
  HTMLDivElement,
  LayoutHeaderContainerProps
>(
  (
    {
      className,
      header,
      headerClassName,
      mainClassName,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-screen w-full flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-base',
          'font-agentos-en text-agentos-neutral-text-color-text',
          className,
        )}
        {...props}
      >
        <header
          className={cn(
            'flex h-14 shrink-0 items-center justify-between border-b border-agentos-neutral-border-color-split bg-agentos-neutral-bg-color-bg-container px-agentos-margin-margin-sm12',
            headerClassName,
          )}
        >
          {header}
        </header>
        <div
          className={cn(
            'flex min-h-0 min-w-0 flex-1 overflow-hidden',
            mainClassName,
          )}
        >
          {children}
        </div>
      </div>
    )
  },
)

LayoutHeaderContainer.displayName = 'LayoutHeaderContainer'
