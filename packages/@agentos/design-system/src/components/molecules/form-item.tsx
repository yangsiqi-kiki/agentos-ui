import { cva, type VariantProps } from 'class-variance-authority'
import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const formItemVariants = cva('flex w-full font-agentos-en', {
  variants: {
    layout: {
      // horizontal：主轴为行，items-start 让 label 与内容顶部对齐
      horizontal: 'flex-row items-start gap-agentos-gap-gap16',
      // vertical：主轴为列，需 items-stretch（默认）让内容区在交叉轴（横向）撑满，
      // 否则 items-start 会让内容区按子元素内容宽度收缩，内部的 w-full 也无法生效
      vertical: 'flex-col items-stretch',
    },
  },
  defaultVariants: {
    layout: 'horizontal',
  },
})

const formItemLabelVariants = cva(
  cn(
    'flex shrink-0 items-center gap-agentos-gap-gap-xxs4',
    'font-agentos-en font-agentos-normal text-agentos-md leading-agentos-18 tracking-agentos-normal',
    'text-agentos-neutral-text-color-text',
  ),
  {
    variants: {
      layout: {
        horizontal:
          'min-h-agentos-control-control-height-md32 justify-end text-right',
        vertical: 'pb-agentos-margin-margin-xs8 text-left',
      },
    },
    defaultVariants: {
      layout: 'horizontal',
    },
  },
)

export interface FormItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof formItemVariants> {
  label?: ReactNode
  children?: ReactNode
  htmlFor?: string
  required?: boolean
  showColon?: boolean
  tooltip?: ReactNode
  helpText?: ReactNode
  helpTextId?: string
  labelWidth?: CSSProperties['width']
  labelClassName?: string
  controlClassName?: string
}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      className,
      layout = 'horizontal',
      label,
      children,
      htmlFor,
      required = false,
      showColon = false,
      tooltip,
      helpText,
      helpTextId,
      labelWidth,
      labelClassName,
      controlClassName,
      ...props
    },
    ref,
  ) => {
    const resolvedLayout = layout ?? 'horizontal'
    const hasLabel = label != null && label !== ''
    const hasHelpText = helpText != null && helpText !== ''

    return (
      <div
        ref={ref}
        className={cn(formItemVariants({ layout: resolvedLayout }), className)}
        {...props}
      >
        {hasLabel ? (
          <div
            className={cn(
              formItemLabelVariants({ layout: resolvedLayout }),
              labelClassName,
            )}
            style={
              resolvedLayout === 'horizontal' && labelWidth !== undefined
                ? { width: labelWidth }
                : undefined
            }
          >
            {required ? (
              <span
                aria-hidden="true"
                className="text-agentos-brand-error-color-error"
              >
                *
              </span>
            ) : null}
            <label htmlFor={htmlFor}>
              {label}
              {showColon ? ':' : null}
            </label>
            {tooltip != null ? (
              <span className="inline-flex text-agentos-neutral-icon-color-icon [&_svg]:size-agentos-icon-icon-size-sm12">
                {tooltip}
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className={cn('w-full', controlClassName)}>{children}</div>
          {hasHelpText ? (
            <div
              id={helpTextId}
              className={cn(
                'mt-agentos-margin-margin-xxs4',
                'font-agentos-en font-agentos-normal text-agentos-sm leading-agentos-18 tracking-agentos-normal',
                'text-agentos-neutral-text-color-text-description',
              )}
            >
              {helpText}
            </div>
          ) : null}
        </div>
      </div>
    )
  },
)

FormItem.displayName = 'FormItem'
