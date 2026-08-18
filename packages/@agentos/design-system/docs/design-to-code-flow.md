# Design-to-Code Flow

> **内部文档**：面向本仓库开发 / Agent。对外设计契约见 [DESIGN.md](../DESIGN.md) 与 [token-reference.md](./token-reference.md)。

端到端流程：设计 token → DESIGN.md → Tailwind preset → Figma 组件 → shadcn 组件 → Storybook → apps/web 渐进引入。

## 角色分工

| 角色 | 产出 |
|------|------|
| 设计师 | Figma Variables / 组件库（原子、分子、组织、布局、页面） |
| 设计工程 | 导出 `*.tokens.json` 到 `src/tokens/source/` |
| 前端 / Agent | 运行 `build:tokens`、实现 shadcn 组件、Storybook story |
| 业务开发 | 在 `apps/web` 中 `import { Button } from '@agentos/design-system'` |

## 流程图

```
Figma tokens JSON
    ↓ build-design-tokens.mjs
DESIGN.md + tokens.css + generated-theme.ts + tailwind.preset.ts
    ↓
设计师在 Figma 拼装组织/布局/页面组件
    ↓ Figma MCP (component-creator 技能)
packages/@agentos/design-system/src/components/{atoms|molecules|organisms|layouts|pages}/
    ↓
storybook/stories/*.stories.tsx 预览调试
    ↓ workspace:*
apps/web 渐进式替换局部 UI
```

## Token 更新

1. 设计师导出最新 JSON 到 `src/tokens/source/`
2. `pnpm --filter @agentos/design-system build:tokens`
3. 检查 `DESIGN.md` 与 `tokens.css` diff
4. 暗色到位后追加 `agentos-dark.tokens.json`，脚本自动生成 `.dark {}`

## 组件新增（手动或 component-creator）

1. 判定层级：atom / molecule / organism / layout / page
2. 在对应目录新建单文件组件
3. 使用 `agentos` Tailwind class 或 `var(--agentos-*)`，禁止硬编码色值
4. 在 `storybook/stories/` 添加 story
5. 从 `src/index.ts` barrel 导出（若需公共 API）

## apps/web 接入（已完成基座）

```ts
// tailwind.config.ts
import agentosPreset from '@agentos/design-system/tailwind-preset'
export default { presets: [agentosPreset], /* 现有配置 */ }
```

```ts
// main.tsx
import '@agentos/design-system/styles/tokens.css'
```

```tsx
// 业务组件中
import { Button } from '@agentos/design-system'
```

## Storybook

```bash
pnpm dev:app:design-system:storybook
# 或
pnpm --filter @agentos/design-system storybook
```

## 构建与发布

静态产物路线：本地或 CI 打出 `storybook/dist`，整目录上传到静态托管即可。本期不处理域名、子路径 base、鉴权。

```bash
# 构建静态站
pnpm build:app:design-system:storybook

# 本地校验产物（需先完成构建）
pnpm --filter @agentos/design-system preview-storybook
```

- **产物目录**：`packages/@agentos/design-system/storybook/dist`（根为 `index.html`，整目录即静态站）
- **交付/上传**：把该目录上传到对象存储或任意静态服务器
- **待定**：子路径托管时的 `base`、访问控制与域名后续再补
