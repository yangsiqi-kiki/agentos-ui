# AgentOS Design System

> **对外设计契约**：Figma Variables ↔ 前端命名对照。生成时间：2026-08-08T08:13:48.806Z · 版本：0.1.0

## 文档元信息

| 项 | 值 |
|----|-----|
| 包名 | `@agentos/design-system` |
| 当前 mode | light（`:root`）；dark 结构已预留 |
| 来源文件 | `agentos-light.tokens.json`、`font.json`、`mode-1.tokens.json` |
| 完整附录 | [docs/token-reference.md](./docs/token-reference.md) |

## 阅读指南

本文档面向 **设计方 / 设计工程 / 前端查阅**，可脱离仓库单独阅读。

对照表三列含义：

| 列 | 说明 |
|----|------|
| **Figma 路径** | Figma Variables 层级路径，设计师在文件中应使用的变量名 |
| **CSS 变量** | 前端运行时变量，格式 `--agentos-*` |
| **Tailwind** | 推荐 class 前缀；颜色同时提供 `text-` / `bg-` / `border-` 示例 |

设计师在 Figma 中绑定变量时，请使用 **Figma 路径**列的名称；前端实现时映射到 **CSS 变量**或 **Tailwind**列。

## 命名空间约定

- CSS 变量：`--agentos-*`
- Tailwind 颜色：`text-agentos-*`、`bg-agentos-*`、`border-agentos-*`
- Tailwind 字体：`font-agentos`、`text-agentos-*`（字号）
- Tailwind 圆角/间距：`rounded-agentos-*`、`agentos-margin-*`、`agentos-padding-*` 等
- 与历史 `--ds-*` 体系隔离，可并行共存

## 暗色模式

- 当前仅填充 **light** 值
- `.dark {}` 已预留；待 `AgentOS Dark.tokens.json` 到位后增量生成
- 组件与样式应使用语义变量名，dark 到位时无需改组件代码

## 语义分组导读

顶层分组（来自 Figma token 结构）：

- **MaskBase**
- **MaskSenior**
- **Neutral**
- **Base**
- **Brand**

| 分组 | 典型用途 |
|------|----------|
| Neutral | 文本、背景、边框、填充等中性语义 |
| Brand | 品牌主色、链接、信息、成功、警告、错误 |
| Base | 色阶原语（如 Blue/gray 50–900），供语义色引用 |
| MaskBase / MaskSenior | 遮罩透明度 |

## Token 统计

| 类别 | 数量 |
|------|------|
| 颜色 | 445 |
| 字号 | 10 |
| 字重 | 9 |
| 行高 | 14 |
| 字距 | 6 |
| 圆角 | 10 |
| 间距(margin/padding/gap) | 20 |
| 控件高度 | 3 |
| 图标尺寸 | 4 |

## 常用语义 Token 速查

