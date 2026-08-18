import { Button, Checkbox, type CheckboxState } from '@agentos/design-system'

import { copyLinkLabel, selectAllLabel, selectedConversationGroupsLabel } from '../fixtures/chat-lab'

export function ChatShareFooter({
  selectAllState,
  selectedGroupCount,
  copyDisabled,
  onToggleAll,
  onCopyLink,
}: {
  selectAllState: CheckboxState
  selectedGroupCount: number
  copyDisabled?: boolean
  onToggleAll: (nextSelected: boolean) => void
  onCopyLink: () => void
}) {
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
  )
}
