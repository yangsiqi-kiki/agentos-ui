import { Button, Checkbox, InformationModal, type CheckboxState } from '@agentos/design-system'
import { useState } from 'react'

import {
  cancelLabel,
  closeLabel,
  deleteConfirmDescription,
  deleteConfirmTitle,
  deleteLabel,
  selectAllLabel,
  selectedConversationGroupsLabel,
} from '../fixtures/chat-lab'

export function ChatSelectFooter({
  selectAllState,
  selectedGroupCount,
  disabled,
  onToggleAll,
  onCancel,
  onDelete,
}: {
  selectAllState: CheckboxState
  selectedGroupCount: number
  disabled?: boolean
  onToggleAll: (nextSelected: boolean) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [confirmOpen, setConfirmOpen] = useState(false)

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
          className="w-[76px] border-transparent bg-agentos-neutral-fill-color-fill-secondary hover:border-transparent hover:bg-agentos-neutral-fill-color-fill"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          theme="danger"
          appearance="solid"
          size="default"
          className="w-[76px]"
          disabled={disabled}
          onClick={() => setConfirmOpen(true)}
        >
          {deleteLabel}
        </Button>
      </div>
      <InformationModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        semantic="warning"
        title={deleteConfirmTitle}
        description={deleteConfirmDescription}
        closeLabel={closeLabel}
        cancelLabel={cancelLabel}
        confirmLabel={deleteLabel}
        contentClassName="duration-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none"
        onConfirm={onDelete}
      />
    </div>
  )
}
