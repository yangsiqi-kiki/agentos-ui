import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@/i18n'
import { ChatThreadComposerShell } from '@/components/chat'
import { BackgroundJobsBar } from '@/features/spaces/background-jobs/BackgroundJobsBar'
import type { BackgroundJobSummary } from '@/features/spaces/background-jobs/types'
import { SpaceChatComposer } from '@/features/spaces/components/SpaceChatComposer'
import {
  createLabControllerStore,
  LabControllerActionsProvider,
  LabControllerStoreProvider,
} from '@/features/spaces/components/SpaceChatLabActionsContext'

import {
  COPY,
  createMockLabControllerActions,
  MIXED_JOBS,
  summary,
} from './BackgroundJobsBar.fixtures.anti-pattern'

/** Storybook 内的 API mock：拦截 background-jobs 与 composer 只读端点，其余请求透传。 */
function installJobApiMock(jobs: BackgroundJobSummary[]) {
  const originalFetch = window.fetch.bind(window)
  window.fetch = async (input, init) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : input instanceof Request
            ? input.url
            : String(input)
    const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase()

    const cancel = url.match(/\/api\/spaces\/[^/]+\/background-jobs\/([^/]+)\/cancel$/)
    if (method === 'POST' && cancel) {
      return json({ jobId: cancel[1], status: 'canceling' })
    }
    const dismiss = url.match(/\/api\/spaces\/[^/]+\/background-jobs\/([^/]+)\/dismiss$/)
    if (method === 'POST' && dismiss) {
      return json({ jobId: dismiss[1], dismissedAt: new Date().toISOString() })
    }
    if (/\/api\/spaces\/[^/]+\/background-jobs(\?|$)/.test(url) && method === 'GET') {
      return json(jobs)
    }
    const detail = url.match(/\/api\/spaces\/[^/]+\/background-jobs\/([^/]+)$/)
    if (method === 'GET' && detail) {
      const job = jobs.find((item) => item.jobId === detail[1]) ?? jobs[0]
      return json({ ...job, input: null, error: null, createdBy: 'story-user', startedAt: null, steps: [] })
    }
    if (/\/api\/runtime\/skills(\?|$)/.test(url) && method === 'GET') {
      return json({ data: [] })
    }
    if (/\/api\/spaces\/[^/]+\/chat-lab\/scenarios(\?|$)/.test(url) && method === 'GET') {
      return json({ applications: [] })
    }
    if (/\/api\/ls\/models(\?|$)/.test(url) && method === 'GET') {
      return json({ data: [] })
    }
    if (/\/api\/knowledge-documents\/explorer(\?|$)/.test(url) && method === 'GET') {
      return json({ source: [], output: [] })
    }
    if (/\/api\/spaces\/[^/]+\/data-sources(\?|$)/.test(url) && method === 'GET') {
      return json({ data: [] })
    }
    return originalFetch(input, init)
  }
}

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

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

/**
 * 观测条默认折叠；autoExpand 在任务加载完成后模拟点击展开，
 * 便于 story 直接展示多任务列表。
 */
function BarDemo({ jobs, autoExpand }: { jobs: BackgroundJobSummary[]; autoExpand?: boolean }) {
  installJobApiMock(jobs)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoExpand) return
    const interval = window.setInterval(() => {
      const toggle = containerRef.current?.querySelector<HTMLElement>(
        '[data-testid="background-jobs-bar-toggle"]',
      )
      if (toggle) {
        window.clearInterval(interval)
        toggle.click()
      }
    }, 100)
    return () => window.clearInterval(interval)
  }, [autoExpand])

  return (
    <div ref={containerRef}>
      <BackgroundJobsBar spaceId="space-1" chatSessionId="chat-1" />
    </div>
  )
}

/**
 * 复刻 SpaceChatThread 的 Composer 容器：观测条位于 ComposerShell 正上方，
 * 用真实 SpaceChatComposer 验证展开/收起/取消/知道了 对输入区的布局影响。
 */
