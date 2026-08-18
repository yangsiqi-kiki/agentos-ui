import skillRaw from '../../../../../../.agents/skills/component-creator/SKILL.md?raw'

export const SKILL_SOURCE = skillRaw

const descriptionMatch = skillRaw.match(/^description:\s*(.+)$/m)

export const SKILL_DESCRIPTION =
  descriptionMatch?.[1]?.trim() ??
  '在任意 React/Next.js 项目中自适应生成 shadcn 风格组件。'

export const SKILL_SAVE_PATH = '.agents/skills/component-creator/SKILL.md'
