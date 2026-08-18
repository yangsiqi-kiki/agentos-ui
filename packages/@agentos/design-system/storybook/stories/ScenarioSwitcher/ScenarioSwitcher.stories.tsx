import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '@/i18n'
import { ScenarioSwitcher } from '@/features/spaces/components/ScenarioSwitcher'

import { APPLICATIONS, COPY } from './ScenarioSwitcher.fixtures.anti-pattern'

function StoryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primitive-surface-page p-6 font-sans">
      <div className="mx-auto max-w-4xl">{children}</div>
    </div>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <>
      <h2 className="m-0 mb-2 text-fs-700 font-semibold text-primitive-text-1">{title}</h2>
      <p className="mb-8 text-fs-300 text-primitive-text-4">{description}</p>
      <section className="border-b border-primitive-border-1 py-6 first:pt-0">
        <div className="max-w-[980px]">{children}</div>
      </section>
    </>
  )
}

const meta = {
  title: 'Pages/ScenarioSwitcher',
  component: ScenarioSwitcher,
} satisfies Meta<typeof ScenarioSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.defaultTitle}
        description={COPY.defaultDescription}
      >
        <ScenarioSwitcher
          spaceId="space-1"
          value={null}
          options={APPLICATIONS}
          onChange={() => {}}
        />
      </Section>
    </StoryWrapper>
  ),
}

export const ScenarioSelected: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.scenarioSelectedTitle}
        description={COPY.scenarioSelectedDescription}
      >
        <ScenarioSwitcher
          spaceId="space-1"
          value="scenario-1"
          options={APPLICATIONS}
          onChange={() => {}}
        />
      </Section>
    </StoryWrapper>
  ),
}

export const ApplicationSelected: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.applicationSelectedTitle}
        description={COPY.applicationSelectedDescription}
      >
        <ScenarioSwitcher
          spaceId="space-1"
          value={null}
          applicationId="app-cs-001"
          options={APPLICATIONS}
          onChange={() => {}}
        />
      </Section>
    </StoryWrapper>
  ),
}

export const LockedScenarios: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.lockedTitle}
        description={COPY.lockedDescription}
      >
        <ScenarioSwitcher
          spaceId="space-1"
          value={null}
          options={APPLICATIONS}
          lockedScenarioIds={new Set(['scenario-2', 'scenario-4'])}
          onChange={() => {}}
        />
      </Section>
    </StoryWrapper>
  ),
}

export const LockedSelected: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.lockedSelectedTitle}
        description={COPY.lockedSelectedDescription}
      >
        <ScenarioSwitcher
          spaceId="space-1"
          value="scenario-2"
          options={APPLICATIONS}
          lockedScenarioIds={new Set(['scenario-2'])}
          onChange={() => {}}
        />
      </Section>
    </StoryWrapper>
  ),
}

export const Loading: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.loadingTitle}
        description={COPY.loadingDescription}
      >
        <ScenarioSwitcher
          spaceId="space-1"
          value={null}
          options={APPLICATIONS}
          isLoading
          onChange={() => {}}
        />
      </Section>
    </StoryWrapper>
  ),
}

export const Interactive: Story = {
  render: () => {
    function InteractiveDemo() {
      const [value, setValue] = useState<string | null>(null)
      const [applicationId, setApplicationId] = useState<string | null>(null)
      const [locks, setLocks] = useState<ReadonlySet<string>>(new Set())
      const [opens, setOpens] = useState(0)

      return (
        <StoryWrapper>
          <Section
            title={COPY.interactiveTitle}
            description={COPY.interactiveDescription}
          >
            <div className="mb-4 flex items-center gap-3">
              <button
                type="button"
                className="rounded border border-primitive-border-2 px-3 py-1 text-fs-200 text-primitive-text-2"
                onClick={() => setLocks((current) => {
                  const next = new Set(current)
                  if (next.has('scenario-2')) {
                    next.delete('scenario-2')
                  } else {
                    next.add('scenario-2')
                  }
                  return next
                })}
              >
                {locks.has('scenario-2') ? COPY.unlockScenarioLabel : COPY.lockScenarioLabel}
              </button>
              <span className="text-fs-200 text-primitive-text-4"></span>
            </div>
            <ScenarioSwitcher
              spaceId="space-1"
              value={value}
              applicationId={applicationId}
              options={APPLICATIONS}
              lockedScenarioIds={locks}
              onChange={({ scenarioId, applicationId: nextApplicationId }: {
                scenarioId: string | null
                applicationId: string | null
              }) => {
                setValue(scenarioId)
                setApplicationId(nextApplicationId)
              }}
              onDropdownOpen={() => setOpens((current) => current + 1)}
            />
          </Section>
        </StoryWrapper>
      )
    }
    return <InteractiveDemo />
  },
}
