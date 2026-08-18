import { Avatar, Breadcrumb, Tag } from '@agentos/design-system'

import { productName, productVersion, scenarioName, spaceName, userInitial } from '../fixtures/chat-lab'

export function Topbar() {
  return (
    <header className="relative sticky top-0 z-20 flex h-10 w-full shrink-0 items-center justify-between gap-3 border-b border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-base px-3 py-0 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex shrink-0 items-center gap-1.5">
          <img
            src="/logo.png"
            alt="Agent OS"
            className="size-8 shrink-0 object-contain"
          />
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="text-[15px] font-agentos-semibold leading-6 text-agentos-neutral-text-color-text-heading">
              {productName}
            </span>
            <Tag size="sm">{productVersion}</Tag>
          </span>
        </div>
        <span
          aria-hidden="true"
          className="h-[14px] w-px shrink-0 self-center bg-agentos-neutral-border-color-border"
        />
        <Breadcrumb
          className="max-w-none"
          items={[
            { label: spaceName },
            { label: scenarioName },
          ]}
          separator="arrow"
        />
      </div>

      <div className="flex shrink-0 items-center justify-end">
        <Avatar size="sm" fallback={userInitial} alt={userInitial} />
      </div>
    </header>
  )
}
