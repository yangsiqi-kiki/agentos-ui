import { Button, InformationModal } from '@agentos/design-system'
import { useState } from 'react'

import {
  cancelLabel,
  closeLabel,
  deleteConfirmDescription,
  deleteConfirmTitle,
  deleteLabel,
} from '../fixtures/chat-lab'

export function ChatSelectFooter({
  disabled,
  onDelete,
}: {
  disabled?: boolean
  onDelete: () => void
}) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="flex w-full shrink-0 items-center justify-end border-t border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container px-agentos-padding-padding16 py-agentos-margin-margin-sm12">
      <Button
        type="button"
        theme="danger"
        appearance="solid"
        size="default"
        disabled={disabled}
        onClick={() => setConfirmOpen(true)}
      >
        {deleteLabel}
      </Button>
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
