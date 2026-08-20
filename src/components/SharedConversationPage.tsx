import { Avatar, Tag } from '@agentos/design-system'
import { useEffect } from 'react'

import agentosWordmark from '../assets/share/agentos-wordmark.svg'
import landingGlow from '../assets/share/landing-glow.svg'
import agentosLogo from '../assets/share/logo.png'
import {
  agentInitial,
  agentName,
  agentOsHomeUrl,
  agentTag,
  initialMessages,
  sharedConversationDate,
  sharedConversationDisclaimer,
  sharedConversationTitle,
  startBuildingLabel,
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
  if (message.role === 'user') {
    return (
      <div className="flex w-full flex-col items-end gap-agentos-gap-gap-xs8 pt-agentos-margin-margin-sm12 pb-agentos-margin-margin-xl32">
        <div className="max-w-[576px] rounded-agentos-rounded-lg8 bg-agentos-neutral-fill-color-fill-tertiary px-agentos-padding-padding-sm12 py-agentos-padding-padding-xs8">
          <p className="whitespace-pre-wrap break-words text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-heading">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-start gap-agentos-gap-gap-xs8 pt-agentos-padding-padding-sm12 pb-agentos-padding-padding-xl32">
      <SharedAgentIdentity />
      <MarkdownContent content={message.content} size="base" className="leading-agentos-22" />
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
    <div className="relative min-h-screen overflow-x-hidden bg-agentos-neutral-bg-color-bg-container">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
        <img
          alt=""
          src={landingGlow}
          className="absolute -left-1/3 top-[-250px] h-[819px] w-[2177px] max-w-none"
        />
        <img
          alt=""
          src={landingGlow}
          className="absolute -right-1/3 top-[-250px] h-[819px] w-[2177px] max-w-none"
        />
      </div>
      <div className="relative z-10 flex min-h-screen justify-center px-agentos-padding-padding-lg24 py-agentos-margin-margin-xl32 pb-24">
        <div className="flex w-full max-w-[768px] flex-col rounded-agentos-rounded3-xl24 border-[0.5px] border-solid border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container px-agentos-padding-padding-xl32 py-agentos-padding-padding-lg24">
          <header className="flex w-full flex-col items-start justify-center gap-agentos-gap-gap-sm12 pt-agentos-padding-padding-sm12 pb-agentos-padding-padding-xl32">
            <h1 className="text-agentos-2xl font-agentos-semibold leading-agentos-32 text-agentos-neutral-text-color-text-heading">
              {sharedConversationTitle}
            </h1>
            <div className="flex items-center gap-agentos-gap-gap-xs8 text-agentos-sm leading-4 text-agentos-neutral-text-color-text-description">
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
      <a
        href={agentOsHomeUrl}
        className="fixed bottom-8 left-1/2 z-20 flex h-[44px] -translate-x-1/2 items-center gap-agentos-gap-gap-sm12 rounded-agentos-rounded-full999 bg-agentos-brand-primary-color-primary pl-[10px] pr-agentos-padding-padding-sm12 no-underline shadow-[0_0_7.5px_rgba(0,0,0,0.15)]"
      >
        <span className="flex items-center gap-agentos-gap-gap-xs8 overflow-hidden">
          <img alt="" src={agentosLogo} className="size-[24px] shrink-0 object-cover mix-blend-multiply" />
          <img
            alt="AgentOS"
            src={agentosWordmark}
            className="h-[14.436px] w-[72.352px] shrink-0 brightness-0 invert"
          />
        </span>
        <span
          aria-hidden="true"
          className="h-4 w-px shrink-0 rounded-full bg-agentos-neutral-bg-color-bg-base"
        />
        <span className="text-agentos-base font-agentos-medium leading-agentos-20 text-agentos-neutral-text-color-text-light-solid">
          {startBuildingLabel}
        </span>
      </a>
    </div>
  )
}
