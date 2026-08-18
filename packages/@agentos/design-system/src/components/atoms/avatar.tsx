import { cva, type VariantProps } from 'class-variance-authority'
import {
  forwardRef,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

const avatarVariants = cva(
  cn(
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
    'bg-agentos-brand-primary-color-primary',
    'font-agentos-en font-agentos-normal tracking-agentos-normal',
    'text-agentos-neutral-text-color-text-light-solid',
  ),
  {
    variants: {
      size: {
        sm: 'size-agentos-control-control-height-sm24 text-agentos-md leading-agentos-18',
        default:
          'size-agentos-control-control-height-md32 text-agentos-md leading-agentos-18',
        lg: 'size-agentos-control-control-height-lg40 text-agentos-md leading-agentos-18',
      },
      shape: {
        circle: 'rounded-agentos-rounded-full999',
        square: 'rounded-agentos-rounded-lg8',
      },
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
    },
  },
)

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'children' | 'size'>,
    VariantProps<typeof avatarVariants> {
  fallback?: ReactNode
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      size = 'default',
      shape = 'circle',
      src,
      alt = '',
      fallback,
      onError,
      ...props
    },
    ref,
  ) => {
    const [imageFailed, setImageFailed] = useState(false)
    const showImage = Boolean(src) && !imageFailed

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            onError={(event) => {
              setImageFailed(true)
              onError?.(event)
            }}
            {...props}
          />
        ) : (
          <span aria-hidden={fallback == null || fallback === ''}>
            {fallback ?? (alt ? alt.charAt(0).toUpperCase() : 'A')}
          </span>
        )}
      </span>
    )
  },
)

Avatar.displayName = 'Avatar'
