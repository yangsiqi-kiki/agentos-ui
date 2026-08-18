import { ChatThread } from './ChatThread'
import { RightWorkbench } from './RightWorkbench'
import { Topbar } from './Topbar'

const RIGHT_WIDTH = 380

export function ChatLabPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-layout">
      <Topbar />
      <div className="flex min-h-0 min-w-0 flex-1">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-agentos-neutral-bg-color-bg-base">
          <ChatThread />
        </main>
        <div className="flex h-full min-w-0 shrink-0 overflow-hidden border-l border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-base" style={{ width: RIGHT_WIDTH }}>
          <RightWorkbench />
        </div>
      </div>
    </div>
  )
}
