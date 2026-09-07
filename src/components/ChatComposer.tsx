import { Button, cn } from '@agentos/design-system'
import { ArrowUp, ChevronDown, Image, Paperclip } from 'lucide-react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import { composerPlaceholder, currentSpaceId } from '../fixtures/chat-lab'
import {
  createdSkills,
  createCurrentSpaceOnlyAssignments,
  createInitialSkillAssignments,
  createUploadedSkill,
  ManageSkillsModal,
  type CustomSkill,
  type SpaceAssignment,
} from './ManageSkillsModal'
import {
  flattenSlashItems,
  getFilteredSlashSections,
  getKnownSkillCommands,
  getSlashTokenAtCursor,
  SlashMenu,
  type SlashMenuItem,
} from './SlashMenu'

const MAX_TEXTAREA_HEIGHT = 200

function toSlashCustomItem(skill: CustomSkill, assignment?: SpaceAssignment): SlashMenuItem {
  const tags: NonNullable<SlashMenuItem['tags']> = []
  if (assignment?.shared) {
    tags.push({ label: '共享', tone: 'shared' })
  }
  for (const tag of skill.tags) {
    if (tag.tone === 'shared') {
      continue
    }
    tags.push({ label: tag.label, tone: tag.tone ?? 'category' })
  }
  return {
    id: skill.id,
    kind: 'skill',
    command: `/${skill.name}`,
    insertValue: `/${skill.name} `,
    description: skill.description,
    label: `/${skill.name}`,
    tags,
  }
}

function renderComposerHighlight(value: string, knownSkillCommands: string[]) {
  const parts: ReactNode[] = []
  let index = 0
  let key = 0

  while (index < value.length) {
    const atTokenStart = value[index] === '/' && (index === 0 || /\s/.test(value[index - 1] ?? ''))
    const matched = atTokenStart
      ? knownSkillCommands.find((command) => {
          if (value.slice(index, index + command.length) !== command) {
            return false
          }
          const after = value[index + command.length]
          return after == null || /\s/.test(after)
        })
      : undefined

    if (matched) {
      parts.push(
        <span key={key} className="text-agentos-brand-primary-color-primary">
          {matched}
        </span>,
      )
      key += 1
      index += matched.length
      continue
    }

    let next = index + 1
    while (next < value.length) {
      const isSkillStart = value[next] === '/' && /\s/.test(value[next - 1] ?? '')
      if (isSkillStart) {
        break
      }
      next += 1
    }
    parts.push(
      <span key={key} className="text-agentos-neutral-text-color-text">
        {value.slice(index, next)}
      </span>,
    )
    key += 1
    index = next
  }

  if (value.endsWith('\n')) {
    parts.push('\n')
  }

  return parts
}

