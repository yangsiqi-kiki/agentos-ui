import { cn } from '@agentos/design-system'
import { Paperclip, Send, Square } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'

import { composerPlaceholder } from '../fixtures/chat-lab'

export function ChatComposer({
  value,
  isRunning,
  onChange,
  onSend,
  onStop,
}: {
  value: string
  isRunning: boolean
  onChange: (value: string) => void
  onSend: () => void
  onStop: () => void
}) {
  const canSend = value.trim().length > 0 && !isRunning
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) {
      return
    }
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [value])

  return (
    <div className="pointer-events-none relative z-10 -mt-agentos-padding-padding-lg24 shrink-0 px-agentos-padding-padding-lg24 pb-agentos-padding-padding-lg24 pt-agentos-padding-padding-lg24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-agentos-padding-padding-lg24 bg-gradient-to-t from-agentos-neutral-bg-color-bg-base to-transparent"
      />
      <div className="pointer-events-auto relative mx-auto flex w-full max-w-[720px] flex-col gap-agentos-gap-gap16 rounded-agentos-rounded-xl12 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container p-3">
        <textarea
          ref={textareaRef}
          value={value}
          rows={1}
          placeholder={composerPlaceholder}
          className="block min-h-[var(--agentos-font-leading-22)] w-full resize-none overflow-hidden border-0 bg-transparent text-agentos-md leading-agentos-22 text-agentos-neutral-text-color-text outline-none placeholder:text-agentos-neutral-text-color-text-placeholder"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              onSend()
            }
          }}
        />
        <div className="flex items-center justify-between">
          <span className="rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border px-2 py-1 text-agentos-sm text-agentos-neutral-text-color-text-secondary">
            Auto
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="添加附件"
              className="inline-flex size-7 items-center justify-center rounded-agentos-rounded-sm4 text-agentos-neutral-text-color-text-secondary transition hover:bg-agentos-neutral-fill-color-fill-tertiary hover:text-agentos-neutral-text-color-text"
            >
              <Paperclip className="size-4" />
            </button>
            {isRunning ? (
              <button
                type="button"
                aria-label="停止生成"
                className="inline-flex size-7 items-center justify-center rounded-agentos-rounded-full999 bg-agentos-brand-tertiary-color-tertiary text-agentos-neutral-text-color-text-light-solid"
                onClick={onStop}
              >
                <Square className="size-4 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="发送"
                disabled={!canSend}
                className={cn(
                  'inline-flex size-7 items-center justify-center rounded-agentos-rounded-lg8',
                  'bg-agentos-brand-tertiary-color-tertiary text-agentos-neutral-text-color-text-light-solid',
                  'disabled:cursor-not-allowed disabled:opacity-40',
                )}
                onClick={onSend}
              >
                <Send className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
