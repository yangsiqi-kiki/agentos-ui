import { Button, Card, Input, Tag, cn } from '@agentos/design-system'
import { ArrowRight, Box, Boxes, GitBranch, Plus, Search, Zap } from 'lucide-react'
import { useState } from 'react'

import { actions, objects, objectSets, relations, rules } from './fixtures'
import type { AutomationSection, DirectorySection } from './types'

const sections: Array<{ key: DirectorySection; label: string; count: number }> = [
  { key: 'object-set', label: '对象集', count: 3 },
  { key: 'object', label: '对象', count: 15 },
  { key: 'relation', label: '关系', count: 25 },
  { key: 'automation', label: '自动化', count: 12 },
]

export function OntologyDirectoryView({
  section,
  onSectionChange,
  onOpenObjectSet,
  onOpenObject,
}: {
  section: DirectorySection
  onSectionChange: (section: DirectorySection) => void
  onOpenObjectSet: () => void
  onOpenObject: () => void
}) {
  const [automationSection, setAutomationSection] = useState<AutomationSection>('action')
  const automationRows = automationSection === 'action' ? actions : rules

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-layout">
      <div className="flex h-10 shrink-0 items-end gap-6 border-b border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container px-4">
        {sections.map((item) => (
          <button
            key={item.key}
            type="button"
            className={cn(
              'relative h-10 whitespace-nowrap px-1 text-agentos-md transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
              section === item.key
                ? 'font-agentos-medium text-agentos-brand-primary-color-primary after:bg-agentos-brand-primary-color-primary'
                : 'text-agentos-neutral-text-color-text-secondary after:bg-transparent hover:text-agentos-neutral-text-color-text',
            )}
            onClick={() => onSectionChange(item.key)}
          >
            {item.label}<span className="ml-1 text-agentos-xs text-agentos-neutral-text-color-text-description">{item.count}</span>
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {section === 'object-set' ? (
          <div className="grid grid-cols-2 gap-3">
            {objectSets.map((set) => (
              <button key={set.id} type="button" className="text-left" onClick={onOpenObjectSet}>
                <Card className="h-full gap-2 transition-colors hover:border-agentos-brand-primary-color-primary-border">
                  <div className="flex items-start justify-between"><span className="flex size-8 items-center justify-center rounded-agentos-rounded-md6 bg-agentos-brand-primary-color-primary-bg text-agentos-brand-primary-color-primary"><Boxes className="size-4" /></span><ArrowRight className="size-4 text-agentos-neutral-text-color-text-tertiary" /></div>
                  <div><p className="text-agentos-md font-agentos-medium text-agentos-neutral-text-color-text-heading">{set.name}</p><p className="mt-1 line-clamp-2 text-agentos-xs leading-agentos-18 text-agentos-neutral-text-color-text-description">{set.description}</p></div>
                  <div className="flex gap-3 text-agentos-xs text-agentos-neutral-text-color-text-tertiary"><span>{set.objectCount} 个对象</span><span>{set.relationCount} 条关系</span></div>
                </Card>
              </button>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container">
            <div className="flex h-12 items-center gap-2 border-b border-agentos-neutral-border-color-border-secondary px-3">
              <div className="relative max-w-64 flex-1">
                <Search className="pointer-events-none absolute left-2 top-1/2 z-10 size-3.5 -translate-y-1/2 text-agentos-neutral-icon-color-icon" aria-hidden="true" />
                <Input className="pl-7" size="sm" placeholder="请输入英文标识、展示名称" />
              </div>
              {section === 'automation' ? (
                <div className="ml-1 inline-flex rounded-agentos-rounded-md6 bg-agentos-neutral-fill-color-fill-tertiary p-0.5">
                  {(['action', 'rule'] as const).map((key) => <button key={key} type="button" className={cn('rounded-agentos-rounded-sm4 px-3 py-1 text-agentos-xs', automationSection === key ? 'bg-agentos-neutral-bg-color-bg-container font-agentos-medium text-agentos-brand-primary-color-primary shadow-agentos-shadow-1' : 'text-agentos-neutral-text-color-text-secondary')} onClick={() => setAutomationSection(key)}>{key === 'action' ? '动作 7' : '规则 5'}</button>)}
                </div>
              ) : null}
              <Button className="ml-auto" size="sm" theme="black" appearance="solid" leadingIcon={<Plus className="size-3.5" />}>{section === 'object' ? '新建对象' : section === 'relation' ? '新建关系' : automationSection === 'action' ? '新建动作' : '新建规则'}</Button>
            </div>

            {section === 'object' ? (
              <div>
                <div className="grid grid-cols-[1.2fr_1fr_72px] bg-agentos-neutral-fill-color-fill-tertiary px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description"><span>对象</span><span>所属对象集</span><span>状态</span></div>
                {objects.map((object) => <button key={object.id} type="button" className="grid w-full grid-cols-[1.2fr_1fr_72px] items-center border-t border-agentos-neutral-border-color-border-secondary px-4 py-3 text-left hover:bg-agentos-neutral-fill-color-fill-tertiary" onClick={onOpenObject}><span className="flex min-w-0 items-center gap-2"><Box className="size-3.5 shrink-0 text-agentos-neutral-icon-color-icon" /><span className="min-w-0"><span className="block truncate text-agentos-sm font-agentos-medium">{object.name}</span><span className="block truncate font-mono text-agentos-xs text-agentos-neutral-text-color-text-description">{object.code}</span></span></span><span className="text-agentos-xs text-agentos-neutral-text-color-text-secondary">客户经营</span><Tag size="sm" color={object.status === '已发布' ? 'success' : 'warning'}>{object.status}</Tag></button>)}
              </div>
            ) : section === 'relation' ? (
              <div>
                <div className="grid grid-cols-[1.1fr_1.5fr_70px] bg-agentos-neutral-fill-color-fill-tertiary px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description"><span>关系</span><span>连接对象</span><span>类型</span></div>
                {relations.map((row) => <div key={row[0]} className="grid grid-cols-[1.1fr_1.5fr_70px] items-center border-t border-agentos-neutral-border-color-border-secondary px-4 py-3"><span className="flex items-center gap-2 text-agentos-sm font-agentos-medium"><GitBranch className="size-3.5 text-agentos-neutral-icon-color-icon" />{row[0]}</span><span className="text-agentos-xs text-agentos-neutral-text-color-text-secondary">{row[1]}</span><span className="text-agentos-xs">{row[2]}</span></div>)}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-[1.3fr_1fr_0.8fr_72px] bg-agentos-neutral-fill-color-fill-tertiary px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description"><span>{automationSection === 'action' ? '动作' : '规则'}</span><span>英文标识</span><span>关联对象</span><span>状态</span></div>
                {automationRows.map((row) => <div key={row[1]} className="grid grid-cols-[1.3fr_1fr_0.8fr_72px] items-center border-t border-agentos-neutral-border-color-border-secondary px-4 py-3"><span className="flex min-w-0 items-center gap-2 text-agentos-sm font-agentos-medium"><Zap className="size-3.5 shrink-0 text-agentos-neutral-icon-color-icon" /><span className="truncate">{row[0]}</span></span><span className="truncate font-mono text-agentos-xs text-agentos-neutral-text-color-text-description">{row[1]}</span><span className="text-agentos-xs">{row[2]}</span><Tag size="sm" color={row[3] === '已发布' ? 'success' : 'warning'}>{row[3]}</Tag></div>)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
