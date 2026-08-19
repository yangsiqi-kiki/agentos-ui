import { Button, Checkbox, type CheckboxState } from '@agentos/design-system'
import { useState } from 'react'

import {
  copyLinkLabel,
  selectAllLabel,
  selectedConversationGroupsLabel,
  shareImageLabel,
  type ChatMessage,
} from '../fixtures/chat-lab'
import { ShareImageModal } from './ShareImageModal'

export function ChatShareFooter({
  selectAllState,
  selectedGroupCount,
  messages,
  copyDisabled,
  onToggleAll,
  onCopyLink,
  onToast,
}: {
  selectAllState: CheckboxState
  selectedGroupCount: number
  messages: ChatMessage[]
  copyDisabled?: boolean
  onToggleAll: (nextSelected: boolean) => void
  onCopyLink: () => void
  onToast: (message: string, semantic: 'success' | 'error') => void
}) {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <div className="flex w-full shrink-0 items-center gap-agentos-gap-gap-xs8 border-t border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container px-agentos-padding-padding16 py-agentos-margin-margin-sm12">
      <div className="flex min-w-0 flex-1 items-center gap-agentos-gap-gap-xs8">
        <Checkbox
          checked={selectAllState}
          label={selectAllLabel}
          onCheckedChange={(next) => onToggleAll(next === true)}
        />
        <div className="h-3 w-px shrink-0 rounded-full bg-agentos-neutral-fill-color-fill" />
        <span className="shrink-0 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text">
          {selectedConversationGroupsLabel(selectedGroupCount)}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-agentos-gap-gap-xs8">
        <Button
          type="button"
          theme="black"
          appearance="outline"
          size="default"
          disabled={copyDisabled}
          onClick={() => setPreviewOpen(true)}
        >
          {shareImageLabel}
        </Button>
        <Button
          type="button"
          theme="primary"
          appearance="solid"
          size="default"
          disabled={copyDisabled}
          onClick={onCopyLink}
        >
          {copyLinkLabel}
        </Button>
      </div>
      <ShareImageModal
        open={previewOpen}
        messages={messages}
        onOpenChange={setPreviewOpen}
        onToast={onToast}
      />
    </div>
  )
}
