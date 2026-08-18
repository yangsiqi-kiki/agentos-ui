import type { TreeNodeData } from '@agentos/design-system'

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  status: 'complete' | 'streaming'
  versions?: string[]
  versionIndex?: number
}

export type StageKey = 'REQUIREMENTS' | 'KNOWLEDGE_MINING' | 'ONTOLOGY_BUILD' | 'INTELLIGENCE_GENERATION'

export const stages: Array<{ key: StageKey; index: string; label: string }> = [
  { key: 'REQUIREMENTS', index: '1', label: '理需求' },
  { key: 'KNOWLEDGE_MINING', index: '2', label: '挖知识' },
  { key: 'ONTOLOGY_BUILD', index: '3', label: '建本体' },
  { key: 'INTELLIGENCE_GENERATION', index: '4', label: '生智能' },
]

export const spaceName = '演示空间'
export const scenarioName = '合同审查助手'
export const productName = '智能空间'
export const productVersion = 'v1.1.0'
export const userName = '杨思绮'
export const userInitial = '杨'
export const agentName = '企业全景洞察专家'
export const agentInitial = 'AI'
export const agentTag = 'Agent'

export const sidebarTabs = [
  { key: 'docs', label: '知识工坊' },
  { key: 'scenes', label: '需求场景' },
  { key: 'overview', label: '待办事项' },
] as const

export type SidebarTabKey = (typeof sidebarTabs)[number]['key']

export const docsTree: TreeNodeData[] = [
  {
    key: 'source',
    title: '源文件',
    children: [
      {
        key: 'contracts',
        title: '合同',
        children: [{ key: 'framework-agreement', title: '框架协议.md', isLeaf: true }],
      },
      {
        key: 'notes',
        title: '纪要',
        children: [{ key: 'interview', title: '需求访谈.md', isLeaf: true }],
      },
    ],
  },
  {
    key: 'output',
    title: '输出',
    children: [
      { key: 'research-notes', title: '调研纪要.md', isLeaf: true },
      { key: 'scenario-list', title: '场景清单.md', isLeaf: true },
    ],
  },
]

export const expandedDocKeys = ['source', 'contracts', 'notes', 'output']
export const selectedDocKey = 'framework-agreement'

export const initialMessages: ChatMessage[] = [
  {
    id: 'user-1',
    role: 'user',
    content: '帮我梳理这份框架协议里的验收和付款条款。',
    status: 'complete',
  },
  {
    id: 'assistant-1',
    role: 'assistant',
    content:
      '我先从「框架协议.md」里抽出验收和付款相关条款，再按风险等级整理。\n\n**验收**\n- 交付后 10 个工作日内完成验收，验收范围覆盖功能、性能和文档\n- 甲方应在收到验收材料后出具书面意见；逾期未书面异议视为验收通过\n- 验收不通过时，乙方需在 5 个工作日内完成整改并重新提验，最多两轮\n- 因甲方资料延误导致无法验收的，工期相应顺延，不视为乙方违约\n\n**付款**\n- 签约付 30%，验收付 60%，质保期满付 10%\n- 付款条件以发票和验收单齐备为前提，账期 15 个工作日\n- 逾期付款按日万分之五计滞纳金，累计上限不超过未付金额的 10%\n- 质保期 12 个月，质保金在期满且无未关闭缺陷后 10 个工作日内支付\n\n**风险提示**\n- 「逾期视为验收通过」对甲方约束较强，建议确认内部是否接受\n- 滞纳金条款需要法务确认是否与模板冲突\n\n需要我继续对照你们内部模板标出差异吗？',
    status: 'complete',
  },
  {
    id: 'user-2',
    role: 'user',
    content: '继续，对照内部模板标出差异。',
    status: 'complete',
  },
  {
    id: 'assistant-2',
    role: 'assistant',
    content:
      '已对照内部模板，差异主要集中在时限、默示验收和滞纳金。\n\n**主要差异**\n- 验收时限：模板是 5 个工作日，协议写成了 10 个工作日，对甲方更宽松\n- 默示验收：协议有「逾期未书面异议视为验收通过」，模板要求必须出具书面结论\n- 整改轮次：协议限定最多两轮复验，模板未设上限，只写「合理期限内整改」\n- 付款节奏一致（30% / 60% / 10%），但滞纳金条款模板里没有\n- 质保期都是 12 个月；协议额外写了质保金支付时限，模板没有\n\n**建议**\n- 若希望加快闭环，把验收时限改回 5 个工作日，并保留书面验收\n- 滞纳金建议法务确认是否保留，以及上限是否改为未付金额的 5%\n- 质保金支付时限可以留下，补齐模板空白\n\n需要我按模板口径直接改一版条款草稿吗？',
    status: 'complete',
  },
]

