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
import { Copy, Download } from 'lucide-react'
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
        className="h-[min(640px,calc(100dvh-160px))] w-[min(640px,calc(100vw-32px))] gap-agentos-gap-gap16 rounded-agentos-rounded2-xl16 bg-agentos-neutral-bg-color-bg-container px-agentos-padding-padding-md20 py-agentos-padding-padding16 duration-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none"
      >
        <ModalHeader className="border-b-0 px-0 py-0">
          <ModalTitle className="font-agentos-cn font-agentos-medium">
            {shareImagePreviewTitle}
          </ModalTitle>
          <ModalCloseButton closeLabel={closeLabel} />
        </ModalHeader>
        <ModalDescription className="sr-only">{shareImagePreviewDescription}</ModalDescription>
        <ModalBody className="min-h-0 px-0 py-0">
          <div className="w-full rounded-agentos-rounded-xl12 bg-agentos-neutral-fill-color-fill-tertiary p-agentos-padding-padding-xs8">
            <ShareImageCard ref={cardRef} messages={messages} />
          </div>
        </ModalBody>
        <ModalFooter className="h-auto items-center border-t-0 px-0 py-0">
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <Button
              type="button"
              theme="black"
              appearance="outline"
              size="default"
              className="border-transparent bg-agentos-neutral-fill-color-fill-secondary px-agentos-padding-padding-sm12 hover:border-transparent hover:bg-agentos-neutral-fill-color-fill disabled:border-transparent"
              disabled={busy}
              leadingIcon={<Copy aria-hidden="true" />}
              onClick={() => {
                void copyImage()
              }}
            >
              {copyImageLabel}
            </Button>
            <Button
              type="button"
              theme="primary"
              appearance="solid"
              size="default"
              className="px-agentos-padding-padding-sm12"
              disabled={busy}
              leadingIcon={<Download aria-hidden="true" />}
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
