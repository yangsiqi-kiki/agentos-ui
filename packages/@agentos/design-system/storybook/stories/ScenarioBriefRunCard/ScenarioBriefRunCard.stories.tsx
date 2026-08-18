import type { Meta, StoryObj } from '@storybook/react'
import '@/i18n'
import { useEffect, useRef, useState } from 'react'

import { ScenarioBriefRunCard } from '@/features/spaces/components/chat-message/run-cards/ScenarioBriefRunCard'
import type { RunCardPartData } from '@/features/spaces/components/chat-message/run-cards/RunCardPartCard'
import {
  LabControllerActionsProvider,
  LabControllerStoreProvider,
  createLabControllerStore,
} from '@/features/spaces/components/SpaceChatLabActionsContext'
import type { SpaceScenarioApplication } from '@/features/spaces/types'

const MESSAGE_ID = 'msg-scenario-brief-1'

function makeData(overrides: Partial<RunCardPartData> = {}): RunCardPartData {
  return {
    kindLabel: '高价值场景卡片 · 完成',
    kind: 'scenario_brief_card',
    interactive: false,
    layoutRole: 'final_output',
    runCardId: 'rc-scenario-brief-1',
    metadata: {},
    ...overrides,
  }
}

const SAMPLE_ITEMS = [
  {
    id: 'app-cs-001',
    type: 'application',
    title: '智能客服运营中心',
    priority: 'P0',
    problem_statement:
      '某中型金融机构客服中心日均处理 3,000+ 客户咨询，当前依赖人工坐席逐条分类、派发和回复，平均响应时长 4.5 小时。',
    priority_reason:
      '客服运营是金融机构客户体验的核心触点，AI 介入可显著提升效率和客户满意度。',
    children: [
      {
        artifactId: 'scenario-1',
        name: '智能工单分派Agent',
        title: 'CS1 · 智能工单分派Agent',
        problem_statement:
          '客服坐席每天花费 2.5 小时在手动分类和派发工单上，误派率约 18%。',
        priority: 'P0',
        priority_reason: 'WSJF 最高，直接解决客服运营最大瓶颈。',
      },
      {
        artifactId: 'scenario-2',
        name: '客户情绪感知Agent',
        title: 'CS2 · 客户情绪感知Agent',
        problem_statement:
          '客服质检目前仅覆盖 3% 的会话，客户不满情绪往往在升级为投诉后才被感知。',
        priority: 'P1',
        priority_reason: '价值高但数据就绪度中等，建议排入第二批次。',
      },
      {
        artifactId: 'scenario-3',
        name: '智能知识检索Agent',
        title: 'CS3 · 智能知识检索Agent',
        problem_statement:
          '坐席在处理客户咨询时需跨 3-5 个系统检索产品条款、理赔规则等。',
        priority: 'P1',
        priority_reason: '实施难度低、业务价值明确，建议与工单分派 Agent 并行推进。',
      },
    ],
  },
  {
    id: 'app-ltc-001',
    type: 'application',
    title: 'Lead to Close Agent',
    priority: 'P0',
    problem_statement:
      '销售到回款端到端应用：线索 → 商机 → 合同 → 开票 → 回款。',
    priority_reason: '打通销售与财务断点，回款预测准确率 +18%。',
    children: [
      {
        artifactId: 'scenario-4',
        name: 'Voucher Data Extraction Co-pilot',
        title: 'Voucher Data Extraction Co-pilot',
        problem_statement:
          '从合同与发票附件抽取结构化字段，自动建议会计科目编码。',
        priority: 'P1',
        priority_reason: '凭证录入人工环节 −50%，编码准确率 ≥95%。',
      },
    ],
  },
]

const SAMPLE_ITEMS_WITH_NEW = SAMPLE_ITEMS.map((app) => ({
  ...app,
  is_new: app.id === 'app-cs-001' || undefined,
  children: app.children.map((child) => ({
    ...child,
    is_new:
      ['scenario-1', 'scenario-4'].includes(child.artifactId) || undefined,
  })),
}))

