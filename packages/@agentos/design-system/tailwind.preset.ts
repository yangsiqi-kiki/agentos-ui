import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import { generatedThemeExtend } from './src/tokens/generated-theme.ts'

const packageDir = dirname(fileURLToPath(import.meta.url))
const srcDir = join(packageDir, 'src')
const storybookDir = join(packageDir, 'storybook')

const preset = {
  darkMode: ['class'],
  content: [
    join(srcDir, '**/*.{ts,tsx}'),
    join(storybookDir, '**/*.{ts,tsx}'),
  ],
  theme: {
    extend: generatedThemeExtend as Config['theme'] extends { extend?: infer E } ? E : never,
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default preset
