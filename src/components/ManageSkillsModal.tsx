import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  InformationModal,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tag,
  cn,
} from '@agentos/design-system'
import {
  Check,
  ChevronDown,
  ChevronRight,
  Clock9,
  Ellipsis,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  LockOpen,
  MessageCircleMore,
  Pencil,
  RefreshCw,
  Trash2,
  Upload,
  UserRound,
  Wrench,
} from 'lucide-react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react'

import { cancelLabel, closeLabel, currentSpaceId, deleteLabel, spaceName } from '../fixtures/chat-lab'

const skillDescription =
  '连接对象模型与数据源元数据，扫描对象、关系与字段映射的一致性，辅助排查建模缺口'

type SkillTag = {
  label: string
  tone?: 'official' | 'shared' | 'category'
}

type OfficialSkill = {
  id: string
  name: string
  tags: SkillTag[]
  description: string
}

export type CustomSkill = {
  id: string
  name: string
  description: string
  tags: SkillTag[]
  author: string
  uses: number
  updatedAt: string
  spaceAction: 'add' | 'added' | 'shared'
  spaceActionLabel: string
  shared: boolean
  sharedSpaceIds?: string[]
  uploadStatus?: 'uploading' | 'ready'
}

const collapsedOfficialSkills: OfficialSkill[] = [
  {
    id: 'slp',
    name: 'slp',
    tags: [
      { label: '官方内置', tone: 'official' },
      { label: '企业全景规划', tone: 'category' },
    ],
    description: skillDescription,
  },
  {
    id: 'srp',
    name: 'srp',
    tags: [
      { label: '官方内置', tone: 'official' },
      { label: '企业全景规划', tone: 'category' },
    ],
    description: skillDescription,
  },
  {
    id: 'skp',
    name: 'skp',
    tags: [
      { label: '官方内置', tone: 'official' },
      { label: '挖知识', tone: 'category' },
    ],
    description: skillDescription,
  },
  {
    id: 'sdp-product',
    name: 'sdp-product',
    tags: [
      { label: '官方内置', tone: 'official' },
      { label: '挖知识', tone: 'category' },
    ],
    description: skillDescription,
  },
]

const extraOfficialSkills: OfficialSkill[] = [
  {
    id: 'manage-todos',
    name: 'manage-todos',
    tags: [
      { label: '官方内置', tone: 'official' },
      { label: '通用', tone: 'category' },
    ],
    description: skillDescription,
  },
  {
    id: 'scenario-landscape',
    name: 'scenario-landscape',
    tags: [
      { label: '官方内置', tone: 'official' },
      { label: '通用', tone: 'category' },
    ],
    description: skillDescription,
  },
]

