import { cva, type VariantProps } from 'class-variance-authority'
import { IconExclamationMark } from '@tabler/icons-react'
import { Check, CircleX } from 'lucide-react'
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

export type ProgressType = 'line' | 'circle' | 'mini'
export type ProgressStatus =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'not-started'
export type ProgressSize = 'sm' | 'default' | 'lg'

const STATUS_FILL: Record<ProgressStatus, string> = {
  default: 'bg-agentos-brand-info-color-info',
  success: 'bg-agentos-brand-success-color-success',
  error: 'bg-agentos-brand-error-color-error',
  warning: 'bg-agentos-brand-warning-color-warning',
  'not-started': 'bg-agentos-neutral-bg-color-bg-button-container-disabled-black',
}

const STATUS_STROKE: Record<ProgressStatus, string> = {
  default: 'stroke-agentos-brand-info-color-info',
  success: 'stroke-agentos-brand-success-color-success',
  error: 'stroke-agentos-brand-error-color-error',
  warning: 'stroke-agentos-brand-warning-color-warning',
  'not-started':
    'stroke-agentos-neutral-bg-color-bg-button-container-disabled-black',
}

const STATUS_FILL_SVG: Record<ProgressStatus, string> = {
  default: 'fill-agentos-brand-info-color-info',
  success: 'fill-agentos-brand-success-color-success',
  error: 'fill-agentos-brand-error-color-error',
  warning: 'fill-agentos-brand-warning-color-warning',
  'not-started':
    'fill-agentos-neutral-bg-color-bg-button-container-disabled-black',
}

const MINI_TRACK_STROKE: Record<ProgressStatus, string> = {
  default: 'stroke-agentos-neutral-bg-color-bg-button-container-disabled',
  success: 'stroke-agentos-brand-success-color-success-bg',
  error: 'stroke-agentos-neutral-bg-color-bg-button-container-disabled-danger',
  warning:
    'stroke-agentos-neutral-bg-color-bg-button-container-disabled-warning',
  'not-started': 'stroke-agentos-neutral-bg-color-bg-button-container-disabled',
}

const MINI_TRACK_FILL: Record<ProgressStatus, string> = {
  default: 'fill-agentos-neutral-bg-color-bg-button-container-disabled',
  success: 'fill-agentos-brand-success-color-success-bg',
  error: 'fill-agentos-neutral-bg-color-bg-button-container-disabled-danger',
  warning: 'fill-agentos-neutral-bg-color-bg-button-container-disabled-warning',
  'not-started': 'fill-agentos-neutral-bg-color-bg-button-container-disabled',
}

const MINI_LABEL: Record<ProgressStatus, string> = {
  default: 'text-agentos-brand-info-color-info',
  success: 'text-agentos-brand-success-color-success',
  error: 'text-agentos-brand-error-color-error',
  warning: 'text-agentos-brand-warning-color-warning',
  'not-started':
    'text-agentos-neutral-bg-color-bg-button-container-disabled',
}

const CIRCLE_SIZE_PX: Record<ProgressSize, number> = {
  sm: 48,
  default: 64,
  lg: 80,
}

const CIRCLE_STROKE_PX: Record<ProgressSize, number> = {
  sm: 3,
  default: 4,
  lg: 5,
}

const MINI_SIZE_PX = 16
const MINI_STROKE_PX = 2

