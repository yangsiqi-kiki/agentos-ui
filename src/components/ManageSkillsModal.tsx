import {
  Button,
  Checkbox,
  Divider,
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
  Switch,
  Tag,
  UploadTrigger,
  cn,
  type CheckboxState,
} from '@agentos/design-system'
import {
  Check,
  ChevronDown,
  ChevronRight,
  Clock9,
  Ellipsis,
  Lock,
  MessageCircleMore,
  Plus,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react'

import { closeLabel, currentSpaceId, spaceName } from '../fixtures/chat-lab'

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
    spaceActionLabel: '添加空间使用',
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
    spaceActionLabel: '2 个空间已添加、1 个空间已共享',
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
    spaceActionLabel: '添加空间使用',
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
    spaceActionLabel: '4 个空间已添加',
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
    spaceActionLabel: '2 个空间已添加、1 个空间已共享',
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
    spaceActionLabel: '添加空间使用',
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
    spaceActionLabel: '4 个空间已添加',
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
    spaceActionLabel: '2 个空间已添加、1 个空间已共享',
    shared: true,
    sharedSpaceIds: [currentSpaceId, 'dji-qa', 'llm-test-kimi-k2.7'],
  },
]

const filterSpaceOptions = [
  { id: 'all', name: '不限空间' },
  { id: 'agentos-org', name: 'AgentOS 组织' },
  { id: currentSpaceId, name: spaceName },
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
    return { label: '添加空间使用', empty: true }
  }
  if (shared === 0) {
    return { label: `${added} 个空间已添加`, empty: false }
  }
  if (added === 0) {
    return { label: `${shared} 个空间已共享`, empty: false }
  }
  return { label: `${added} 个空间已添加、${shared} 个空间已共享`, empty: false }
}

