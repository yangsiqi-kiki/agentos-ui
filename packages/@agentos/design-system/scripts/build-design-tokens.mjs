#!/usr/bin/env node
/**
 * 从 Figma token JSON 生成样式、Tailwind/tailwind-merge 配置与设计文档
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = join(__dirname, '..')
const sourceDir = join(pkgRoot, 'src/tokens/source')
const outCss = join(pkgRoot, 'src/tokens/tokens.css')
const outTheme = join(pkgRoot, 'src/tokens/generated-theme.ts')
const outTokenClassKeys = join(pkgRoot, 'src/tokens/generated-token-class-keys.ts')
const outDesign = join(pkgRoot, 'DESIGN.md')
const outTokenRef = join(pkgRoot, 'docs/token-reference.md')
const DESIGN_VERSION = '0.1.0'

/** 对外速查：高频语义 token 的 Figma 路径 */
const QUICK_LOOKUP_KEYS = [
  'MaskBase',
  'MaskSenior',
  'Neutral.Text.colorText',
  'Neutral.Text.colorTextSecondary',
  'Neutral.Text.colorTextTertiary',
  'Neutral.Text.colorTextQuaternary',
  'Neutral.Text.colorTextHeading',
  'Neutral.Text.colorTextLabel',
  'Neutral.Text.colorTextDescription',
  'Neutral.Text.colorTextDisabled',
  'Neutral.Text.colorTextPlaceholder',
  'Neutral.Text.colorTextLightSolid',
  'Neutral.Bg.colorBgLayout',
  'Neutral.Bg.colorBgContainer',
  'Neutral.Bg.colorBgElevated',
  'Neutral.Bg.colorBgMask',
  'Neutral.Bg.colorBgBase',
  'Neutral.Border.colorBorder',
  'Neutral.Border.colorBorderSecondary',
  'Neutral.Fill.colorFill',
  'Neutral.Fill.colorFillSecondary',
  'Neutral.Fill.colorFillTertiary',
  'Neutral.Icon.colorIcon',
  'Neutral.Icon.colorIconHover',
  'Brand.Primary.colorPrimary',
  'Brand.Primary.colorPrimaryHover',
  'Brand.Primary.colorPrimaryActive',
  'Brand.Primary.colorPrimaryBg',
  'Brand.Primary.colorPrimaryBorder',
  'Brand.Error.colorError',
  'Brand.Error.colorErrorHover',
  'Brand.Error.colorErrorActive',
  'Brand.Error.colorErrorBg',
  'Brand.Success.colorSuccess',
  'Brand.Success.colorSuccessHover',
  'Brand.Success.colorSuccessBg',
  'Brand.Warning.colorWarning',
  'Brand.Warning.colorWarningHover',
  'Brand.Warning.colorWarningBg',
  'Brand.Link.colorLink',
  'Brand.Link.colorLinkHover',
]

const colorJson = JSON.parse(readFileSync(join(sourceDir, 'agentos-light.tokens.json'), 'utf8'))
const fontJson = JSON.parse(readFileSync(join(sourceDir, 'font.json'), 'utf8'))
const modeJson = JSON.parse(readFileSync(join(sourceDir, 'mode-1.tokens.json'), 'utf8'))

/** @typedef {{ path: string[], type: string, raw: unknown, description?: string }} TokenEntry */

