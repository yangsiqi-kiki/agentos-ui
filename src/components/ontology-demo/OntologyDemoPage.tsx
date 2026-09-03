import { ChatThread } from '../ChatThread'
import { LeftSidebar } from '../LeftSidebar'
import { RightWorkbench } from '../RightWorkbench'
import { Topbar } from '../Topbar'

export function OntologyDemoPage() {
  return (
    <div className="flex h-screen min-w-[1180px] flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-layout">
      <Topbar />
      <div className="flex min-h-0 min-w-0 flex-1">
        <div className="h-full w-[220px] shrink-0 overflow-hidden border-r border-agentos-neutral-border-color-border-secondary">
          <LeftSidebar />
        </div>
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-agentos-neutral-bg-color-bg-base">
          <ChatThread />
        </main>
        <div className="flex h-full min-w-[560px] max-w-[720px] shrink-0 basis-[46vw] overflow-hidden border-l border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-base">
          <RightWorkbench initialTab="ontology" />
        </div>
      </div>
    </div>
  )
}