function mockConfirmedStore() {
  return createLabControllerStore({
    selectedApplication: {
      id: 'app-cs-001',
      name: '智能客服运营中心',
      description: '',
      priority: 'P0',
      scenarios: [
        {
          id: 'scenario-1',
          name: '智能工单分派Agent',
          description: '',
          priority: 'P0',
          updatedAt: '',
          buildPlanKind: 'running' as const,
        },
        {
          id: 'scenario-3',
          name: '智能知识检索Agent',
          description: '',
          priority: 'P1',
          updatedAt: '',
          buildPlanKind: 'running' as const,
        },
      ],
    } as SpaceScenarioApplication,
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
      <h2 className="m-0 mb-2 text-fs-700 font-semibold text-primitive-text-1">
        {title}
      </h2>
      <p className="mb-8 text-fs-300 text-primitive-text-4">{description}</p>
      <section className="border-b border-primitive-border-1 py-6 first:pt-0">
        <div className="max-w-[980px]">{children}</div>
      </section>
    </>
  )
}

const meta = {
  title: 'Pages/ScenarioBriefRunCard',
  component: ScenarioBriefRunCard,
} satisfies Meta<typeof ScenarioBriefRunCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const data = makeData({ payload: { items: SAMPLE_ITEMS } })
    return (
      <StoryWrapper>
        <Section
          title="ScenarioBriefRunCard — Default (pending)"
          description="pending 态：最新消息，无 metadata.selectedScenarioIds。用户可勾选应用/业务 tile 并提交。"
        >
          <ScenarioBriefRunCard
            data={data}
            messageId={MESSAGE_ID}
            isLatestMessage={true}
          />
        </Section>
      </StoryWrapper>
    )
  },
}

export const Submitted: Story = {
  render: () => {
    const data = makeData({
      metadata: { selectedScenarioIds: ['scenario-1', 'scenario-3'] },
      payload: { items: SAMPLE_ITEMS },
    })
    return (
      <StoryWrapper>
        <Section
          title="ScenarioBriefRunCard — Submitted"
          description="submitted 态：metadata.selectedScenarioIds 非空。全 tile disabled，已选项显示灰色 chrome（非蓝色）。"
        >
          <ScenarioBriefRunCard
            data={data}
            messageId={MESSAGE_ID}
            isLatestMessage={false}
          />
        </Section>
      </StoryWrapper>
    )
  },
}

export const Skipped: Story = {
  render: () => {
    const data = makeData({ payload: { items: SAMPLE_ITEMS } })
    return (
      <StoryWrapper>
        <Section
          title="ScenarioBriefRunCard — Skipped"
          description="skipped 态：metadata 空，非最新消息。全 tile disabled，checkbox 全 unchecked，无底栏。"
        >
          <ScenarioBriefRunCard
            data={data}
            messageId={MESSAGE_ID}
            isLatestMessage={false}
          />
        </Section>
      </StoryWrapper>
    )
  },
}

export const PreConfirmed: Story = {
  render: () => {
    const data = makeData({ payload: { items: SAMPLE_ITEMS } })
    const store = mockConfirmedStore()
    return (
      <LabControllerStoreProvider store={store}>
        <LabControllerActionsProvider value={{ actions: {} as any }}>
          <StoryWrapper>
            <Section
              title="ScenarioBriefRunCard — PreConfirmed"
              description="pending 态下已确认场景（scenario-1, scenario-3）预勾选 + 灰色 chrome + disabled。不可取消勾选。"
            >
              <ScenarioBriefRunCard
                data={data}
                messageId={MESSAGE_ID}
                isLatestMessage={true}
              />
            </Section>
          </StoryWrapper>
        </LabControllerActionsProvider>
      </LabControllerStoreProvider>
    )
  },
}

export const IsNew: Story = {
  render: () => {
    const data = makeData({
      payload: { items: SAMPLE_ITEMS_WITH_NEW },
      metadata: { selectedScenarioIds: ['scenario-2'] },
    })
    return (
      <StoryWrapper>
        <Section
          title="ScenarioBriefRunCard — IsNew"
          description="is_new: true 的 item 显示绿色「新增」pill。已提交态下仍可见。app-cs-001 整体标记 is_new，scenario-1 和 scenario-4 也标记 is_new。"
        >
          <ScenarioBriefRunCard
            data={data}
            messageId={MESSAGE_ID}
            isLatestMessage={false}
          />
        </Section>
      </StoryWrapper>
    )
  },
}

export const Mixed: Story = {
  render: () => {
    const data = makeData({ payload: { items: SAMPLE_ITEMS_WITH_NEW } })
    const store = mockConfirmedStore()
    return (
      <LabControllerStoreProvider store={store}>
        <LabControllerActionsProvider value={{ actions: {} as any }}>
          <StoryWrapper>
            <Section
              title="ScenarioBriefRunCard — Mixed"
              description="混合状态：scenario-1 已确认（gray + disabled + pre-checked）且标记 is_new；scenario-3 已确认；scenario-4 标记 is_new。同时展示「新增」pill 和已确认态。"
            >
              <ScenarioBriefRunCard
                data={data}
                messageId={MESSAGE_ID}
                isLatestMessage={true}
              />
            </Section>
          </StoryWrapper>
        </LabControllerActionsProvider>
      </LabControllerStoreProvider>
    )
  },
}