/** @param {string[]} segments */
function toKebab(segments) {
  return segments
    .join('-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

/** @param {string[]} path */
function toCssVar(path) {
  return `--agentos-${toKebab(path)}`
}

/** @param {string[]} path */
function toFigmaPath(path) {
  return path.join('.')
}

/** @param {string[]} path */
function toPathKey(path) {
  return toFigmaPath(path)
}

/** @param {string[]} path */
function toAgentosTailwindSegment(path) {
  return ['agentos', ...path.map(toTailwindKey)].join('-')
}

/** @param {string[]} path */
function toTailwindTextClass(path) {
  return `text-${toAgentosTailwindSegment(path)}`
}

/** @param {string[]} path */
function toTailwindBgClass(path) {
  return `bg-${toAgentosTailwindSegment(path)}`
}

/** @param {string[]} path */
function toTailwindBorderClass(path) {
  return `border-${toAgentosTailwindSegment(path)}`
}

/** @param {string} cell */
function mdCell(cell) {
  return String(cell).replace(/\|/g, '\\|')
}

/** @param {Array<Record<string, string>>} rows @param {string[]} columns */
function mdTable(rows, columns) {
  const header = `| ${columns.join(' | ')} |`
  const sep = `| ${columns.map(() => '---').join(' | ')} |`
  const body = rows.map((row) => `| ${columns.map((c) => mdCell(row[c] ?? '')).join(' | ')} |`).join('\n')
  return `${header}\n${sep}\n${body}`
}


/** @param {unknown} value */
function isTokenLeaf(value) {
  return (
    typeof value === 'object'
    && value !== null
    && '$type' in value
    && '$value' in value
  )
}

/**
 * @param {Record<string, unknown>} node
 * @param {string[]} prefix
 * @param {TokenEntry[]} out
 */
function walkTokens(node, prefix, out) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue
    const path = [...prefix, key]
    if (isTokenLeaf(value)) {
      out.push({
        path,
        type: value.$type,
        raw: value.$value,
        description: value.$description,
      })
    } else if (typeof value === 'object' && value !== null) {
      walkTokens(value, path, out)
    }
  }
}

/** @param {TokenEntry[]} entries */
function buildColorMaps(entries) {
  const rawByPath = new Map()
  for (const entry of entries) {
    rawByPath.set(toPathKey(entry.path), entry.raw)
  }

  /** @param {unknown} raw @param {Set<string>} seen */
  function resolveRaw(raw, seen = new Set()) {
    if (typeof raw === 'string' && raw.startsWith('{') && raw.endsWith('}')) {
      const ref = raw.slice(1, -1)
      if (seen.has(ref)) return null
      seen.add(ref)
      const target = rawByPath.get(ref)
      if (target === undefined) return null
      return resolveRaw(target, seen)
    }
    if (typeof raw === 'object' && raw !== null && 'components' in raw) {
      const c = raw.components
      const alpha = 'alpha' in raw && typeof raw.alpha === 'number' ? raw.alpha : 1
      const r = Math.round(c[0] * 255)
      const g = Math.round(c[1] * 255)
      const b = Math.round(c[2] * 255)
      if (alpha >= 1) return `rgb(${r} ${g} ${b})`
      return `rgba(${r} ${g} ${b} / ${alpha})`
    }
    if (typeof raw === 'string' && raw.startsWith('{')) {
      const ref = raw.slice(1, -1)
      return `var(--agentos-${toKebab(ref.split('.'))})`
    }
    return null
  }

  const cssVars = []
  const tailwindColors = {}

  for (const entry of entries) {
    const cssName = toCssVar(entry.path)
    const resolved = resolveRaw(entry.raw)
    let cssValue
    if (typeof entry.raw === 'string' && entry.raw.startsWith('{')) {
      const ref = entry.raw.slice(1, -1)
      cssValue = `var(--agentos-${toKebab(ref.split('.'))})`
    } else if (resolved) {
      cssValue = resolved
    } else {
      continue
    }
    cssVars.push({ name: cssName, value: cssValue, path: entry.path, description: entry.description })
    setNested(tailwindColors, entry.path, `var(${cssName})`)
  }

  return { cssVars, tailwindColors }
}

/** @param {Record<string, unknown>} target @param {string[]} path @param {string} value */
function setNested(target, path, value) {
  let cur = target
  for (let i = 0; i < path.length - 1; i++) {
    const key = toTailwindKey(path[i])
    if (!cur[key]) cur[key] = {}
    cur = cur[key]
  }
  cur[toTailwindKey(path[path.length - 1])] = value
}

