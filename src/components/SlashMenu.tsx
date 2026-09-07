import { Tag, cn } from '@agentos/design-system'
import { MessageCircleMore, Settings } from 'lucide-react'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'

type SlashTagTone = 'official' | 'shared' | 'category'

export type SlashMenuItem = {
  id: string
  kind: 'action' | 'skill'
  label: string
  description: string
  insertValue: string
  action?: 'insert' | 'manage'
  icon?: 'settings' | 'message'
  command?: string
  tags?: Array<{ label: string; tone: SlashTagTone }>
}

type SlashSection = {
  id: string
  title: string | null
  items: SlashMenuItem[]
}

const staticSlashSections: SlashSection[] = [
  {
    id: 'manage',
    title: null,
    items: [
      {
        id: 'manage-skills',
        kind: 'action',
        icon: 'settings',
        label: '管理技能',
        description: '管理我的自定义技能',
        insertValue: '',
        action: 'manage',
      },
      {
        id: 'create-skill',
        kind: 'action',
        icon: 'message',
        label: '创建技能',
        description: '与 Agent 对话辅助创建自定义技能',
        command: '/workshop-skill-creator',
        insertValue: '/workshop-skill-creator ',
      },
    ],
  },
  {
    id: 'builtin',
    title: '内置技能',
    items: [
      {
        id: 'srp',
        kind: 'skill',
        command: '/srp',
        insertValue: '/srp ',
        description: '挖掘场景详细需求，盘点数据与知识资产',
        label: '/srp',
        tags: [
          { label: '官方内置', tone: 'official' },
          { label: '理需求', tone: 'category' },
        ],
      },
      {
        id: 'manage-todos',
        kind: 'skill',
        command: '/manage-todos',
        insertValue: '/manage-todos ',
        description: '待办事项管理',
        label: '/manage-todos',
        tags: [
          { label: '官方内置', tone: 'official' },
          { label: '通用', tone: 'category' },
        ],
      },
      {
        id: 'scenario-landscape',
        kind: 'skill',
        command: '/scenario-landscape',
        insertValue: '/scenario-landscape ',
        description: '场景全景结构化落库与刷新',
        label: '/scenario-landscape',
        tags: [
          { label: '官方内置', tone: 'official' },
          { label: '通用', tone: 'category' },
        ],
      },
    ],
  },
]

export function getSlashSections(customItems: SlashMenuItem[] = []): SlashSection[] {
  if (customItems.length === 0) {
    return staticSlashSections
  }
  return [
    ...staticSlashSections,
    {
      id: 'custom',
      title: '自定义技能',
      items: customItems,
    },
  ]
}

const iconMap = {
  settings: Settings,
  message: MessageCircleMore,
} as const

export type SlashToken = {
  query: string
  start: number
  end: number
}

export function getSlashTokenAtCursor(text: string, cursor: number): SlashToken | null {
  const safeCursor = Math.min(Math.max(cursor, 0), text.length)
  let start = safeCursor
  while (start > 0 && !/\s/.test(text[start - 1] ?? '')) {
    start -= 1
  }
  let end = safeCursor
  while (end < text.length && !/\s/.test(text[end] ?? '')) {
    end += 1
  }
  const token = text.slice(start, end)
  if (!token.startsWith('/')) {
    return null
  }
  return {
    query: token.slice(1),
    start,
    end,
  }
}

function matchesQuery(item: SlashMenuItem, query: string) {
  if (!query) {
    return true
  }
  const needle = query.toLowerCase()
  return [item.label, item.command, item.description]
    .filter(Boolean)
    .some((value) => value!.toLowerCase().includes(needle))
}

export function getFilteredSlashSections(query: string, customItems: SlashMenuItem[] = []) {
  return getSlashSections(customItems)
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => matchesQuery(item, query)),
    }))
    .filter((section) => section.items.length > 0)
}

export function flattenSlashItems(sections: SlashSection[]) {
  return sections.flatMap((section) => section.items)
}

export function getKnownSkillCommands(customItems: SlashMenuItem[] = []) {
  return flattenSlashItems(getSlashSections(customItems))
    .map((item) => item.insertValue.trimEnd())
    .filter((value) => value.startsWith('/'))
    .sort((left, right) => right.length - left.length)
}

const tagClassName =
  'h-[18px] max-w-none min-w-0 px-agentos-padding-padding-xxs4 text-agentos-sm leading-[16px]'