export const createdSkills: CustomSkill[] = [
  {
    id: 'minutes-extract',
    name: 'minutes-extract',
    description: skillDescription,
    tags: [
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'add',
    spaceActionLabel: '管理空间显示与共享',
    shared: false,
  },
  {
    id: 'mail-user-intent-mining',
    name: 'mail-user-intent-mining',
    description: skillDescription,
    tags: [
      { label: '共享', tone: 'shared' },
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'shared',
    spaceActionLabel: '2 个空间已显示、1 个空间已共享',
    shared: true,
    sharedSpaceIds: [currentSpaceId, 'executives', 'dji-qa', 'llm-test-deepseek'],
  },
  {
    id: 'minutes-extract-2',
    name: 'minutes-extract-2',
    description: skillDescription,
    tags: [
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'add',
    spaceActionLabel: '管理空间显示与共享',
    shared: false,
  },
  {
    id: 'user-memory-2',
    name: 'user-memory-2',
    description: skillDescription,
    tags: [
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'added',
    spaceActionLabel: '4 个空间已显示',
    shared: false,
  },
  {
    id: 'mail-user-intent-mining-2',
    name: 'mail-user-intent-mining-2',
    description: skillDescription,
    tags: [
      { label: '共享', tone: 'shared' },
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'shared',
    spaceActionLabel: '2 个空间已显示、1 个空间已共享',
    shared: true,
    sharedSpaceIds: ['executives', 'llm-test-minimax', 'llm-test-qwen', 'llm-test-glm'],
  },
  {
    id: 'minutes-extract-3',
    name: 'minutes-extract-3',
    description: skillDescription,
    tags: [
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'add',
    spaceActionLabel: '管理空间显示与共享',
    shared: false,
  },
  {
    id: 'user-memory-3',
    name: 'user-memory-3',
    description: skillDescription,
    tags: [
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'added',
    spaceActionLabel: '4 个空间已显示',
    shared: false,
  },
  {
    id: 'mail-user-intent-mining-3',
    name: 'mail-user-intent-mining-3',
    description: skillDescription,
    tags: [
      { label: '共享', tone: 'shared' },
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 109,
    updatedAt: '2026-06-16 19:07',
    spaceAction: 'shared',
    spaceActionLabel: '2 个空间已显示、1 个空间已共享',
    shared: true,
    sharedSpaceIds: [currentSpaceId, 'dji-qa', 'llm-test-kimi-k2.7'],
  },
]

const filterSpaceOptions = [
  { id: 'all', name: '不限空间' },
  { id: currentSpaceId, name: spaceName },
  { id: 'agentos-org', name: 'AgentOS 组织' },
  { id: 'executives', name: '高管' },
  { id: 'dji-qa', name: 'DJI-QA' },
  { id: 'llm-test-deepseek', name: 'llm-test-deepseek' },
  { id: 'llm-test-minimax', name: 'llm-test-minimax' },
  { id: 'llm-test-qwen', name: 'llm-test-qwen' },
  { id: 'llm-test-kimi-k2.7', name: 'llm-test-kimi' },
  { id: 'llm-test-glm', name: 'llm-test-glm' },
] as const

export type SpaceAssignment = {
  added: boolean
  shared: boolean
}

const skillSpaceOptions = [
  { id: currentSpaceId, name: spaceName },
  { id: 'executives', name: '高管' },
  { id: 'dji-qa', name: 'DJI-QA' },
  { id: 'llm-test-deepseek', name: 'llm-test-deepseek' },
  { id: 'llm-test-minimax', name: 'llm-test-minimax' },
  { id: 'llm-test-qwen', name: 'llm-test-qwen' },
  { id: 'llm-test-glm', name: 'llm-test-glm' },
  { id: 'llm-test-kimi-k2.7', name: 'llm-test-kimi-k2.7' },
] as const

function emptySpaceAssignments(): Record<string, SpaceAssignment> {
  return Object.fromEntries(
    skillSpaceOptions.map((space) => [space.id, { added: false, shared: false }]),
  )
}

function getSkillMenuSpaces(skill: CustomSkill, allowShare: boolean) {
  if (allowShare || !skill.sharedSpaceIds?.length) {
    return skillSpaceOptions
  }
  return skillSpaceOptions.filter((space) => skill.sharedSpaceIds?.includes(space.id))
}

export function createSpaceAssignments(skill: CustomSkill): Record<string, SpaceAssignment> {
  const next = emptySpaceAssignments()
  if (skill.spaceAction === 'added') {
    next.executives = { added: true, shared: false }
    next['dji-qa'] = { added: true, shared: false }
    next['llm-test-deepseek'] = { added: true, shared: false }
    next['llm-test-minimax'] = { added: true, shared: false }
    return next
  }
  if (skill.spaceAction === 'shared') {
    const sharedSpaces = skill.sharedSpaceIds ?? []
    sharedSpaces.forEach((spaceId, index) => {
      if (index === 0) {
        next[spaceId] = { added: true, shared: false }
      } else if (index === 1) {
        next[spaceId] = { added: true, shared: true }
      }
    })
    return next
  }
  return next
}

export function createCurrentSpaceOnlyAssignments(): Record<string, SpaceAssignment> {
  const next = emptySpaceAssignments()
  next[currentSpaceId] = { added: true, shared: false }
  return next
}

function formatSkillTimestamp(date = new Date()) {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function createUploadedSkill(file: File): CustomSkill {
  const name = file.name.replace(/\.[^/.]+$/, '').trim() || `skill-${Date.now()}`
  return {
    id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    description: skillDescription,
    tags: [
      { label: '企业全景规划' },
      { label: '理需求' },
      { label: '挖知识' },
      { label: '生智能' },
    ],
    author: 'Siqi Yang',
    uses: 0,
    updatedAt: formatSkillTimestamp(),
    spaceAction: 'added',
    spaceActionLabel: '1 个空间已显示',
    shared: false,
    uploadStatus: 'uploading',
  }
}

export function createInitialSkillAssignments() {
  return Object.fromEntries(
    createdSkills.map((skill) => [skill.id, createSpaceAssignments(skill)]),
  )
}

function summarizeSpaceAssignments(
  assignments: Record<string, SpaceAssignment>,
  allowShare = true,
  spaceIds?: readonly string[],
) {
  const ids = spaceIds ?? Object.keys(assignments)
  const added = ids.filter((id) => assignments[id]?.added).length
  const shared = allowShare ? ids.filter((id) => assignments[id]?.shared).length : 0
  if (added === 0 && shared === 0) {
    return { label: allowShare ? '管理空间显示与共享' : '管理空间显示', empty: true }
  }
  if (!allowShare) {
    return { label: `${added} 个空间已显示`, empty: false }
  }
  return { label: `${added} 个空间已显示、${shared} 个空间已共享`, empty: false }
}

const tagClassName = 'max-w-none min-w-12 text-agentos-sm'
const moreTagClassName = cn(
  'h-[22px] w-fit min-w-[22px] max-w-none shrink-0 justify-center px-2',
  'overflow-visible [&>span]:min-w-min [&>span]:flex-none [&>span]:overflow-visible [&>span]:whitespace-nowrap',
)
const currentSpaceTagClassName =
  'h-[18px] max-w-none min-w-0 shrink-0 px-agentos-padding-padding-xxs4 text-agentos-sm leading-[16px]'
const dropdownContentClassName = 'p-1 shadow-[0_4px_10px_rgba(0,0,0,0.1)]'
const dropdownItemClassName = 'rounded-agentos-rounded-md6 [&_svg]:size-[14px]'

function CurrentSpaceTag() {
  return (
    <Tag size="sm" shape="rectangle" color="default" className={currentSpaceTagClassName}>
      当前空间
    </Tag>
  )
}

function SkillTag({ label, tone = 'category' }: SkillTag) {
  if (tone === 'official') {
    return (
      <Tag
        shape="rounded"
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
        shape="rounded"
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
    <Tag shape="rounded" color="default" className={tagClassName}>
      {label}
    </Tag>
  )
}

function OneLineSkillTags({ tags }: { tags: SkillTag[] }) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const [visibleCount, setVisibleCount] = useState(tags.length)

  useLayoutEffect(() => {
    const row = rowRef.current
    const measure = measureRef.current
    if (!row || !measure) {
      return
    }

    const update = () => {
      const available = row.clientWidth
      const tagEls = [...measure.querySelectorAll<HTMLElement>('[data-skill-tag]')]
      const moreEl = measure.querySelector<HTMLElement>('[data-more]')
      const gap = 4
      const moreWidth = moreEl?.offsetWidth ?? 0
      let used = 0
      let count = 0

      for (let index = 0; index < tagEls.length; index += 1) {
        const width = tagEls[index]?.offsetWidth ?? 0
        const nextUsed = used + (count > 0 ? gap : 0) + width
        const isLast = index === tagEls.length - 1
        if (isLast) {
          if (nextUsed <= available) {
            count += 1
          }
          break
        }

        let rest = nextUsed
        let remainingFit = true
        for (let next = index + 1; next < tagEls.length; next += 1) {
          rest += gap + (tagEls[next]?.offsetWidth ?? 0)
          if (rest > available) {
            remainingFit = false
            break
          }
        }

        if (remainingFit) {
          used = nextUsed
          count += 1
          continue
        }

        if (nextUsed + gap + moreWidth <= available) {
          used = nextUsed
          count += 1
          continue
        }

        break
      }

      setVisibleCount(tagEls.length === 0 ? 0 : Math.max(count, 1))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(row)
    return () => observer.disconnect()
  }, [tags])

  const hiddenCount = Math.max(tags.length - visibleCount, 0)

  return (
    <div className="relative h-[22px] min-w-0 w-full">
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex items-center gap-1"
      >
        {tags.map((tag) => (
          <span key={tag.label} data-skill-tag className="inline-flex shrink-0">
            <SkillTag {...tag} />
          </span>
        ))}
        <span data-more className="inline-flex shrink-0">
          <Tag shape="rounded" color="default" className={moreTagClassName}>
            +99
          </Tag>
        </span>
      </div>
      <div ref={rowRef} className="flex h-[22px] min-w-0 w-full flex-nowrap items-center gap-1 overflow-hidden">
        {tags.slice(0, visibleCount).map((tag) => (
          <span key={tag.label} className="inline-flex shrink-0">
            <SkillTag {...tag} />
          </span>
        ))}
        {hiddenCount > 0 ? (
          <Tag shape="rounded" color="default" className={moreTagClassName}>
            +{hiddenCount}
          </Tag>
        ) : null}
      </div>
    </div>
  )
}

function OfficialSkillCard({ skill }: { skill: OfficialSkill }) {
  return (
    <div className="flex min-w-0 items-center gap-agentos-gap-gap-xs8 overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container px-agentos-padding-padding-sm12 py-agentos-padding-padding-xs8">
      <div className="flex shrink-0 items-center gap-agentos-gap-gap-xxs4">
        <span className="whitespace-nowrap font-agentos-en text-agentos-base font-agentos-semibold leading-agentos-20 text-agentos-neutral-text-color-text">
          {skill.name}
        </span>
        {skill.tags.map((tag) => (
          <SkillTag key={`${skill.id}-${tag.label}`} {...tag} />
        ))}
      </div>
      <p className="min-w-0 flex-1 truncate text-agentos-sm leading-[16px] text-agentos-neutral-text-color-text-description">
        {skill.description}
      </p>
    </div>
  )
}

function SpaceStatusButton({
  active,
  activeLabel,
  inactiveLabel,
  ariaLabel,
  onClick,
  icon: Icon,
}: {
  active: boolean
  activeLabel: string
  inactiveLabel: string
  ariaLabel: string
  onClick: () => void
  icon: typeof Eye
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-0.5 whitespace-nowrap rounded-agentos-rounded-sm4',
        'px-agentos-padding-padding6 text-agentos-sm leading-[16px]',
        'hover:bg-agentos-neutral-fill-color-fill-secondary',
        active
          ? 'text-agentos-brand-primary-color-primary'
          : 'text-agentos-neutral-text-color-text-quaternary',
      )}
    >
      <Icon aria-hidden="true" className="size-[14px]" />
      {active ? activeLabel : inactiveLabel}
    </button>
  )
}

function SkillSpaceMenu({
  allowShare,
  spaces,
  assignments,
  onAssignmentsChange,
}: {
  allowShare: boolean
  spaces: readonly { id: string; name: string }[]
  assignments: Record<string, SpaceAssignment>
  onAssignmentsChange: Dispatch<SetStateAction<Record<string, SpaceAssignment>>>
}) {
  const spaceIds = spaces.map((space) => space.id)
  const summary = summarizeSpaceAssignments(assignments, allowShare, spaceIds)

  const setSpaceAdded = (id: string, added: boolean) => {
    onAssignmentsChange((current) => ({
      ...current,
      [id]: { added, shared: current[id]?.shared ?? false },
    }))
  }

  const setSpaceShared = (id: string, shared: boolean) => {
    onAssignmentsChange((current) => ({
      ...current,
      [id]: { added: current[id]?.added ?? false, shared },
    }))
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-8 w-full items-center gap-1 rounded-agentos-rounded-lg8 pl-3 pr-2',
            'text-left text-agentos-sm leading-[16px] text-agentos-neutral-text-color-text-secondary',
            summary.empty
              ? 'border border-dashed border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container'
              : 'bg-agentos-neutral-fill-color-fill-secondary',
          )}
        >
          <span className="min-w-0 flex-1 truncate">{summary.label}</span>
          <ChevronRight
            aria-hidden="true"
            className={summary.empty ? 'size-4' : 'size-[14px]'}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        placement="bottomLeft"
        showArrow={false}
        sideOffset={4}
        width="var(--radix-popover-trigger-width)"
        style={{ maxWidth: 'var(--radix-popover-trigger-width)', maxHeight: 280 }}
        className={cn(
          'pointer-events-auto z-[1300] max-h-[280px] w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-trigger-width)] gap-0 overflow-hidden',
          'border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-1',
          'shadow-[0_4px_10px_rgba(0,0,0,0.1)]',
        )}
      >
        <div className="composer-scrollview flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
          {spaces.map((space) => {
            const assignment = assignments[space.id] ?? { added: false, shared: false }
            return (
              <div
                key={space.id}
                className="flex h-[36px] min-h-[36px] w-full items-center gap-agentos-gap-gap-xs8 rounded-agentos-rounded-lg8 px-2 py-[7px] hover:bg-agentos-neutral-fill-color-fill-tertiary"
              >
                <span className="flex min-w-0 flex-1 items-center gap-agentos-gap-gap-xxs4">
                  <span className="min-w-0 truncate text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text">
                    {space.name}
                  </span>
                  {space.id === currentSpaceId ? <CurrentSpaceTag /> : null}
                </span>
                <div className="flex shrink-0 items-center gap-agentos-gap-gap-xs8">
                  <SpaceStatusButton
                    active={assignment.added}
                    activeLabel="显示"
                    inactiveLabel="隐藏"
                    ariaLabel={`${assignment.added ? '隐藏' : '显示'}${space.name}`}
                    icon={assignment.added ? Eye : EyeOff}
                    onClick={() => setSpaceAdded(space.id, !assignment.added)}
                  />
                  {allowShare ? (
                    <SpaceStatusButton
                      active={assignment.shared}
                      activeLabel="共享"
                      inactiveLabel="私有"
                      ariaLabel={`${assignment.shared ? '取消共享' : '共享到'}${space.name}`}
                      icon={assignment.shared ? LockOpen : Lock}
                      onClick={() => setSpaceShared(space.id, !assignment.shared)}
                    />
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SkillMoreMenu({
  skillName,
  onReupload,
  onDelete,
}: {
  skillName: string
  onReupload: () => void
  onDelete: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          theme="black"
          appearance="ghost"
          size="icon"
          shape="rectangle"
          aria-label={`${skillName} 更多操作`}
          className="size-6 shrink-0 [&_svg]:size-3"
        >
          <Ellipsis aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn('z-[1400] min-w-[132px]', dropdownContentClassName)}
      >
        <DropdownMenuItem className={dropdownItemClassName}>
          <Pencil aria-hidden="true" />
          编辑技能
        </DropdownMenuItem>
        <DropdownMenuItem className={dropdownItemClassName} onSelect={onReupload}>
          <RefreshCw aria-hidden="true" />
          重新上传
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            dropdownItemClassName,
            'text-agentos-brand-error-color-error focus:text-agentos-brand-error-color-error data-[highlighted]:text-agentos-brand-error-color-error',
          )}
          onSelect={onDelete}
        >
          <Trash2 aria-hidden="true" />
          删除技能
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CustomSkillCard({
  skill,
  allowShare,
  assignments,
  onAssignmentsChange,
  onReupload,
  onDelete,
}: {
  skill: CustomSkill
  allowShare: boolean
  assignments: Record<string, SpaceAssignment>
  onAssignmentsChange: Dispatch<SetStateAction<Record<string, SpaceAssignment>>>
  onReupload: () => void
  onDelete: () => void
}) {
  const menuSpaces = getSkillMenuSpaces(skill, allowShare)

  if (skill.uploadStatus === 'uploading') {
    return (
      <div className="flex h-full min-w-0 items-center justify-center overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container">
        <div className="inline-flex items-center gap-agentos-gap-gap-xxs4 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-tertiary">
          <LoaderCircle aria-hidden="true" className="size-4 shrink-0 animate-spin" />
          上传中
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-agentos-gap-gap-sm12 self-start overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding-sm12">
      <div className="flex w-full flex-col gap-agentos-gap-gap-xs8">
        <div className="flex h-5 items-center gap-agentos-gap-gap-xs8">
          <p className="min-w-0 flex-1 truncate font-agentos-en text-agentos-base font-agentos-semibold leading-agentos-20 text-agentos-neutral-text-color-text">
            {skill.name}
          </p>
          {allowShare ? (
            <SkillMoreMenu
              skillName={skill.name}
              onReupload={onReupload}
              onDelete={onDelete}
            />
          ) : null}
        </div>
        <p className="truncate text-agentos-sm leading-[16px] text-agentos-neutral-text-color-text-secondary">
          {skill.description}
        </p>
        <OneLineSkillTags tags={skill.tags} />
      </div>
      <div className="flex items-center gap-agentos-gap-gap-sm12 text-agentos-sm leading-[16px] text-agentos-neutral-text-color-text-tertiary">
        <span className="inline-flex items-center gap-1">
          <UserRound aria-hidden="true" className="size-[14px]" />
          {skill.author}
        </span>
        <span className="inline-flex items-center gap-1">
          <Wrench aria-hidden="true" className="size-[14px]" />
          {skill.uses}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock9 aria-hidden="true" className="size-[14px]" />
          {skill.updatedAt}
        </span>
      </div>
      <SkillSpaceMenu
        allowShare={allowShare}
        spaces={menuSpaces}
        assignments={assignments}
        onAssignmentsChange={onAssignmentsChange}
      />
    </div>
  )
}

function SpaceFilterSelect({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected =
    filterSpaceOptions.find((space) => space.id === value) ?? filterSpaceOptions[0]

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-agentos-control-control-height-md32 w-full items-center',
            'gap-agentos-gap-gap-xxs4 rounded-agentos-rounded-lg8 border border-solid',
            'bg-agentos-neutral-bg-color-bg-container px-agentos-padding-padding-sm12',
            'text-left font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18',
            'tracking-agentos-normal outline-none',
            '[&_svg]:pointer-events-none [&_svg]:size-agentos-icon-icon-size-sm12 [&_svg]:shrink-0',
            open
              ? 'border-agentos-brand-primary-color-primary shadow-[0_0_0_2px_var(--agentos-brand-primary-color-primary-outline)]'
              : 'border-agentos-neutral-border-color-border hover:border-agentos-neutral-border-color-border-hover',
          )}
        >
          <span className="min-w-0 flex-1 truncate text-agentos-neutral-text-color-text">
            {selected.name}
          </span>
          <ChevronDown aria-hidden="true" className="text-agentos-neutral-icon-color-icon" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        placement="bottomRight"
        showArrow={false}
        sideOffset={4}
        width={260}
        style={{ maxWidth: 260 }}
        className={cn(
          'pointer-events-auto z-[1300] w-[260px] max-h-[280px] max-w-[260px] gap-0 overflow-hidden',
          'border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-1',
          'shadow-[0_4px_10px_rgba(0,0,0,0.1)]',
        )}
      >
        <div className="composer-scrollview min-h-0 flex-1 overflow-y-auto">
          {filterSpaceOptions.map((space) => {
            const isSelected = space.id === selected.id
            return (
              <button
                key={space.id}
                type="button"
                className={cn(
                  'flex h-[36px] min-h-[36px] w-full items-center gap-agentos-gap-gap-xs8 rounded-agentos-rounded-lg8 px-2 py-[7px]',
                  'text-left text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text',
                  'hover:bg-agentos-neutral-fill-color-fill-tertiary',
                )}
                onClick={() => {
                  onValueChange(space.id)
                  setOpen(false)
                }}
              >
                <span className="flex min-w-0 flex-1 items-center gap-agentos-gap-gap-xxs4">
                  <span className="min-w-0 truncate">{space.name}</span>
                  {space.id === currentSpaceId ? <CurrentSpaceTag /> : null}
                </span>
                {isSelected ? (
                  <Check
                    aria-hidden="true"
                    className="size-4 shrink-0 text-agentos-brand-primary-color-primary"
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function ManageSkillsModal({
  open,
  initialSpace = 'all',
  skillAssignments,
  extraSkills = [],
  hiddenSkillIds = [],
  onSkillAssignmentsChange,
  onOpenChange,
  onCreateSkill,
  onUploadSkill,
  onReuploadSkill,
  onDeleteSkill,
}: {
  open: boolean
  initialSpace?: string
  skillAssignments: Record<string, Record<string, SpaceAssignment>>
  extraSkills?: CustomSkill[]
  hiddenSkillIds?: string[]
  onSkillAssignmentsChange: (
    skillId: string,
    updater: SetStateAction<Record<string, SpaceAssignment>>,
  ) => void
  onOpenChange: (open: boolean) => void
  onCreateSkill: () => void
  onUploadSkill: (file: File) => void
  onReuploadSkill: (skillId: string, file: File) => void
  onDeleteSkill: (skillId: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [tab, setTab] = useState<'created' | 'shared'>('created')
  const [space, setSpace] = useState(initialSpace)
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const reuploadSkillIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (open) {
      setSpace(initialSpace)
      if (initialSpace !== 'all') {
        setTab('shared')
      }
    }
  }, [open, initialSpace])

  const officialSkills = expanded
    ? [...collapsedOfficialSkills, ...extraOfficialSkills]
    : collapsedOfficialSkills

  const filteredSpaceId = space === 'all' ? null : space

  const customSkills = useMemo(() => {
    const hidden = new Set(hiddenSkillIds)
    const extraIds = new Set(extraSkills.map((skill) => skill.id))
    const created = createdSkills.filter(
      (skill) => !hidden.has(skill.id) && !extraIds.has(skill.id),
    )
    const extras = extraSkills.filter((skill) => !hidden.has(skill.id))
    const list =
      tab === 'shared' ? created.filter((skill) => skill.shared) : [...extras, ...created]
    if (tab !== 'shared' || !filteredSpaceId) {
      return list
    }
    return list.filter((skill) => skill.sharedSpaceIds?.includes(filteredSpaceId))
  }, [tab, filteredSpaceId, extraSkills, hiddenSkillIds])

  return (
    <>
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        className="h-[min(760px,calc(100dvh-80px))] w-[min(1000px,calc(100vw-48px))] gap-4 rounded-agentos-rounded2-xl16 bg-agentos-neutral-bg-color-bg-container px-5 py-4 duration-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none"
        overlayClassName="duration-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none"
      >
        <ModalHeader className="border-b-0 px-0 py-0">
          <ModalTitle className="font-agentos-cn text-agentos-lg font-agentos-medium leading-agentos-24">
            智能体工作坊技能
          </ModalTitle>
          <ModalCloseButton closeLabel={closeLabel} />
        </ModalHeader>
        <ModalDescription className="sr-only">管理官方内置技能与自定义技能</ModalDescription>
        <ModalBody className="composer-scrollview min-h-0 gap-4 overflow-y-auto px-0 py-0">
          <section className="flex w-full flex-col gap-3">
            <div className="flex h-8 items-center">
              <h3 className="text-agentos-md font-agentos-medium leading-agentos-18 text-agentos-neutral-text-color-text">
                官方内置
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {officialSkills.map((skill) => (
                <OfficialSkillCard key={skill.id} skill={skill} />
              ))}
            </div>
            <button
              type="button"
              className="mx-auto flex items-center gap-1 rounded-agentos-rounded-lg8 text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-tertiary"
              onClick={() => setExpanded((current) => !current)}
            >
              {expanded ? '收起' : '查看全部'}
              <ChevronDown aria-hidden="true" className={cn('size-[14px]', expanded && 'rotate-180')} />
            </button>
          </section>

          <section className="flex min-h-0 w-full flex-1 flex-col gap-3">
            <div className="flex h-8 shrink-0 items-center gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <button
                  type="button"
                  className={cn(
                    'text-agentos-md leading-agentos-18',
                    tab === 'created'
                      ? 'font-agentos-medium text-agentos-neutral-text-color-text'
                      : 'text-agentos-neutral-text-color-text-description',
                  )}
                  onClick={() => setTab('created')}
                >
                  我创建的
                </button>
                <button
                  type="button"
                  className={cn(
                    'text-agentos-md leading-agentos-18',
                    tab === 'shared'
                      ? 'font-agentos-medium text-agentos-neutral-text-color-text'
                      : 'text-agentos-neutral-text-color-text-description',
                  )}
                  onClick={() => setTab('shared')}
                >
                  他人共享的
                </button>
              </div>
              {tab === 'shared' ? (
                <div className="w-[160px] shrink-0">
                  <SpaceFilterSelect value={space} onValueChange={setSpace} />
                </div>
              ) : null}
              <Button
                type="button"
                theme="black"
                appearance="outline"
                size="default"
                shape="rectangle"
              >
                下载技能模板
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    theme="black"
                    appearance="solid"
                    size="default"
                    shape="rectangle"
                    trailingIcon={<ChevronDown aria-hidden="true" />}
                  >
                    新建技能
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={cn('z-[1300] min-w-[132px]', dropdownContentClassName)}
                >
                  <DropdownMenuItem
                    className={dropdownItemClassName}
                    onSelect={onCreateSkill}
                  >
                    <MessageCircleMore aria-hidden="true" />
                    创建技能
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={dropdownItemClassName}
                    onSelect={() => uploadInputRef.current?.click()}
                  >
                    <Upload aria-hidden="true" />
                    上传技能
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <input
                ref={uploadInputRef}
                type="file"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  if (!file) {
                    return
                  }
                  setTab('created')
                  const reuploadId = reuploadSkillIdRef.current
                  reuploadSkillIdRef.current = null
                  if (reuploadId) {
                    onReuploadSkill(reuploadId, file)
                    return
                  }
                  onUploadSkill(file)
                }}
              />
            </div>
            {customSkills.length === 0 ? (
              <div className="flex min-h-0 flex-1 items-center justify-center text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text-tertiary">
                暂无技能
              </div>
            ) : (
              <div className="grid grid-cols-2 items-stretch gap-3 min-[960px]:grid-cols-3">
                {customSkills.map((skill) => (
                  <CustomSkillCard
                    key={skill.id}
                    skill={tab === 'shared' ? { ...skill, author: 'Mark Lee' } : skill}
                    allowShare={tab === 'created'}
                    assignments={skillAssignments[skill.id] ?? createSpaceAssignments(skill)}
                    onAssignmentsChange={(updater) => onSkillAssignmentsChange(skill.id, updater)}
                    onReupload={() => {
                      reuploadSkillIdRef.current = skill.id
                      uploadInputRef.current?.click()
                    }}
                    onDelete={() => setSkillToDelete(skill.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
    <InformationModal
      open={skillToDelete != null}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setSkillToDelete(null)
        }
      }}
      semantic="warning"
      title="是否删除该技能"
      description="删除后，将无法在所有空间内使用"
      closeLabel={closeLabel}
      cancelLabel={cancelLabel}
      confirmLabel={deleteLabel}
      contentClassName="z-[1400] duration-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none"
      onConfirm={() => {
        if (skillToDelete) {
          onDeleteSkill(skillToDelete)
        }
        setSkillToDelete(null)
      }}
    />
  </>
  )
}
