import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center gap-agentos-gap-gap-xxs4 whitespace-nowrap',
    // Figma 三档均为 weight/semibold = 600
    'font-agentos-en [font-weight:var(--agentos-font-weight-semibold)] tracking-agentos-normal transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ),
  {
    variants: {
      theme: {
        primary: 'focus-visible:ring-agentos-brand-primary-color-primary',
        secondary: 'focus-visible:ring-agentos-brand-secondary-color-secondary-text',
        black: 'focus-visible:ring-agentos-brand-tertiary-color-tertiary',
        danger: 'focus-visible:ring-agentos-brand-error-color-error',
      },
      appearance: {
        solid: 'border',
        outline: 'border bg-agentos-neutral-bg-color-bg-container',
        ghost: 'border border-transparent bg-transparent',
      },
      size: {
        // Figma: Small = size/md 13 + leading/18；Default 同；Large = size/lg 16 + leading/24
        sm: cn(
          'h-agentos-control-control-height-sm24 px-agentos-padding-padding6',
          '[font-size:var(--agentos-font-size-md)] [line-height:var(--agentos-font-leading-18)]',
          '[&_svg]:size-agentos-icon-icon-size-sm12',
        ),
        default: cn(
          'h-agentos-control-control-height-md32 px-agentos-padding-padding-xs8',
          '[font-size:var(--agentos-font-size-md)] [line-height:var(--agentos-font-leading-18)]',
          '[&_svg]:size-agentos-icon-icon-size-md16',
        ),
        lg: cn(
          'h-agentos-control-control-height-lg40 px-agentos-padding-padding-sm12',
          '[font-size:var(--agentos-font-size-lg)] [line-height:var(--agentos-font-leading-24)]',
          '[&_svg]:size-agentos-icon-icon-size-md16',
        ),
        icon: cn(
          'h-agentos-control-control-height-md32 w-agentos-control-control-height-md32',
          '[font-size:var(--agentos-font-size-md)] [line-height:var(--agentos-font-leading-18)]',
          '[&_svg]:size-agentos-icon-icon-size-md16',
        ),
      },
      // Figma Shape=Rectangle | Shape=Rounded（胶囊 / pill）
      shape: {
        rectangle: '',
        rounded: 'rounded-agentos-rounded-full999',
      },
    },
    compoundVariants: [
      {
        shape: 'rectangle',
        size: 'sm',
        className: 'rounded-agentos-rounded-sm4',
      },
      {
        shape: 'rectangle',
        size: 'default',
        className: 'rounded-agentos-rounded-lg8',
      },
      {
        shape: 'rectangle',
        size: 'lg',
        className: 'rounded-agentos-rounded-lg8',
      },
      {
        shape: 'rectangle',
        size: 'icon',
        className: 'rounded-agentos-rounded-lg8',
      },
      {
        theme: 'primary',
        appearance: 'solid',
        className: cn(
          'border-agentos-brand-primary-color-primary bg-agentos-brand-primary-color-primary',
          'text-agentos-neutral-text-color-text-light-solid',
          'hover:border-agentos-brand-primary-color-primary-hover hover:bg-agentos-brand-primary-color-primary-hover',
          'active:border-agentos-brand-primary-color-primary-active active:bg-agentos-brand-primary-color-primary-active',
          'disabled:border-agentos-neutral-bg-color-bg-button-container-disabled',
          'disabled:bg-agentos-neutral-bg-color-bg-button-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-bottom-disable',
        ),
      },
      {
        theme: 'secondary',
        appearance: 'solid',
        className: cn(
          'border-agentos-brand-secondary-color-secondary bg-agentos-brand-secondary-color-secondary',
          'text-agentos-brand-secondary-color-secondary-text',
          'hover:border-agentos-brand-secondary-color-secondary-hover hover:bg-agentos-brand-secondary-color-secondary-hover',
          'active:border-agentos-brand-secondary-color-secondary-active active:bg-agentos-brand-secondary-color-secondary-active',
          'active:text-agentos-brand-secondary-color-secondary-text-active',
          'disabled:border-agentos-neutral-bg-color-bg-button-container-disabled',
          'disabled:bg-agentos-neutral-bg-color-bg-button-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-bottom-disable',
        ),
      },
      {
        theme: 'black',
        appearance: 'solid',
        className: cn(
          'border-agentos-brand-tertiary-color-tertiary bg-agentos-brand-tertiary-color-tertiary',
          'text-agentos-neutral-text-color-text-light-solid',
          'hover:border-agentos-brand-tertiary-color-tertiary-hover hover:bg-agentos-brand-tertiary-color-tertiary-hover',
          'active:border-agentos-brand-tertiary-color-tertiary-active active:bg-agentos-brand-tertiary-color-tertiary-active',
          'disabled:border-agentos-neutral-bg-color-bg-button-container-disabled-black',
          'disabled:bg-agentos-neutral-bg-color-bg-button-container-disabled-black',
          'disabled:text-agentos-neutral-text-color-text-bottom-disable',
        ),
      },
      {
        theme: 'danger',
        appearance: 'solid',
        className: cn(
          'border-agentos-brand-error-color-error bg-agentos-brand-error-color-error',
          'text-agentos-neutral-text-color-text-light-solid',
          'hover:border-agentos-brand-error-color-error-hover hover:bg-agentos-brand-error-color-error-hover',
          'active:border-agentos-brand-error-color-error-active active:bg-agentos-brand-error-color-error-active',
          'disabled:border-agentos-neutral-bg-color-bg-button-container-disabled-danger',
          'disabled:bg-agentos-neutral-bg-color-bg-button-container-disabled-danger',
          'disabled:text-agentos-neutral-text-color-text-bottom-disable',
        ),
      },
      {
        theme: 'primary',
        appearance: 'outline',
        className: cn(
          'border-agentos-brand-primary-color-primary text-agentos-brand-primary-color-primary',
          'hover:border-agentos-brand-primary-color-primary-hover hover:bg-agentos-brand-primary-color-primary-bg-hover',
          'hover:text-agentos-brand-primary-color-primary-hover',
          'active:border-agentos-brand-primary-color-primary-active active:bg-agentos-brand-primary-color-primary-bg-active',
          'active:text-agentos-brand-primary-color-primary-active',
          'disabled:border-agentos-neutral-border-color-border disabled:bg-agentos-neutral-bg-color-bg-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-disabled',
        ),
      },
      {
        theme: 'black',
        appearance: 'outline',
        className: cn(
          'border-agentos-brand-tertiary-color-tertiary text-agentos-brand-tertiary-color-tertiary',
          'hover:border-agentos-brand-tertiary-color-tertiary-hover hover:bg-agentos-brand-tertiary-color-tertiary-bg-hover',
          'hover:text-agentos-brand-tertiary-color-tertiary-hover',
          'active:border-agentos-brand-tertiary-color-tertiary-active active:bg-agentos-brand-tertiary-color-tertiary-bg-hover-active',
          'active:text-agentos-brand-tertiary-color-tertiary-active',
          'disabled:border-agentos-neutral-border-color-border disabled:bg-agentos-neutral-bg-color-bg-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-disabled',
        ),
      },
      {
        theme: 'danger',
        appearance: 'outline',
        className: cn(
          'border-agentos-brand-error-color-error text-agentos-brand-error-color-error',
          'hover:border-agentos-brand-error-color-error-hover hover:bg-agentos-brand-error-color-error-bg-hover',
          'hover:text-agentos-brand-error-color-error-hover',
          'active:border-agentos-brand-error-color-error-active active:bg-agentos-brand-error-color-error-bg-hover-active',
          'active:text-agentos-brand-error-color-error-active',
          'disabled:border-agentos-neutral-border-color-border disabled:bg-agentos-neutral-bg-color-bg-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-disabled',
        ),
      },
      {
        theme: 'primary',
        appearance: 'ghost',
        className: cn(
          'text-agentos-brand-primary-color-primary',
          'hover:bg-agentos-brand-primary-color-primary-bg-hover',
          'active:bg-agentos-brand-primary-color-primary-bg-active active:text-agentos-brand-primary-color-primary-active',
          'disabled:bg-agentos-neutral-bg-color-bg-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-disabled',
        ),
      },
      {
        theme: 'black',
        appearance: 'ghost',
        className: cn(
          'text-agentos-brand-tertiary-color-tertiary',
          'hover:bg-agentos-brand-tertiary-color-tertiary-bg-hover',
          'active:bg-agentos-brand-tertiary-color-tertiary-bg-hover-active active:text-agentos-brand-tertiary-color-tertiary-active',
          'disabled:bg-agentos-neutral-bg-color-bg-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-disabled',
        ),
      },
      {
        theme: 'danger',
        appearance: 'ghost',
        className: cn(
          'text-agentos-brand-error-color-error',
          'hover:bg-agentos-brand-error-color-error-bg-hover',
          'active:bg-agentos-brand-error-color-error-bg-hover-active active:text-agentos-brand-error-color-error-active',
          'disabled:bg-agentos-neutral-bg-color-bg-container-disabled',
          'disabled:text-agentos-neutral-text-color-text-disabled',
        ),
      },
    ],
    defaultVariants: {
      theme: 'primary',
      appearance: 'solid',
      size: 'default',
      shape: 'rectangle',
    },
  },
)

