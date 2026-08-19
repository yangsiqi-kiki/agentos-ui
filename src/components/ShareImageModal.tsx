import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@agentos/design-system'
import { toBlob } from 'html-to-image'
import { useRef, useState } from 'react'

import {
  closeLabel,
  copyImageLabel,
  downloadImageLabel,
  getShareImageDownloadName,
  imageCopiedToast,
  imageCopyFailedToast,
  shareImagePreviewDescription,
  shareImagePreviewTitle,
  type ChatMessage,
} from '../fixtures/chat-lab'
import { ShareImageCard } from './ShareImageCard'

async function waitForImages(element: HTMLElement) {
  const images = [...element.querySelectorAll('img')]
  await Promise.all(
    images.map(
      (image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener('load', () => resolve(), { once: true })
              image.addEventListener('error', () => resolve(), { once: true })
            }),
    ),
  )
}

async function captureShareImage(element: HTMLElement) {
  await waitForImages(element)
  const blob = await toBlob(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: getComputedStyle(element).backgroundColor || undefined,
  })
  if (!blob) {
    throw new Error('Failed to capture share image')
  }
  return blob
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export function ShareImageModal({
  open,
  messages,
  onOpenChange,
  onToast,
}: {
  open: boolean
  messages: ChatMessage[]
  onOpenChange: (open: boolean) => void
  onToast: (message: string, semantic: 'success' | 'error') => void
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [busy, setBusy] = useState(false)

  const exportImage = async () => {
    const card = cardRef.current
    if (!card) {
      throw new Error('Share image card is not ready')
    }
    return captureShareImage(card)
  }

  const copyImage = async () => {
    setBusy(true)
    try {
      const blob = await exportImage()
      if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
        throw new Error('Clipboard image write is not supported')
      }
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
      onToast(imageCopiedToast, 'success')
    } catch {
      onToast(imageCopyFailedToast, 'error')
    } finally {
      setBusy(false)
    }
  }

  const downloadImage = async () => {
    setBusy(true)
    try {
      const blob = await exportImage()
      downloadBlob(blob, getShareImageDownloadName())
    } catch {
      onToast(imageCopyFailedToast, 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        size="lg"
        className="max-h-[min(640px,calc(100dvh-160px))] w-[min(900px,calc(100vw-160px))] duration-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none"
      >
        <ModalHeader>
          <ModalTitle>{shareImagePreviewTitle}</ModalTitle>
          <ModalCloseButton closeLabel={closeLabel} />
        </ModalHeader>
        <ModalDescription className="sr-only">{shareImagePreviewDescription}</ModalDescription>
        <ModalBody className="block min-h-0">
          <div className="h-auto rounded-agentos-rounded-xl12 bg-agentos-neutral-fill-color-fill-tertiary p-agentos-padding-padding-xs8">
            <ShareImageCard ref={cardRef} messages={messages} />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <Button
              type="button"
              theme="black"
              appearance="outline"
              size="default"
              disabled={busy}
              onClick={() => {
                void copyImage()
              }}
            >
              {copyImageLabel}
            </Button>
            <Button
              type="button"
              theme="black"
              appearance="solid"
              size="default"
              disabled={busy}
              onClick={() => {
                void downloadImage()
              }}
            >
              {downloadImageLabel}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
