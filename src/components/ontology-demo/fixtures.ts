import type { OntologyObject } from './types'

export const objects: OntologyObject[] = [
  { id: 'customer', name: '客户', code: 'Customer', description: '企业客户与个人客户的统一主体', properties: 12, relations: 5, status: '已发布' },
  { id: 'contact', name: '联系人', code: 'Contact', description: '客户组织中的关键联系人', properties: 9, relations: 3, status: '已发布' },
  { id: 'opportunity', name: '商机', code: 'Opportunity', description: '从线索到成交的销售机会', properties: 16, relations: 6, status: '已发布' },
  { id: 'contract', name: '合同', code: 'Contract', description: '客户签署的商业合同', properties: 14, relations: 4, status: '草稿' },
]

export const objectSets = [
  { id: 'customer-ops', name: '客户经营', description: '围绕客户全生命周期组织的核心业务对象', objectCount: 4, relationCount: 8 },
  { id: 'product-service', name: '产品与服务', description: '产品、服务和交付资源的统一定义', objectCount: 6, relationCount: 10 },
  { id: 'organization', name: '组织与人员', description: '企业组织架构与人员身份信息', objectCount: 5, relationCount: 7 },
]

export const properties = [
  ['客户名称', 'name', '文本', '是'],
  ['客户编号', 'customer_code', '文本', '是'],
  ['客户等级', 'customer_tier', '枚举', '否'],
  ['所属行业', 'industry', '枚举', '否'],
  ['创建时间', 'created_at', '日期时间', '是'],
]

export const relations = [
  ['拥有联系人', '客户 → 联系人', '一对多'],
  ['产生商机', '客户 → 商机', '一对多'],
  ['签署合同', '客户 → 合同', '一对多'],
]

export const graphObjects = [
  { id: 'brief', name: '会前简报卡', code: 'briefing_card', x: 50, y: 20, properties: 13, actions: 21, rules: 4 },
  { id: 'interaction', name: '互动记录', code: 'interaction_record', x: 67, y: 42, properties: 12, actions: 5, rules: 2 },
  { id: 'company', name: '客户公司', code: 'customer_company', x: 35, y: 63, properties: 13, actions: 4, rules: 1 },
  { id: 'contact', name: '高管联系人', code: 'contact_person', x: 30, y: 85, properties: 12, actions: 0, rules: 0 },
  { id: 'todo', name: '待办事项', code: 'todo_item', x: 73, y: 85, properties: 9, actions: 0, rules: 0 },
]

export const graphEdges = [
  { from: 'brief', to: 'interaction', label: '收获自' },
  { from: 'brief', to: 'company', label: '针对公司' },
  { from: 'interaction', to: 'company', label: '归属公司' },
  { from: 'company', to: 'contact', label: '拥有高管' },
  { from: 'interaction', to: 'todo', label: '衍生待办' },
]

export const actions = [
  ['创建客户跟进任务', 'create_follow_up', '客户', '已发布'],
  ['更新客户等级', 'update_customer_tier', '客户', '已发布'],
  ['生成会前简报', 'generate_briefing', '会前简报卡', '草稿'],
]

export const rules = [
  ['高价值客户识别', 'high_value_customer', '客户', '已发布'],
  ['逾期未跟进提醒', 'follow_up_reminder', '客户', '已发布'],
  ['互动后生成待办', 'interaction_to_todo', '互动记录', '草稿'],
]