| figma | css | text | bg | border | light |
| --- | --- | --- | --- | --- | --- |
| MaskBase | --agentos-mask-base | text-agentos-mask-base | bg-agentos-mask-base | border-agentos-mask-base | rgba(0 0 0 / 0.1599999964237213) |
| MaskSenior | --agentos-mask-senior | text-agentos-mask-senior | bg-agentos-mask-senior | border-agentos-mask-senior | rgba(0 0 0 / 0.36000001430511475) |
| Neutral.Text.colorText | --agentos-neutral-text-color-text | text-agentos-neutral-text-color-text | bg-agentos-neutral-text-color-text | border-agentos-neutral-text-color-text | rgba(0 0 0 / 0.8799999952316284) |
| Neutral.Text.colorTextSecondary | --agentos-neutral-text-color-text-secondary | text-agentos-neutral-text-color-text-secondary | bg-agentos-neutral-text-color-text-secondary | border-agentos-neutral-text-color-text-secondary | rgba(0 0 0 / 0.6499999761581421) |
| Neutral.Text.colorTextTertiary | --agentos-neutral-text-color-text-tertiary | text-agentos-neutral-text-color-text-tertiary | bg-agentos-neutral-text-color-text-tertiary | border-agentos-neutral-text-color-text-tertiary | rgba(0 0 0 / 0.44999998807907104) |
| Neutral.Text.colorTextQuaternary | --agentos-neutral-text-color-text-quaternary | text-agentos-neutral-text-color-text-quaternary | bg-agentos-neutral-text-color-text-quaternary | border-agentos-neutral-text-color-text-quaternary | rgba(0 0 0 / 0.25) |
| Neutral.Text.colorTextHeading | --agentos-neutral-text-color-text-heading | text-agentos-neutral-text-color-text-heading | bg-agentos-neutral-text-color-text-heading | border-agentos-neutral-text-color-text-heading | var(--agentos-neutral-text-color-text) |
| Neutral.Text.colorTextLabel | --agentos-neutral-text-color-text-label | text-agentos-neutral-text-color-text-label | bg-agentos-neutral-text-color-text-label | border-agentos-neutral-text-color-text-label | var(--agentos-neutral-text-color-text-secondary) |
| Neutral.Text.colorTextDescription | --agentos-neutral-text-color-text-description | text-agentos-neutral-text-color-text-description | bg-agentos-neutral-text-color-text-description | border-agentos-neutral-text-color-text-description | var(--agentos-neutral-text-color-text-tertiary) |
| Neutral.Text.colorTextDisabled | --agentos-neutral-text-color-text-disabled | text-agentos-neutral-text-color-text-disabled | bg-agentos-neutral-text-color-text-disabled | border-agentos-neutral-text-color-text-disabled | var(--agentos-neutral-text-color-text-quaternary) |
| Neutral.Text.colorTextPlaceholder | --agentos-neutral-text-color-text-placeholder | text-agentos-neutral-text-color-text-placeholder | bg-agentos-neutral-text-color-text-placeholder | border-agentos-neutral-text-color-text-placeholder | var(--agentos-neutral-text-color-text-quaternary) |
| Neutral.Text.colorTextLightSolid | --agentos-neutral-text-color-text-light-solid | text-agentos-neutral-text-color-text-light-solid | bg-agentos-neutral-text-color-text-light-solid | border-agentos-neutral-text-color-text-light-solid | rgb(255 255 255) |
| Neutral.Bg.colorBgLayout | --agentos-neutral-bg-color-bg-layout | text-agentos-neutral-bg-color-bg-layout | bg-agentos-neutral-bg-color-bg-layout | border-agentos-neutral-bg-color-bg-layout | rgb(247 248 250) |
| Neutral.Bg.colorBgContainer | --agentos-neutral-bg-color-bg-container | text-agentos-neutral-bg-color-bg-container | bg-agentos-neutral-bg-color-bg-container | border-agentos-neutral-bg-color-bg-container | var(--agentos-neutral-bg-color-bg-base) |
| Neutral.Bg.colorBgElevated | --agentos-neutral-bg-color-bg-elevated | text-agentos-neutral-bg-color-bg-elevated | bg-agentos-neutral-bg-color-bg-elevated | border-agentos-neutral-bg-color-bg-elevated | rgb(250 250 250) |
| Neutral.Bg.colorBgMask | --agentos-neutral-bg-color-bg-mask | text-agentos-neutral-bg-color-bg-mask | bg-agentos-neutral-bg-color-bg-mask | border-agentos-neutral-bg-color-bg-mask | rgba(0 0 0 / 0.44999998807907104) |
| Neutral.Bg.colorBgBase | --agentos-neutral-bg-color-bg-base | text-agentos-neutral-bg-color-bg-base | bg-agentos-neutral-bg-color-bg-base | border-agentos-neutral-bg-color-bg-base | rgb(255 255 255) |
| Neutral.Border.colorBorder | --agentos-neutral-border-color-border | text-agentos-neutral-border-color-border | bg-agentos-neutral-border-color-border | border-agentos-neutral-border-color-border | rgb(217 217 217) |
| Neutral.Border.colorBorderSecondary | --agentos-neutral-border-color-border-secondary | text-agentos-neutral-border-color-border-secondary | bg-agentos-neutral-border-color-border-secondary | border-agentos-neutral-border-color-border-secondary | rgb(240 240 240) |
| Neutral.Fill.colorFill | --agentos-neutral-fill-color-fill | text-agentos-neutral-fill-color-fill | bg-agentos-neutral-fill-color-fill | border-agentos-neutral-fill-color-fill | rgba(0 0 0 / 0.15000000596046448) |
| Neutral.Fill.colorFillSecondary | --agentos-neutral-fill-color-fill-secondary | text-agentos-neutral-fill-color-fill-secondary | bg-agentos-neutral-fill-color-fill-secondary | border-agentos-neutral-fill-color-fill-secondary | rgba(0 0 0 / 0.05999999865889549) |
| Neutral.Fill.colorFillTertiary | --agentos-neutral-fill-color-fill-tertiary | text-agentos-neutral-fill-color-fill-tertiary | bg-agentos-neutral-fill-color-fill-tertiary | border-agentos-neutral-fill-color-fill-tertiary | rgba(0 0 0 / 0.029999999329447746) |
| Neutral.Icon.colorIcon | --agentos-neutral-icon-color-icon | text-agentos-neutral-icon-color-icon | bg-agentos-neutral-icon-color-icon | border-agentos-neutral-icon-color-icon | var(--agentos-neutral-text-color-text-secondary) |
| Neutral.Icon.colorIconHover | --agentos-neutral-icon-color-icon-hover | text-agentos-neutral-icon-color-icon-hover | bg-agentos-neutral-icon-color-icon-hover | border-agentos-neutral-icon-color-icon-hover | var(--agentos-neutral-text-color-text) |
| Brand.Primary.colorPrimary | --agentos-brand-primary-color-primary | text-agentos-brand-primary-color-primary | bg-agentos-brand-primary-color-primary | border-agentos-brand-primary-color-primary | var(--agentos-base-blue-500) |
| Brand.Primary.colorPrimaryHover | --agentos-brand-primary-color-primary-hover | text-agentos-brand-primary-color-primary-hover | bg-agentos-brand-primary-color-primary-hover | border-agentos-brand-primary-color-primary-hover | var(--agentos-base-blue-600) |
| Brand.Primary.colorPrimaryActive | --agentos-brand-primary-color-primary-active | text-agentos-brand-primary-color-primary-active | bg-agentos-brand-primary-color-primary-active | border-agentos-brand-primary-color-primary-active | var(--agentos-base-blue-700) |
| Brand.Primary.colorPrimaryBg | --agentos-brand-primary-color-primary-bg | text-agentos-brand-primary-color-primary-bg | bg-agentos-brand-primary-color-primary-bg | border-agentos-brand-primary-color-primary-bg | var(--agentos-base-blue-50) |
| Brand.Primary.colorPrimaryBorder | --agentos-brand-primary-color-primary-border | text-agentos-brand-primary-color-primary-border | bg-agentos-brand-primary-color-primary-border | border-agentos-brand-primary-color-primary-border | var(--agentos-base-blue-200) |
| Brand.Error.colorError | --agentos-brand-error-color-error | text-agentos-brand-error-color-error | bg-agentos-brand-error-color-error | border-agentos-brand-error-color-error | var(--agentos-base-red-500) |
| Brand.Error.colorErrorHover | --agentos-brand-error-color-error-hover | text-agentos-brand-error-color-error-hover | bg-agentos-brand-error-color-error-hover | border-agentos-brand-error-color-error-hover | var(--agentos-base-red-600) |
| Brand.Error.colorErrorActive | --agentos-brand-error-color-error-active | text-agentos-brand-error-color-error-active | bg-agentos-brand-error-color-error-active | border-agentos-brand-error-color-error-active | var(--agentos-base-red-700) |
| Brand.Error.colorErrorBg | --agentos-brand-error-color-error-bg | text-agentos-brand-error-color-error-bg | bg-agentos-brand-error-color-error-bg | border-agentos-brand-error-color-error-bg | var(--agentos-base-red-50) |
| Brand.Success.colorSuccess | --agentos-brand-success-color-success | text-agentos-brand-success-color-success | bg-agentos-brand-success-color-success | border-agentos-brand-success-color-success | var(--agentos-base-green-500) |
| Brand.Success.colorSuccessHover | --agentos-brand-success-color-success-hover | text-agentos-brand-success-color-success-hover | bg-agentos-brand-success-color-success-hover | border-agentos-brand-success-color-success-hover | var(--agentos-base-green-400) |
| Brand.Success.colorSuccessBg | --agentos-brand-success-color-success-bg | text-agentos-brand-success-color-success-bg | bg-agentos-brand-success-color-success-bg | border-agentos-brand-success-color-success-bg | var(--agentos-base-green-50) |
| Brand.Warning.colorWarning | --agentos-brand-warning-color-warning | text-agentos-brand-warning-color-warning | bg-agentos-brand-warning-color-warning | border-agentos-brand-warning-color-warning | var(--agentos-base-gold-500) |
| Brand.Warning.colorWarningHover | --agentos-brand-warning-color-warning-hover | text-agentos-brand-warning-color-warning-hover | bg-agentos-brand-warning-color-warning-hover | border-agentos-brand-warning-color-warning-hover | var(--agentos-base-gold-400) |
| Brand.Warning.colorWarningBg | --agentos-brand-warning-color-warning-bg | text-agentos-brand-warning-color-warning-bg | bg-agentos-brand-warning-color-warning-bg | border-agentos-brand-warning-color-warning-bg | var(--agentos-base-gold-50) |
| Brand.Link.colorLink | --agentos-brand-link-color-link | text-agentos-brand-link-color-link | bg-agentos-brand-link-color-link | border-agentos-brand-link-color-link | var(--agentos-brand-primary-color-primary) |
| Brand.Link.colorLinkHover | --agentos-brand-link-color-link-hover | text-agentos-brand-link-color-link-hover | bg-agentos-brand-link-color-link-hover | border-agentos-brand-link-color-link-hover | var(--agentos-brand-primary-color-primary-hover) |

