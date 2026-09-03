import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'

import { ChatThread } from './ChatThread'
import { RightWorkbench } from './RightWorkbench'
import { Topbar } from './Topbar'

const DEFAULT_RIGHT_WIDTH = 380
const MIN_CHAT_WIDTH = 360
const MIN_WORKBENCH_WIDTH = 320
const KEYBOARD_RESIZE_STEP = 16

function clampWorkbenchRatio(ratio: number, containerWidth: number) {
  if (containerWidth <= 0) return ratio

  const minRatio = Math.min(MIN_WORKBENCH_WIDTH / containerWidth, 1)
  const maxRatio = Math.max(minRatio, (containerWidth - MIN_CHAT_WIDTH) / containerWidth)
  return Math.min(Math.max(ratio, minRatio), maxRatio)
}

export function ChatLabPage() {
  const splitContainerRef = useRef<HTMLDivElement | null>(null)
  const isResizingRef = useRef(false)
  const stopResizeRef = useRef<() => void>(() => {})
  const [workbenchRatio, setWorkbenchRatio] = useState<number | null>(null)
  const [isResizing, setIsResizing] = useState(false)

  useLayoutEffect(() => {
    const containerWidth = splitContainerRef.current?.getBoundingClientRect().width ?? 0
    if (containerWidth > 0) {
      setWorkbenchRatio(clampWorkbenchRatio(DEFAULT_RIGHT_WIDTH / containerWidth, containerWidth))
    }
  }, [])

  useEffect(() => {
    return () => {
      stopResizeRef.current()
    }
  }, [])

  const resizeFromClientX = (clientX: number) => {
    const container = splitContainerRef.current
    if (!container) return

    const bounds = container.getBoundingClientRect()
    const nextRatio = (bounds.right - clientX) / bounds.width
    setWorkbenchRatio(clampWorkbenchRatio(nextRatio, bounds.width))
  }

  const handleResizeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const containerWidth = splitContainerRef.current?.getBoundingClientRect().width ?? 0
    if (!containerWidth) return

    let nextRatio: number | null = null
    if (event.key === 'ArrowLeft') {
      nextRatio = (workbenchRatio ?? DEFAULT_RIGHT_WIDTH / containerWidth) + KEYBOARD_RESIZE_STEP / containerWidth
    } else if (event.key === 'ArrowRight') {
      nextRatio = (workbenchRatio ?? DEFAULT_RIGHT_WIDTH / containerWidth) - KEYBOARD_RESIZE_STEP / containerWidth
    } else if (event.key === 'Home') {
      nextRatio = MIN_WORKBENCH_WIDTH / containerWidth
    } else if (event.key === 'End') {
      nextRatio = (containerWidth - MIN_CHAT_WIDTH) / containerWidth
    }

    if (nextRatio != null) {
      event.preventDefault()
      setWorkbenchRatio(clampWorkbenchRatio(nextRatio, containerWidth))
    }
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-layout">
      <Topbar />
      <div ref={splitContainerRef} className="flex min-h-0 min-w-0 flex-1">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-agentos-neutral-bg-color-bg-base">
          <ChatThread />
        </main>
        <div
          role="separator"
          aria-label="调整对话区与工作台宽度"
          aria-orientation="vertical"
          aria-valuemin={MIN_WORKBENCH_WIDTH}
          aria-valuemax={Math.max(
            MIN_WORKBENCH_WIDTH,
            (splitContainerRef.current?.getBoundingClientRect().width ?? 0) - MIN_CHAT_WIDTH,
          )}
          aria-valuenow={Math.round(
            (workbenchRatio ?? 0) *
              (splitContainerRef.current?.getBoundingClientRect().width ?? 0),
          )}
          tabIndex={0}
          className={`group relative z-30 -mx-1 w-2 shrink-0 cursor-col-resize touch-none outline-none ${
            isResizing ? 'bg-agentos-brand-primary-color-primary-bg-hover' : ''
          }`}
          onPointerDown={(event) => {
            event.preventDefault()
            stopResizeRef.current()
            isResizingRef.current = true
            setIsResizing(true)
            document.body.style.cursor = 'col-resize'
            document.body.style.userSelect = 'none'
            resizeFromClientX(event.clientX)

            const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
              if (isResizingRef.current) resizeFromClientX(moveEvent.clientX)
            }
            const stopResize = () => {
              document.removeEventListener('pointermove', handlePointerMove)
              document.removeEventListener('pointerup', stopResize)
              document.removeEventListener('pointercancel', stopResize)
              isResizingRef.current = false
              setIsResizing(false)
              document.body.style.cursor = ''
              document.body.style.userSelect = ''
              stopResizeRef.current = () => {}
            }

            stopResizeRef.current = stopResize
            document.addEventListener('pointermove', handlePointerMove)
            document.addEventListener('pointerup', stopResize)
            document.addEventListener('pointercancel', stopResize)
          }}
          onDoubleClick={() => {
            const containerWidth = splitContainerRef.current?.getBoundingClientRect().width ?? 0
            if (containerWidth) {
              setWorkbenchRatio(
                clampWorkbenchRatio(DEFAULT_RIGHT_WIDTH / containerWidth, containerWidth),
              )
            }
          }}
          onKeyDown={handleResizeKeyDown}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors group-hover:bg-agentos-brand-primary-color-primary group-focus-visible:w-0.5 group-focus-visible:bg-agentos-brand-primary-color-primary ${
              isResizing
                ? 'w-0.5 bg-agentos-brand-primary-color-primary'
                : 'bg-agentos-neutral-border-color-border-secondary'
            }`}
          />
        </div>
        <div
          className="flex h-full min-w-0 shrink-0 overflow-hidden bg-agentos-neutral-bg-color-bg-base"
          style={{
            width: workbenchRatio == null ? DEFAULT_RIGHT_WIDTH : `${workbenchRatio * 100}%`,
            minWidth: MIN_WORKBENCH_WIDTH,
            maxWidth: `calc(100% - ${MIN_CHAT_WIDTH}px)`,
          }}
        >
          <RightWorkbench />
        </div>
      </div>
    </div>
  )
}
