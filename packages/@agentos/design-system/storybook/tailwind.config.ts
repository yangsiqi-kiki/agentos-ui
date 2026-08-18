import path from 'node:path'
import { fileURLToPath } from 'node:url'
import agentosPreset from '../tailwind.preset.ts'
import appWebTailwindConfig from '../../../../apps/web/tailwind.config.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../../..')

export default {
  presets: [agentosPreset],
  darkMode: ['class'],
  content: [
    path.join(__dirname, '../src/**/*.{ts,tsx}'),
    path.join(__dirname, '../stories/**/*.{ts,tsx}'),
    // Include web app paths for feature component stories
    path.join(repoRoot, 'apps/web/src/**/*.{ts,tsx}'),
  ],
  theme: {
    extend: {
      // feature story 引用的 app 组件依赖 apps/web 的 primitive 色阶 / fs-* 字号 / font-sans，
      // 只并入这三类 key，避免覆盖 design-system preset 的其余 token 语义（如 radius）。
      fontFamily: appWebTailwindConfig.theme?.extend?.fontFamily,
      fontSize: appWebTailwindConfig.theme?.extend?.fontSize,
      colors: appWebTailwindConfig.theme?.extend?.colors,
    },
  },
}
