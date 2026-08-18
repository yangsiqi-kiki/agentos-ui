import type { Config } from 'tailwindcss'
import agentosPreset from '@agentos/design-system/tailwind-preset'

export default {
  presets: [agentosPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@agentos/design-system/src/**/*.{ts,tsx}',
  ],
} satisfies Config
