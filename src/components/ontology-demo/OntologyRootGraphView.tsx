import { Button, RadioButton, RadioGroup, Select } from '@agentos/design-system'
import { Focus, Maximize, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { OntologyGraphCanvas } from './OntologyGraphCanvas'

export function OntologyRootGraphView({ onOpenObject }: { onOpenObject: () => void }) {
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('vertical')
  const [selectedSet, setSelectedSet] = useState('all')
  const [scale, setScale] = useState(1)

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-agentos-neutral-bg-color-bg-container p-3">
      <div className="relative h-full min-h-0 overflow-hidden rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border-secondary">
        <OntologyGraphCanvas scale={scale} direction={direction} onOpenObject={onOpenObject} />

        <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
          <Select
            className="w-48"
            value={selectedSet}
            options={[
              { value: 'all', label: '全部对象集' },
              { value: 'customer', label: '客户经营' },
              { value: 'product', label: '产品与服务' },
            ]}
            onValueChange={(value) => setSelectedSet(String(value))}
          />
          <RadioGroup
            className="w-fit max-w-full shrink-0"
            variant="button"
            value={direction}
            onValueChange={(value) => setDirection(value as 'horizontal' | 'vertical')}
          >
            <RadioButton
              className="w-auto min-w-max justify-center whitespace-nowrap"
              value="horizontal"
              label="横向"
            />
            <RadioButton
              className="w-auto min-w-max justify-center whitespace-nowrap"
              value="vertical"
              label="纵向"
            />
          </RadioGroup>
        </div>

        <div className="absolute right-3 top-3 z-20 flex items-center rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-1 shadow-agentos-shadow-1">
          <Button type="button" size="icon" theme="black" appearance="ghost" aria-label="放大" onClick={() => setScale((value) => Math.min(1.2, value + 0.1))}><Plus className="size-4" /></Button>
          <Button type="button" size="icon" theme="black" appearance="ghost" aria-label="缩小" onClick={() => setScale((value) => Math.max(0.8, value - 0.1))}><Minus className="size-4" /></Button>
          <Button type="button" size="icon" theme="black" appearance="ghost" aria-label="适应画布" onClick={() => setScale(1)}><Focus className="size-4" /></Button>
          <Button type="button" size="icon" theme="black" appearance="ghost" aria-label="全屏"><Maximize className="size-4" /></Button>
        </div>

        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-4 rounded-agentos-rounded-full999 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container px-4 py-2 text-agentos-xs text-agentos-neutral-text-color-text-secondary shadow-agentos-shadow-1">
          <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-agentos-rounded-xs2 bg-agentos-neutral-text-color-text" />对象</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-px w-5 bg-agentos-neutral-text-color-text-quaternary" />关系</span>
        </div>
      </div>
    </div>
  )
}
