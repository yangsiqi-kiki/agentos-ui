export type OntologyScreen = 'root' | 'object-set' | 'object'
export type OntologyView = 'graph' | 'structured'
export type ObjectOrigin = 'object-set' | 'object'
export type DirectorySection = 'object-set' | 'object' | 'relation' | 'automation'
export type AutomationSection = 'action' | 'rule'
export type ObjectSection = 'overview' | 'attribute' | 'relation' | 'action' | 'rule'

export interface OntologyObject {
  id: string
  name: string
  code: string
  description: string
  properties: number
  relations: number
  status: '已发布' | '草稿'
}
