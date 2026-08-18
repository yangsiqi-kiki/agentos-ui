import { IconBulb, IconTargetArrow } from '@tabler/icons-react'
import {
  Atom,
  Brain,
  Database,
  Folder,
  LayoutGrid,
  Link,
  Sparkles,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'

import { OverviewPanel } from './OverviewPanel'
import { WorkbenchTabsBar } from './WorkbenchTabsBar'

const tabIconClass = '!size-3 shrink-0'

const allTabs: Array<{
  value: string
  label: string
  icon: ReactNode
}> = [
  { value: 'knowledge', label: '知识库', icon: <Folder size={12} className={tabIconClass} aria-hidden="true" /> },
  { value: 'ontology', label: '本体', icon: <Atom size={12} className={tabIconClass} aria-hidden="true" /> },
  { value: 'agent', label: '智能体', icon: <Sparkles size={12} className={tabIconClass} aria-hidden="true" /> },
  { value: 'skills', label: '技能', icon: <IconBulb size={12} className={tabIconClass} aria-hidden="true" /> },
  { value: 'mcp', label: 'MCP', icon: <Link size={12} className={tabIconClass} aria-hidden="true" /> },
  { value: 'data-source', label: '数据源', icon: <Database size={12} className={tabIconClass} aria-hidden="true" /> },
  { value: 'scenario', label: '场景', icon: <IconTargetArrow size={12} className={tabIconClass} aria-hidden="true" /> },
  { value: 'memory', label: '记忆库', icon: <Brain size={12} className={tabIconClass} aria-hidden="true" /> },
]

const resourceTabMap: Record<string, string> = {
  ontology: 'ontology',
  agents: 'agent',
  skills: 'skills',
  mcp: 'mcp',
  datasource: 'data-source',
  'knowledge-base': 'knowledge',
  'build-planning': 'scenario',
  'memory-bank': 'memory',
}

export function RightWorkbench() {
  const [activeTab, setActiveTab] = useState('all')
  const [openTabValues, setOpenTabValues] = useState(() => allTabs.map((tab) => tab.value))

  const tabs = useMemo(
    () =>
      allTabs
        .filter((tab) => openTabValues.includes(tab.value))
        .map((tab) => ({ ...tab, closable: true })),
    [openTabValues],
  )

  const openTab = (value: string) => {
    setOpenTabValues((current) => (current.includes(value) ? current : [...current, value]))
    setActiveTab(value)
  }

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <WorkbenchTabsBar
        tabs={tabs}
        value={activeTab}
        appsButtonLabel="全部"
        appsButtonIcon={<LayoutGrid size={16} className="size-4 shrink-0" aria-hidden="true" />}
        onValueChange={setActiveTab}
        onClose={(value) => {
          setOpenTabValues((current) => current.filter((item) => item !== value))
          if (activeTab === value) setActiveTab('all')
        }}
      />
      <OverviewPanel
        onOpenResource={(resourceKey) => {
          const tabValue = resourceTabMap[resourceKey]
          if (tabValue) openTab(tabValue)
        }}
      />
    </div>
  )
}
