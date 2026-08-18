# agent-os-ui

Agent OS Chat Lab 的前端沙盒：还原顶导、左导、中间问答、右侧工作台的静态样式，中间栏支持假流式发送。后端数据全部 mock。

Design token 和组件来自本仓库 vendored 的 `@agentos/design-system`（`packages/@agentos/design-system`），源自主仓 `agentos_studio_frontend` 整包拷贝。

```bash
pnpm install
pnpm dev
```

主仓 design-system 有更新时，拉下主仓后对比同步：

```bash
diff -rq \
  packages/@agentos/design-system \
  ../agentos_studio_frontend/packages/@agentos/design-system \
  --exclude node_modules --exclude storybook/dist
```

确认要跟之后：

```bash
rsync -a --delete \
  --exclude node_modules --exclude storybook/dist \
  ../agentos_studio_frontend/packages/@agentos/design-system/ \
  packages/@agentos/design-system/
```