export const mockReplyChunks = [
  '已对照内部模板，差异主要集中在时限、默示验收和滞纳金。',
  '\n\n**主要差异**\n- 验收时限：模板是 5 个工作日，协议写成了 10 个工作日，对甲方更宽松\n- 默示验收：协议有「逾期未书面异议视为验收通过」，模板要求必须出具书面结论\n- 整改轮次：协议限定最多两轮复验，模板未设上限',
  '\n- 付款节奏一致（30% / 60% / 10%），但滞纳金条款模板里没有\n- 质保期都是 12 个月；协议额外写了质保金支付时限，模板没有',
  '\n\n**建议**\n- 若希望加快闭环，把验收时限改回 5 个工作日，并保留书面验收\n- 滞纳金建议法务确认是否保留，以及上限是否改为未付金额的 5%\n- 需要的话我可以按模板口径直接改一版条款草稿。',
]

const mockRegenerateVariants = [
  '我换一种整理方式，先给结论再展开。\n\n**结论**\n- 验收窗口偏宽，默示通过风险在甲方\n- 付款节奏可沿用，滞纳金建议法务复核\n\n**验收**\n- 交付后 10 个工作日内完成验收；建议改回模板的 5 个工作日\n- 逾期未书面异议视为验收通过，和模板「必须书面结论」冲突\n- 复验最多两轮，模板未设上限\n\n**付款**\n- 签约 30% / 验收 60% / 质保期满 10%，节奏与模板一致\n- 滞纳金按日万分之五，累计上限 10%，模板没有对应条款\n\n需要我按模板口径直接改一版条款草稿吗？',
  '按风险优先级重排了一版，方便直接给业务和法务看。\n\n**高**\n- 默示验收：协议写成逾期视为通过，模板要求书面结论\n- 滞纳金：协议有日万分之五且上限 10%，模板未约定\n\n**中**\n- 验收时限 10 个工作日，模板是 5 个工作日\n- 复验轮次限定两轮，模板只写合理期限\n\n**低**\n- 付款比例一致；质保金支付时限可保留，补齐模板空白\n\n要我按这个优先级出一版修订对照表吗？',
]

export function getMockRegeneratedReply(
  generationCount: number,
  fallback = mockReplyChunks.join(''),
  prompt?: string,
) {
  const body = mockRegenerateVariants[(generationCount - 1) % mockRegenerateVariants.length] ?? fallback
  const direction = prompt?.trim()
  if (!direction) {
    return body
  }
  return `按你的要求「${direction}」重新整理如下。\n\n${body}`
}

export const regenerateLabel = '重新生成'
export const regeneratePromptPlaceholder = '输入更改回复的要求'

export const resourceItems = [
  { key: 'ontology', label: '本体' },
  { key: 'agents', label: '智能体' },
  { key: 'skills', label: '技能' },
  { key: 'mcp', label: 'MCP' },
  { key: 'datasource', label: '数据源' },
  { key: 'knowledge-base', label: '知识库' },
  { key: 'build-planning', label: '打造场景' },
  { key: 'memory-bank', label: '记忆库' },
  { key: 'agent-test', label: '测试' },
] as const

export const composerPlaceholder = '给 Agent 发消息…'
export const emptyThreadHint = '暂无消息'

export type ConversationTab = {
  value: string
  label: string
  closable?: boolean
}

export const conversationTabs: ConversationTab[] = [
  { value: 'task-1', label: '智能体运行问题分析', closable: true },
  { value: 'new-task', label: '新任务', closable: true },
]

export const selectConversationTitle = '选择对话'
export const cancelLabel = '取消'
export const deleteLabel = '删除'
export const closeLabel = '关闭'
export const selectAllLabel = '全选'
export const copyLinkLabel = '创建链接并复制'

export function selectedConversationGroupsLabel(count: number) {
  return `已选 ${count} 组对话`
}
export const linkCopiedToast = '对话链接已复制'
export const deleteConfirmTitle = '是否删除该条消息'
export const deleteConfirmDescription =
  '删除后，聊天记录不可恢复，对话内的文件也将被彻底删除'

export const sharedConversationId = 'demo-conversation'
export const sharedConversationPath = `/share/${sharedConversationId}`
export const sharedConversationTitle = '框架协议验收与付款条款梳理'
export const sharedConversationDate = '2026 年 8 月 18 日'
export const sharedConversationDisclaimer = '内容由 AI 生成，不能完全保障真实'

function withBasePath(pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${pathname}`
}

export function getSharedConversationUrl(origin = window.location.origin) {
  return `${origin}${withBasePath(sharedConversationPath)}`
}

export function isSharedConversationPath(pathname: string) {
  return pathname === sharedConversationPath || pathname === withBasePath(sharedConversationPath)
}
