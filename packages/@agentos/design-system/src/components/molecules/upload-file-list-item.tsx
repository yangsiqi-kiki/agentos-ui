import { CheckCircle2, Download, FileText, Trash2 } from 'lucide-react'
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import { Progress } from '../atoms/progress'

export type UploadFileStatus = 'done' | 'uploading' | 'error'

export interface UploadFileListItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  name: ReactNode
  status?: UploadFileStatus
  percent?: number
  errorMessage?: ReactNode
  downloadLabel?: string
  removeLabel?: string
  onDownload?: () => void
  onRemove?: () => void
}

function ActionIconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex size-agentos-icon-icon-size-md16 shrink-0 items-center justify-center',
        'rounded-agentos-rounded-sm4 border-0 bg-transparent p-0',
        'text-agentos-neutral-icon-color-icon transition-colors',
        'hover:text-agentos-neutral-icon-color-icon-hover',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-agentos-brand-primary-color-primary',
        '[&_svg]:size-agentos-icon-icon-size-md16',
      )}
    >
      {children}
    </button>
  )
}

export const UploadFileListItem = forwardRef<
  HTMLDivElement,
  UploadFileListItemProps
>(
  (
    {
      className,
      name,
      status = 'done',
      percent = 0,
      errorMessage,
      downloadLabel = 'Download',
      removeLabel = 'Remove',
      onDownload,
      onRemove,
      ...props
    },
    ref,
  ) => {
    const isError = status === 'error'
    const isUploading = status === 'uploading'
    const isDone = status === 'done'

    return (
      <div ref={ref} className={cn('flex w-full flex-col', className)} {...props}>
        <div
          className={cn(
            'flex w-full items-center gap-agentos-margin-margin-xs8',
            'rounded-agentos-rounded-lg8 bg-agentos-neutral-bg-color-bg-layout',
            'px-3 py-[7px]',
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span
              className={cn(
                'inline-flex shrink-0',
                'text-agentos-neutral-icon-color-icon',
                '[&_svg]:size-agentos-icon-icon-size-md16',
              )}
              aria-hidden="true"
            >
              <FileText />
            </span>
            <span
              className={cn(
                'min-w-0 truncate font-agentos-en font-agentos-normal',
                'text-agentos-md leading-agentos-18 tracking-agentos-normal',
                isError
                  ? 'text-agentos-brand-error-color-error'
                  : 'text-agentos-neutral-text-color-text',
              )}
            >
              {name}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-agentos-margin-margin-xs8">
            {isDone && onDownload ? (
              <ActionIconButton label={downloadLabel} onClick={onDownload}>
                <Download aria-hidden="true" />
              </ActionIconButton>
            ) : null}

            {isDone && !onDownload ? (
              <span
                className={cn(
                  'inline-flex shrink-0 text-agentos-brand-success-color-success',
                  '[&_svg]:size-agentos-icon-icon-size-md16',
                )}
                aria-hidden="true"
              >
                <CheckCircle2 />
              </span>
            ) : null}

            {isUploading ? (
              <Progress
                type="mini"
                percent={percent}
                status="default"
                showInfo={false}
              />
            ) : null}

            {onRemove ? (
              <ActionIconButton label={removeLabel} onClick={onRemove}>
                <Trash2 aria-hidden="true" />
              </ActionIconButton>
            ) : null}
          </div>
        </div>

        {isError && errorMessage != null && errorMessage !== '' ? (
          <p
            className={cn(
              'mt-agentos-margin-margin-xxs4 m-0',
              'font-agentos-en font-agentos-normal',
              'text-agentos-sm leading-4 tracking-agentos-normal',
              'text-agentos-brand-error-color-error',
            )}
          >
            {errorMessage}
          </p>
        ) : null}
      </div>
    )
  },
)

UploadFileListItem.displayName = 'UploadFileListItem'
