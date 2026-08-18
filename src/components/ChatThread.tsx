import { cn } from '@agentos/design-system'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import {
  emptyThreadHint,
  initialMessages,
  mockReplyChunks,
  type ChatMessage,
} from '../fixtures/chat-lab'
import { ChatComposer } from './ChatComposer'
import { ChatSelectFooter } from './ChatSelectFooter'
import { ChatSelectHeader } from './ChatSelectHeader'
import { ChatThreadHeader } from './ChatThreadHeader'
import { MessageBubble } from './MessageBubble'

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
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const runRef = useRef<number | null>(null)
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
      if (runRef.current !== null) {
        window.clearInterval(runRef.current)
      }
    }
  }, [])

  const stopRun = () => {
    if (runRef.current !== null) {
      window.clearInterval(runRef.current)
      runRef.current = null
    }
    setIsRunning(false)
    setMessages((current) =>
      current.map((message) =>
        message.status === 'streaming' ? { ...message, status: 'complete' } : message,
      ),
    )
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
    setIsRunning(true)
    setMessages((current) => [...current, userMessage, assistantMessage])

    let chunkIndex = 0
    runRef.current = window.setInterval(() => {
      const chunk = mockReplyChunks[chunkIndex]
      chunkIndex += 1
      setMessages((current) =>
        current.map((message) => {
          if (message.id !== assistantId) {
            return message
          }
          const nextContent = message.content ? `${message.content} ${chunk}` : chunk
          const finished = chunkIndex >= mockReplyChunks.length
          return {
            ...message,
            content: nextContent,
            status: finished ? 'complete' : 'streaming',
          }
        }),
      )
      if (chunkIndex >= mockReplyChunks.length) {
        if (runRef.current !== null) {
          window.clearInterval(runRef.current)
          runRef.current = null
        }
        setIsRunning(false)
      }
    }, 420)
  }

  const lastUserMessageId = [...messages].reverse().find((message) => message.role === 'user')?.id

  const enterSelectMode = (messageId: string) => {
    savedScrollTopRef.current = viewportRef.current?.scrollTop ?? 0
    shouldRestoreScrollRef.current = false
    setIsSelecting(true)
    setSelectedIds(getMessagePairIds(messages, messageId))
  }

  const exitSelectMode = (restoreScroll = false) => {
    shouldRestoreScrollRef.current = restoreScroll
    setIsSelecting(false)
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

  const deleteSelected = () => {
    const removing = new Set(selectedIds)
    setMessages((current) => current.filter((message) => !removing.has(message.id)))
    exitSelectMode()
  }

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
              isSelecting && 'gap-agentos-gap-gap-xs8',
            )}
          >
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                showEdit={message.role === 'user' && message.id === lastUserMessageId}
                showShare={!isRunning}
                selecting={isSelecting}
                selected={selectedIds.includes(message.id)}
                onDelete={() => enterSelectMode(message.id)}
                onToggleSelect={(nextSelected) => setPairSelected(message.id, nextSelected)}
              />
            ))}
          </div>
        )}
      </div>
      {isSelecting ? (
        <ChatSelectFooter disabled={selectedIds.length === 0} onDelete={deleteSelected} />
      ) : (
        <ChatComposer
          value={draft}
          isRunning={isRunning}
          onChange={setDraft}
          onSend={sendMessage}
          onStop={stopRun}
        />
      )}
    </div>
  )
}
