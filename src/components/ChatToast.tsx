import { cn } from '@agentos/design-system'
import { CircleCheck, CircleX } from 'lucide-react'

export type ChatToastSemantic = 'success' | 'error'

const toastTone = {
  success: {
    Icon: CircleCheck,
    frame:
      'border-agentos-brand-success-color-success-border bg-agentos-brand-success-color-success-bg',
    text: 'text-agentos-brand-success-color-success-text',
  },
  error: {
    Icon: CircleX,
    frame: 'border-agentos-brand-error-color-error-border bg-agentos-brand-error-color-error-bg',
    text: 'text-agentos-brand-error-color-error-text',
  },
} as const

export function ChatToast({
  message,
  semantic = 'success',
}: {
  message: string
  semantic?: ChatToastSemantic
}) {
  const tone = toastTone[semantic]
  const Icon = tone.Icon

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-[1300] flex justify-center px-agentos-padding-padding16">
      <div
        className={cn(
          'flex items-center gap-agentos-gap-gap-xs8',
          'rounded-agentos-rounded-md6 border border-solid px-agentos-padding-padding16 py-[9px]',
          'shadow-[0_4px_10px_rgba(0,0,0,0.1)]',
          tone.frame,
        )}
        role="status"
      >
        <Icon aria-hidden="true" className={cn('size-agentos-icon-icon-size-md16', tone.text)} />
        <p className={cn('text-agentos-md leading-agentos-18', tone.text)}>{message}</p>
      </div>
    </div>
  )
}
