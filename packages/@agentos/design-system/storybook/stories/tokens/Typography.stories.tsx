import type { Meta, StoryObj } from '@storybook/react'
import type { CSSProperties } from 'react'
import { generatedThemeExtend } from '../../../src/tokens/generated-theme'
import { SAMPLE_CN } from '../docs/storybook-copy.anti-pattern'
import { flattenTokens, TokenPage, TokenSection, type FlatToken } from './_shared'

const SAMPLE_EN = 'The quick brown fox jumps over the lazy dog.'

function TypographyRow({
  token,
  twClass,
  previewStyle,
  sample = SAMPLE_EN,
}: {
  token: FlatToken
  twClass: string
  previewStyle: CSSProperties
  sample?: string
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-agentos-neutral-border-color-border-secondary py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6">
      <div className="w-full shrink-0 sm:w-56">
        <p className="m-0 text-agentos-sm font-agentos-medium text-agentos-neutral-text-color-text">
          {token.name}
        </p>
        <code className="mt-1 block truncate text-agentos-xs text-agentos-neutral-text-color-text-tertiary">
          {token.cssVar}
        </code>
        <code className="mt-0.5 block truncate text-agentos-xs text-agentos-neutral-text-color-text-quaternary">
          {twClass}
        </code>
      </div>
      <p
        className="m-0 min-w-0 flex-1 text-agentos-neutral-text-color-text"
        style={previewStyle}
      >
        {sample}
      </p>
    </div>
  )
}

function FontFamilyGallery() {
  const families = flattenTokens(
    generatedThemeExtend.fontFamily as Record<string, unknown>,
  )

  return (
    <TokenPage
      title="Typography · Font Family"
      description="Font family tokens. Default stack is font-agentos; use cn / en when you need a single script."
    >
      <TokenSection title="Families">
        <div className="rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-base px-4">
          {families.map((token) => (
            <TypographyRow
              key={token.key}
              token={token}
              twClass={`font-${token.key}`}
              previewStyle={{
                fontFamily: `var(${token.cssVar})`,
                fontSize: 'var(--agentos-font-size-xl)',
              }}
              sample={token.key.includes('cn') ? SAMPLE_CN : SAMPLE_EN}
            />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  )
}

function FontSizeGallery() {
  const sizes = flattenTokens(
    generatedThemeExtend.fontSize as Record<string, unknown>,
  )
  const order = [
    'xs',
    'sm',
    'md',
    'base',
    'lg',
    'xl',
    '2xl',
    '4xl',
    '5xl',
    '6xl',
  ]
  const sorted = [...sizes].sort((a, b) => {
    const ia = order.indexOf(a.name)
    const ib = order.indexOf(b.name)
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
  })

  return (
    <TokenPage
      title="Typography · Font Size"
      description="Font size scale. Tailwind classes are text-agentos-*; CSS vars are --agentos-font-size-*."
    >
      <TokenSection title="Scale">
        <div className="rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-base px-4">
          {sorted.map((token) => (
            <TypographyRow
              key={token.key}
              token={token}
              twClass={`text-${token.key}`}
              previewStyle={{
                fontSize: `var(${token.cssVar})`,
                fontWeight: 'var(--agentos-font-weight-normal)',
              }}
            />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  )
}

function FontWeightGallery() {
  const weights = flattenTokens(
    generatedThemeExtend.fontWeight as Record<string, unknown>,
  )
  const order = [
    'thin',
    'extralight',
    'light',
    'normal',
    'medium',
    'semibold',
    'bold',
    'extrabold',
    'black',
  ]
  const sorted = [...weights].sort((a, b) => {
    const ia = order.indexOf(a.name)
    const ib = order.indexOf(b.name)
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
  })

  return (
    <TokenPage
      title="Typography · Font Weight"
      description="Font weight scale. Tailwind classes are font-agentos-*."
    >
      <TokenSection title="Weights">
        <div className="rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-base px-4">
          {sorted.map((token) => (
            <TypographyRow
              key={token.key}
              token={token}
              twClass={`font-${token.key}`}
              previewStyle={{
                fontWeight: `var(${token.cssVar})`,
                fontSize: 'var(--agentos-font-size-xl)',
              }}
            />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  )
}

function LineHeightGallery() {
  const leadings = flattenTokens(
    generatedThemeExtend.lineHeight as Record<string, unknown>,
  )
  const sorted = [...leadings].sort((a, b) => Number(a.name) - Number(b.name))

  return (
    <TokenPage
      title="Typography · Line Height"
      description="Line height tokens. Tailwind classes are leading-agentos-*."
    >
      <TokenSection title="Leading">
        <div className="rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-base px-4">
          {sorted.map((token) => (
            <TypographyRow
              key={token.key}
              token={token}
              twClass={`leading-${token.key}`}
              previewStyle={{
                lineHeight: `var(${token.cssVar})`,
                fontSize: 'var(--agentos-font-size-base)',
                whiteSpace: 'pre-line',
              }}
              sample={`${SAMPLE_EN}\n${SAMPLE_EN}`}
            />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  )
}

function LetterSpacingGallery() {
  const trackings = flattenTokens(
    generatedThemeExtend.letterSpacing as Record<string, unknown>,
  )
  const order = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
  const sorted = [...trackings].sort((a, b) => {
    const ia = order.indexOf(a.name)
    const ib = order.indexOf(b.name)
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
  })

  return (
    <TokenPage
      title="Typography · Letter Spacing"
      description="Letter spacing tokens. Tailwind classes are tracking-agentos-*."
    >
      <TokenSection title="Tracking">
        <div className="rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-base px-4">
          {sorted.map((token) => (
            <TypographyRow
              key={token.key}
              token={token}
              twClass={`tracking-${token.key}`}
              previewStyle={{
                letterSpacing: `var(${token.cssVar})`,
                fontSize: 'var(--agentos-font-size-xl)',
              }}
            />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Typography',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FontFamily: Story = {
  name: 'Font Family',
  render: () => <FontFamilyGallery />,
}

export const FontSize: Story = {
  name: 'Font Size',
  render: () => <FontSizeGallery />,
}

export const FontWeight: Story = {
  name: 'Font Weight',
  render: () => <FontWeightGallery />,
}

export const LineHeight: Story = {
  name: 'Line Height',
  render: () => <LineHeightGallery />,
}

export const LetterSpacing: Story = {
  name: 'Letter Spacing',
  render: () => <LetterSpacingGallery />,
}
