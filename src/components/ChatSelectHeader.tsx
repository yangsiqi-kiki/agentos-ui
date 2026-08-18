import { Button } from '@agentos/design-system'

import { cancelLabel, selectConversationTitle } from '../fixtures/chat-lab'

export function ChatSelectHeader({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="flex h-11 w-full shrink-0 items-center gap-agentos-gap-gap-xs8 border-b border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-elevated py-agentos-padding-padding-xxs4 pl-agentos-padding-padding-lg24 pr-agentos-padding-padding16">
      <p className="min-w-0 flex-1 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text">
        {selectConversationTitle}
      </p>
      <Button type="button" theme="black" appearance="ghost" size="default" onClick={onCancel}>
        {cancelLabel}
      </Button>
    </div>
  )
}
