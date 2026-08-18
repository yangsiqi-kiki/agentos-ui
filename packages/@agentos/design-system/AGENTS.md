# AgentOS Design System Agent Instructions

## Scope

These instructions apply to `packages/@agentos/design-system` and all of its subdirectories. They supplement the repository root `AGENTS.md`.

## Package Role
- 本包是 AgentOS **特供 UI 库**：design tokens、shadcn 风格组件、Tailwind preset、Storybook 预览。
- 与 `apps/web` 现有 Arco/Pixso 轨道并行（Ladle 已移除，旧 stories 归档于 git history）；宿主通过 `workspace:*` 渐进式引入。
- 不要从 `apps/web` 或 `apps/backend` 反向 import。

## Token 权威
- 源文件：`src/tokens/source/*.json`（Figma 导出）。
- 生成物：`src/tokens/tokens.css`、`src/tokens/generated-theme.ts`、`src/tokens/generated-token-class-keys.ts`、`DESIGN.md`（对外）、`docs/token-reference.md`（对外附录）。
- 修改 token 后运行 `pnpm --filter @agentos/design-system build:tokens`。
- **DESIGN.md 面向设计方/设计工程**，可脱离仓库阅读；内部流水线见 `docs/design-to-code-flow.md`。
- 组件只认 `--agentos-*` 语义变量与 `agentos` Tailwind 命名空间，禁止硬编码色值。
- 组件合并 class 必须使用包内 `cn` / `agentosTwMerge`；宿主扩展规则时从 `@agentos/design-system/tw-merge` 复用 `agentosClassGroups`，不要用任意值规避 token class 冲突。

## 组件落位
- `src/components/atoms`：原子组件（Button、Input 等）
- `src/components/molecules`：分子组件
- `src/components/organisms`：组织组件
- `src/components/layouts`：布局组件
- `src/components/pages`：页面级组件
- 单文件单组件；公共出口经 `src/index.ts` barrel。

## 图标约定
- 必须优先用 `lucide-react`；仅当 Lucide 无对应图标或设计明确指定时才使用 `@tabler/icons-react`。
- **禁止**在组件内手写内联 SVG / 用 `<img>` 充当图标。
- 尺寸由容器 `[&_svg]:size-agentos-icon-*` 控制；颜色用 `text-agentos-*` + `currentColor`。
- Figma → 图标库映射与选择判据见仓库 `.agents/skills/component-creator/SKILL.md`「图标接入」。

## Storybook
- 配置在 `storybook/.storybook/`。
- Storybook 是 Agent 识别和选择现有 AgentOS 组件的权威目录；实现 UI 前必须先搜索 `storybook/stories/` 与 `src/index.ts`，有匹配组件时优先复用。
- 每个组件在 `storybook/stories/<ComponentName>/` 下放同名 `<ComponentName>.stories.tsx` 与 `<ComponentName>.mdx`（PascalCase 文件夹名与组件名一致）。
- 共享 Overview / 布局 / 元数据放 `stories/docs/`；Token 展示放 `stories/tokens/`（非组件，勿并入组件文件夹）。
- story 引用组件源码用 `../../../src/...`；MDX 引用共享布局用 `../docs/_layout`。
- 命令：`pnpm --filter @agentos/design-system storybook`。
- 侧边栏顺序：Overview（简介、用法、设计契约、组件生成 Skill、贡献组件）→ Tokens → Atoms → Molecules → Organisms → Layouts → Pages。
- 组件 story 按层级命名：`Atoms/*`、`Molecules/*`、`Organisms/*`、`Layouts/*`、`Pages/*`；可枚举 props 在 `argTypes` 中使用 `select` 控件，并用独立 story 覆盖主要状态与变体。
- 除单一状态 story 外，应提供一个聚合 story（如 `AllVariants`）集中展示主要变体。
- 每个组件须提供同名中文说明书 `.mdx`，使用 `<Meta of={Stories} />`、`ComponentMeta`、`Controls` 与 `TokenUsage`；Atoms / Molecules / Organisms 使用 `Canvas` 展示示例，Layouts / Pages 使用 `StoryLink` 链接到独立 story，避免 Docs 容器宽度压缩全幅界面；勿再加 `tags: ['autodocs']`。
- 组件元数据集中在 `stories/docs/component-meta.anti-pattern.ts`；`id` 须与 MDX 中 `ComponentMeta` / `TokenUsage` 一致，并登记中文名、描述、分类、Figma 链接和常用 token。
- 共享布局组件在 `stories/docs/_layout.tsx`。
- Token 展示（非组件）放在 `Tokens/*`：`Tokens/Color`、`Tokens/Typography`；数据源为 `generated-theme.ts`，勿硬编码色值/字号。
- Manager / Docs 样式基于 DESIGN.md token（`manager.ts` + `storybook.css`）。

## 宿主接入
- `apps/web` 仅需 `presets: [agentosPreset]` + `import '@agentos/design-system/styles/tokens.css'`。
- preset 自带 content/plugins/darkMode，宿主无需重复配置。
- 宿主新增视觉实现时优先消费本包的组件与 `agentos-*` / `--agentos-*` token；只有本包不存在对应能力时才回退到宿主的兼容组件或旧 token。

## Verification
- `pnpm --filter @agentos/design-system build:tokens`
- `pnpm --filter @agentos/design-system lint`
- `pnpm --filter @agentos/design-system typecheck`
