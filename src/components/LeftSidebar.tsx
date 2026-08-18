import { cn, Tree } from '@agentos/design-system'

import {
  docsTree,
  expandedDocKeys,
  selectedDocKey,
  sidebarTabs,
} from '../fixtures/chat-lab'

const ACTIVE_TAB = 'docs'

export function LeftSidebar() {
  return (
    <aside className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-base">
      <div className="flex h-10 items-center px-4">
        <div role="tablist" aria-label="工作坊侧边栏分区" className="inline-flex w-full items-center gap-0.5">
          {sidebarTabs.map((tab) => {
            const isActive = tab.key === ACTIVE_TAB

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={-1}
                className={cn(
                  'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-agentos-rounded-lg8 border-none px-1 py-1.5 text-center text-agentos-md transition',
                  isActive
                    ? 'bg-agentos-brand-primary-color-primary font-agentos-semibold text-agentos-neutral-text-color-text-light-solid'
                    : 'text-agentos-neutral-text-color-text-secondary',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-2 pb-3">
        <Tree
          treeData={docsTree}
          defaultExpandedKeys={expandedDocKeys}
          defaultSelectedKeys={[selectedDocKey]}
          size="sm"
        />
      </div>
    </aside>
  )
}
