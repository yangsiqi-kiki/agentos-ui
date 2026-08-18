import { Avatar, Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Tag, cn } from '@agentos/design-system'
import {
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Ellipsis,
  Pencil,
  RefreshCw,
  SquareArrowOutUpRight,
  Trash2,
} from 'lucide-react'
import { forwardRef, useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import {
  agentInitial,
  agentName,
  agentTag,
  regenerateLabel,
  regeneratePromptPlaceholder,
  type ChatMessage,
} from '../fixtures/chat-lab'
import { MarkdownContent } from './MarkdownContent'

const streamingTailFadeClassName =
  '[mask-image:linear-gradient(#000,#000),linear-gradient(to_right,#000_calc(100%-64px),transparent)] [mask-position:0_0,bottom] [mask-size:100%_calc(100%-1.5em),100%_1.5em] [mask-repeat:no-repeat] [-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(to_right,#000_calc(100%-64px),transparent)] [-webkit-mask-position:0_0,bottom] [-webkit-mask-size:100%_calc(100%-1.5em),100%_1.5em] [-webkit-mask-repeat:no-repeat]'

function ActionTooltip({
  label,
  disabled = false,
  children,
}: {
  label: string
  disabled?: boolean
  children: ReactNode
}) {
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }
    setPosition({ top: rect.bottom + 4, left: rect.left + rect.width / 2 })
  }

  const show = open && !disabled

  useEffect(() => {
    if (!show) {
      return
    }
    const hide = () => setOpen(false)
    window.addEventListener('scroll', hide, true)
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
    }
  }, [show])

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={() => {
        if (disabled) {
          return
        }
        updatePosition()
        setOpen(true)
      }}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {show
        ? createPortal(
            <span
              role="tooltip"
              className="pointer-events-none fixed z-[40] flex -translate-x-1/2 flex-col items-center"
              style={{ top: position.top, left: position.left }}
            >
              <span className="h-0 w-0 border-x-[5px] border-b-[4px] border-x-transparent border-b-agentos-neutral-bg-color-bg-spotlight" />
              <span className="whitespace-nowrap rounded-agentos-rounded-lg8 bg-agentos-neutral-bg-color-bg-spotlight px-agentos-padding-padding-sm12 py-agentos-padding-padding-xxs4 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-light-solid">
                {label}
              </span>
            </span>,
            document.body,
          )
        : null}
    </span>
  )
}

const IconActionButton = forwardRef<
  HTMLButtonElement,
  {
    label: string
    tooltipDisabled?: boolean
    children: ReactNode
  } & ComponentPropsWithoutRef<'button'>
