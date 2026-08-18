import type { TreeNodeData } from '@agentos/design-system'

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  status: 'complete' | 'streaming'
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
      '我先从「框架协议.md」里抽出验收和付款相关条款，再按风险等级整理。\n\n**验收**\n- 交付后 10 个工作日内完成验收\n- 逾期未书面异议视为验收通过\n\n**付款**\n- 签约付 30%，验收付 60%，质保期满付 10%\n- 逾期付款按日万分之五计滞纳金\n\n需要我继续对照你们内部模板标出差异吗？',
    status: 'complete',
  },
]

export const mockReplyChunks = [
  '已对照内部模板。',
  '主要差异在验收时限：模板是 5 个工作日，协议写成了 10 个工作日。',
  '付款节奏一致，但滞纳金条款模板里没有，建议法务确认是否保留。',
]

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
  { value: 'new-task', label: '新任务' },
]

export const selectConversationTitle = '选择对话'
export const cancelLabel = '取消'
export const deleteLabel = '删除'
export const closeLabel = '关闭'
export const deleteConfirmTitle = '是否删除该条消息'
export const deleteConfirmDescription =
  '删除后，聊天记录不可恢复，对话内的文件也将被彻底删除'