/** @param {string} key */
function toTailwindKey(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

/** @param {TokenEntry[]} entries @param {(v: number) => string} format @param {boolean} [stripCategory] */
function buildScalarVars(entries, format, stripCategory = false) {
  const cssVars = []
  const tailwind = {}
  for (const entry of entries) {
    if (typeof entry.raw !== 'number' && typeof entry.raw !== 'string') continue
    const tailPath = stripCategory ? entry.path.slice(1) : entry.path
    const cssName = toCssVar(['font', ...entry.path])
    const cssValue = typeof entry.raw === 'number' ? format(entry.raw) : String(entry.raw)
    cssVars.push({ name: cssName, value: cssValue, path: ['font', ...entry.path] })
    setNested(tailwind, tailPath, `var(${cssName})`)
  }
  return { cssVars, tailwind }
}

/** @param {TokenEntry[]} entries @param {string} prefix @param {(v: number) => string} format */
function buildModeVars(entries, prefix, format) {
  const cssVars = []
  const tailwind = {}
  for (const entry of entries) {
    if (typeof entry.raw !== 'number') continue
    const cssName = toCssVar([prefix, ...entry.path.slice(1)])
    const cssValue = format(entry.raw)
    cssVars.push({ name: cssName, value: cssValue, path: [prefix, ...entry.path.slice(1)] })
    setNested(tailwind, entry.path.slice(1), `var(${cssName})`)
  }
  return { cssVars, tailwind }
}

const colorEntries = []
walkTokens(colorJson, [], colorEntries)
const colorColorEntries = colorEntries.filter((e) => e.type === 'color')

const fontEntries = []
walkTokens(fontJson, [], fontEntries)

const modeEntries = []
walkTokens(modeJson, [], modeEntries)

const colors = buildColorMaps(colorColorEntries)

const fontFamily = buildScalarVars(
  fontEntries.filter((e) => e.path[0] === 'family'),
  (v) => String(v),
  true,
)
const fontStyle = buildScalarVars(
  fontEntries.filter((e) => e.path[0] === 'style'),
  (v) => String(v),
  true,
)
const fontSize = buildScalarVars(
  fontEntries.filter((e) => e.path[0] === 'size'),
  (v) => `${v}px`,
  true,
)
const fontWeight = buildScalarVars(
  fontEntries.filter((e) => e.path[0] === 'weight'),
  (v) => String(v),
  true,
)
const lineHeight = buildScalarVars(
  fontEntries.filter((e) => e.path[0] === 'leading'),
  (v) => `${v}px`,
  true,
)
const letterSpacing = buildScalarVars(
  fontEntries.filter((e) => e.path[0] === 'tracking'),
  (v) => `${v}px`,
  true,
)

const radius = buildModeVars(
  modeEntries.filter((e) => e.path[0] === 'radius'),
  'radius',
  (v) => `${v}px`,
)
const margin = buildModeVars(
  modeEntries.filter((e) => e.path[0] === 'margin'),
  'spacing',
  (v) => `${v}px`,
)
const padding = buildModeVars(
  modeEntries.filter((e) => e.path[0] === 'padding'),
  'spacing',
  (v) => `${v}px`,
)
const gap = buildModeVars(
  modeEntries.filter((e) => e.path[0] === 'gap'),
  'spacing',
  (v) => `${v}px`,
)
const controlHeight = buildModeVars(
  modeEntries.filter((e) => e.path[0] === 'controlHeight'),
  'control-height',
  (v) => `${v}px`,
)
const iconSize = buildModeVars(
  modeEntries.filter((e) => e.path[0] === 'iconSize'),
  'icon-size',
  (v) => `${v}px`,
)

const allCssVars = [
  ...colors.cssVars,
  ...fontFamily.cssVars,
  ...fontStyle.cssVars,
  ...fontSize.cssVars,
  ...fontWeight.cssVars,
  ...lineHeight.cssVars,
  ...letterSpacing.cssVars,
  ...radius.cssVars,
  ...margin.cssVars,
  ...padding.cssVars,
  ...gap.cssVars,
  ...controlHeight.cssVars,
  ...iconSize.cssVars,
].sort((a, b) => a.name.localeCompare(b.name))

const cssContent = `/* 由 scripts/build-design-tokens.mjs 生成，请勿手改 */
:root {
${allCssVars.map((v) => `  ${v.name}: ${v.value};`).join('\n')}
}

/* TODO: 待 AgentOS Dark.tokens.json 到位后由 build 脚本填充 */
.dark {
}
`

writeFileSync(outCss, cssContent)

const themeExtend = {
  colors: {
    agentos: colors.tailwindColors,
  },
  fontFamily: {
    'agentos-cn': [fontFamily.tailwind.cn ?? 'var(--agentos-font-family-cn)', 'sans-serif'],
    'agentos-en': [fontFamily.tailwind.en ?? 'var(--agentos-font-family-en)', 'sans-serif'],
    agentos: [
      'var(--agentos-font-family-cn)',
      'var(--agentos-font-family-en)',
      'system-ui',
      'sans-serif',
    ],
  },
  fontSize: Object.fromEntries(
    Object.entries(fontSize.tailwind).map(([k, v]) => [
      `agentos-${k}`,
      [v, { lineHeight: lineHeight.tailwind[k] ?? '1.5' }],
    ]),
  ),
  fontWeight: Object.fromEntries(
    Object.entries(fontWeight.tailwind).map(([k, v]) => [`agentos-${k}`, v]),
  ),
  lineHeight: Object.fromEntries(
    Object.entries(lineHeight.tailwind).map(([k, v]) => [`agentos-${k}`, v]),
  ),
  letterSpacing: Object.fromEntries(
    Object.entries(letterSpacing.tailwind).map(([k, v]) => [`agentos-${k}`, v]),
  ),
  borderRadius: Object.fromEntries(
    Object.entries(radius.tailwind).map(([k, v]) => [`agentos-${k}`, v]),
  ),
  spacing: {
    ...Object.fromEntries(Object.entries(margin.tailwind).map(([k, v]) => [`agentos-margin-${k}`, v])),
    ...Object.fromEntries(Object.entries(padding.tailwind).map(([k, v]) => [`agentos-padding-${k}`, v])),
    ...Object.fromEntries(Object.entries(gap.tailwind).map(([k, v]) => [`agentos-gap-${k}`, v])),
    ...Object.fromEntries(Object.entries(controlHeight.tailwind).map(([k, v]) => [`agentos-control-${k}`, v])),
    ...Object.fromEntries(Object.entries(iconSize.tailwind).map(([k, v]) => [`agentos-icon-${k}`, v])),
  },
}

const themeTs = `/* 由 scripts/build-design-tokens.mjs 生成，请勿手改 */
export const generatedThemeExtend = ${JSON.stringify(themeExtend, null, 2)}
`

writeFileSync(outTheme, themeTs)

const tokenClassKeys = {
  fontFamily: Object.keys(themeExtend.fontFamily),
  fontSize: Object.keys(themeExtend.fontSize),
  fontWeight: Object.keys(themeExtend.fontWeight),
  lineHeight: Object.keys(themeExtend.lineHeight),
  letterSpacing: Object.keys(themeExtend.letterSpacing),
  borderRadius: Object.keys(themeExtend.borderRadius),
  spacing: Object.keys(themeExtend.spacing),
}

const tokenClassKeysTs = `/* 由 scripts/build-design-tokens.mjs 生成，请勿手改 */
export const generatedTokenClassKeys = ${JSON.stringify(tokenClassKeys, null, 2)} as const
`

writeFileSync(outTokenClassKeys, tokenClassKeysTs)

const generatedAt = new Date().toISOString()
const colorByPath = new Map(colors.cssVars.map((v) => [toPathKey(v.path), v]))

/** @param {{ path: string[], name: string, value: string }} item */
function colorDocRow(item) {
  return {
    figma: toFigmaPath(item.path),
    css: item.name,
    text: toTailwindTextClass(item.path),
    bg: toTailwindBgClass(item.path),
    border: toTailwindBorderClass(item.path),
    light: item.value,
  }
}

const quickLookupRows = QUICK_LOOKUP_KEYS
  .map((key) => colorByPath.get(key))
  .filter(Boolean)
  .map(colorDocRow)

const colorGroups = new Map()
for (const item of colors.cssVars) {
  const group = item.path[0]
  if (!colorGroups.has(group)) colorGroups.set(group, [])
  colorGroups.get(group).push(item)
}

const topLevelGroups = Object.keys(colorJson).filter((k) => !k.startsWith('$'))

function scalarDocRows(vars, tailwindPrefix) {
  return vars.map((v) => {
    const figmaPath = v.path[0] === 'font'
      ? v.path.slice(1).map(toTailwindKey).join('.')
      : v.path.map(toTailwindKey).join('.')
    const tailKey = toTailwindKey(v.path[v.path.length - 1])
    return {
      figma: figmaPath,
      css: v.name,
      tailwind: `${tailwindPrefix}${tailKey}`,
      light: v.value,
    }
  })
}

const fontRows = [
  ...scalarDocRows(fontFamily.cssVars, 'font-agentos-'),
  ...scalarDocRows(fontSize.cssVars, 'text-agentos-'),
  ...scalarDocRows(fontWeight.cssVars, 'font-agentos-'),
  ...scalarDocRows(lineHeight.cssVars, 'leading-agentos-'),
  ...scalarDocRows(letterSpacing.cssVars, 'tracking-agentos-'),
]

const layoutRows = [
  ...scalarDocRows(radius.cssVars, 'rounded-agentos-'),
  ...scalarDocRows(margin.cssVars, 'agentos-margin-'),
  ...scalarDocRows(padding.cssVars, 'agentos-padding-'),
  ...scalarDocRows(gap.cssVars, 'agentos-gap-'),
  ...scalarDocRows(controlHeight.cssVars, 'agentos-control-'),
  ...scalarDocRows(iconSize.cssVars, 'agentos-icon-'),
]

const tokenRefSections = [...colorGroups.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([group, items]) => {
    const rows = items.map(colorDocRow)
    return `## ${group}\n\n${mdTable(rows, ['figma', 'css', 'text', 'bg', 'border', 'light'])}\n`
  })
  .join('\n')

const tokenReferenceMd = `# AgentOS Token Reference（附录）

> 由 \`scripts/build-design-tokens.mjs\` 自动生成。生成时间：${generatedAt}

本文档为 **DESIGN.md** 的完整附录，列出全部 token 的 Figma 路径与前端命名对照（当前为 **light** mode）。

## 颜色（${colors.cssVars.length}）

${tokenRefSections}

## 字体与排版（${fontRows.length}）

${mdTable(fontRows, ['figma', 'css', 'tailwind', 'light'])}

## 布局与尺寸（${layoutRows.length}）

${mdTable(layoutRows, ['figma', 'css', 'tailwind', 'light'])}
`

const designMd = `# AgentOS Design System

> **对外设计契约**：Figma Variables ↔ 前端命名对照。生成时间：${generatedAt} · 版本：${DESIGN_VERSION}

## 文档元信息

| 项 | 值 |
|----|-----|
| 包名 | \`@agentos/design-system\` |
| 当前 mode | light（\`:root\`）；dark 结构已预留 |
| 来源文件 | \`agentos-light.tokens.json\`、\`font.json\`、\`mode-1.tokens.json\` |
| 完整附录 | [docs/token-reference.md](./docs/token-reference.md) |

## 阅读指南

本文档面向 **设计方 / 设计工程 / 前端查阅**，可脱离仓库单独阅读。

对照表三列含义：

| 列 | 说明 |
|----|------|
| **Figma 路径** | Figma Variables 层级路径，设计师在文件中应使用的变量名 |
| **CSS 变量** | 前端运行时变量，格式 \`--agentos-*\` |
| **Tailwind** | 推荐 class 前缀；颜色同时提供 \`text-\` / \`bg-\` / \`border-\` 示例 |

设计师在 Figma 中绑定变量时，请使用 **Figma 路径**列的名称；前端实现时映射到 **CSS 变量**或 **Tailwind**列。

## 命名空间约定

- CSS 变量：\`--agentos-*\`
- Tailwind 颜色：\`text-agentos-*\`、\`bg-agentos-*\`、\`border-agentos-*\`
- Tailwind 字体：\`font-agentos\`、\`text-agentos-*\`（字号）
- Tailwind 圆角/间距：\`rounded-agentos-*\`、\`agentos-margin-*\`、\`agentos-padding-*\` 等
- 与历史 \`--ds-*\` 体系隔离，可并行共存

## 暗色模式

- 当前仅填充 **light** 值
- \`.dark {}\` 已预留；待 \`AgentOS Dark.tokens.json\` 到位后增量生成
- 组件与样式应使用语义变量名，dark 到位时无需改组件代码

## 语义分组导读

顶层分组（来自 Figma token 结构）：

${topLevelGroups.map((g) => `- **${g}**`).join('\n')}

| 分组 | 典型用途 |
|------|----------|
| Neutral | 文本、背景、边框、填充等中性语义 |
| Brand | 品牌主色、链接、信息、成功、警告、错误 |
| Base | 色阶原语（如 Blue/gray 50–900），供语义色引用 |
| MaskBase / MaskSenior | 遮罩透明度 |

## Token 统计

| 类别 | 数量 |
|------|------|
| 颜色 | ${colors.cssVars.length} |
| 字号 | ${fontSize.cssVars.length} |
| 字重 | ${fontWeight.cssVars.length} |
| 行高 | ${lineHeight.cssVars.length} |
| 字距 | ${letterSpacing.cssVars.length} |
| 圆角 | ${radius.cssVars.length} |
| 间距(margin/padding/gap) | ${margin.cssVars.length + padding.cssVars.length + gap.cssVars.length} |
| 控件高度 | ${controlHeight.cssVars.length} |
| 图标尺寸 | ${iconSize.cssVars.length} |

## 常用语义 Token 速查

${mdTable(quickLookupRows, ['figma', 'css', 'text', 'bg', 'border', 'light'])}

## 字体与排版阶梯

${mdTable(fontRows, ['figma', 'css', 'tailwind', 'light'])}

## 布局与尺寸 Token

${mdTable(layoutRows, ['figma', 'css', 'tailwind', 'light'])}

## 组件分层约定

设计组件与前端组件均按以下层级组织：

| 层级 | 说明 | 示例 |
|------|------|------|
| atoms | 最小可复用单元 | Button、Input、Badge |
| molecules | 原子组合 | SearchField、FormItem |
| organisms | 独立功能区块 | Header、DataTable |
| layouts | 页面骨架 | LayoutHeaderContainer、SidebarLayout |
| pages | 完整页面 | LoginPage、DashboardPage |

前端实现规范：forwardRef + 显式 props；\`cva\` 管理 variant；禁止硬编码色值。

## 前端消费说明

前端通过 \`@agentos/design-system\` 包消费本设计契约：

- 样式基座：\`@agentos/design-system/styles/tokens.css\`
- Tailwind preset：\`@agentos/design-system/tailwind-preset\`
- React 组件：\`import { Button } from '@agentos/design-system'\`

仓库内接入细节见包内 README（内部文档）。

## 完整 Token 附录

颜色等完整对照（共 ${colors.cssVars.length} 条颜色）见 **[docs/token-reference.md](./docs/token-reference.md)**。
`

mkdirSync(join(pkgRoot, 'docs'), { recursive: true })
writeFileSync(outDesign, designMd)
writeFileSync(outTokenRef, tokenReferenceMd)

console.log(`Generated:
  ${outCss} (${allCssVars.length} vars)
  ${outTheme}
  ${outTokenClassKeys}
  ${outDesign}
  ${outTokenRef}`)
