import { Button, Tab, Tabs } from '@agentos/design-system'
import { Layers } from 'lucide-react'
import { useState } from 'react'

import { conversationTabs } from '../fixtures/chat-lab'

export function ChatThreadHeader() {
  const [tabs, setTabs] = useState(conversationTabs)
  const [activeTab, setActiveTab] = useState(conversationTabs[0]?.value ?? '')

  return (
    <div
      className="flex h-11 w-full shrink-0 items-center gap-agentos-gap-gap-xs8 border-b border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-elevated pl-agentos-padding-padding16 pr-agentos-padding-padding-lg24 py-agentos-padding-padding-xxs4"
    >
      <Button
        type="button"
        theme="black"
        appearance="ghost"
        size="icon"
        shape="rectangle"
        aria-label="会话列表"
      >
        <Layers aria-hidden="true" />
      </Button>
      <Tabs
        value={activeTab}
        variant="card-gutter"
        size="lg"
        className="min-w-0 flex-1"
        onValueChange={setActiveTab}
      >
        <div
          role="tablist"
          aria-label="对话任务"
          className="flex min-w-0 flex-nowrap items-center gap-agentos-gap-gap-xxs4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              closable={tab.closable}
              closeLabel={`关闭 ${tab.label}`}
              onClose={() => {
                const nextTabs = tabs.filter((item) => item.value !== tab.value)
                setTabs(nextTabs)
                if (activeTab === tab.value) {
                  setActiveTab(nextTabs[0]?.value ?? '')
                }
              }}
            >
              {tab.label}
            </Tab>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