## 字体与排版阶梯

| figma | css | tailwind | light |
| --- | --- | --- | --- |
| family.cn | --agentos-font-family-cn | font-agentos-cn | PingFang SC |
| family.en | --agentos-font-family-en | font-agentos-en | SF Pro |
| size.xs | --agentos-font-size-xs | text-agentos-xs | 10px |
| size.sm | --agentos-font-size-sm | text-agentos-sm | 12px |
| size.md | --agentos-font-size-md | text-agentos-md | 13px |
| size.base | --agentos-font-size-base | text-agentos-base | 14px |
| size.lg | --agentos-font-size-lg | text-agentos-lg | 16px |
| size.xl | --agentos-font-size-xl | text-agentos-xl | 20px |
| size.2xl | --agentos-font-size-2xl | text-agentos-2xl | 24px |
| size.4xl | --agentos-font-size-4xl | text-agentos-4xl | 36px |
| size.5xl | --agentos-font-size-5xl | text-agentos-5xl | 48px |
| size.6xl | --agentos-font-size-6xl | text-agentos-6xl | 56px |
| weight.thin | --agentos-font-weight-thin | font-agentos-thin | 100 |
| weight.extralight | --agentos-font-weight-extralight | font-agentos-extralight | 200 |
| weight.light | --agentos-font-weight-light | font-agentos-light | 300 |
| weight.normal | --agentos-font-weight-normal | font-agentos-normal | 400 |
| weight.medium | --agentos-font-weight-medium | font-agentos-medium | 500 |
| weight.semibold | --agentos-font-weight-semibold | font-agentos-semibold | 600 |
| weight.bold | --agentos-font-weight-bold | font-agentos-bold | 700 |
| weight.extrabold | --agentos-font-weight-extrabold | font-agentos-extrabold | 800 |
| weight.black | --agentos-font-weight-black | font-agentos-black | 900 |
| leading.14 | --agentos-font-leading-14 | leading-agentos-14 | 14px |
| leading.18 | --agentos-font-leading-18 | leading-agentos-18 | 18px |
| leading.20 | --agentos-font-leading-20 | leading-agentos-20 | 20px |
| leading.22 | --agentos-font-leading-22 | leading-agentos-22 | 22px |
| leading.24 | --agentos-font-leading-24 | leading-agentos-24 | 24px |
| leading.28 | --agentos-font-leading-28 | leading-agentos-28 | 28px |
| leading.32 | --agentos-font-leading-32 | leading-agentos-32 | 32px |
| leading.36 | --agentos-font-leading-36 | leading-agentos-36 | 36px |
| leading.40 | --agentos-font-leading-40 | leading-agentos-40 | 40px |
| leading.48 | --agentos-font-leading-48 | leading-agentos-48 | 48px |
| leading.56 | --agentos-font-leading-56 | leading-agentos-56 | 56px |
| leading.64 | --agentos-font-leading-64 | leading-agentos-64 | 64px |
| leading.72 | --agentos-font-leading-72 | leading-agentos-72 | 72px |
| leading.96 | --agentos-font-leading-96 | leading-agentos-96 | 96px |
| tracking.tighter | --agentos-font-tracking-tighter | tracking-agentos-tighter | -0.800000011920929px |
| tracking.tight | --agentos-font-tracking-tight | tracking-agentos-tight | -0.4000000059604645px |
| tracking.normal | --agentos-font-tracking-normal | tracking-agentos-normal | 0px |
| tracking.wide | --agentos-font-tracking-wide | tracking-agentos-wide | 0.4000000059604645px |
| tracking.wider | --agentos-font-tracking-wider | tracking-agentos-wider | 0.800000011920929px |
| tracking.widest | --agentos-font-tracking-widest | tracking-agentos-widest | 1.600000023841858px |

