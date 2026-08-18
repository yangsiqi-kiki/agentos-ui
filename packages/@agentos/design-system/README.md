# @agentos/design-system

AgentOS 特供 UI 库：design tokens + shadcn 组件 + Tailwind preset + Storybook。

## 文档分层

| 文档 | 受众 | 用途 |
|------|------|------|
| **[DESIGN.md](./DESIGN.md)** | 设计方、设计工程、前端查阅 | **对外设计契约**：Figma ↔ CSS ↔ Tailwind 对照，可脱离仓库阅读 |
| [docs/token-reference.md](./docs/token-reference.md) | 同上 | DESIGN.md 附录：完整 token 对照表 |
| [docs/design-to-code-flow.md](./docs/design-to-code-flow.md) | 本仓库开发 / Agent | **对内**流水线、pnpm 命令、接入步骤 |
| [AGENTS.md](./AGENTS.md) | Cursor Agent | 包边界与校验命令 |

## 命令

```bash
# 从 Figma JSON 重新生成 token 与 DESIGN.md
pnpm --filter @agentos/design-system build:tokens

# Storybook 预览
pnpm dev:app:design-system:storybook

# Storybook 静态构建（产物：storybook/dist，上传该目录即可发布）
pnpm build:app:design-system:storybook

# 本地校验静态产物（需先 build）
pnpm --filter @agentos/design-system preview-storybook

# 校验
pnpm --filter @agentos/design-system lint
pnpm --filter @agentos/design-system typecheck
```

## 对外分发

可将以下文件单独发给设计方：

- `DESIGN.md` — 设计契约主文档
- `docs/token-reference.md` — 完整 token 附录

包 exports 亦暴露文档路径：`@agentos/design-system/design`、`@agentos/design-system/design/token-reference`。

## apps/web 接入（内部）

```ts
// tailwind.config.ts
import agentosPreset from '@agentos/design-system/tailwind-preset'
export default { presets: [agentosPreset], /* 现有配置 */ }

// main.tsx
import '@agentos/design-system/styles/tokens.css'

// 组件
import { Button } from '@agentos/design-system'
```

## 组件分层

- `src/components/atoms` — 原子
- `src/components/molecules` — 分子
- `src/components/organisms` — 组织
- `src/components/layouts` — 布局
- `src/components/pages` — 页面
