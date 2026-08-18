import { cn } from '@agentos/design-system'
import { Check } from 'lucide-react'

import { stages, type StageKey } from '../fixtures/chat-lab'

const ACTIVE_STAGE: StageKey = 'REQUIREMENTS'

export function StageNav() {
  const currentIndex = stages.findIndex((stage) => stage.key === ACTIVE_STAGE)

  return (
    <nav
      role="tablist"
      aria-label="项目导航"
      className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-agentos-rounded-full999 bg-agentos-neutral-bg-color-bg-container p-[3px_4px] ring-1 ring-agentos-neutral-border-color-border-secondary md:inline-flex"
    >
      {stages.map((stage, index) => {
        const active = index === currentIndex
        const completed = index < currentIndex

        return (
          <button
            key={stage.key}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={-1}
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 rounded-agentos-rounded-full999 px-3 py-[3px] text-agentos-sm font-agentos-medium leading-none',
              active &&
                'bg-agentos-brand-primary-color-primary text-agentos-neutral-text-color-text-light-solid',
              completed &&
                'bg-agentos-brand-primary-color-primary-bg text-agentos-neutral-text-color-text',
              !active && !completed && 'text-agentos-neutral-text-color-text-tertiary',
            )}
          >
            <span
              className={cn(
                'flex size-[15px] shrink-0 items-center justify-center rounded-agentos-rounded-full999 text-agentos-xs font-agentos-bold leading-none',
                active && 'bg-agentos-neutral-bg-color-bg-base/20',
              )}
            >
              {completed ? <Check className="size-3" aria-hidden="true" /> : stage.index}
            </span>
            {stage.label}
          </button>
        )
      })}
    </nav>
  )
}
