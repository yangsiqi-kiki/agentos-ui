import { Box } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { graphEdges, graphObjects } from './fixtures'

interface OntologyGraphCanvasProps {
  scale: number
  direction: 'horizontal' | 'vertical'
  onOpenObject: () => void
}

export function OntologyGraphCanvas({ scale, direction, onOpenObject }: OntologyGraphCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const draw = () => {
      const rect = host.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = rect.width * ratio
      canvas.height = rect.height * ratio
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      const context = canvas.getContext('2d')
      if (!context) return
      context.scale(ratio, ratio)
      context.clearRect(0, 0, rect.width, rect.height)
      context.strokeStyle = getComputedStyle(canvas).color
      context.fillStyle = getComputedStyle(canvas).color
      context.lineWidth = 1.25

      for (const edge of graphEdges) {
        const from = graphObjects.find((node) => node.id === edge.from)
        const to = graphObjects.find((node) => node.id === edge.to)
        if (!from || !to) continue
        const fromX = (direction === 'vertical' ? from.x : from.y) * rect.width / 100
        const fromY = (direction === 'vertical' ? from.y : from.x) * rect.height / 100
        const toX = (direction === 'vertical' ? to.x : to.y) * rect.width / 100
        const toY = (direction === 'vertical' ? to.y : to.x) * rect.height / 100
        const startY = fromY + 30
        const endY = toY - 30
        const controlY = startY + (endY - startY) / 2

        context.beginPath()
        context.moveTo(fromX, startY)
        context.bezierCurveTo(fromX, controlY, toX, controlY, toX, endY)
        context.stroke()
        context.beginPath()
        context.moveTo(toX, endY)
        context.lineTo(toX - 4, endY - 7)
        context.lineTo(toX + 4, endY - 7)
        context.closePath()
        context.fill()
      }
    }

    const observer = new ResizeObserver(draw)
    observer.observe(host)
    draw()
    return () => observer.disconnect()
  }, [direction])

  return (
    <div ref={hostRef} className="relative h-full min-h-[460px] w-full overflow-hidden bg-agentos-neutral-bg-color-bg-container">
      <div className="absolute inset-0 origin-center transition-transform" style={{ transform: `scale(${scale})` }}>
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 text-agentos-neutral-text-color-text-quaternary" aria-hidden="true" />
        {graphEdges.map((edge) => {
          const from = graphObjects.find((node) => node.id === edge.from)
          const to = graphObjects.find((node) => node.id === edge.to)
          if (!from || !to) return null
          const x = direction === 'vertical' ? (from.x + to.x) / 2 : (from.y + to.y) / 2
          const y = direction === 'vertical' ? (from.y + to.y) / 2 : (from.x + to.x) / 2
          return <span key={`${edge.from}-${edge.to}`} className="pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-1/2 rounded-agentos-rounded-full999 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container px-1.5 py-0.5 text-agentos-xs text-agentos-neutral-text-color-text-description" style={{ left: `${x}%`, top: `${y}%` }}>{edge.label}</span>
        })}
        {graphObjects.map((node) => {
          const left = direction === 'vertical' ? node.x : node.y
          const top = direction === 'vertical' ? node.y : node.x
          return (
            <button
              key={node.id}
              type="button"
              className="absolute z-10 w-[154px] -translate-x-1/2 -translate-y-1/2 rounded-agentos-rounded-md6 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-2 text-left shadow-agentos-shadow-1 transition-colors hover:border-agentos-brand-primary-color-primary-border"
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={onOpenObject}
            >
              <div className="flex items-start gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-agentos-rounded-sm4 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-fill-color-fill-tertiary text-agentos-neutral-icon-color-icon"><Box className="size-3" aria-hidden="true" /></span>
                <span className="min-w-0"><span className="block truncate text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text-heading">{node.name}</span><span className="block truncate font-mono text-agentos-xs text-agentos-neutral-text-color-text-description">{node.code}</span></span>
              </div>
              <div className="mt-2 flex gap-2 border-t border-agentos-neutral-border-color-border-secondary pt-1.5 text-agentos-xs text-agentos-neutral-text-color-text-description">
                {node.rules > 0 ? <span>{node.rules} 规则</span> : null}
                {node.actions > 0 ? <span>{node.actions} 动作</span> : null}
                <span>{node.properties} 属性</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
