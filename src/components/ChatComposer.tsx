import { Button, cn } from '@agentos/design-system'
import { ArrowUp, ChevronDown, Image, Paperclip, Square } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'

import { composerPlaceholder } from '../fixtures/chat-lab'

const MAX_TEXTAREA_HEIGHT = 200

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
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
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
          className="composer-scrollview block max-h-[200px] min-h-[var(--agentos-font-leading-22)] w-full resize-none overflow-y-auto border-0 bg-transparent text-agentos-md leading-agentos-22 text-agentos-neutral-text-color-text outline-none placeholder:text-agentos-neutral-text-color-text-placeholder"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              onSend()
            }
          }}
        />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            theme="black"
            appearance="ghost"
            size="sm"
            shape="rectangle"
            trailingIcon={<ChevronDown aria-hidden="true" />}
          >
            Auto
          </Button>
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="添加图片"
                className="inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999 text-agentos-brand-tertiary-color-tertiary transition hover:bg-agentos-brand-tertiary-color-tertiary-bg-hover"
              >
                <Image className="size-agentos-icon-icon-size-md16" />
              </button>
              <button
                type="button"
                aria-label="添加附件"
                className="inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999 text-agentos-brand-tertiary-color-tertiary transition hover:bg-agentos-brand-tertiary-color-tertiary-bg-hover"
              >
                <Paperclip className="size-agentos-icon-icon-size-md16" />
              </button>
            </div>
            {isRunning ? (
              <button
                type="button"
                aria-label="停止生成"
                className="inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999 bg-agentos-brand-tertiary-color-tertiary text-agentos-neutral-text-color-text-light-solid"
                onClick={onStop}
              >
                <Square className="size-agentos-icon-icon-size-md16 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="发送"
                disabled={!canSend}
                className={cn(
                  'inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999',
                  'bg-agentos-brand-tertiary-color-tertiary text-agentos-neutral-text-color-text-light-solid',
                  'disabled:cursor-not-allowed disabled:bg-agentos-neutral-bg-color-bg-button-container-disabled-black disabled:text-agentos-neutral-text-color-text-disabled disabled:opacity-100',
                )}
                onClick={onSend}
              >
                <ArrowUp className="size-agentos-icon-icon-size-md16" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