const tagClassName = 'max-w-none min-w-12 text-agentos-sm'
const moreTagClassName = cn(
  'h-[22px] w-fit min-w-[22px] max-w-none shrink-0 justify-center px-2',
  'overflow-visible [&>span]:min-w-min [&>span]:flex-none [&>span]:overflow-visible [&>span]:whitespace-nowrap',
)

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
  const addedCount = spaceIds.filter((id) => assignments[id]?.added).length
  const allChecked: CheckboxState =
    addedCount === 0 ? false : addedCount === spaces.length ? true : 'indeterminate'

  const setAllAdded = (added: boolean) => {
    onAssignmentsChange((current) => {
      const next = { ...current }
      for (const space of spaces) {
        next[space.id] = { added, shared: current[space.id]?.shared ?? false }
      }
      return next
    })
  }

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
        width={280}
        style={{ maxWidth: 280 }}
        className={cn(
          'pointer-events-auto z-[1300] w-[280px] max-w-[280px] gap-0 overflow-hidden',
          'border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-1',
          'shadow-[0_4px_10px_rgba(0,0,0,0.1)]',
        )}
      >
        <div className="composer-scrollview flex max-h-[288px] w-full flex-col overflow-y-auto">
          <div className="flex h-[36px] min-h-[36px] w-full items-center rounded-agentos-rounded-lg8 px-2 py-[7px] hover:bg-agentos-neutral-fill-color-fill-tertiary">
            <Checkbox
              checked={allChecked}
              label="添加所有空间"
              className="w-full"
              onCheckedChange={(checked) => setAllAdded(checked === true)}
            />
          </div>
          {spaces.map((space) => {
            const assignment = assignments[space.id] ?? { added: false, shared: false }
            return (
              <div
                key={space.id}
                className="group flex h-[36px] min-h-[36px] w-full items-center gap-agentos-gap-gap-xs8 rounded-agentos-rounded-lg8 px-2 py-[7px] hover:bg-agentos-neutral-fill-color-fill-tertiary"
              >
                <Checkbox
                  checked={assignment.added}
                  label={space.name}
                  className="min-w-0 flex-1 overflow-hidden [&>span:last-child]:min-w-0 [&>span:last-child]:truncate"
                  onCheckedChange={(checked) => setSpaceAdded(space.id, checked === true)}
                />
                {allowShare ? (
                  <div
                    className={cn(
                      'flex shrink-0 items-center gap-agentos-gap-gap-xxs4 transition-none duration-0',
                      assignment.shared
                        ? 'visible opacity-100'
                        : 'invisible opacity-0 group-hover:visible group-hover:opacity-100',
                    )}
                  >
                    <span className="whitespace-nowrap text-agentos-md leading-agentos-18 text-agentos-neutral-text-color-text">
                      共享
                    </span>
                    <Switch
                      size="sm"
                      checked={assignment.shared}
                      aria-label={`共享到${space.name}`}
                      onCheckedChange={(shared) => setSpaceShared(space.id, shared)}
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
        <div className="w-full px-agentos-padding-padding-xs8 py-agentos-padding-padding-xxs4">
          <Divider className="bg-agentos-neutral-border-color-split" />
        </div>
        <div className="px-2 py-[7px] pr-1 text-agentos-sm font-agentos-normal leading-[16px] text-agentos-neutral-text-color-text-quaternary whitespace-normal">
          <p>添加到对应空间后可通过 slash 调用</p>
          {allowShare ? <p>共享至对应空间后可被他人添加使用</p> : null}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function ScopedActionButton({
  done,
  disabled = false,
  idleLabel,
  doneLabel,
  cancelLabel,
  idleIcon,
  tone = 'primary',
  className,
  onClick,
}: {
  done: boolean
  disabled?: boolean
  idleLabel: string
  doneLabel: string
  cancelLabel: string
  idleIcon: 'plus' | 'lock' | 'none'
  tone?: 'primary' | 'neutral'
  className?: string
  onClick: () => void
}) {
  const IdleIcon = idleIcon === 'plus' ? Plus : idleIcon === 'lock' ? Lock : null
  const [hovered, setHovered] = useState(false)
  const ignoreHoverUntilLeave = useRef(false)
  const showCancel = done && hovered && !disabled

  return (
    <button
      type="button"
      disabled={disabled}
      onPointerEnter={() => {
        if (ignoreHoverUntilLeave.current) return
        setHovered(true)
      }}
      onPointerLeave={() => {
        ignoreHoverUntilLeave.current = false
        setHovered(false)
      }}
      onClick={() => {
        onClick()
        ignoreHoverUntilLeave.current = true
        setHovered(false)
      }}
      className={cn(
        'flex h-8 min-h-8 w-full shrink-0 items-center justify-center gap-1 rounded-agentos-rounded-lg8',
        'text-agentos-sm leading-[16px] transition-colors',
        disabled &&
          'cursor-not-allowed border border-dashed border-agentos-neutral-border-color-border text-agentos-neutral-text-color-text-disabled',
        !disabled &&
          !done &&
          (tone === 'primary'
            ? 'border border-dashed border-agentos-brand-primary-color-primary text-agentos-brand-primary-color-primary'
            : 'border border-dashed border-agentos-neutral-border-color-border text-agentos-neutral-text-color-text-secondary'),
        !disabled &&
          done &&
          !showCancel &&
          'bg-agentos-neutral-fill-color-fill-secondary text-agentos-neutral-text-color-text-secondary',
        !disabled &&
          showCancel &&
          'bg-agentos-brand-error-color-error-bg text-agentos-brand-error-color-error',
        className,
      )}
    >
      {showCancel ? (
        <>
          <X aria-hidden="true" className="size-3.5" />
          {cancelLabel}
        </>
      ) : done ? (
        <>
          <Check aria-hidden="true" className="size-3.5" />
          {doneLabel}
        </>
      ) : (
        <>
          {IdleIcon ? <IdleIcon aria-hidden="true" className="size-3.5" /> : null}
          {idleLabel}
        </>
      )}
    </button>
  )
}

function SpaceScopedActions({
  allowShare,
  added,
  shared,
  onToggleAdded,
  onToggleShared,
}: {
  allowShare: boolean
  added: boolean
  shared: boolean
  onToggleAdded: () => void
  onToggleShared: () => void
}) {
  if (!allowShare) {
    return (
      <ScopedActionButton
        done={added}
        idleLabel="添加至空间"
        doneLabel="已添加"
        cancelLabel="取消添加"
        idleIcon="plus"
        tone="neutral"
        onClick={onToggleAdded}
      />
    )
  }

  return (
    <div className="flex w-full items-center gap-agentos-gap-gap-xs8">
      <ScopedActionButton
        done={added}
        idleLabel="添加至空间"
        doneLabel="已添加"
        cancelLabel="取消添加"
        idleIcon="plus"
        tone="neutral"
        className="w-auto min-w-0 flex-1"
        onClick={onToggleAdded}
      />
      <ScopedActionButton
        done={shared}
        idleLabel="在空间共享"
        doneLabel="已共享"
        cancelLabel="取消共享"
        idleIcon="none"
        tone="neutral"
        className="w-auto min-w-0 flex-1"
        onClick={onToggleShared}
      />
    </div>
  )
}

function resolveFilteredTags({
  skill,
  allowShare,
  sharedInSpace,
}: {
  skill: CustomSkill
  allowShare: boolean
  sharedInSpace: boolean
}): SkillTag[] {
  const withoutShare = skill.tags.filter((tag) => tag.tone !== 'shared')
  if (!allowShare || sharedInSpace) {
    return [{ label: '共享', tone: 'shared' }, ...withoutShare]
  }
  return withoutShare
}

function CustomSkillCard({
  skill,
  allowShare,
  filteredSpaceId,
  assignments,
  onAssignmentsChange,
}: {
  skill: CustomSkill
  allowShare: boolean
  filteredSpaceId: string | null
  assignments: Record<string, SpaceAssignment>
  onAssignmentsChange: Dispatch<SetStateAction<Record<string, SpaceAssignment>>>
}) {
  const menuSpaces = getSkillMenuSpaces(skill, allowShare)
  const scoped = filteredSpaceId
    ? (assignments[filteredSpaceId] ?? { added: false, shared: false })
    : null
  const tags =
    scoped == null
      ? skill.tags
      : resolveFilteredTags({
          skill,
          allowShare,
          sharedInSpace: scoped.shared,
        })

  const toggleAdded = () => {
    if (!filteredSpaceId) return
    onAssignmentsChange((current) => {
      const previous = current[filteredSpaceId] ?? { added: false, shared: false }
      const added = !previous.added
      return {
        ...current,
        [filteredSpaceId]: { added, shared: previous.shared },
      }
    })
  }

  const toggleShared = () => {
    if (!filteredSpaceId) return
    onAssignmentsChange((current) => {
      const previous = current[filteredSpaceId] ?? { added: false, shared: false }
      const shared = !previous.shared
      return {
        ...current,
        [filteredSpaceId]: { added: previous.added, shared },
      }
    })
  }

  return (
    <div className="flex min-w-0 flex-col gap-agentos-gap-gap-sm12 self-start overflow-hidden rounded-agentos-rounded-lg8 border border-agentos-neutral-border-color-border bg-agentos-neutral-bg-color-bg-container p-agentos-padding-padding-sm12">
      <div className="flex w-full flex-col gap-agentos-gap-gap-xs8">
        <div className="flex h-5 items-center gap-agentos-gap-gap-xs8">
          <p className="min-w-0 flex-1 truncate font-agentos-en text-agentos-base font-agentos-semibold leading-agentos-20 text-agentos-neutral-text-color-text">
            {skill.name}
          </p>
          {allowShare ? (
            <Button
              type="button"
              theme="black"
              appearance="ghost"
              size="icon"
              shape="rectangle"
              aria-label={`${skill.name} 更多操作`}
              className="size-6 shrink-0 [&_svg]:size-3"
            >
              <Ellipsis aria-hidden="true" />
            </Button>
          ) : null}
        </div>
        <p className="truncate text-agentos-sm leading-[16px] text-agentos-neutral-text-color-text-secondary">
          {skill.description}
        </p>
        <OneLineSkillTags tags={tags} />
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
      {scoped ? (
        <SpaceScopedActions
          allowShare={allowShare}
          added={scoped.added}
          shared={scoped.shared}
          onToggleAdded={toggleAdded}
          onToggleShared={toggleShared}
        />
      ) : (
        <SkillSpaceMenu
          allowShare={allowShare}
          spaces={menuSpaces}
          assignments={assignments}
          onAssignmentsChange={onAssignmentsChange}
        />
      )}
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
                <span className="min-w-0 flex-1 truncate">{space.name}</span>
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
        <div className="w-full shrink-0 px-agentos-padding-padding-xs8 py-agentos-padding-padding-xxs4">
          <Divider className="bg-agentos-neutral-border-color-split" />
        </div>
        <div className="shrink-0 px-2 py-[7px] pr-1 text-agentos-sm font-agentos-normal leading-[16px] text-agentos-neutral-text-color-text-quaternary">
          筛选后技能将仅添加或共享至所选空间
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function ManageSkillsModal({
  open,
  initialSpace = 'all',
  skillAssignments,
  onSkillAssignmentsChange,
  onOpenChange,
  onCreateSkill,
}: {
  open: boolean
  initialSpace?: string
  skillAssignments: Record<string, Record<string, SpaceAssignment>>
  onSkillAssignmentsChange: (
    skillId: string,
    updater: SetStateAction<Record<string, SpaceAssignment>>,
  ) => void
  onOpenChange: (open: boolean) => void
  onCreateSkill: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [tab, setTab] = useState<'created' | 'shared'>('created')
  const [space, setSpace] = useState(initialSpace)

  useEffect(() => {
    if (open) {
      setSpace(initialSpace)
    }
  }, [open, initialSpace])

  const officialSkills = expanded
    ? [...collapsedOfficialSkills, ...extraOfficialSkills]
    : collapsedOfficialSkills

  const filteredSpaceId = space === 'all' ? null : space

  const customSkills = useMemo(() => {
    const list = tab === 'shared' ? createdSkills.filter((skill) => skill.shared) : createdSkills
    if (tab !== 'shared' || !filteredSpaceId) {
      return list
    }
    return list.filter((skill) => skill.sharedSpaceIds?.includes(filteredSpaceId))
  }, [tab, filteredSpaceId])

  return (
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

          <section className="flex w-full flex-col gap-3">
            <div className="flex h-8 items-center gap-3">
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
              <div className="w-[160px] shrink-0">
                <SpaceFilterSelect value={space} onValueChange={setSpace} />
              </div>
              <Button
                type="button"
                theme="black"
                appearance="solid"
                size="default"
                shape="rectangle"
                leadingIcon={<MessageCircleMore aria-hidden="true" />}
                onClick={onCreateSkill}
              >
                创建技能
              </Button>
            </div>
            <div className="grid grid-cols-2 items-stretch gap-3 min-[960px]:grid-cols-3">
              {tab === 'created' ? (
                <div className="min-h-0">
                  <UploadTrigger
                    variant="drag"
                    className="h-full min-h-0 bg-agentos-neutral-bg-color-bg-container py-0"
                    title="点击或拖拽文件到此处上传技能"
                    description={
                      <span className="text-agentos-brand-primary-color-primary">下载技能模板</span>
                    }
                  />
                </div>
              ) : null}
              {customSkills.map((skill) => (
                <CustomSkillCard
                  key={skill.id}
                  skill={tab === 'shared' ? { ...skill, author: 'Mark Lee' } : skill}
                  allowShare={tab === 'created'}
                  filteredSpaceId={filteredSpaceId}
                  assignments={skillAssignments[skill.id] ?? createSpaceAssignments(skill)}
                  onAssignmentsChange={(updater) => onSkillAssignmentsChange(skill.id, updater)}
                />
              ))}
            </div>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
