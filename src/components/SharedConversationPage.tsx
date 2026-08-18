import { Avatar, Tag } from '@agentos/design-system'
import { useEffect } from 'react'

import {
  agentInitial,
  agentName,
  agentTag,
  initialMessages,
  sharedConversationDate,
  sharedConversationDisclaimer,
  sharedConversationTitle,
  type ChatMessage,
} from '../fixtures/chat-lab'
import { MarkdownContent } from './MarkdownContent'

function SharedAgentIdentity() {
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

function SharedMessage({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex w-full items-center justify-end pt-agentos-margin-margin-sm12 pb-agentos-margin-margin-lg24">
        <div className="max-w-[600px] rounded-agentos-rounded-lg8 bg-agentos-brand-primary-color-primary-bg p-agentos-padding-padding-sm12">
          <p className="whitespace-pre-wrap break-words text-agentos-base leading-agentos-20 text-agentos-neutral-text-color-text-heading">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-start pt-agentos-margin-margin-sm12 pb-agentos-margin-margin-lg24">
      <div className="flex w-full items-center gap-agentos-gap-gap-sm12 rounded-agentos-rounded-xl12 bg-agentos-neutral-bg-color-bg-elevated px-agentos-padding-padding-sm12 py-agentos-margin-margin-sm12">
        <div className="flex min-w-0 flex-col items-start gap-agentos-gap-gap-xs8">
          <SharedAgentIdentity />
          <MarkdownContent content={message.content} size="base" />
        </div>
      </div>
    </div>
  )
}

export function SharedConversationPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = sharedConversationTitle
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full justify-center bg-agentos-neutral-bg-color-bg-base px-agentos-padding-padding-lg24">
      <div className="flex w-full max-w-[768px] flex-col">
        <header className="flex flex-col items-start justify-center gap-agentos-gap-gap-sm12 py-agentos-padding-padding-xl32">
          <h1 className="text-agentos-2xl font-agentos-semibold leading-agentos-32 text-agentos-neutral-text-color-text-heading">
            {sharedConversationTitle}
          </h1>
          <div className="flex items-center gap-agentos-gap-gap-xs8 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-description">
            <p>{sharedConversationDate}</p>
            <span
              aria-hidden="true"
              className="size-1 shrink-0 rounded-full bg-agentos-neutral-text-color-text-description"
            />
            <p>{sharedConversationDisclaimer}</p>
          </div>
        </header>
        <div className="h-[0.5px] w-full bg-agentos-neutral-fill-color-fill" />
        <div className="flex flex-col items-start py-agentos-padding-padding-lg24">
          {initialMessages.map((message) => (
            <SharedMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  )
}
