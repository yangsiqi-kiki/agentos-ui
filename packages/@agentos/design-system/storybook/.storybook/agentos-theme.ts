import { create } from '@storybook/theming'

/**
 * Manager / Docs 共用主题。
 * Preview iframe 会加载 tokens.css；Manager 不加载，故色值用 DESIGN.md light 解析 hex。
 * 字体与 token 一致：PingFang SC（中文）/ SF Pro（英文），禁止落到 Storybook 默认 Nunito Sans。
 */
export const agentosTheme = create({
  base: 'light',
  brandTitle: 'AgentOS Design System',
  brandUrl: './',

  colorPrimary: '#1F82EB',
  colorSecondary: '#1F82EB',

  appBg: '#F7F8FA',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#D9D9D9',
  appBorderRadius: 8,

  fontBase:
    '"PingFang SC", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  textColor: 'rgba(0, 0, 0, 0.88)',
  textMutedColor: 'rgba(0, 0, 0, 0.45)',
  textInverseColor: '#FFFFFF',

  barTextColor: 'rgba(0, 0, 0, 0.65)',
  barSelectedColor: '#1F82EB',
  barHoverColor: '#1872D4',
  barBg: '#FFFFFF',

  buttonBg: '#F7F8FA',
  buttonBorder: '#D9D9D9',
  booleanBg: '#F7F8FA',
  booleanSelectedBg: '#1F82EB',

  inputBg: '#FFFFFF',
  inputBorder: '#D9D9D9',
  inputTextColor: 'rgba(0, 0, 0, 0.88)',
  inputBorderRadius: 6,
})