type LegacyVariant = 'default' | 'outline' | 'ghost' | 'destructive'

function resolveButtonVariants({
  theme,
  appearance,
  variant,
}: {
  theme?: 'primary' | 'secondary' | 'black' | 'danger' | null
  appearance?: 'solid' | 'outline' | 'ghost' | null
  variant?: LegacyVariant | null
}) {
  let resolvedTheme: 'primary' | 'secondary' | 'black' | 'danger' = 'primary'
  let resolvedAppearance: 'solid' | 'outline' | 'ghost' = 'solid'

  if (theme || appearance) {
    resolvedTheme = theme ?? 'primary'
    resolvedAppearance = appearance ?? 'solid'
  } else {
    switch (variant) {
      case 'outline':
        resolvedAppearance = 'outline'
        break
      case 'ghost':
        resolvedAppearance = 'ghost'
        break
      case 'destructive':
        resolvedTheme = 'danger'
        break
      default:
        break
    }
  }

  // Figma 中 Secondary 仅提供 Default（solid）样式
  if (resolvedTheme === 'secondary' && resolvedAppearance !== 'solid') {
    resolvedAppearance = 'solid'
  }

  return { theme: resolvedTheme, appearance: resolvedAppearance }
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'theme' | 'appearance' | 'shape'> {
  /** @deprecated 使用 theme + appearance */
  variant?: LegacyVariant
  theme?: 'primary' | 'secondary' | 'black' | 'danger'
  appearance?: 'solid' | 'outline' | 'ghost'
  /** Figma Shape：rectangle 直角圆角；rounded 胶囊全圆 */
  shape?: 'rectangle' | 'rounded'
  asChild?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      theme,
      appearance,
      variant,
      size,
      shape = 'rectangle',
      asChild = false,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const resolved = resolveButtonVariants({ theme, appearance, variant })

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({
            theme: resolved.theme,
            appearance: resolved.appearance,
            size,
            shape,
          }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
