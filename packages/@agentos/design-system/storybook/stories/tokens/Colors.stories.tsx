import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { generatedThemeExtend } from '../../../src/tokens/generated-theme'
import {
  flattenTokens,
  TokenPage,
  TokenSection,
  type FlatToken,
} from './_shared'

type ColorTree = Record<string, unknown>

const agentosColors = generatedThemeExtend.colors.agentos as ColorTree
const allColorTokens = flattenTokens(agentosColors, { prefix: 'agentos' })

const maskTokens = allColorTokens.filter((t) => t.key.startsWith('agentos-mask-'))
const neutralTokens = allColorTokens.filter((t) =>
  t.key.startsWith('agentos-neutral-'),
)
const brandTokens = allColorTokens.filter((t) => t.key.startsWith('agentos-brand-'))
const baseTokens = allColorTokens.filter((t) => t.key.startsWith('agentos-base-'))

function groupBySegment(
  tokens: FlatToken[],
  segmentIndex: number,
): Map<string, FlatToken[]> {
  const map = new Map<string, FlatToken[]>()
  for (const token of tokens) {
    const segment = token.key.split('-')[segmentIndex] ?? 'other'
    const list = map.get(segment) ?? []
    list.push(token)
    map.set(segment, list)
  }
  return map
}

function sortByStep(tokens: FlatToken[]): FlatToken[] {
  return [...tokens].sort((a, b) => {
    const stepA = Number(a.name)
    const stepB = Number(b.name)
    if (Number.isNaN(stepA) || Number.isNaN(stepB)) {
      return a.name.localeCompare(b.name)
    }
    return stepA - stepB
  })
}

function collectSteps(palettes: Map<string, FlatToken[]>): string[] {
  const steps = new Set<string>()
  for (const tokens of palettes.values()) {
    for (const token of tokens) {
      steps.add(token.name)
    }
  }
  return [...steps].sort((a, b) => Number(a) - Number(b))
}

/** Tailwind-style solid swatch; step numbers live in the column header */
function ShadeSwatch({ token }: { token: FlatToken }) {
  return (
    <button
      type="button"
      className="h-10 w-full cursor-pointer rounded-agentos-rounded-lg8 border-0 p-0 outline-none focus-visible:ring-2 focus-visible:ring-agentos-brand-primary-color-primary focus-visible:ring-offset-2"
      style={{ backgroundColor: `var(${token.cssVar})` }}
      title={`${token.cssVar}\nbg-${token.key}`}
      aria-label={`${token.key}: ${token.cssVar}`}
      onClick={() => {
        void navigator.clipboard?.writeText(token.cssVar)
      }}
    />
  )
}

/** Named semantic swatch with label under the color chip */
function NamedSwatch({ token }: { token: FlatToken }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <button
        type="button"
        className="h-16 w-full cursor-pointer rounded-agentos-rounded-lg8 border-0 p-0 outline-none ring-1 ring-inset ring-black/5 focus-visible:ring-2 focus-visible:ring-agentos-brand-primary-color-primary focus-visible:ring-offset-2"
        style={{ backgroundColor: `var(${token.cssVar})` }}
        title={`${token.cssVar}\nbg-${token.key}`}
        aria-label={`${token.key}: ${token.cssVar}`}
        onClick={() => {
          void navigator.clipboard?.writeText(token.cssVar)
        }}
      />
      <div className="min-w-0 px-0.5">
        <p className="m-0 break-words text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text">
          {token.name}
        </p>
        <p className="m-0 [overflow-wrap:anywhere] text-agentos-xs text-agentos-neutral-text-color-text-tertiary">
          {token.cssVar}
        </p>
      </div>
    </div>
  )
}

function parseComputedColor(value: string): [number, number, number, number] | null {
  const channels = value.match(/[\d.]+/g)?.map(Number)
  if (!channels || channels.length < 3) return null
  return [channels[0], channels[1], channels[2], channels[3] ?? 1]
}

