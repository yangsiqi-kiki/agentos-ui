export type ComponentMetaEntry = {
  id: string
  /** 英文名 */
  name: string
  /** 中文名 */
  nameZh: string
  /** 中文描述 */
  description: string
  /** atoms | molecules | organisms | layouts | pages */
  category: string
  /** CSV 分组，如 Control DNA */
  group: string
  figmaUrl?: string
  /** 组件常用 CSS 变量（展示用） */
  tokens?: {
    color?: string[]
    font?: string[]
  }
}

/**
 * 仅收录当前包内已有 story 的组件。
 * 描述来自 Design-system-components CSV，已中文化。
 */
export const componentMetaMap: Record<string, ComponentMetaEntry> = {
  button: {
    id: 'button',
    name: 'Button',
    nameZh: '按钮',
    description:
      '触发操作或导航，覆盖主次交互场景；支持 rectangle / rounded 两种外形。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=31-39021',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-brand-error-color-error',
        '--agentos-neutral-text-color-text',
        '--agentos-neutral-bg-color-bg-base',
      ],
      font: ['--agentos-font-size-base', '--agentos-font-weight-medium'],
    },
  },
  input: {
    id: 'input',
    name: 'Input',
    nameZh: '输入框',
    description: '用于输入和编辑短文本。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=31-12975',
    tokens: {
      color: [
        '--agentos-neutral-border-color-border',
        '--agentos-neutral-text-color-text-placeholder',
        '--agentos-brand-error-color-error',
      ],
      font: ['--agentos-font-size-base'],
    },
  },
  'password-input': {
    id: 'password-input',
    name: 'PasswordInput',
    nameZh: '密码输入框',
    description: '用于输入密码，支持显示/隐藏切换。',
    category: 'atoms',
    group: 'Control DNA',
    tokens: {
      color: [
        '--agentos-neutral-border-color-border',
        '--agentos-neutral-icon-color-icon',
      ],
      font: ['--agentos-font-size-base'],
    },
  },
  'input-number': {
    id: 'input-number',
    name: 'InputNumber',
    nameZh: '数字输入框',
    description: '用于输入、步进与校验数值。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-22',
    tokens: {
      color: [
        '--agentos-neutral-border-color-border',
        '--agentos-brand-primary-color-primary',
      ],
      font: ['--agentos-font-size-base'],
    },
  },
  'input-tag': {
    id: 'input-tag',
    name: 'InputTag',
    nameZh: '标签输入框',
    description: '以可移除标签的形式输入多个值。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-21',
    tokens: {
      color: [
        '--agentos-neutral-fill-color-fill-secondary',
        '--agentos-neutral-border-color-border',
      ],
      font: ['--agentos-font-size-sm'],
    },
  },
  switch: {
    id: 'switch',
    name: 'Switch',
    nameZh: '开关',
    description: '在开/关两种状态之间切换设置。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-23',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-fill-color-fill',
      ],
    },
  },
  radio: {
    id: 'radio',
    name: 'Radio',
    nameZh: '单选框',
    description: '从少量选项中选择唯一一项。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-25',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-border-color-border',
      ],
    },
  },
  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    nameZh: '复选框',
    description: '选择一项或多项独立选项。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-24',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-border-color-border',
      ],
    },
  },
  slider: {
    id: 'slider',
    name: 'Slider',
    nameZh: '滑动输入条',
    description: '通过拖动连续区间调整数值。',
    category: 'atoms',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-16',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-fill-color-fill-secondary',
      ],
    },
  },
  progress: {
    id: 'progress',
    name: 'Progress',
    nameZh: '进度条',
    description: '可视化任务或流程的完成进度。',
    category: 'atoms',
    group: 'Overlay DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-38',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-brand-success-color-success',
        '--agentos-brand-error-color-error',
      ],
      font: ['--agentos-font-size-sm'],
    },
  },
  breadcrumb: {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    nameZh: '面包屑',
    description: '展示当前页面在层级结构中的位置，便于返回上级。',
    category: 'atoms',
    group: 'Navigation DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-45',
    tokens: {
      color: [
        '--agentos-neutral-text-color-text-secondary',
        '--agentos-brand-link-color-link',
      ],
      font: ['--agentos-font-size-sm'],
    },
  },
  avatar: {
    id: 'avatar',
    name: 'Avatar',
    nameZh: '头像',
    description: '以紧凑视觉形式展示用户、团队或实体身份。',
    category: 'atoms',
    group: 'Information DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-52',
    tokens: {
      color: [
        '--agentos-neutral-fill-color-fill-secondary',
        '--agentos-neutral-text-color-text-secondary',
      ],
    },
  },
  tag: {
    id: 'tag',
    name: 'Tag',
    nameZh: '标签',
    description: '以紧凑标记展示分类、状态或关键词。',
    category: 'atoms',
    group: 'Information DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-54',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary-bg',
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-fill-color-fill-secondary',
      ],
      font: ['--agentos-font-size-sm'],
    },
  },
  title: {
    id: 'title',
    name: 'Title',
    nameZh: '标题',
    description: '为章节与页面标题提供结构化标题样式。',
    category: 'atoms',
    group: 'Information DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-55',
    tokens: {
      color: ['--agentos-neutral-text-color-text-heading'],
      font: [
        '--agentos-font-size-xl',
        '--agentos-font-size-2xl',
        '--agentos-font-weight-semibold',
      ],
    },
  },
  divider: {
    id: 'divider',
    name: 'Divider',
    nameZh: '分割线',
    description: '以轻量视觉边界分隔内容区域。',
    category: 'atoms',
    group: 'Layout DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-68',
    tokens: {
      color: ['--agentos-neutral-border-color-border-secondary'],
    },
  },
  select: {
    id: 'select',
    name: 'Select',
    nameZh: '选择器',
    description: '从下拉列表中选择一个或多个选项。',
    category: 'atoms',
    group: 'Selection DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=31-13803',
    tokens: {
      color: [
        '--agentos-neutral-border-color-border',
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-bg-color-bg-elevated',
      ],
      font: ['--agentos-font-size-base'],
    },
  },
  tabs: {
    id: 'tabs',
    name: 'Tabs',
    nameZh: '标签页',
    description: '在同一容器下组织可切换的相关视图。',
    category: 'atoms',
    group: 'Navigation DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-47',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-text-color-text-secondary',
        '--agentos-neutral-border-color-border-secondary',
      ],
      font: ['--agentos-font-size-base', '--agentos-font-weight-medium'],
    },
  },
  pagination: {
    id: 'pagination',
    name: 'Pagination',
    nameZh: '分页',
    description: '在长列表或表格的多页数据间导航。',
    category: 'molecules',
    group: 'Navigation DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-46',
    tokens: {
      color: [
        '--agentos-brand-primary-color-primary',
        '--agentos-neutral-border-color-border',
      ],
      font: ['--agentos-font-size-sm'],
    },
  },
  'form-item': {
    id: 'form-item',
    name: 'FormItem',
    nameZh: '表单项',
    description: '将字段、校验与操作组织为结构化数据录入单元。',
    category: 'molecules',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-27',
    tokens: {
      color: [
        '--agentos-neutral-text-color-text-label',
        '--agentos-brand-error-color-error',
      ],
      font: ['--agentos-font-size-sm', '--agentos-font-size-base'],
    },
  },
  upload: {
    id: 'upload',
    name: 'Upload',
    nameZh: '上传',
    description:
      '选择并展示待上传文件列表，支持按钮 / 拖拽触发与上传中 / 成功 / 失败状态。',
    category: 'molecules',
    group: 'Control DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-30',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-layout',
        '--agentos-neutral-border-color-border',
        '--agentos-brand-primary-color-primary',
        '--agentos-brand-error-color-error',
        '--agentos-brand-success-color-success',
      ],
      font: ['--agentos-font-size-md', '--agentos-font-size-sm'],
    },
  },
  modal: {
    id: 'modal',
    name: 'Modal',
    nameZh: '对话框',
    description: '在阻塞层中展示聚焦内容或操作。',
    category: 'molecules',
    group: 'Overlay DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-33',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-elevated',
        '--agentos-neutral-bg-color-bg-mask',
        '--agentos-neutral-text-color-text-heading',
      ],
      font: ['--agentos-font-size-lg', '--agentos-font-weight-semibold'],
    },
  },
  table: {
    id: 'table',
    name: 'Table',
    nameZh: '表格',
    description: '以行列表格展示结构化数据，并支持丰富交互。',
    category: 'molecules',
    group: 'Selection DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=31-15069',
    tokens: {
      color: [
        '--agentos-neutral-border-color-border-secondary',
        '--agentos-neutral-bg-color-bg-elevated',
        '--agentos-neutral-text-color-text',
      ],
      font: ['--agentos-font-size-sm', '--agentos-font-size-base'],
    },
  },
  card: {
    id: 'card',
    name: 'Card',
    nameZh: '卡片',
    description: '在灵活容器中展示分组内容，可附带操作。',
    category: 'molecules',
    group: 'Information DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-58',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-container',
        '--agentos-neutral-border-color-border-secondary',
      ],
      font: ['--agentos-font-size-base', '--agentos-font-weight-medium'],
    },
  },
  popover: {
    id: 'popover',
    name: 'Popover',
    nameZh: '气泡卡片',
    description: '悬浮展示补充信息或轻量操作，支持 12 种弹出位置与箭头。',
    category: 'molecules',
    group: 'Overlay DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=219-109038',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-elevated',
        '--agentos-neutral-text-color-text-heading',
        '--agentos-neutral-text-color-text-secondary',
      ],
      font: [
        '--agentos-font-size-md',
        '--agentos-font-size-base',
        '--agentos-font-weight-semibold',
      ],
    },
  },
  'dropdown-menu': {
    id: 'dropdown-menu',
    name: 'DropdownMenu',
    nameZh: '下拉菜单',
    description:
      '触发器旁弹出的操作菜单；菜单项对齐 Figma dropdown menu-item，结构沿用 shadcn/Radix DropdownMenu。',
    category: 'molecules',
    group: 'Overlay DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=219-99772',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-container',
        '--agentos-neutral-border-color-border',
        '--agentos-neutral-text-color-text',
        '--agentos-neutral-fill-color-fill-tertiary',
      ],
      font: [
        '--agentos-font-size-md',
        '--agentos-font-leading-18',
        '--agentos-font-weight-normal',
      ],
    },
  },
  popconfirm: {
    id: 'popconfirm',
    name: 'Popconfirm',
    nameZh: '确认气泡',
    description: '由 Popover 衍生的二次确认气泡，含警告图标与取消/确认操作。',
    category: 'molecules',
    group: 'Feedback',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=219-110062',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-elevated',
        '--agentos-brand-warning-color-warning',
        '--agentos-neutral-text-color-text-description',
      ],
      font: [
        '--agentos-font-size-lg',
        '--agentos-font-size-md',
        '--agentos-font-weight-semibold',
      ],
    },
  },
  tree: {
    id: 'tree',
    name: 'Tree',
    nameZh: '树',
    description: '展示可展开的层级数据节点。',
    category: 'molecules',
    group: 'Information DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-65',
    tokens: {
      color: [
        '--agentos-neutral-text-color-text',
        '--agentos-brand-primary-color-primary-bg',
      ],
      font: ['--agentos-font-size-base'],
    },
  },
  'page-header': {
    id: 'page-header',
    name: 'PageHeader',
    nameZh: '页头',
    description: '展示带标题、元信息与辅助操作的页面头部。',
    category: 'organisms',
    group: 'Information DNA',
    figmaUrl:
      'https://www.figma.com/design/B2IdbTIdxejArJ43NIT6EM/AgentOS-Design-System-v1.0?node-id=76-57',
    tokens: {
      color: [
        '--agentos-neutral-text-color-text-heading',
        '--agentos-neutral-bg-color-bg-container',
      ],
      font: ['--agentos-font-size-xl', '--agentos-font-weight-semibold'],
    },
  },
  'workspace-tabs-bar': {
    id: 'workspace-tabs-bar',
    name: 'WorkspaceTabsBar',
    nameZh: '工作区标签栏',
    description: '在工作区内切换多个标签页视图。',
    category: 'organisms',
    group: 'Navigation DNA',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-container',
        '--agentos-brand-primary-color-primary',
      ],
      font: ['--agentos-font-size-sm'],
    },
  },
  'layout-header-container': {
    id: 'layout-header-container',
    name: 'LayoutHeaderContainer',
    nameZh: '顶栏容器布局',
    description: '上下结构：顶部 header 与下方 container，不承载业务内容。',
    category: 'layouts',
    group: 'Layout DNA',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-base',
        '--agentos-neutral-bg-color-bg-container',
        '--agentos-neutral-border-color-split',
      ],
      font: ['--agentos-font-size-base'],
    },
  },
  'knowledge-base-layout': {
    id: 'knowledge-base-layout',
    name: 'KnowledgeBaseLayout',
    nameZh: '知识库布局',
    description: '知识库页面共享外壳：顶栏、CUI 侧栏、工作区标签栏与面包屑。',
    category: 'layouts',
    group: 'Layout DNA',
    figmaUrl:
      'https://www.figma.com/design/0Z5Qyni5oNNVq8RCSP0K9T/Agent-OS%E8%AE%BE%E8%AE%A1%E7%A8%BF-v1.0?node-id=543-151503',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-base',
        '--agentos-neutral-bg-color-bg-elevated',
        '--agentos-neutral-border-color-split',
      ],
    },
  },
  'knowledge-base-detail-shell': {
    id: 'knowledge-base-detail-shell',
    name: 'KnowledgeBaseDetailShell',
    nameZh: '知识库详情壳层',
    description: '标题行与原始内容 / 处理结果 / 知识检索页签壳层。',
    category: 'organisms',
    group: 'Pattern',
    figmaUrl:
      'https://www.figma.com/design/0Z5Qyni5oNNVq8RCSP0K9T/Agent-OS%E8%AE%BE%E8%AE%A1%E7%A8%BF-v1.0?node-id=161-74150',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-container',
        '--agentos-brand-primary-color-primary',
      ],
    },
  },
  'knowledge-original-content-view': {
    id: 'knowledge-original-content-view',
    name: 'KnowledgeOriginalContentView',
    nameZh: '原始内容视图',
    description: 'Files 树 + 数据表格 + 分页的原始内容页签主体。',
    category: 'organisms',
    group: 'Pattern',
    figmaUrl:
      'https://www.figma.com/design/0Z5Qyni5oNNVq8RCSP0K9T/Agent-OS%E8%AE%BE%E8%AE%A1%E7%A8%BF-v1.0?node-id=161-74150',
    tokens: {
      color: [
        '--agentos-neutral-border-color-border',
        '--agentos-neutral-bg-color-bg-container',
      ],
    },
  },
  'knowledge-processing-result-view': {
    id: 'knowledge-processing-result-view',
    name: 'KnowledgeProcessingResultView',
    nameZh: '处理结果视图',
    description: '语义向量卡片网格与结构树详情两种处理结果模式。',
    category: 'organisms',
    group: 'Pattern',
    figmaUrl:
      'https://www.figma.com/design/0Z5Qyni5oNNVq8RCSP0K9T/Agent-OS%E8%AE%BE%E8%AE%A1%E7%A8%BF-v1.0?node-id=1-4044',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-container',
        '--agentos-brand-primary-color-primary',
      ],
    },
  },
  'knowledge-retrieval-view': {
    id: 'knowledge-retrieval-view',
    name: 'KnowledgeRetrievalView',
    nameZh: '知识检索视图',
    description: '检索配置面板与空态 / 结果 / 详情三种检索状态。',
    category: 'organisms',
    group: 'Pattern',
    figmaUrl:
      'https://www.figma.com/design/0Z5Qyni5oNNVq8RCSP0K9T/Agent-OS%E8%AE%BE%E8%AE%A1%E7%A8%BF-v1.0?node-id=1-4168',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-elevated',
        '--agentos-neutral-border-color-border',
      ],
    },
  },
  'knowledge-retrieval-page': {
    id: 'knowledge-retrieval-page',
    name: 'KnowledgeRetrievalPage',
    nameZh: '知识检索页',
    description: '知识库检索场景的完整页面组合示例。',
    category: 'pages',
    group: 'Pattern',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-layout',
        '--agentos-neutral-bg-color-bg-container',
      ],
    },
  },
  'knowledge-base-list-page': {
    id: 'knowledge-base-list-page',
    name: 'KnowledgeBaseListPage',
    nameZh: '全部知识库页',
    description: '知识库列表场景的完整页面组合示例，展示文档卡片网格与筛选。',
    category: 'pages',
    group: 'Pattern',
    figmaUrl:
      'https://www.figma.com/design/0Z5Qyni5oNNVq8RCSP0K9T/Agent-OS%E8%AE%BE%E8%AE%A1%E7%A8%BF-v1.0?node-id=543-151503',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-base',
        '--agentos-neutral-bg-color-bg-container',
        '--agentos-neutral-bg-color-bg-elevated',
        '--agentos-neutral-border-color-border',
      ],
    },
  },
  'knowledge-base-detail-page': {
    id: 'knowledge-base-detail-page',
    name: 'KnowledgeBaseDetailPage',
    nameZh: '知识库详情页',
    description: '组合知识库布局与详情壳层，覆盖原始内容 / 处理结果 / 知识检索状态。',
    category: 'pages',
    group: 'Pattern',
    figmaUrl:
      'https://www.figma.com/design/0Z5Qyni5oNNVq8RCSP0K9T/Agent-OS%E8%AE%BE%E8%AE%A1%E7%A8%BF-v1.0?node-id=161-74150',
    tokens: {
      color: [
        '--agentos-neutral-bg-color-bg-base',
        '--agentos-neutral-bg-color-bg-container',
      ],
    },
  },
  'scenario-switcher': {
    id: 'scenario-switcher',
    name: 'ScenarioSwitcher',
    nameZh: '场景切换器',
    description: 'Chat Lab 场景切换下拉：SLP / 应用 / 业务场景三级入口；后台任务进行中的场景（lockRefs）显示锁定态并禁用。',
    category: 'pages',
    group: 'Space Chat Lab',
    tokens: {
      color: [
        '--ds-brand-black-1',
        '--ds-brand-3',
        '--ds-warning-6',
        '--ds-warning-1',
        '--ds-gray-2',
        '--ds-gray-9',
      ],
      font: ['--ds-font-size-200', '--ds-font-size-300'],
    },
  },
  'background-jobs-bar': {
    id: 'background-jobs-bar',
    name: 'BackgroundJobsBar',
    nameZh: '后台任务观测条',
    description: 'Composer 上方的会话后台任务观测条：折叠计数、状态 badge、取消 / 知道了；产品 final 边沿触发消息刷新。',
    category: 'pages',
    group: 'Space Chat Lab',
    tokens: {
      color: [
        '--ds-brand-black-1',
        '--ds-success-6',
        '--ds-success-1',
        '--ds-warning-6',
        '--ds-warning-1',
        '--ds-gray-8',
      ],
      font: ['--ds-font-size-200', '--ds-font-size-300'],
    },
  },
}

export function getComponentMeta(id: string): ComponentMetaEntry | undefined {
  return componentMetaMap[id]
}