const lineTrackVariants = cva(
  'relative min-w-0 flex-1 overflow-hidden rounded-[10px] bg-agentos-neutral-border-color-border-secondary',
  {
    variants: {
      size: {
        sm: 'h-[3px]',
        default: 'h-1',
        lg: 'h-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const lineRootVariants = cva('flex w-full items-center', {
  variants: {
    size: {
      sm: 'gap-agentos-gap-gap-xs8',
      default: 'gap-agentos-gap-gap-xs8',
      lg: 'gap-agentos-gap-gap16',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const lineLabelVariants = cva(
  'shrink-0 whitespace-nowrap text-center font-agentos-en font-agentos-normal tracking-agentos-normal text-agentos-neutral-text-color-text-secondary',
  {
    variants: {
      size: {
        sm: 'text-agentos-sm leading-4',
        default: 'text-agentos-md leading-agentos-18',
        lg: 'text-agentos-lg leading-agentos-24',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

function clampPercent(value: number) {
  if (Number.isNaN(value)) return 0
  return Math.min(100, Math.max(0, value))
}

function defaultFormat(percent: number) {
  return `${Math.round(percent)}%`
}

function CircleRing({
  sizePx,
  strokePx,
  percent,
  status,
  className,
}: {
  sizePx: number
  strokePx: number
  percent: number
  status: ProgressStatus
  className?: string
}) {
  const radius = (sizePx - strokePx) / 2
  const circumference = 2 * Math.PI * radius
  const resolvedPercent = status === 'not-started' ? 0 : percent
  const offset = circumference - (resolvedPercent / 100) * circumference
  const center = sizePx / 2

  let trackStroke = 'stroke-agentos-neutral-border-color-border-secondary'
  if (status === 'not-started') {
    trackStroke =
      'stroke-agentos-neutral-bg-color-bg-button-container-disabled-black'
  }

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox={`0 0 ${sizePx} ${sizePx}`}
      className={cn('-rotate-90', className)}
      aria-hidden="true"
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={strokePx}
        className={trackStroke}
      />
      {resolvedPercent > 0 ? (
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokePx}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={STATUS_STROKE[status]}
        />
      ) : null}
    </svg>
  )
}

function MiniRing({
  percent,
  status,
}: {
  percent: number
  status: ProgressStatus
}) {
  const radius = (MINI_SIZE_PX - MINI_STROKE_PX) / 2
  const circumference = 2 * Math.PI * radius
  const resolvedPercent = status === 'not-started' ? 0 : percent
  const offset = circumference - (resolvedPercent / 100) * circumference
  const center = MINI_SIZE_PX / 2

  return (
    <svg
      width={MINI_SIZE_PX}
      height={MINI_SIZE_PX}
      viewBox={`0 0 ${MINI_SIZE_PX} ${MINI_SIZE_PX}`}
      className="-rotate-90 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={MINI_STROKE_PX}
        className={MINI_TRACK_STROKE[status]}
      />
      {resolvedPercent > 0 ? (
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={MINI_STROKE_PX}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={STATUS_STROKE[status]}
        />
      ) : null}
    </svg>
  )
}

/** 扇形路径：从 12 点钟顺时针扫 percent */
function piePath(sizePx: number, percent: number) {
  const center = sizePx / 2
  const radius = sizePx / 2
  if (percent <= 0) return ''
  if (percent >= 100) {
    return `M ${center} ${center} m -${radius} 0 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 -${radius * 2} 0`
  }
  const angle = (percent / 100) * 360
  const rad = ((angle - 90) * Math.PI) / 180
  const x = center + radius * Math.cos(rad)
  const y = center + radius * Math.sin(rad)
  const largeArc = angle > 180 ? 1 : 0
  return `M ${center} ${center} L ${center} 0 A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y} Z`
}

function MiniPie({
  percent,
  status,
}: {
  percent: number
  status: ProgressStatus
}) {
  const resolvedPercent = status === 'not-started' ? 0 : percent
  const center = MINI_SIZE_PX / 2
  const radius = MINI_SIZE_PX / 2

  return (
    <svg
      width={MINI_SIZE_PX}
      height={MINI_SIZE_PX}
      viewBox={`0 0 ${MINI_SIZE_PX} ${MINI_SIZE_PX}`}
      className="shrink-0"
      aria-hidden="true"
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        className={MINI_TRACK_FILL[status]}
      />
      {resolvedPercent > 0 ? (
        <path
          d={piePath(MINI_SIZE_PX, resolvedPercent)}
          className={STATUS_FILL_SVG[status]}
        />
      ) : null}
    </svg>
  )
}

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof lineRootVariants> {
  type?: ProgressType
  percent?: number
  status?: ProgressStatus
  size?: ProgressSize
  /** 是否显示百分比 / 状态文案 / 中心图标 */
  showInfo?: boolean
  /** mini：true 为实心扇形，false 为环形 */
  circular?: boolean
  format?: (percent: number) => ReactNode
  waitingText?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      type = 'line',
      percent = 0,
      status = 'default',
      size = 'default',
      showInfo = true,
      circular = false,
      format = defaultFormat,
      waitingText = 'waiting...',
      ...props
    },
    ref,
  ) => {
    const resolvedPercent = clampPercent(percent)
    const label = format(resolvedPercent)

    if (type === 'mini') {
      // Figma：Success + Pie 用 Check 替换进度图形；其余按 circular 渲染环/扇形
      const useSuccessCheck = status === 'success' && circular

      let indicator: ReactNode = null
      if (useSuccessCheck) {
        indicator = (
          <span
            className={cn(
              'inline-flex shrink-0 text-agentos-brand-success-color-success',
              '[&_svg]:size-agentos-icon-icon-size-md16',
            )}
          >
            <Check aria-hidden="true" />
          </span>
        )
      } else if (circular) {
        indicator = <MiniPie percent={resolvedPercent} status={status} />
      } else {
        indicator = <MiniRing percent={resolvedPercent} status={status} />
      }

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={status === 'not-started' ? 0 : resolvedPercent}
          className={cn(
            'inline-flex items-center gap-agentos-gap-gap-xs8',
            className,
          )}
          {...props}
        >
          {indicator}
          {showInfo ? (
            <span
              className={cn(
                'whitespace-nowrap font-agentos-en font-agentos-normal',
                'text-agentos-md leading-agentos-18 tracking-agentos-normal',
                MINI_LABEL[status],
              )}
            >
              {label}
            </span>
          ) : null}
        </div>
      )
    }

    if (type === 'circle') {
      const sizePx = CIRCLE_SIZE_PX[size]
      const strokePx = CIRCLE_STROKE_PX[size]
      const showPercentLabel =
        showInfo && (status === 'default' || status === 'not-started')
      const showSuccessIcon = showInfo && status === 'success'
      const showErrorIcon = showInfo && status === 'error'

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={status === 'not-started' ? 0 : resolvedPercent}
          className={cn('relative inline-flex shrink-0', className)}
          style={{ width: sizePx, height: sizePx }}
          {...props}
        >
          <CircleRing
            sizePx={sizePx}
            strokePx={strokePx}
            percent={resolvedPercent}
            status={status}
          />
          {showPercentLabel ? (
            <span
              className={cn(
                'pointer-events-none absolute inset-0 flex items-center justify-center',
                'font-agentos-en font-agentos-normal tracking-agentos-normal',
                'text-agentos-md leading-agentos-18',
                'text-agentos-neutral-text-color-text-secondary',
              )}
            >
              {status === 'not-started' ? format(0) : label}
            </span>
          ) : null}
          {showSuccessIcon ? (
            <span
              className={cn(
                'pointer-events-none absolute inset-0 flex items-center justify-center',
                'text-agentos-brand-success-color-success',
                '[&_svg]:size-agentos-icon-icon-size-md16',
              )}
            >
              <Check aria-hidden="true" />
            </span>
          ) : null}
          {showErrorIcon ? (
            <span
              className={cn(
                'pointer-events-none absolute inset-0 flex items-center justify-center',
                'text-agentos-brand-error-color-error',
                '[&_svg]:size-agentos-icon-icon-size-md16',
              )}
            >
              <IconExclamationMark aria-hidden="true" />
            </span>
          ) : null}
        </div>
      )
    }

    // type === 'line'
    const fillPercent = status === 'not-started' ? 0 : resolvedPercent
    const showWaiting = status === 'not-started'
    const showErrorIcon = status === 'error'

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={fillPercent}
        className={cn(lineRootVariants({ size }), className)}
        {...props}
      >
        <div className={lineTrackVariants({ size })}>
          <div
            className={cn(
              'h-full rounded-[10px] transition-[width]',
              STATUS_FILL[status],
            )}
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        {showInfo ? (
          <div
            className={cn(
              'inline-flex shrink-0 items-center gap-agentos-gap-gap-xxs4',
              lineLabelVariants({ size }),
            )}
          >
            <span>{showWaiting ? waitingText : label}</span>
            {showErrorIcon ? (
              <span className="inline-flex text-agentos-brand-error-color-error [&_svg]:size-agentos-icon-icon-size-sm12">
                <CircleX aria-hidden="true" />
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)

Progress.displayName = 'Progress'
