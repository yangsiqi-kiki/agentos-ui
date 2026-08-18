import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'
import { mergeConfig } from 'vite'

const storybookDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(storybookDir, '../../../../..')

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      // 由下方 addon-docs 单独接管，以便挂载 remark-gfm
      options: { docs: false },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: './postcss.config.cjs',
      },
      resolve: {
        alias: {
          '@': path.resolve(repoRoot, 'apps/web/src'),
        },
      },
      server: {
        fs: {
          allow: [repoRoot],
        },
      },
    })
  },
}

export default config
