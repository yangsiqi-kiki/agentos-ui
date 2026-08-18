import { cn } from '@agentos/design-system'
import { CircleCheck, X } from 'lucide-react'

import { closeLabel } from '../fixtures/chat-lab'

export function ChatToast({
  message,
  onClose,
}: {
  message: string
  onClose: () => void
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-[1300] flex justify-center px-agentos-padding-padding16">
      <div
        className={cn(
          'pointer-events-auto flex items-center gap-agentos-gap-gap-xs8',
          'rounded-agentos-rounded-md6 border border-solid px-agentos-padding-padding16 py-[9px]',
          'border-agentos-brand-success-color-success-border bg-agentos-brand-success-color-success-bg',
          'shadow-[0_4px_10px_rgba(0,0,0,0.1)]',
        )}
        role="status"
      >
        <CircleCheck
          aria-hidden="true"
          className="size-agentos-icon-icon-size-md16 text-agentos-brand-success-color-success-text"
        />
        <p className="text-agentos-md leading-agentos-18 text-agentos-brand-success-color-success-text">
          {message}
        </p>
        <button
          type="button"
          aria-label={closeLabel}
          className="inline-flex size-agentos-icon-icon-size-sm12 items-center justify-center text-agentos-brand-success-color-success-text"
          onClick={onClose}
        >
          <X aria-hidden="true" className="size-agentos-icon-icon-size-sm12" />
        </button>
      </div>
    </div>
  )
}