>(function IconActionButton({ label, tooltipDisabled = false, children, className, ...props }, ref) {
  return (
    <ActionTooltip label={label} disabled={tooltipDisabled || props.disabled === true}>
      <Button
        ref={ref}
        type="button"
        theme="black"
        appearance="ghost"
        size="icon"
        shape="rectangle"
        aria-label={label}
        className={cn(
          'size-agentos-control-control-height-sm24 [&_svg]:size-agentos-icon-icon-size-sm12',
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </ActionTooltip>
  )
})

function MessageActions({
  align,
  content,
  showEdit,
  showRetry,
  showShare = true,
  revealOnHover = false,
  onDelete,
  onShare,
  onRetry,
  generation,
}: {
  align: 'start' | 'end'
  content: string
  showEdit?: boolean
  showRetry?: boolean
  showShare?: boolean
  revealOnHover?: boolean
  onDelete?: () => void
  onShare?: () => void
  onRetry?: (prompt?: string) => void
  generation?: {
    current: number
    total: number
    onPrev: () => void
    onNext: () => void
  }
}) {
  const [copied, setCopied] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [retryOpen, setRetryOpen] = useState(false)
  const [retryPrompt, setRetryPrompt] = useState('')
  const copiedTimerRef = useRef<number | null>(null)
  const retryInputRef = useRef<HTMLInputElement | null>(null)

  const submitRetry = (prompt?: string) => {
    setRetryOpen(false)
    setRetryPrompt('')
    onRetry?.(prompt)
  }

  useEffect(() => {
    if (retryOpen) {
      retryInputRef.current?.focus()
    }
  }, [retryOpen])

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current)
      }
    }
  }, [])

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current)
      }
      copiedTimerRef.current = window.setTimeout(() => {
        setCopied(false)
        copiedTimerRef.current = null
      }, 3000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={cn(
        'absolute bottom-agentos-padding-padding-xs8 flex items-center gap-agentos-gap-gap-xs8',
        align === 'end' ? 'right-0' : 'left-0',
        revealOnHover &&
          'pointer-events-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100',
      )}
    >
      {generation && generation.total > 1 ? (
        <div className="flex items-center gap-[2px]">
          <IconActionButton
            label="上一版"
            disabled={generation.current <= 1}
            className="disabled:bg-transparent disabled:hover:bg-transparent"
            onClick={generation.onPrev}
          >
            <ChevronLeft aria-hidden="true" />
          </IconActionButton>
          <span className="shrink-0 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-label">
            {generation.current}/{generation.total}
          </span>
          <IconActionButton
            label="下一版"
            disabled={generation.current >= generation.total}
            className="disabled:bg-transparent disabled:hover:bg-transparent"
            onClick={generation.onNext}
          >
            <ChevronRight aria-hidden="true" />
          </IconActionButton>
        </div>
      ) : null}
      <div className="flex items-center gap-agentos-gap-gap-xs8">
        <IconActionButton
          label={copied ? '已复制' : '复制'}
          onClick={() => {
            void copyMessage()
          }}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </IconActionButton>
        {showShare ? (
          <IconActionButton label="分享" onClick={onShare}>
            <SquareArrowOutUpRight aria-hidden="true" />
          </IconActionButton>
        ) : null}
        {showEdit ? (
          <IconActionButton label="修改">
            <Pencil aria-hidden="true" />
          </IconActionButton>
        ) : null}
        {showRetry ? (
          <DropdownMenu
            open={retryOpen}
            onOpenChange={(open) => {
              setRetryOpen(open)
              if (!open) {
                setRetryPrompt('')
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <IconActionButton label={regenerateLabel} tooltipDisabled={retryOpen}>
                <RefreshCw aria-hidden="true" />
              </IconActionButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[200px] min-w-[200px] p-0 py-agentos-padding-padding-xxs4 shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
              onCloseAutoFocus={(event) => event.preventDefault()}
            >
              <div className="flex items-center gap-agentos-gap-gap-xs8 px-agentos-padding-padding-sm12 py-[7px]">
                <input
                  ref={retryInputRef}
                  value={retryPrompt}
                  placeholder={regeneratePromptPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text outline-none placeholder:text-agentos-neutral-text-color-text-placeholder"
                  onChange={(event) => setRetryPrompt(event.target.value)}
                  onKeyDown={(event) => {
                    event.stopPropagation()
                    if (event.key === 'Enter' && retryPrompt.trim()) {
                      event.preventDefault()
                      submitRetry(retryPrompt.trim())
                    }
                  }}
                />
                <button
                  type="button"
                  aria-label="按要求重新生成"
                  disabled={!retryPrompt.trim()}
                  className={cn(
                    'inline-flex size-agentos-control-control-height-sm24 shrink-0 items-center justify-center rounded-agentos-rounded-full999',
                    'bg-agentos-brand-tertiary-color-tertiary text-agentos-neutral-text-color-text-light-solid',
                    'disabled:cursor-not-allowed disabled:bg-agentos-neutral-bg-color-bg-button-container-disabled-black disabled:text-agentos-neutral-text-color-text-disabled',
                  )}
                  onClick={() => submitRetry(retryPrompt.trim())}
                >
                  <ArrowUp className="size-agentos-icon-icon-size-sm12" />
                </button>
              </div>
              <DropdownMenuSeparator className="my-0" />
              <DropdownMenuItem onSelect={() => submitRetry()}>
                <RefreshCw aria-hidden="true" />
                {regenerateLabel}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        <DropdownMenu onOpenChange={setMoreOpen}>
          <DropdownMenuTrigger asChild>
            <IconActionButton label="更多" tooltipDisabled={moreOpen}>
              <Ellipsis aria-hidden="true" />
            </IconActionButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={align}>
            <DropdownMenuItem
              className="text-agentos-brand-error-color-error"
              onSelect={onDelete}
            >
              <Trash2 aria-hidden="true" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function AgentIdentity() {
  return (
    <div className="flex items-center gap-agentos-gap-gap-xs8">
      <Avatar size="sm" fallback={agentInitial} alt={agentName} />
      <span className="text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-label">
        {agentName}
      </span>
      <Tag>{agentTag}</Tag>
    </div>
  )
}

function MessageContent({ message, isUser }: { message: ChatMessage; isUser: boolean }) {
  if (isUser) {
    return (
      <div className="max-w-full rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-tertiary px-agentos-padding-padding-sm12 py-agentos-padding-padding-sm12">
        <p className="whitespace-pre-wrap break-words text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-heading">
          {message.content}
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'min-w-0',
        message.status === 'streaming' && streamingTailFadeClassName,
      )}
    >
      <MarkdownContent content={message.content} size="md" />
    </div>
  )
}

export function MessageBubble({
  message,
  showEdit = false,
  showRetry = false,
  showShare = true,
  selecting = false,
  selected = false,
  highlightSelectedOnly = true,
  showActions: showActionsProp = true,
  onDelete,
  onShare,
  onRetry,
  onSelectGeneration,
  onToggleSelect,
}: {
  message: ChatMessage
  showEdit?: boolean
  showRetry?: boolean
  showShare?: boolean
  selecting?: boolean
  selected?: boolean
  highlightSelectedOnly?: boolean
  showActions?: boolean
  onDelete?: () => void
  onShare?: () => void
  onRetry?: (prompt?: string) => void
  onSelectGeneration?: (index: number) => void
  onToggleSelect?: (nextSelected: boolean) => void
}) {
  const isUser = message.role === 'user'
  const showActions = showActionsProp && message.status === 'complete' && !selecting

  if (selecting) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={cn(
          'flex w-full cursor-pointer items-center rounded-agentos-rounded-xl12 px-agentos-padding-padding-sm12 py-agentos-margin-margin-sm12',
          isUser ? 'justify-between' : 'gap-agentos-gap-gap-sm12',
          (!highlightSelectedOnly || selected) && 'bg-agentos-neutral-bg-color-bg-elevated',
        )}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('label')) {
            return
          }
          onToggleSelect?.(!selected)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onToggleSelect?.(!selected)
          }
        }}
      >
        <Checkbox
          checked={selected}
          aria-label={isUser ? '选择用户消息' : '选择 Agent 消息'}
          onCheckedChange={(next) => onToggleSelect?.(next === true)}
        />
        {isUser ? (
          <MessageContent message={message} isUser />
        ) : (
          <div className="flex min-w-0 flex-col items-start gap-agentos-gap-gap-xs8">
            <AgentIdentity />
            <MessageContent message={message} isUser={false} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex w-full flex-col gap-agentos-gap-gap-xs8',
        isUser ? 'group items-end' : 'items-start',
        showActions ? 'pb-10' : null,
      )}
    >
      {isUser ? null : <AgentIdentity />}
      <MessageContent message={message} isUser={isUser} />
      {showActions ? (
        <MessageActions
          align={isUser ? 'end' : 'start'}
          content={message.content}
          showEdit={showEdit}
          showRetry={showRetry}
          showShare={showShare}
          revealOnHover={isUser}
          onDelete={onDelete}
          onShare={onShare}
          onRetry={onRetry}
          generation={
            !isUser && (message.versions?.length ?? 0) > 1
              ? {
                  current: (message.versionIndex ?? 0) + 1,
                  total: message.versions?.length ?? 1,
                  onPrev: () => onSelectGeneration?.((message.versionIndex ?? 0) - 1),
                  onNext: () => onSelectGeneration?.((message.versionIndex ?? 0) + 1),
                }
              : undefined
          }
        />
      ) : null}
    </div>
  )
}
