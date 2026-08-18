import type { BackgroundJobSummary } from '@/features/spaces/background-jobs/types'
import type { LabControllerActions } from '@/features/spaces/components/SpaceChatLabActionsContext'

/**
 * BackgroundJobsBar story 的样例数据与文案。
 * `.anti-pattern.` 文件名使 no-chinese 检查豁免——样例数据与 storybook
 * 文档文案不属于应用 UI 文案；story 文件本身保持零中文。
 */
export const NOW = '2026-08-11T12:00:00.000Z'

export function summary(
  jobId: string,
  operation: string,
  status: string,
  overrides: Partial<BackgroundJobSummary> = {},
): BackgroundJobSummary {
  return {
    jobId,
    operation,
    status,
    lockRefs: [],
    chatSessionId: 'chat-1',
    retryOfJobId: null,
    createdAt: NOW,
    updatedAt: NOW,
    finishedAt: null,
    dismissedAt: null,
    ...overrides,
  }
}

export const MIXED_JOBS: BackgroundJobSummary[] = [
  summary('job-1', 'scenario.merge', 'running'),
  summary('job-2', 'scenario.delete', 'canceling'),
  summary('job-3', 'scenario.reassign', 'succeeded'),
  summary('job-4', 'scenario.promote', 'rollback_failed'),
  summary('job-5', 'scenario.demote', 'rolled_back'),
]

export const COPY = {
  collapsedTitle: 'BackgroundJobsBar — Collapsed',
  collapsedDescription:
    '默认折叠态：仅显示「N 个后台任务」计数，点击展开任务列表。位于 ChatThreadComposerShell 上方。',
  mixedTitle: 'BackgroundJobsBar — Mixed states (expanded)',
  mixedDescription:
    '多任务展开态：running（执行中 + 取消任务）、canceling（取消中，无操作）、succeeded（成功 + 知道了）、rollback_failed（状态未知，无操作）、rolled_back（已回滚 + 知道了）。',
  unknownTitle: 'BackgroundJobsBar — Unknown status',
  unknownDescription:
    '非产品 final 之外的异常终态（rollback_failed / manual_required）：展示「状态未知」badge，无操作按钮；前端会持续轮询并 console.error。',
  finalTitle: 'BackgroundJobsBar — Product final (dismissible)',
  finalDescription:
    '产品 final（succeeded / canceled / rolled_back）：展示对应状态 badge 与「知道了」dismiss 按钮；点击后从列表移除。',
  emptyTitle: 'BackgroundJobsBar — Empty (hidden)',
  emptyDescription:
    '无未 dismiss 任务时观测条不渲染，不干扰 Composer 布局。下方用占位框示意 Composer 区域。',
  composedTitle: 'BackgroundJobsBar — With real composer',
  composedDescription:
    '模拟真实聊天面板（固定高度 flex 列）：Composer 锚定底部，观测条展开时向上挤压消息区、输入框不位移。可验证展开/收起/取消/知道了。',
}

const noop = () => {}
const noopAsync = async () => {}

/** Story 内最小 LabController actions 桩：保持可交互但行为为空，仅满足类型与上下文。 */
export function createMockLabControllerActions(): LabControllerActions {
  return {
    setSelection: noop,
    setTaskDropdownOpen: noop,
    sendMessage: noopAsync,
    refreshMessages: noopAsync,
    submitHitl: noopAsync,
    stopRun: noopAsync,
    setActiveStageKey: noop,
    createTask: async () => ({
      chatLabInited: false,
      tasks: [],
      activeTask: null,
      activeChatSessionId: null,
      activeRuntimeSelection: null,
      selectedScenario: null,
      selectedApplication: null,
      owner: null,
      selectedApplicationId: null,
    }),
    createBackgroundDiagTaskAndSend: async () => ({ taskId: 'story-mock-task' }),
    queueComposerDraft: noop,
    queueComposerReference: () => false,
    setRecommendedDraftText: noop,
    draftAndSend: noop,
    runQuickAction: noop,
    clearPendingComposerDraft: noop,
    clearPendingComposerReference: noop,
    activateTask: noop,
    closeTaskTab: noop,
    addUnreadTaskId: noop,
    removeUnreadTaskId: noop,
    renameTask: noopAsync,
    removeTask: noopAsync,
    setTodoCompleted: noopAsync,
    removeTodo: noopAsync,
    removeScenario: noopAsync,
    setRightPanelFullscreen: noop,
    setBlueprintOpen: noop,
    setActiveSidebarTab: noop,
    refreshScenarios: noop,
    patchRunCardMetadata: async () => ({ ok: true }),
    patchMessageMetadata: async () => ({ ok: true }),
    setScenarioActivation: noopAsync,
    confirmScenarioBriefSelection: noopAsync,
  }
}
