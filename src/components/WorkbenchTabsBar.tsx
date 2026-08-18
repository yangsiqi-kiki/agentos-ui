import { Button, Tab, Tabs, cn } from '@agentos/design-system'
import { useEffect, useRef, type ReactNode } from 'react'

export type WorkbenchTabItem = {
  value: string
  label: string
  icon?: ReactNode
  closable?: boolean
}

export function WorkbenchTabsBar({
  tabs,
  value,
  appsButtonLabel,
  appsButtonIcon,
  onValueChange,
  onClose,
}: {
  tabs: WorkbenchTabItem[]
  value: string
  appsButtonLabel: string
  appsButtonIcon: ReactNode
  onValueChange: (value: string) => void
  onClose?: (value: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      container.scrollLeft += event.deltaY
      event.preventDefault()
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || value === 'all') return
    container
      .querySelector<HTMLElement>(`[data-value="${value}"]`)
      ?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }, [value])

  return (
    <div
      className={cn(
        'flex h-11 w-full min-w-0 shrink-0 items-center gap-agentos-gap-gap-xs8 overflow-hidden',
        'border-b border-agentos-neutral-border-color-border-secondary',
        'bg-agentos-neutral-bg-color-bg-elevated px-agentos-padding-padding-xs8 py-agentos-padding-padding-xxs4',
      )}
    >
      <Button
        type="button"
        theme="black"
        appearance="ghost"
        size="default"
        leadingIcon={appsButtonIcon}
        aria-label={appsButtonLabel}
        aria-pressed={value === 'all'}
        onClick={() => onValueChange('all')}
      />
      <div
        ref={scrollRef}
        className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <Tabs
          value={value}
          variant="card-gutter"
          size="lg"
          className="block w-max"
          onValueChange={onValueChange}
        >
          <div
            role="tablist"
            aria-label="工作台标签"
            className="flex w-max flex-nowrap items-center gap-agentos-gap-gap-xxs4"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                closable={tab.closable}
                closeLabel={`关闭 ${tab.label}`}
                onClose={() => onClose?.(tab.value)}
              >
                {tab.label}
              </Tab>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
