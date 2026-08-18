import { extendTailwindMerge } from 'tailwind-merge'
import { generatedTokenClassKeys } from '../tokens/generated-token-class-keys'

const spacingClassGroupDescriptors = [
  ['p', 'p'],
  ['px', 'px'],
  ['py', 'py'],
  ['ps', 'ps'],
  ['pe', 'pe'],
  ['pbs', 'pbs'],
  ['pbe', 'pbe'],
  ['pt', 'pt'],
  ['pr', 'pr'],
  ['pb', 'pb'],
  ['pl', 'pl'],
  ['m', 'm'],
  ['mx', 'mx'],
  ['my', 'my'],
  ['ms', 'ms'],
  ['me', 'me'],
  ['mbs', 'mbs'],
  ['mbe', 'mbe'],
  ['mt', 'mt'],
  ['mr', 'mr'],
  ['mb', 'mb'],
  ['ml', 'ml'],
  ['space-x', 'space-x'],
  ['space-y', 'space-y'],
  ['size', 'size'],
  ['w', 'w'],
  ['min-w', 'min-w'],
  ['max-w', 'max-w'],
  ['h', 'h'],
  ['min-h', 'min-h'],
  ['max-h', 'max-h'],
  ['inline-size', 'inline'],
  ['min-inline-size', 'min-inline'],
  ['max-inline-size', 'max-inline'],
  ['block-size', 'block'],
  ['min-block-size', 'min-block'],
  ['max-block-size', 'max-block'],
  ['inset', 'inset'],
  ['inset-x', 'inset-x'],
  ['inset-y', 'inset-y'],
  ['start', 'start'],
  ['end', 'end'],
  ['inset-bs', 'inset-bs'],
  ['inset-be', 'inset-be'],
  ['top', 'top'],
  ['right', 'right'],
  ['bottom', 'bottom'],
  ['left', 'left'],
  ['basis', 'basis'],
  ['gap', 'gap'],
  ['gap-x', 'gap-x'],
  ['gap-y', 'gap-y'],
  ['indent', 'indent'],
  ['border-spacing', 'border-spacing'],
  ['border-spacing-x', 'border-spacing-x'],
  ['border-spacing-y', 'border-spacing-y'],
  ['translate', 'translate'],
  ['translate-x', 'translate-x'],
  ['translate-y', 'translate-y'],
  ['translate-z', 'translate-z'],
  ['scroll-m', 'scroll-m'],
  ['scroll-mx', 'scroll-mx'],
  ['scroll-my', 'scroll-my'],
  ['scroll-ms', 'scroll-ms'],
  ['scroll-me', 'scroll-me'],
  ['scroll-mbs', 'scroll-mbs'],
  ['scroll-mbe', 'scroll-mbe'],
  ['scroll-mt', 'scroll-mt'],
  ['scroll-mr', 'scroll-mr'],
  ['scroll-mb', 'scroll-mb'],
  ['scroll-ml', 'scroll-ml'],
  ['scroll-p', 'scroll-p'],
  ['scroll-px', 'scroll-px'],
  ['scroll-py', 'scroll-py'],
  ['scroll-ps', 'scroll-ps'],
  ['scroll-pe', 'scroll-pe'],
  ['scroll-pbs', 'scroll-pbs'],
  ['scroll-pbe', 'scroll-pbe'],
  ['scroll-pt', 'scroll-pt'],
  ['scroll-pr', 'scroll-pr'],
  ['scroll-pb', 'scroll-pb'],
  ['scroll-pl', 'scroll-pl'],
] as const

const borderRadiusClassGroupIds = [
  'rounded',
  'rounded-s',
  'rounded-e',
  'rounded-t',
  'rounded-r',
  'rounded-b',
  'rounded-l',
  'rounded-ss',
  'rounded-se',
  'rounded-ee',
  'rounded-es',
  'rounded-tl',
  'rounded-tr',
  'rounded-br',
  'rounded-bl',
] as const

function createTokenClassGroups(
  descriptors: ReadonlyArray<readonly [string, string]>,
  tokenKeys: readonly string[],
): Record<string, Array<Record<string, string[]>>> {
  return Object.fromEntries(
    descriptors.map(([groupId, utilityPrefix]) => [
      groupId,
      [{ [utilityPrefix]: [...tokenKeys] }],
    ]),
  )
}

export const agentosClassGroups = {
  'font-family': [
    { font: [...generatedTokenClassKeys.fontFamily] },
  ],
  'font-size': [
    { text: [...generatedTokenClassKeys.fontSize] },
  ],
  'font-weight': [
    { font: [...generatedTokenClassKeys.fontWeight] },
  ],
  leading: [
    { leading: [...generatedTokenClassKeys.lineHeight] },
  ],
  tracking: [
    { tracking: [...generatedTokenClassKeys.letterSpacing] },
  ],
  ...createTokenClassGroups(
    borderRadiusClassGroupIds.map((groupId) => [groupId, groupId] as const),
    generatedTokenClassKeys.borderRadius,
  ),
  ...createTokenClassGroups(
    spacingClassGroupDescriptors,
    generatedTokenClassKeys.spacing,
  ),
}

export const agentosTwMerge = extendTailwindMerge({
  extend: {
    classGroups: agentosClassGroups,
  },
})

