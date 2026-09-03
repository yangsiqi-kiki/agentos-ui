import { Button, Tag } from '@agentos/design-system'
import { Box, Plus, Search } from 'lucide-react'
import { useState } from 'react'

import { actions, objects, relations, rules } from './fixtures'
import { OntologyGraphCanvas } from './OntologyGraphCanvas'
import type { OntologyView } from './types'

type ListSection = 'object' | 'relation' | 'action' | 'rule'

const sections: Array<{ key: ListSection; label: string; count: number }> = [
  { key: 'object', label: '对象', count: objects.length },
  { key: 'relation', label: '关系', count: relations.length },
  { key: 'action', label: '动作', count: actions.length },
  { key: 'rule', label: '规则', count: rules.length },
]

export function OntologyObjectSetDetail({ view, onOpenObject }: { view: OntologyView; onOpenObject: () => void }) {
  const [section, setSection] = useState<ListSection>('object')

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-container">
      {view === 'graph' ? (
        <div className="min-h-0 flex-1 p-3">
          <div className="relative h-full overflow-hidden rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container">
            <OntologyGraphCanvas scale={0.92} direction="vertical" onOpenObject={onOpenObject} />
            <div className="absolute bottom-3 left-3 rounded-agentos-rounded-md6 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container px-3 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description shadow-agentos-shadow-1">仅展示对象集内对象与关系</div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex h-10 shrink-0 items-stretch px-4 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#D9E0E8]">
            {sections.map((item) => (
              <button key={item.key} type="button" className={`relative z-10 mr-7 flex items-center gap-1 border-b-2 px-1 text-agentos-sm transition-colors ${section === item.key ? 'border-agentos-brand-primary-color-primary font-agentos-medium text-agentos-brand-primary-color-primary' : 'border-transparent text-agentos-neutral-text-color-text'}`} onClick={() => setSection(item.key)}>
                {item.label}<span className="text-agentos-xs text-agentos-neutral-text-color-text-description">{item.count}</span>
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-agentos-neutral-bg-color-bg-layout p-3">
            {section === 'object' ? <ObjectList onOpenObject={onOpenObject} /> : section === 'relation' ? <SimpleList title="关系" rows={relations} /> : section === 'action' ? <SimpleList title="动作" rows={actions} /> : <SimpleList title="规则" rows={rules} />}
          </div>
        </>
      )}
    </div>
  )
}

function ListToolbar({ title, actionLabel }: { title: string; actionLabel: string }) {
  return (
    <div className="flex h-12 items-center border-b border-agentos-neutral-border-color-border-secondary px-3">
      <p className="text-agentos-sm font-agentos-medium">{title}</p>
      <button type="button" className="ml-auto mr-2 flex h-7 w-48 items-center gap-2 rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container px-2 text-agentos-xs text-agentos-neutral-text-color-text-placeholder"><Search className="size-3.5" />搜索</button>
      <Button size="sm" theme="black" appearance="solid" leadingIcon={<Plus className="size-3.5" />}>{actionLabel}</Button>
    </div>
  )
}

function ObjectList({ onOpenObject }: { onOpenObject: () => void }) {
  return (
    <div className="overflow-hidden rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container">
      <ListToolbar title="对象列表" actionLabel="新建对象" />
      <div className="grid grid-cols-[1.1fr_1fr_80px_80px_72px] bg-agentos-neutral-fill-color-fill-tertiary px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description"><span>中文名称</span><span>英文标识</span><span>属性</span><span>关系</span><span>状态</span></div>
      {objects.map((object) => (
        <button key={object.id} type="button" className="grid w-full grid-cols-[1.1fr_1fr_80px_80px_72px] items-center border-t border-agentos-neutral-border-color-border-secondary px-4 py-3 text-left hover:bg-agentos-neutral-fill-color-fill-tertiary" onClick={onOpenObject}>
          <span className="flex items-center gap-2 text-agentos-sm font-agentos-medium"><Box className="size-3.5" />{object.name}</span>
          <span className="truncate font-mono text-agentos-xs text-agentos-neutral-text-color-text-description">{object.code}</span><span className="text-agentos-xs">{object.properties}</span><span className="text-agentos-xs">{object.relations}</span><Tag size="sm" color={object.status === '已发布' ? 'success' : 'warning'}>{object.status}</Tag>
        </button>
      ))}
    </div>
  )
}

function SimpleList({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container">
      <ListToolbar title={`${title}列表`} actionLabel={`新建${title}`} />
      <div className="grid grid-cols-[1fr_1.2fr_100px] bg-agentos-neutral-fill-color-fill-tertiary px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description"><span>名称</span><span>英文标识</span><span>状态</span></div>
      {rows.map((row) => <div key={row[1]} className="grid grid-cols-[1fr_1.2fr_100px] border-t border-agentos-neutral-border-color-border-secondary px-4 py-3 text-agentos-xs"><span className="font-agentos-medium">{row[0]}</span><span className="truncate font-mono text-agentos-neutral-text-color-text-description">{row[1]}</span><span>{row[2] ?? '已发布'}</span></div>)}
    </div>
  )
}
