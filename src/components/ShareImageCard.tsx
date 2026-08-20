import { Avatar, Tag } from '@agentos/design-system'
import { forwardRef } from 'react'

import agentosWordmark from '../assets/share/agentos-wordmark.svg'
import agentosLogo from '../assets/share/logo.png'
import shareQrCode from '../assets/share/qr-code.png'
import {
  agentInitial,
  agentName,
  agentTag,
  shareImageScanHint,
  sharedConversationDate,
  sharedConversationDisclaimer,
  sharedConversationTitle,
  type ChatMessage,
} from '../fixtures/chat-lab'
import { MarkdownContent } from './MarkdownContent'

function ShareAgentIdentity() {
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

function ShareCardMessage({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <div className="flex w-full items-center justify-end rounded-agentos-rounded-xl12 pt-agentos-margin-margin-sm12 pb-agentos-margin-margin-lg24">
        <div className="max-w-[600px] rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-tertiary p-agentos-padding-padding-sm12">
          <p className="whitespace-pre-wrap break-words text-agentos-base leading-agentos-20 text-agentos-neutral-text-color-text-heading">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-start gap-agentos-gap-gap-xs8 pt-agentos-margin-margin-sm12 pb-agentos-margin-margin-lg24">
      <ShareAgentIdentity />
      <MarkdownContent content={message.content} size="base" />
    </div>
  )
}

export const ShareImageCard = forwardRef<HTMLDivElement, { messages: ChatMessage[] }>(
  function ShareImageCard({ messages }, ref) {
    return (
      <div
        ref={ref}
        className="flex w-full flex-col items-start rounded-agentos-rounded-lg8 bg-agentos-neutral-bg-color-bg-container px-agentos-padding-padding-lg24"
      >
        <div className="flex w-full flex-col items-start justify-center gap-agentos-gap-gap-sm12 py-agentos-padding-padding-xl32">
          <p className="w-full text-agentos-2xl font-agentos-semibold leading-agentos-32 text-agentos-neutral-text-color-text-heading">
            {sharedConversationTitle}
          </p>
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <p className="shrink-0 text-agentos-sm leading-4 text-agentos-neutral-text-color-text-description">
              {sharedConversationDate}
            </p>
            <span
              aria-hidden="true"
              className="size-1 shrink-0 rounded-full bg-agentos-neutral-text-color-text-description"
            />
            <p className="shrink-0 text-agentos-sm leading-4 text-agentos-neutral-text-color-text-description">
              {sharedConversationDisclaimer}
            </p>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-agentos-neutral-fill-color-fill" />
        <div className="flex w-full flex-col items-start py-agentos-padding-padding-lg24">
          {messages.map((message) => (
            <ShareCardMessage key={message.id} message={message} />
          ))}
          <div className="flex w-full items-center justify-between rounded-agentos-rounded2-xl16 bg-agentos-neutral-fill-color-fill-tertiary p-agentos-padding-padding-md20">
            <div className="flex flex-col items-start gap-agentos-gap-gap-xxs4">
              <div className="flex items-center gap-agentos-gap-gap-xs8 overflow-hidden px-0.5 py-1.5">
                <img
                  alt=""
                  src={agentosLogo}
                  className="size-[24px] shrink-0 overflow-clip object-cover mix-blend-multiply"
                />
                <img
                  alt="AgentOS"
                  src={agentosWordmark}
                  className="h-[14.436px] w-[72.352px] shrink-0"
                />
              </div>
              <p className="text-agentos-sm leading-4 text-agentos-neutral-text-color-text-description">
                {shareImageScanHint}
              </p>
            </div>
            <div className="relative size-[60px] shrink-0 overflow-clip">
              <img
                alt=""
                src={shareQrCode}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
)
