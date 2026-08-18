import { cn } from '@agentos/design-system'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import {
  emptyThreadHint,
  getMockRegeneratedReply,
  getSharedConversationUrl,
  initialMessages,
  linkCopiedToast,
  mockReplyChunks,
  type ChatMessage,
} from '../fixtures/chat-lab'
import { ChatComposer } from './ChatComposer'
import { ChatSelectFooter } from './ChatSelectFooter'
import { ChatSelectHeader } from './ChatSelectHeader'
import { ChatShareFooter } from './ChatShareFooter'
import { ChatThreadHeader } from './ChatThreadHeader'
import { ChatToast } from './ChatToast'
import { MessageBubble } from './MessageBubble'

type SelectionIntent = 'delete' | 'share'
const STREAM_CHARS_PER_FRAME = 0.6

function countSelectedGroups(messages: ChatMessage[], selectedIds: string[]) {
  const selected = new Set(selectedIds)
  const seen = new Set<string>()
  let count = 0

  for (const message of messages) {
    if (!selected.has(message.id) || seen.has(message.id)) {
      continue
    }
    getMessagePairIds(messages, message.id).forEach((id) => {
      seen.add(id)
    })
    count += 1
  }

  return count
}

function getMessagePairIds(messages: ChatMessage[], id: string) {
  const index = messages.findIndex((message) => message.id === id)
  if (index < 0) {
    return []
  }

  const message = messages[index]
  if (message.role === 'user') {
    const next = messages[index + 1]
    return next?.role === 'assistant' ? [message.id, next.id] : [message.id]
  }

  const previous = messages[index - 1]
  return previous?.role === 'user' ? [previous.id, message.id] : [message.id]
}

