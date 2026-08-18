import type { SpaceScenarioApplication } from '@/features/spaces/types'

/**
 * ScenarioSwitcher story 的样例数据与文案。
 * `.anti-pattern.` 文件名使 no-chinese 检查豁免——这是样例业务数据与
 * storybook 文档文案，不属于应用 UI 文案；story 文件本身保持零中文。
 */
export const APPLICATIONS: SpaceScenarioApplication[] = [
  {
    id: 'app-cs-001',
    name: '智能客服运营中心',
    description: '客服运营智能化改造',
    priority: 'P0',
    scenarios: [
      { id: 'scenario-1', name: '智能工单分派Agent', description: '', priority: 'P0', updatedAt: '2026-08-11T10:00:00.000Z', buildPlanKind: 'running' },
      { id: 'scenario-2', name: '客户情绪感知Agent', description: '', priority: 'P1', updatedAt: '2026-08-10T10:00:00.000Z', buildPlanKind: 'running' },
      { id: 'scenario-3', name: '智能知识检索Agent', description: '', priority: 'P1', updatedAt: '2026-08-09T10:00:00.000Z', buildPlanKind: 'no_plan' },
    ],
  },
  {
    id: 'app-ltc-001',
    name: 'Lead to Close Agent',
    description: '销售到回款端到端应用',
    priority: 'P0',
    scenarios: [
      { id: 'scenario-4', name: 'Voucher Data Extraction Co-pilot', description: '', priority: 'P1', updatedAt: '2026-08-08T10:00:00.000Z', buildPlanKind: 'no_plan' },
      { id: 'scenario-5', name: '合同条款智能比对', description: '', priority: 'P2', updatedAt: '2026-08-07T10:00:00.000Z', buildPlanKind: 'no_plan' },
    ],
  },
]

export const COPY = {
  defaultTitle: 'ScenarioSwitcher — SLP (default)',
  defaultDescription: '无激活场景（value=null），无锁定。点击触发下拉可浏览 SLP / 应用 / 业务场景层级。',
  scenarioSelectedTitle: 'ScenarioSwitcher — Scenario selected',
  scenarioSelectedDescription: '当前激活业务场景（scenario-1），触发按钮展示场景名。',
  applicationSelectedTitle: 'ScenarioSwitcher — Application view mode',
  applicationSelectedDescription: '当前处于应用视图模式（applicationId 已设置），触发按钮展示应用名。',
  lockedTitle: 'ScenarioSwitcher — Locked scenarios (background jobs in progress)',
  lockedDescription:
    'scenario-2 / scenario-4 被后台任务锁定：下拉中显示「进行中」badge、置灰且不可点击（aria-disabled）。这是后台任务锁定场景入口的禁用样式。',
  lockedSelectedTitle: 'ScenarioSwitcher — Selected scenario becomes locked',
  lockedSelectedDescription:
    '当前激活场景（scenario-2）恰好被锁定（进 lab 闸门触发前的瞬时态）：选项禁用 + 选中态并存。',
  loadingTitle: 'ScenarioSwitcher — Loading',
  loadingDescription: '场景列表加载中：触发按钮禁用并显示加载指示。',
  interactiveTitle: 'ScenarioSwitcher — Interactive',
  interactiveDescription:
    '本地状态驱动：切换场景实时更新触发按钮；按钮可切换 scenario-2 的锁定状态（模拟后台任务开始/结束），打开下拉会刷新锁缓存（onDropdownOpen 计数）。',
  lockScenarioLabel: '锁定 scenario-2',
  unlockScenarioLabel: '解锁 scenario-2',
  dropdownOpenCount: (count: number) => `onDropdownOpen 触发次数: ${count}`,
}
