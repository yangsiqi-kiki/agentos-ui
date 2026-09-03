import { Button, Tag } from '@agentos/design-system'
import { Box, Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import { actions, properties, relations, rules } from './fixtures'
import type { ObjectSection } from './types'

const tabs: Array<{ key: ObjectSection; label: string }> = [
  { key: 'overview', label: '概览' },
  { key: 'attribute', label: '属性' },
  { key: 'relation', label: '关系' },
  { key: 'action', label: '动作' },
  { key: 'rule', label: '规则' },
]

export function OntologyObjectDetail() {
  const [section, setSection] = useState<ObjectSection>('overview')

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-container">
      <div className="relative flex h-10 shrink-0 items-stretch px-4 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#D9E0E8]">
        {tabs.map((tab) => (
          <button key={tab.key} type="button" className={`relative z-10 mr-7 border-b-2 px-1 text-agentos-sm transition-colors ${section === tab.key ? 'border-agentos-brand-primary-color-primary font-agentos-medium text-agentos-brand-primary-color-primary' : 'border-transparent text-agentos-neutral-text-color-text'}`} onClick={() => setSection(tab.key)}>{tab.label}</button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto bg-agentos-neutral-bg-color-bg-layout p-3">
        {section === 'overview' ? <Overview /> : section === 'attribute' ? <AttributeList /> : section === 'relation' ? <EntityList title="关系列表" actionLabel="新建关系" rows={relations} /> : section === 'action' ? <EntityList title="动作列表" actionLabel="新建动作" rows={actions} /> : <EntityList title="规则列表" actionLabel="新建规则" rows={rules} />}
      </div>
    </div>
  )
}

function Overview() {
  return (
    <div className="rounded-agentos-rounded-sm4 bg-agentos-neutral-bg-color-bg-container px-4 py-4">
      <Section title="基本信息" action={<Button size="sm" theme="secondary" appearance="solid">编辑</Button>}>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          <Field label="英文标识" value="Customer" mono /><Field label="中文名称" value="客户" /><Field label="数据类型" value="业务对象" tag />
          <Field label="挂载对象集" value="客户经营" /><Field label="主键属性" value="客户编号" /><Field label="状态" value="已发布" tag />
        </div>
        <div className="mt-4"><Field label="描述" value="企业客户与个人客户的统一主体" /></div>
      </Section>
      <Section title="数据对象">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4"><Field label="用户数据隔离" value="是" /><Field label="数据源" value="企业经营数据源" /><Field label="数据表" value="customer_master" mono /></div>
      </Section>
      <Section title="元信息" last>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4"><Field label="创建人" value="杨思琪" /><Field label="创建时间" value="2026-08-18 10:32" /><span /><Field label="更新人" value="杨思琪" /><Field label="更新时间" value="2026-08-31 09:46" /></div>
      </Section>
    </div>
  )
}

function Section({ title, action, last = false, children }: { title: string; action?: ReactNode; last?: boolean; children: ReactNode }) {
  return <section className={last ? '' : 'mb-8'}><div className="mb-4 flex min-h-7 items-center justify-between"><h2 className="text-agentos-md font-agentos-medium">{title}</h2>{action}</div>{children}</section>
}

function Field({ label, value, mono = false, tag = false }: { label: string; value: string; mono?: boolean; tag?: boolean }) {
  return <div className="min-w-0"><p className="mb-1 text-agentos-xs text-agentos-neutral-text-color-text-description">{label}</p>{tag ? <Tag size="sm">{value}</Tag> : <p className={`truncate text-agentos-sm ${mono ? 'font-mono' : ''}`}>{value}</p>}</div>
}

function AttributeList() {
  return (
    <div className="overflow-hidden rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container">
      <ListHeader title="属性列表" actionLabel="新建属性" />
      <div className="grid grid-cols-[1.1fr_1.3fr_0.8fr_60px] bg-agentos-neutral-fill-color-fill-tertiary px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description"><span>中文名称</span><span>字段标识</span><span>类型</span><span>必填</span></div>
      {properties.map((row) => <div key={row[1]} className="grid grid-cols-[1.1fr_1.3fr_0.8fr_60px] border-t border-agentos-neutral-border-color-border-secondary px-4 py-3 text-agentos-xs"><span className="font-agentos-medium">{row[0]}</span><span className="truncate font-mono text-agentos-neutral-text-color-text-description">{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span></div>)}
    </div>
  )
}

function EntityList({ title, actionLabel, rows }: { title: string; actionLabel: string; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container">
      <ListHeader title={title} actionLabel={actionLabel} />
      <div className="grid grid-cols-[1fr_1.3fr_100px] bg-agentos-neutral-fill-color-fill-tertiary px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-description"><span>名称</span><span>英文标识</span><span>状态</span></div>
      {rows.map((row) => <div key={row[1]} className="grid grid-cols-[1fr_1.3fr_100px] border-t border-agentos-neutral-border-color-border-secondary px-4 py-3 text-agentos-xs"><span className="flex items-center gap-2 font-agentos-medium"><Box className="size-3.5" />{row[0]}</span><span className="truncate font-mono text-agentos-neutral-text-color-text-description">{row[1]}</span><span>{row[2] ?? '已发布'}</span></div>)}
    </div>
  )
}

function ListHeader({ title, actionLabel }: { title: string; actionLabel: string }) {
  return <div className="flex h-12 items-center border-b border-agentos-neutral-border-color-border-secondary px-3"><p className="text-agentos-sm font-agentos-medium">{title}</p><Button className="ml-auto" size="sm" theme="black" appearance="solid" leadingIcon={<Plus className="size-3.5" />}>{actionLabel}</Button></div>
}