## 布局与尺寸 Token

| figma | css | tailwind | light |
| --- | --- | --- | --- |
| radius.rounded-none0 | --agentos-radius-rounded-none0 | rounded-agentos-rounded-none0 | 0px |
| radius.rounded-xs2 | --agentos-radius-rounded-xs2 | rounded-agentos-rounded-xs2 | 2px |
| radius.rounded-sm4 | --agentos-radius-rounded-sm4 | rounded-agentos-rounded-sm4 | 4px |
| radius.rounded-md6 | --agentos-radius-rounded-md6 | rounded-agentos-rounded-md6 | 6px |
| radius.rounded-lg8 | --agentos-radius-rounded-lg8 | rounded-agentos-rounded-lg8 | 8px |
| radius.rounded-xl12 | --agentos-radius-rounded-xl12 | rounded-agentos-rounded-xl12 | 12px |
| radius.rounded2-xl16 | --agentos-radius-rounded2-xl16 | rounded-agentos-rounded2-xl16 | 16px |
| radius.rounded3-xl24 | --agentos-radius-rounded3-xl24 | rounded-agentos-rounded3-xl24 | 24px |
| radius.rounded4-xl32 | --agentos-radius-rounded4-xl32 | rounded-agentos-rounded4-xl32 | 32px |
| radius.rounded-full999 | --agentos-radius-rounded-full999 | rounded-agentos-rounded-full999 | 999px |
| spacing.margin-xxs4 | --agentos-spacing-margin-xxs4 | agentos-margin-margin-xxs4 | 4px |
| spacing.margin-xs8 | --agentos-spacing-margin-xs8 | agentos-margin-margin-xs8 | 8px |
| spacing.margin-sm12 | --agentos-spacing-margin-sm12 | agentos-margin-margin-sm12 | 12px |
| spacing.margin16 | --agentos-spacing-margin16 | agentos-margin-margin16 | 16px |
| spacing.margin-md20 | --agentos-spacing-margin-md20 | agentos-margin-margin-md20 | 20px |
| spacing.margin-lg24 | --agentos-spacing-margin-lg24 | agentos-margin-margin-lg24 | 24px |
| spacing.margin-xl32 | --agentos-spacing-margin-xl32 | agentos-margin-margin-xl32 | 32px |
| spacing.margin-xxl48 | --agentos-spacing-margin-xxl48 | agentos-margin-margin-xxl48 | 48px |
| spacing.padding-xxs4 | --agentos-spacing-padding-xxs4 | agentos-padding-padding-xxs4 | 4px |
| spacing.padding-xs8 | --agentos-spacing-padding-xs8 | agentos-padding-padding-xs8 | 8px |
| spacing.padding-sm12 | --agentos-spacing-padding-sm12 | agentos-padding-padding-sm12 | 12px |
| spacing.padding16 | --agentos-spacing-padding16 | agentos-padding-padding16 | 16px |
| spacing.padding-md20 | --agentos-spacing-padding-md20 | agentos-padding-padding-md20 | 20px |
| spacing.padding-lg24 | --agentos-spacing-padding-lg24 | agentos-padding-padding-lg24 | 24px |
| spacing.padding-xl32 | --agentos-spacing-padding-xl32 | agentos-padding-padding-xl32 | 32px |
| spacing.padding6 | --agentos-spacing-padding6 | agentos-padding-padding6 | 6px |
| spacing.gap-xxs4 | --agentos-spacing-gap-xxs4 | agentos-gap-gap-xxs4 | 4px |
| spacing.gap-xs8 | --agentos-spacing-gap-xs8 | agentos-gap-gap-xs8 | 8px |
| spacing.gap-sm12 | --agentos-spacing-gap-sm12 | agentos-gap-gap-sm12 | 12px |
| spacing.gap16 | --agentos-spacing-gap16 | agentos-gap-gap16 | 16px |
| control-height.control-height-sm24 | --agentos-control-height-control-height-sm24 | agentos-control-control-height-sm24 | 24px |
| control-height.control-height-md32 | --agentos-control-height-control-height-md32 | agentos-control-control-height-md32 | 32px |
| control-height.control-height-lg40 | --agentos-control-height-control-height-lg40 | agentos-control-control-height-lg40 | 40px |
| icon-size.icon-size-sm12 | --agentos-icon-size-icon-size-sm12 | agentos-icon-icon-size-sm12 | 12px |
| icon-size.icon-size-md16 | --agentos-icon-size-icon-size-md16 | agentos-icon-icon-size-md16 | 16px |
| icon-size.icon-size-lg20 | --agentos-icon-size-icon-size-lg20 | agentos-icon-icon-size-lg20 | 20px |
| icon-size.icon-size-xl24 | --agentos-icon-size-icon-size-xl24 | agentos-icon-icon-size-xl24 | 24px |

## 组件分层约定

设计组件与前端组件均按以下层级组织：

| 层级 | 说明 | 示例 |
|------|------|------|
| atoms | 最小可复用单元 | Button、Input、Badge |
| molecules | 原子组合 | SearchField、FormItem |
| organisms | 独立功能区块 | Header、DataTable |
| layouts | 页面骨架 | LayoutHeaderContainer、SidebarLayout |
| pages | 完整页面 | LoginPage、DashboardPage |

前端实现规范：forwardRef + 显式 props；`cva` 管理 variant；禁止硬编码色值。

## 前端消费说明

前端通过 `@agentos/design-system` 包消费本设计契约：

- 样式基座：`@agentos/design-system/styles/tokens.css`
- Tailwind preset：`@agentos/design-system/tailwind-preset`
- React 组件：`import { Button } from '@agentos/design-system'`

仓库内接入细节见包内 README（内部文档）。

## 完整 Token 附录

颜色等完整对照（共 445 条颜色）见 **[docs/token-reference.md](./docs/token-reference.md)**。