function relativeLightness([r, g, b, alpha]: [
  number,
  number,
  number,
  number,
]) {
  const composite = [r, g, b].map(
    (channel) => channel * alpha + 255 * (1 - alpha),
  )
  const [red, green, blue] = composite.map((channel) => {
    const normalized = channel / 255
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function sortByRenderedLightness(tokens: FlatToken[]): FlatToken[] {
  const probe = document.createElement('span')
  probe.hidden = true
  document.body.appendChild(probe)

  const measured = tokens.map((token, index) => {
    probe.style.color = `var(${token.cssVar})`
    const color = parseComputedColor(getComputedStyle(probe).color)
    return {
      token,
      index,
      lightness: color ? relativeLightness(color) : null,
    }
  })

  probe.remove()
  return measured
    .sort((a, b) => {
      if (a.lightness === null || b.lightness === null) {
        return a.index - b.index
      }
      return b.lightness - a.lightness
    })
    .map(({ token }) => token)
}

function PaletteBoard({
  palettes,
}: {
  palettes: Map<string, FlatToken[]>
}) {
  const steps = collectSteps(palettes)
  const colTemplate = `minmax(5.5rem,7rem) repeat(${steps.length}, minmax(0, 1fr))`

  return (
    <div className="overflow-x-auto rounded-agentos-rounded-xl12 bg-agentos-neutral-bg-color-bg-base p-6 shadow-sm ring-1 ring-agentos-neutral-border-color-border-secondary">
      <div
        className="mb-3 grid items-center gap-2"
        style={{ gridTemplateColumns: colTemplate }}
      >
        <div aria-hidden="true" />
        {steps.map((step) => (
          <div
            key={step}
            className="text-center text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text-secondary"
          >
            {step}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {[...palettes.entries()].map(([name, tokens]) => {
          const byStep = new Map(sortByStep(tokens).map((t) => [t.name, t]))
          return (
            <div
              key={name}
              className="grid items-center gap-2"
              style={{ gridTemplateColumns: colTemplate }}
            >
              <div className="truncate pr-2 text-agentos-sm font-agentos-medium capitalize text-agentos-neutral-text-color-text">
                {name}
              </div>
              {steps.map((step) => {
                const token = byStep.get(step)
                if (!token) {
                  return <div key={step} className="h-10" />
                }
                return <ShadeSwatch key={step} token={token} />
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NamedSwatchGrid({ tokens }: { tokens: FlatToken[] }) {
  const [sortedTokens, setSortedTokens] = useState(tokens)

  useEffect(() => {
    setSortedTokens(sortByRenderedLightness(tokens))
  }, [tokens])

  return (
    <div className="grid grid-cols-6 gap-x-4 gap-y-5">
      {sortedTokens.map((token) => (
        <NamedSwatch key={token.key} token={token} />
      ))}
    </div>
  )
}

function SemanticColors() {
  const neutralGroups = groupBySegment(neutralTokens, 2)
  const brandGroups = groupBySegment(brandTokens, 2)

  return (
    <TokenPage
      title="Color · Semantic"
      description="Mask / Neutral / Brand semantic colors. Click a swatch to copy its CSS variable."
    >
      <TokenSection title="Mask" wide>
        <div className="rounded-agentos-rounded-xl12 bg-agentos-neutral-bg-color-bg-base p-6 ring-1 ring-agentos-neutral-border-color-border-secondary">
          <NamedSwatchGrid tokens={maskTokens} />
        </div>
      </TokenSection>

      {[...neutralGroups.entries()].map(([category, tokens]) => (
        <TokenSection key={category} title={`Neutral · ${category}`} wide>
          <div className="rounded-agentos-rounded-xl12 bg-agentos-neutral-bg-color-bg-base p-6 ring-1 ring-agentos-neutral-border-color-border-secondary">
            <NamedSwatchGrid tokens={tokens} />
          </div>
        </TokenSection>
      ))}

      {[...brandGroups.entries()].map(([category, tokens]) => (
        <TokenSection key={category} title={`Brand · ${category}`} wide>
          <div className="rounded-agentos-rounded-xl12 bg-agentos-neutral-bg-color-bg-base p-6 ring-1 ring-agentos-neutral-border-color-border-secondary">
            <NamedSwatchGrid tokens={tokens} />
          </div>
        </TokenSection>
      ))}
    </TokenPage>
  )
}

function BaseColors() {
  const palettes = groupBySegment(baseTokens, 2)

  return (
    <TokenPage
      title="Color · Base"
      description="Base color scales (Tailwind-style palette board). Step labels are in the header; click a swatch to copy its CSS variable."
    >
      <TokenSection title="Palettes" wide>
        <PaletteBoard palettes={palettes} />
      </TokenSection>
    </TokenPage>
  )
}

function AllColors() {
  const palettes = groupBySegment(baseTokens, 2)

  return (
    <TokenPage
      title="Color · Overview"
      description={`Base scales plus semantic colors (${allColorTokens.length} tokens). Prefer Base / Semantic for day-to-day lookup.`}
    >
      <TokenSection title="Base palettes" wide>
        <PaletteBoard palettes={palettes} />
      </TokenSection>

      <TokenSection title="Semantic" wide>
        <div className="rounded-agentos-rounded-xl12 bg-agentos-neutral-bg-color-bg-base p-6 ring-1 ring-agentos-neutral-border-color-border-secondary">
          <NamedSwatchGrid
            tokens={[...maskTokens, ...neutralTokens, ...brandTokens]}
          />
        </div>
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Color',
  parameters: {
    // padded: Storybook canvas margin; TokenPage adds inner padding
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Semantic: Story = {
  name: 'Semantic',
  render: () => <SemanticColors />,
}

export const Base: Story = {
  name: 'Base',
  render: () => <BaseColors />,
}

export const All: Story = {
  name: 'Overview',
  render: () => <AllColors />,
}
