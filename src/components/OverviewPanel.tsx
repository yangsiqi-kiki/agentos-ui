import {
  Atom,
  Brain,
  Database,
  FlaskConical,
  Folder,
  Lightbulb,
  Link,
  Sparkles,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { resourceItems } from '../fixtures/chat-lab'

const resourceIcons: Record<(typeof resourceItems)[number]['key'], LucideIcon> = {
  ontology: Atom,
  agents: Sparkles,
  skills: Lightbulb,
  mcp: Link,
  datasource: Database,
  'knowledge-base': Folder,
  'build-planning': Target,
  'memory-bank': Brain,
  'agent-test': FlaskConical,
}

export function OverviewPanel({
  onOpenResource,
}: {
  onOpenResource?: (key: (typeof resourceItems)[number]['key']) => void
}) {
  return (
    <section className="flex min-h-0 flex-1 flex-col py-3">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
        <div className="mx-3 rounded-agentos-rounded-sm4 bg-agentos-neutral-fill-color-fill-tertiary p-3">
          <div className="flex items-center gap-2 text-agentos-neutral-text-color-text-secondary">
            <Lightbulb size={14} className="size-3.5 shrink-0" aria-hidden="true" />
            <div className="text-agentos-md font-agentos-medium text-agentos-neutral-text-color-text-secondary">
              使用指南
            </div>
          </div>
          <div className="mt-0.5 text-agentos-md text-agentos-neutral-text-color-text-tertiary">
            所有的资源内容预览、能力模块打造等操作都将在当前面板中。
          </div>
        </div>

        <div className="flex flex-col items-stretch space-y-1">
          {resourceItems.map((item) => {
            const Icon = resourceIcons[item.key]

            return (
              <button
                key={item.key}
                type="button"
                className="mx-3 flex items-center gap-2.5 rounded-[10px] border border-transparent px-2 py-2.5 text-left text-agentos-md text-agentos-neutral-text-color-text hover:border-agentos-neutral-border-color-border-secondary hover:bg-agentos-neutral-bg-color-bg-container"
                onClick={() => onOpenResource?.(item.key)}
              >
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-fill-color-fill-tertiary">
                  <Icon size={12} className="size-3" aria-hidden="true" />
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
