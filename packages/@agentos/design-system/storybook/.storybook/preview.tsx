import type { Preview } from '@storybook/react'
import { DocsContainer } from '@storybook/blocks'
import type { DocsContainerProps } from '@storybook/blocks'
import type { ReactNode } from 'react'
import { STORYBOOK_TOC_TITLE } from '../stories/docs/storybook-copy.anti-pattern'
import { agentosTheme } from './agentos-theme'
import '../storybook.css'
import '../../src/tokens/tokens.css'
// Arco Design styles + web design vars needed for feature component stories (e.g. ScenarioBriefRunCard)
import '../../../../../apps/web/src/acro.css'
import { applyDesignCssVars } from '../../../../../apps/web/src/design-system/apply-css-vars'

// Web 组件 story 依赖 --ds-* 变量：模块加载时写入 documentElement
applyDesignCssVars()

function AgentosDocsContainer({
  children,
  ...props
}: DocsContainerProps & { children: ReactNode }) {
  return (
    <DocsContainer {...props} theme={agentosTheme}>
      <div className="agentos-docs">{children}</div>
    </DocsContainer>
  )
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    docs: {
      theme: agentosTheme,
      container: AgentosDocsContainer,
      toc: {
        title: STORYBOOK_TOC_TITLE,
        headingSelector: 'h2, h3',
      },
      // Canvas / Source 代码块使用深色高亮（配合 storybook.css 的 VS Dark 底色）
      source: {
        dark: true,
      },
    },
    options: {
      storySort: {
        order: [
          'Overview',
          [
            '\u7b80\u4ecb',
            '\u7528\u6cd5',
            '\u8bbe\u8ba1\u5951\u7ea6',
            '\u7ec4\u4ef6\u751f\u6210 Skill',
            '\u8d21\u732e\u7ec4\u4ef6',
          ],
          'Tokens',
          ['Color', 'Typography'],
          'Atoms',
          'Molecules',
          'Organisms',
          'Layouts',
          'Pages',
        ],
      },
    },
  },
}

export default preview
