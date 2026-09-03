import {
  Breadcrumb,
  Button,
  RadioButton,
  RadioGroup,
  Tag,
} from '@agentos/design-system'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import { OntologyDirectoryView } from './OntologyDirectoryView'
import { OntologyObjectDetail } from './OntologyObjectDetail'
import { OntologyObjectSetDetail } from './OntologyObjectSetDetail'
import { OntologyRootGraphView } from './OntologyRootGraphView'
import type {
  DirectorySection,
  ObjectOrigin,
  OntologyScreen,
  OntologyView,
} from './types'

export function OntologyWorkbenchPanel() {
  const [screen, setScreen] = useState<OntologyScreen>('root')
  const [view, setView] = useState<OntologyView>('graph')
  const [rootSection, setRootSection] = useState<DirectorySection>('object-set')
  const [objectOrigin, setObjectOrigin] = useState<ObjectOrigin>('object')

  const openRootSection = (section: DirectorySection) => {
    setRootSection(section)
    setScreen('root')
  }

  const openObject = (origin: ObjectOrigin) => {
    setObjectOrigin(origin)
    setScreen('object')
  }

  const breadcrumbItems =
    screen === 'root'
      ? [{ label: '首页' }]
      : screen === 'object-set'
        ? [
            { label: '首页', onClick: () => setScreen('root') },
            { label: '对象集', onClick: () => openRootSection('object-set') },
            { label: '客户经营' },
          ]
        : objectOrigin === 'object-set'
          ? [
              { label: '首页', onClick: () => setScreen('root') },
              { label: '对象集', onClick: () => openRootSection('object-set') },
              { label: '客户经营', onClick: () => setScreen('object-set') },
              { label: '客户' },
            ]
          : [
              { label: '首页', onClick: () => setScreen('root') },
              { label: '客户' },
            ]

  const structuredLabel = screen === 'root' ? '目录' : '列表'
  const title =
    screen === 'root' ? '演示空间本体' : screen === 'object-set' ? '客户经营' : '客户'
  const subtitle =
    screen === 'object-set'
      ? '围绕客户全生命周期组织的核心业务对象'
      : screen === 'object'
        ? 'Customer · 企业客户与个人客户的统一主体'
        : null

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden bg-agentos-neutral-bg-color-bg-layout">
      <div className="flex h-9 shrink-0 items-center gap-2 bg-agentos-neutral-bg-color-bg-container px-4">
        <Breadcrumb className="max-w-none" items={breadcrumbItems} separator="arrow" />
      </div>
      <div className="flex min-h-12 shrink-0 items-center gap-3 bg-agentos-neutral-bg-color-bg-container px-4 py-1.5">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-agentos-lg font-agentos-medium leading-agentos-22 text-agentos-neutral-text-color-text-heading">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-0.5 truncate text-agentos-xs text-agentos-neutral-text-color-text-description">
              {subtitle}
            </p>
          ) : null}
        </div>
        {screen === 'object' ? (
          <Tag size="sm" color="success">已发布</Tag>
        ) : (
          <RadioGroup
            variant="button"
            value={view}
            onValueChange={(value) => setView(value as OntologyView)}
            aria-label="本体视图"
          >
            <RadioButton value="graph" label="图谱" />
            <RadioButton value="structured" label={structuredLabel} />
          </RadioGroup>
        )}
        {screen !== 'root' ? (
          <Button type="button" size="icon" theme="black" appearance="ghost" aria-label="更多">
            <MoreHorizontal className="size-4" />
          </Button>
        ) : null}
      </div>

      {screen === 'object-set' ? (
        <OntologyObjectSetDetail
          view={view}
          onOpenObject={() => openObject('object-set')}
        />
      ) : screen === 'object' ? (
        <OntologyObjectDetail />
      ) : view === 'graph' ? (
        <OntologyRootGraphView onOpenObject={() => openObject('object')} />
      ) : (
        <OntologyDirectoryView
          section={rootSection}
          onSectionChange={setRootSection}
          onOpenObjectSet={() => setScreen('object-set')}
          onOpenObject={() => openObject('object')}
        />
      )}
    </section>
  )
}