export function ChatComposer({
  value,
  isRunning,
  onChange,
  onSend,
  onStop,
}: {
  value: string
  isRunning: boolean
  onChange: (value: string) => void
  onSend: () => void
  onStop: () => void
}) {
  const canSend = value.trim().length > 0 && !isRunning
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const highlightRef = useRef<HTMLDivElement | null>(null)
  const composerRef = useRef<HTMLDivElement | null>(null)
  const [cursor, setCursor] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [manageInitialSpace, setManageInitialSpace] = useState('all')
  const [skillAssignments, setSkillAssignments] = useState(createInitialSkillAssignments)
  const [extraSkills, setExtraSkills] = useState<CustomSkill[]>([])
  const [hiddenSkillIds, setHiddenSkillIds] = useState<string[]>([])
  const [anchor, setAnchor] = useState<{ left: number; width: number; top: number } | null>(null)

  const allCreatedSkills = useMemo(
    () => {
      const hidden = new Set(hiddenSkillIds)
      const extraIds = new Set(extraSkills.map((skill) => skill.id))
      return [
        ...extraSkills.filter((skill) => !hidden.has(skill.id)),
        ...createdSkills.filter((skill) => !hidden.has(skill.id) && !extraIds.has(skill.id)),
      ]
    },
    [extraSkills, hiddenSkillIds],
  )

  const customSlashItems = useMemo(
    () =>
      allCreatedSkills
        .filter((skill) => skill.uploadStatus !== 'uploading')
        .filter((skill) => skillAssignments[skill.id]?.[currentSpaceId]?.added)
        .map((skill) => toSlashCustomItem(skill, skillAssignments[skill.id]?.[currentSpaceId])),
    [allCreatedSkills, skillAssignments],
  )
  const knownSkillCommands = useMemo(
    () => getKnownSkillCommands(customSlashItems),
    [customSlashItems],
  )

  const slashToken =
    getSlashTokenAtCursor(value, cursor) ?? getSlashTokenAtCursor(value, value.length)
  const hasSlashToken = slashToken != null
  const filteredItems = useMemo(
    () => flattenSlashItems(getFilteredSlashSections(slashToken?.query ?? '', customSlashItems)),
    [slashToken?.query, customSlashItems],
  )
  const slashOpen = hasSlashToken && !dismissed && filteredItems.length > 0
  const activeItem = filteredItems[activeIndex] ?? filteredItems[0]

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) {
      return
    }
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
  }, [value])

  useEffect(() => {
    if (!hasSlashToken) {
      setDismissed(false)
    }
  }, [hasSlashToken])

  useLayoutEffect(() => {
    if (!slashOpen) {
      setAnchor(null)
      return
    }
    const updateAnchor = () => {
      const rect = composerRef.current?.getBoundingClientRect()
      if (!rect) {
        return
      }
      setAnchor({ left: rect.left, width: rect.width, top: rect.top })
    }
    updateAnchor()
    window.addEventListener('resize', updateAnchor)
    window.addEventListener('scroll', updateAnchor, true)
    return () => {
      window.removeEventListener('resize', updateAnchor)
      window.removeEventListener('scroll', updateAnchor, true)
    }
  }, [slashOpen, value])

  useEffect(() => {
    if (!slashOpen) {
      return
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (composerRef.current?.contains(target)) {
        return
      }
      if (target instanceof Element && target.closest('#slash-menu')) {
        return
      }
      setDismissed(true)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [slashOpen])

  useEffect(() => {
    setActiveIndex(0)
  }, [slashToken?.query])

  useEffect(() => {
    if (activeIndex >= filteredItems.length) {
      setActiveIndex(0)
    }
  }, [activeIndex, filteredItems.length])

  const syncCursor = (element: HTMLTextAreaElement) => {
    setCursor(element.selectionStart)
  }

  const applySlashItem = (item: SlashMenuItem) => {
    if (!slashToken) {
      return
    }
    if (item.action === 'manage') {
      const next = `${value.slice(0, slashToken.start)}${value.slice(slashToken.end)}`
      onChange(next)
      setDismissed(true)
      setManageInitialSpace('all')
      setManageOpen(true)
      return
    }
    const next = `${value.slice(0, slashToken.start)}${item.insertValue}${value.slice(slashToken.end)}`
    const nextCursor = slashToken.start + item.insertValue.length
    onChange(next)
    setDismissed(true)
    setCursor(nextCursor)
    requestAnimationFrame(() => {
      const textarea = textareaRef.current
      if (!textarea) {
        return
      }
      textarea.focus()
      textarea.setSelectionRange(nextCursor, nextCursor)
    })
  }

  return (
    <div className="pointer-events-none relative z-10 -mt-agentos-padding-padding-lg24 shrink-0 px-agentos-padding-padding-lg24 pb-agentos-padding-padding-lg24 pt-agentos-padding-padding-lg24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-agentos-padding-padding-lg24 bg-gradient-to-t from-agentos-neutral-bg-color-bg-base to-transparent"
      />
      <div
        ref={composerRef}
        className="pointer-events-auto relative mx-auto flex w-full max-w-[720px] flex-col gap-agentos-gap-gap16 rounded-agentos-rounded-xl12 border border-agentos-neutral-border-color-border-secondary bg-agentos-neutral-bg-color-bg-container p-3"
      >
        {slashOpen && slashToken && anchor ? (
          <SlashMenu
            query={slashToken.query}
            activeIndex={activeIndex}
            anchor={anchor}
            customItems={customSlashItems}
            onActiveIndexChange={setActiveIndex}
            onSelect={applySlashItem}
          />
        ) : null}
        <div className="relative">
          <div
            ref={highlightRef}
            aria-hidden
            className="composer-scrollview pointer-events-none absolute inset-0 overflow-hidden whitespace-pre-wrap break-words text-agentos-md leading-agentos-22"
          >
            {renderComposerHighlight(value, knownSkillCommands)}
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            rows={1}
            placeholder={composerPlaceholder}
            role="combobox"
            aria-expanded={slashOpen}
            aria-controls={slashOpen ? 'slash-menu' : undefined}
            aria-activedescendant={slashOpen && activeItem ? `slash-option-${activeItem.id}` : undefined}
            className="composer-scrollview relative z-[1] block max-h-[200px] min-h-[var(--agentos-font-leading-22)] w-full resize-none overflow-y-auto border-0 bg-transparent text-agentos-md leading-agentos-22 text-transparent caret-[var(--agentos-neutral-text-color-text)] outline-none placeholder:text-agentos-neutral-text-color-text-placeholder"
            onScroll={(event) => {
              if (highlightRef.current) {
                highlightRef.current.scrollTop = event.currentTarget.scrollTop
              }
            }}
          onChange={(event) => {
            onChange(event.target.value)
            syncCursor(event.target)
          }}
          onClick={(event) => syncCursor(event.currentTarget)}
          onKeyUp={(event) => syncCursor(event.currentTarget)}
          onSelect={(event) => syncCursor(event.currentTarget)}
          onKeyDown={(event) => {
            if (slashOpen) {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActiveIndex((current) => Math.min(current + 1, filteredItems.length - 1))
                return
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActiveIndex((current) => Math.max(current - 1, 0))
                return
              }
              if (event.key === 'Escape') {
                event.preventDefault()
                setDismissed(true)
                return
              }
              if (event.key === 'Enter' && !event.shiftKey && activeItem) {
                event.preventDefault()
                applySlashItem(activeItem)
                return
              }
            }

            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              onSend()
            }
          }}
        />
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="button"
            theme="black"
            appearance="ghost"
            size="sm"
            shape="rectangle"
            trailingIcon={<ChevronDown aria-hidden="true" />}
          >
            Auto
          </Button>
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="添加图片"
                className="inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999 text-agentos-brand-tertiary-color-tertiary transition hover:bg-agentos-brand-tertiary-color-tertiary-bg-hover"
              >
                <Image className="size-agentos-icon-icon-size-md16" />
              </button>
              <button
                type="button"
                aria-label="添加附件"
                className="inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999 text-agentos-brand-tertiary-color-tertiary transition hover:bg-agentos-brand-tertiary-color-tertiary-bg-hover"
              >
                <Paperclip className="size-agentos-icon-icon-size-md16" />
              </button>
            </div>
            {isRunning ? (
              <button
                type="button"
                aria-label="停止生成"
                className="inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999 bg-agentos-brand-tertiary-color-tertiary text-agentos-neutral-text-color-text-light-solid"
                onClick={onStop}
              >
                <span className="size-2 rounded-[2px] bg-current" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="发送"
                disabled={!canSend}
                className={cn(
                  'inline-flex size-agentos-control-control-height-sm24 items-center justify-center rounded-agentos-rounded-full999',
                  'bg-agentos-brand-tertiary-color-tertiary text-agentos-neutral-text-color-text-light-solid',
                  'disabled:cursor-not-allowed disabled:bg-agentos-neutral-bg-color-bg-button-container-disabled-black disabled:text-agentos-neutral-text-color-text-disabled disabled:opacity-100',
                )}
                onClick={onSend}
              >
                <ArrowUp className="size-agentos-icon-icon-size-md16" />
              </button>
            )}
          </div>
        </div>
      </div>
      <ManageSkillsModal
        open={manageOpen}
        initialSpace={manageInitialSpace}
        skillAssignments={skillAssignments}
        extraSkills={extraSkills}
        hiddenSkillIds={hiddenSkillIds}
        onSkillAssignmentsChange={(skillId, updater) => {
          setSkillAssignments((current) => {
            const previous = current[skillId] ?? {}
            const next = typeof updater === 'function' ? updater(previous) : updater
            return { ...current, [skillId]: next }
          })
        }}
        onOpenChange={setManageOpen}
        onCreateSkill={() => {
          setManageOpen(false)
          onChange('/workshop-skill-creator ')
          setCursor('/workshop-skill-creator '.length)
          requestAnimationFrame(() => {
            const textarea = textareaRef.current
            if (!textarea) {
              return
            }
            textarea.focus()
            textarea.setSelectionRange('/workshop-skill-creator '.length, '/workshop-skill-creator '.length)
          })
        }}
        onUploadSkill={(file) => {
          const skill = createUploadedSkill(file)
          setExtraSkills((current) => [skill, ...current])
          setSkillAssignments((current) => ({
            ...current,
            [skill.id]: createCurrentSpaceOnlyAssignments(),
          }))
          window.setTimeout(() => {
            setExtraSkills((current) =>
              current.map((item) =>
                item.id === skill.id ? { ...item, uploadStatus: 'ready' } : item,
              ),
            )
          }, 1400)
        }}
        onReuploadSkill={(skillId, file) => {
          const uploaded = { ...createUploadedSkill(file), id: skillId }
          setExtraSkills((current) => {
            const exists = current.some((skill) => skill.id === skillId)
            if (exists) {
              return current.map((skill) => (skill.id === skillId ? uploaded : skill))
            }
            return [uploaded, ...current]
          })
          setSkillAssignments((current) => ({
            ...current,
            [skillId]: current[skillId] ?? createCurrentSpaceOnlyAssignments(),
          }))
          window.setTimeout(() => {
            setExtraSkills((current) =>
              current.map((item) =>
                item.id === skillId ? { ...item, uploadStatus: 'ready' } : item,
              ),
            )
          }, 1400)
        }}
        onDeleteSkill={(skillId) => {
          setHiddenSkillIds((current) =>
            current.includes(skillId) ? current : [...current, skillId],
          )
          setExtraSkills((current) => current.filter((skill) => skill.id !== skillId))
          setSkillAssignments((current) => {
            const next = { ...current }
            delete next[skillId]
            return next
          })
        }}
      />
    </div>
  )
}