function ComposerDemo({ jobs }: { jobs: BackgroundJobSummary[] }) {
  installJobApiMock(jobs)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      const toggle = containerRef.current?.querySelector<HTMLElement>(
        '[data-testid="background-jobs-bar-toggle"]',
      )
      if (toggle) {
        window.clearInterval(interval)
        toggle.click()
      }
    }, 100)
    return () => window.clearInterval(interval)
  }, [])

  // 复刻 SpaceChatThread 面板结构：固定高度 flex 列，消息区 flex-1 可压缩，
  // Composer 区 shrink-0 底部锚定——观测条展开时向上挤压消息区，输入框不位移。
  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col overflow-hidden rounded-lg border border-primitive-border-1 bg-white"
      style={{ height: 520 }}
    >
      {/* 模拟消息区：与真实 Viewport 一样 flex-1 min-h-0，被观测条展开压缩 */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
        <div className="h-9 w-2/3 rounded-[10px] bg-primitive-gray-2" />
        <div className="ml-auto h-9 w-1/2 rounded-[10px] bg-primitive-brand-blue-soft-4" />
        <div className="h-9 w-3/5 rounded-[10px] bg-primitive-gray-2" />
        <div className="ml-auto h-9 w-1/3 rounded-[10px] bg-primitive-brand-blue-soft-4" />
      </div>
      {/* 真实 Composer 区：shrink-0 底部锚定，观测条位于 ComposerShell 上方 */}
      <div className="relative shrink-0 bg-primitive-grey-13 px-6 pb-6 pt-1">
        <div className="relative z-10 mx-auto w-full">
          <BackgroundJobsBar spaceId="space-1" chatSessionId="chat-1" />
          <ChatThreadComposerShell
            shellTestId="space-chat-thread-composer-shell"
            glowTestId="space-chat-thread-composer-glow"
          >
            <SpaceChatComposer
              hasActiveTask={false}
              isRunning={false}
              isSnapshotLoading={false}
              activeStageKey={null}
              selection={{}}
            />
          </ChatThreadComposerShell>
        </div>
      </div>
    </div>
  )
}


const meta = {
  title: 'Pages/BackgroundJobsBar',
  component: BackgroundJobsBar,
} satisfies Meta<typeof BackgroundJobsBar>

export default meta
type Story = StoryObj<typeof meta>

export const Collapsed: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.collapsedTitle}
        description={COPY.collapsedDescription}
      >
        <BarDemo jobs={MIXED_JOBS} />
      </Section>
    </StoryWrapper>
  ),
}

export const MixedStates: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.mixedTitle}
        description={COPY.mixedDescription}
      >
        <BarDemo jobs={MIXED_JOBS} autoExpand />
      </Section>
    </StoryWrapper>
  ),
}

export const UnknownStatus: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.unknownTitle}
        description={COPY.unknownDescription}
      >
        <BarDemo jobs={[summary('job-4', 'scenario.promote', 'rollback_failed')]} autoExpand />
      </Section>
    </StoryWrapper>
  ),
}

export const FinalDismissible: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.finalTitle}
        description={COPY.finalDescription}
      >
        <BarDemo jobs={[summary('job-3', 'scenario.reassign', 'succeeded')]} autoExpand />
      </Section>
    </StoryWrapper>
  ),
}

export const EmptyHidden: Story = {
  render: () => (
    <StoryWrapper>
      <Section
        title={COPY.emptyTitle}
        description={COPY.emptyDescription}
      >
        <BarDemo jobs={[]} />
        <div className="mt-4 h-24 rounded-lg border border-dashed border-primitive-border-2 bg-white/60" />
      </Section>
    </StoryWrapper>
  ),
}

export const WithComposer: Story = {
  render: () => (
    <StoryWrapper>
      <Section title={COPY.composedTitle} description={COPY.composedDescription}>
        <MemoryRouter initialEntries={['/space-1']}>
          <Routes>
            <Route
              path="/:spaceId"
              element={
                <LabControllerStoreProvider store={createLabControllerStore()}>
                  <LabControllerActionsProvider
                    value={{ actions: createMockLabControllerActions() }}
                  >
                    <ComposerDemo jobs={MIXED_JOBS} />
                  </LabControllerActionsProvider>
                </LabControllerStoreProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      </Section>
    </StoryWrapper>
  ),
}