function SlashTag({ label, tone }: { label: string; tone: SlashTagTone }) {
  if (tone === 'official') {
    return (
      <Tag
        size="sm"
        shape="rectangle"
        color="success"
        className={cn(tagClassName, 'text-agentos-brand-success-color-success-active')}
      >
        {label}
      </Tag>
    )
  }

  if (tone === 'shared') {
    return (
      <Tag
        size="sm"
        shape="rectangle"
        className={cn(
          tagClassName,
          'bg-agentos-brand-primary-color-primary-bg text-agentos-brand-primary-color-primary',
        )}
      >
        {label}
      </Tag>
    )
  }

  return (
    <Tag size="sm" shape="rectangle" color="default" className={tagClassName}>
      {label}
    </Tag>
  )
}

function SlashItemIcon({ name }: { name: NonNullable<SlashMenuItem['icon']> }) {
  const Icon = iconMap[name]
  return <Icon aria-hidden="true" className="size-[14px] shrink-0" />
}

function SlashMenuRow({
  item,
  active,
  id,
  onSelect,
  onActive,
}: {
  item: SlashMenuItem
  active: boolean
  id: string
  onSelect: (item: SlashMenuItem) => void
  onActive: () => void
}) {
  return (
    <button
      id={id}
      type="button"
      role="option"
      aria-selected={active}
      className={cn(
        'flex h-9 w-full min-w-0 items-center gap-agentos-gap-gap-xs8 overflow-hidden rounded-agentos-rounded-lg8 px-agentos-padding-padding-xs8 py-[7px] text-left',
        active && 'bg-agentos-neutral-fill-color-fill-tertiary',
      )}
      onMouseDown={(event) => event.preventDefault()}
      onMouseEnter={onActive}
      onClick={() => onSelect(item)}
    >
      {item.kind === 'action' ? (
        <span className="flex min-w-0 shrink-0 items-center gap-agentos-gap-gap-xxs4 text-agentos-neutral-text-color-text">
          {item.icon ? <SlashItemIcon name={item.icon} /> : null}
          <span className="whitespace-nowrap text-agentos-md leading-agentos-18">{item.label}</span>
        </span>
      ) : (
        <span className="flex min-w-0 shrink-0 items-center gap-agentos-gap-gap-xxs4">
          <span className="whitespace-nowrap font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 text-agentos-neutral-text-color-text">
            {item.command}
          </span>
          {item.tags?.map((tag) => (
            <SlashTag key={`${item.id}-${tag.label}`} label={tag.label} tone={tag.tone} />
          ))}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-right font-agentos-en text-agentos-sm leading-[16px] text-agentos-neutral-text-color-text-description">
        {item.description}
      </span>
    </button>
  )
}

export function SlashMenu({
  query,
  activeIndex,
  anchor,
  customItems = [],
  onActiveIndexChange,
  onSelect,
}: {
  query: string
  activeIndex: number
  anchor: { left: number; width: number; top: number }
  customItems?: SlashMenuItem[]
  onActiveIndexChange: (index: number) => void
  onSelect: (item: SlashMenuItem) => void
}) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const sections = useMemo(() => getFilteredSlashSections(query, customItems), [query, customItems])
  const items = useMemo(() => flattenSlashItems(sections), [sections])

  useLayoutEffect(() => {
    const container = listRef.current
    const active = container?.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!container || !active) {
      return
    }
    const containerRect = container.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    if (activeRect.bottom > containerRect.bottom) {
      container.scrollTop += activeRect.bottom - containerRect.bottom
    } else if (activeRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - activeRect.top
    }
  }, [activeIndex])

  if (items.length === 0) {
    return null
  }

  let itemOffset = 0

  return createPortal(
    <div
      ref={listRef}
      id="slash-menu"
      role="listbox"
      aria-label="斜杠技能菜单"
      className="composer-scrollview max-h-[320px] overflow-y-auto rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding-xxs4 shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
      style={{
        position: 'fixed',
        left: anchor.left,
        width: anchor.width,
        bottom: window.innerHeight - anchor.top + 8,
        zIndex: 1200,
      }}
    >
      <div className="flex w-full flex-col">
        {sections.map((section) => {
          const sectionStart = itemOffset
          itemOffset += section.items.length
          return (
            <div key={section.id} className="flex w-full flex-col">
              {section.title ? (
                <div className="flex items-center pb-agentos-padding-padding-xxs4 pl-agentos-padding-padding-xs8 pr-agentos-padding-padding-xxs4 pt-agentos-padding-padding-xs8">
                  <p className="min-w-0 truncate font-agentos-en text-agentos-sm leading-[16px] text-agentos-neutral-text-color-text-secondary">
                    {section.title}
                  </p>
                </div>
              ) : null}
              {section.items.map((item, index) => {
                const flatIndex = sectionStart + index
                return (
                  <SlashMenuRow
                    key={item.id}
                    id={`slash-option-${item.id}`}
                    item={item}
                    active={flatIndex === activeIndex}
                    onActive={() => onActiveIndexChange(flatIndex)}
                    onSelect={onSelect}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>,
    document.body,
  )
}
