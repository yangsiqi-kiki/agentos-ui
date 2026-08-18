import { Avatar, Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Tag, cn } from '@agentos/design-system'
import {
  Copy,
  Ellipsis,
  Pencil,
  RefreshCw,
  SquareArrowOutUpRight,
  Trash2,
} from 'lucide-react'
import { forwardRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { agentInitial, agentName, agentTag, type ChatMessage } from '../fixtures/chat-lab'

const IconActionButton = forwardRef<
  HTMLButtonElement,
  {
    label: string
    children: ReactNode
  } & ComponentPropsWithoutRef<'button'>
>(function IconActionButton({ label, children, className, ...props }, ref) {
  return (
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
}: {
  align: 'start' | 'end'
  content: string
  showEdit?: boolean
  showRetry?: boolean
  showShare?: boolean
  revealOnHover?: boolean
  onDelete?: () => void
}) {
  const [copied, setCopied] = useState(false)

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
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
      <IconActionButton
        label={copied ? '已复制' : '复制'}
        onClick={() => {
          void copyMessage()
        }}
      >
        <Copy aria-hidden="true" />
      </IconActionButton>
      {showShare ? (
        <IconActionButton label="分享">
          <SquareArrowOutUpRight aria-hidden="true" />
        </IconActionButton>
      ) : null}
      {showEdit ? (
        <IconActionButton label="编辑">
          <Pencil aria-hidden="true" />
        </IconActionButton>
      ) : null}
      {showRetry ? (
        <IconActionButton label="重新生成">
          <RefreshCw aria-hidden="true" />
        </IconActionButton>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconActionButton label="更多">
            <Ellipsis aria-hidden="true" />
          </IconActionButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuItem onSelect={onDelete}>
            <Trash2 aria-hidden="true" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
      <div className="max-w-full rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-tertiary px-agentos-padding-padding-sm12 py-agentos-padding-padding-xs8">
        <p className="whitespace-pre-wrap break-words text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-heading">
          {message.content}
        </p>
      </div>
    )
  }

  return (
    <p className="whitespace-pre-wrap break-words text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-heading">
      {message.content}
      {message.status === 'streaming' ? (
        <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-agentos-brand-primary-color-primary align-middle" />
      ) : null}
    </p>
  )
}

export function MessageBubble({
  message,
  showEdit = false,
  showShare = true,
  selecting = false,
  selected = false,
  onDelete,
  onToggleSelect,
}: {
  message: ChatMessage
  showEdit?: boolean
  showShare?: boolean
  selecting?: boolean
  selected?: boolean
  onDelete?: () => void
  onToggleSelect?: (nextSelected: boolean) => void
}) {
  const isUser = message.role === 'user'
  const showActions = message.status === 'complete' && !selecting

  if (selecting) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={cn(
          'flex w-full cursor-pointer items-center rounded-agentos-rounded-xl12 px-agentos-padding-padding-sm12 py-agentos-margin-margin-sm12',
          isUser ? 'justify-between' : 'gap-agentos-gap-gap-sm12',
          selected && 'bg-agentos-neutral-bg-color-bg-elevated',
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
          showRetry={!isUser}
          showShare={showShare}
          revealOnHover={isUser}
          onDelete={onDelete}
        />
      ) : null}
    </div>
  )
}