export function ChatThread() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [selectionIntent, setSelectionIntent] = useState<SelectionIntent | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const runRef = useRef<{ cancel: () => void } | null>(null)
  const savedScrollTopRef = useRef(0)
  const shouldRestoreScrollRef = useRef(false)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) {
      return
    }
    viewport.scrollTop = viewport.scrollHeight
  }, [messages])

  useEffect(() => {
    return () => {
      runRef.current?.cancel()
    }
  }, [])

  const stopRun = () => {
    runRef.current?.cancel()
    runRef.current = null
    setIsRunning(false)
    setMessages((current) =>
      current.map((message) =>
        message.status === 'streaming' ? { ...message, status: 'complete' } : message,
      ),
    )
  }

  const streamAssistant = (assistantId: string, fullText: string) => {
    runRef.current?.cancel()

    setIsRunning(true)
    setMessages((current) =>
      current.map((message) => {
        if (message.id === assistantId) {
          const versions =
            message.versions && message.versions.length > 0
              ? message.versions
              : message.content.trim()
                ? [message.content]
                : []
          return {
            ...message,
            content: '',
            status: 'streaming',
            versions,
            versionIndex: versions.length,
          }
        }
        if (message.status === 'streaming') {
          return { ...message, status: 'complete' }
        }
        return message
      }),
    )

    let index = 0
    let frameId = 0
    let cancelled = false

    const tick = () => {
      if (cancelled) {
        return
      }

      index = Math.min(fullText.length, index + STREAM_CHARS_PER_FRAME)
      const finished = index >= fullText.length
      const nextContent = fullText.slice(0, index)

      setMessages((current) =>
        current.map((message) => {
          if (message.id !== assistantId) {
            return message
          }
          if (!finished) {
            return {
              ...message,
              content: nextContent,
              status: 'streaming',
            }
          }
          const versions = [...(message.versions ?? []), nextContent]
          return {
            ...message,
            content: nextContent,
            status: 'complete',
            versions,
            versionIndex: versions.length - 1,
          }
        }),
      )

      if (finished) {
        runRef.current = null
        setIsRunning(false)
        return
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    runRef.current = {
      cancel: () => {
        cancelled = true
        window.cancelAnimationFrame(frameId)
      },
    }
  }

  const sendMessage = () => {
    const text = draft.trim()
    if (!text || isRunning) {
      return
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      status: 'complete',
    }
    const assistantId = `assistant-${Date.now()}`
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      status: 'streaming',
    }

    setDraft('')
    setMessages((current) => [...current, userMessage, assistantMessage])
    streamAssistant(assistantId, mockReplyChunks.join(''))
  }

  const regenerateMessage = (messageId: string, prompt?: string) => {
    const message = messages.find((item) => item.id === messageId)
    if (!message || message.role !== 'assistant') {
      return
    }

    const generationCount = (message.versions?.length || (message.content.trim() ? 1 : 0)) + 1
    streamAssistant(
      messageId,
      getMockRegeneratedReply(generationCount, message.content.trim(), prompt),
    )
  }

  const selectGeneration = (messageId: string, index: number) => {
    setMessages((current) =>
      current.map((message) => {
        if (message.id !== messageId || !message.versions?.length) {
          return message
        }
        const nextIndex = Math.max(0, Math.min(message.versions.length - 1, index))
        return {
          ...message,
          versionIndex: nextIndex,
          content: message.versions[nextIndex] ?? message.content,
        }
      }),
    )
  }

  const lastUserMessageId = [...messages].reverse().find((message) => message.role === 'user')?.id
  const lastMessageId = messages[messages.length - 1]?.id

  const isSelecting = selectionIntent !== null

  const enterSelectMode = (messageId: string, intent: SelectionIntent) => {
    savedScrollTopRef.current = viewportRef.current?.scrollTop ?? 0
    shouldRestoreScrollRef.current = false
    setSelectionIntent(intent)
    setSelectedIds(getMessagePairIds(messages, messageId))
  }

  const exitSelectMode = (restoreScroll = false) => {
    shouldRestoreScrollRef.current = restoreScroll
    setSelectionIntent(null)
    setSelectedIds([])
  }

  useLayoutEffect(() => {
    if (isSelecting || !shouldRestoreScrollRef.current) {
      return
    }
    shouldRestoreScrollRef.current = false
    const viewport = viewportRef.current
    if (viewport) {
      viewport.scrollTop = savedScrollTopRef.current
    }
  }, [isSelecting])

  const setPairSelected = (messageId: string, nextSelected: boolean) => {
    const pairIds = getMessagePairIds(messages, messageId)
    setSelectedIds((current) => {
      const selected = new Set(current)
      pairIds.forEach((id) => {
        if (nextSelected) {
          selected.add(id)
        } else {
          selected.delete(id)
        }
      })
      return [...selected]
    })
  }

  const toggleSelectAll = (nextSelected: boolean) => {
    setSelectedIds(nextSelected ? messages.map((message) => message.id) : [])
  }

  const deleteSelected = () => {
    const removing = new Set(selectedIds)
    setMessages((current) => current.filter((message) => !removing.has(message.id)))
    exitSelectMode()
  }

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(getSharedConversationUrl())
      exitSelectMode(true)
      setToastMessage(linkCopiedToast)
      window.setTimeout(() => setToastMessage(null), 3000)
    } catch {
      setToastMessage(null)
    }
  }

  const selectAllState =
    messages.length > 0 && selectedIds.length === messages.length
      ? true
      : selectedIds.length > 0
        ? 'indeterminate'
        : false

  return (
    <div className="flex h-full min-h-0 flex-col">
      {isSelecting ? <ChatSelectHeader onCancel={() => exitSelectMode(true)} /> : <ChatThreadHeader />}
      <div
        ref={viewportRef}
        className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-agentos-padding-padding-lg24 py-agentos-padding-padding16"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-agentos-md text-agentos-neutral-text-color-text-tertiary">
            {emptyThreadHint}
          </div>
        ) : (
          <div
            className={cn(
              'mx-auto flex w-full max-w-[720px] flex-col',
              isSelecting && (selectionIntent === 'share' ? 'gap-agentos-gap-gap16' : 'gap-agentos-gap-gap-xs8'),
            )}
          >
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                showEdit={message.role === 'user' && message.id === lastUserMessageId}
                showRetry={message.role === 'assistant' && message.id === lastMessageId}
                showShare={!isRunning}
                selecting={isSelecting}
                selected={selectedIds.includes(message.id)}
                highlightSelectedOnly={selectionIntent !== 'share'}
                onDelete={() => enterSelectMode(message.id, 'delete')}
                onShare={() => enterSelectMode(message.id, 'share')}
                onRetry={(prompt?: string) => regenerateMessage(message.id, prompt)}
                onSelectGeneration={(index) => selectGeneration(message.id, index)}
                onToggleSelect={(nextSelected) => setPairSelected(message.id, nextSelected)}
              />
            ))}
          </div>
        )}
      </div>
      {selectionIntent === 'delete' ? (
        <ChatSelectFooter
          selectAllState={selectAllState}
          selectedGroupCount={countSelectedGroups(messages, selectedIds)}
          disabled={selectedIds.length === 0}
          onToggleAll={toggleSelectAll}
          onDelete={deleteSelected}
        />
      ) : selectionIntent === 'share' ? (
        <ChatShareFooter
          selectAllState={selectAllState}
          selectedGroupCount={countSelectedGroups(messages, selectedIds)}
          copyDisabled={selectedIds.length === 0}
          onToggleAll={toggleSelectAll}
          onCopyLink={() => {
            void copyShareLink()
          }}
        />
      ) : (
        <ChatComposer
          value={draft}
          isRunning={isRunning}
          onChange={setDraft}
          onSend={sendMessage}
          onStop={stopRun}
        />
      )}
      {toastMessage ? (
        <ChatToast message={toastMessage} onClose={() => setToastMessage(null)} />
      ) : null}
    </div>
  )
}
