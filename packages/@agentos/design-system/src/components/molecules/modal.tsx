import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  forwardRef,
  createContext,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
  useContext,
} from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'

type ModalDismissConfig = {
  maskClosable: boolean
  escToExit: boolean
}

const ModalDismissContext = createContext<ModalDismissConfig>({
  maskClosable: true,
  escToExit: true,
})

export interface ModalProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  maskClosable?: boolean
  escToExit?: boolean
}

function Modal({
  maskClosable = true,
  escToExit = true,
  children,
  ...props
}: ModalProps) {
  return (
    <ModalDismissContext.Provider value={{ maskClosable, escToExit }}>
      <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
    </ModalDismissContext.Provider>
  )
}

const ModalTrigger = DialogPrimitive.Trigger
const ModalPortal = DialogPrimitive.Portal
const ModalClose = DialogPrimitive.Close

const ModalOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[1200] bg-agentos-mask-base',
      // 与 Content 一并显式恢复点击，避免 Dropdown→Dialog 叠加时 body 的 pointer-events:none 挡住弹层
      'pointer-events-auto',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const modalContentVariants = cva(
  cn(
    'fixed z-[1200] flex flex-col overflow-hidden pointer-events-auto',
    'bg-agentos-neutral-bg-color-bg-elevated',
    'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  ),
  {
    variants: {
      size: {
        sm: cn(
          'left-1/2 top-1/2 max-h-[calc(100dvh-160px)] w-[min(464px,calc(100vw-32px))]',
          '-translate-x-1/2 -translate-y-1/2 rounded-agentos-rounded-lg8 shadow-md',
        ),
        md: cn(
          'left-1/2 top-1/2 max-h-[calc(100dvh-160px)] w-[min(600px,calc(100vw-32px))]',
          '-translate-x-1/2 -translate-y-1/2 rounded-agentos-rounded-lg8 shadow-md',
        ),
        lg: cn(
          'left-1/2 top-1/2 max-h-[calc(100dvh-160px)] w-[min(800px,calc(100vw-32px))]',
          '-translate-x-1/2 -translate-y-1/2 rounded-agentos-rounded-lg8 shadow-md',
        ),
        full: 'inset-0 h-[100dvh] max-h-none w-screen rounded-none shadow-none',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
)

export interface ModalContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {}

const ModalContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, size = 'sm', children, onEscapeKeyDown, onInteractOutside, ...props }, ref) => {
  const { maskClosable, escToExit } = useContext(ModalDismissContext)

  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(modalContentVariants({ size }), className)}
        onEscapeKeyDown={(event) => {
          onEscapeKeyDown?.(event)
          if (!escToExit && !event.defaultPrevented) {
            event.preventDefault()
          }
        }}
        onInteractOutside={(event) => {
          onInteractOutside?.(event)
          if (!maskClosable && !event.defaultPrevented) {
            event.preventDefault()
          }
        }}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  )
})
ModalContent.displayName = DialogPrimitive.Content.displayName

function ModalHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex w-full shrink-0 items-center justify-between',
        'border-b border-solid border-agentos-neutral-border-color-border',
        'px-agentos-padding-padding-md20 py-agentos-padding-padding-sm12',
        className,
      )}
      {...props}
    />
  )
}

function ModalBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // 默认 stretch，保证 FormItem / Input 等子项能撑满 Modal 内容区宽度
        'flex w-full min-h-[76px] flex-1 flex-col overflow-auto',
        'px-agentos-padding-padding-md20 py-agentos-padding-padding16',
        className,
      )}
      {...props}
    />
  )
}

function ModalFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-16 w-full shrink-0 flex-col items-end justify-center',
        'border-t border-solid border-agentos-neutral-border-color-border',
        'px-agentos-padding-padding-md20 py-agentos-padding-padding16',
        className,
      )}
      {...props}
    />
  )
}

const ModalTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'm-0 font-agentos-en text-agentos-lg font-agentos-semibold leading-agentos-24',
      'tracking-agentos-normal text-agentos-neutral-text-color-text',
      className,
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'm-0 w-full font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18',
      'tracking-agentos-normal text-agentos-neutral-text-color-text',
      className,
    )}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

function ModalCloseButton({
  className,
  closeLabel = 'Close',
  ...props
}: ComponentPropsWithoutRef<typeof ModalClose> & { closeLabel?: string }) {
  return (
    <ModalClose
      type="button"
      aria-label={closeLabel}
      className={cn(
        'inline-flex size-agentos-icon-icon-size-md16 shrink-0 items-center justify-center',
        'rounded-agentos-rounded-sm4 border-0 bg-transparent',
        'text-agentos-neutral-icon-color-icon transition-colors',
        'hover:text-agentos-neutral-icon-color-icon-hover',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-agentos-brand-primary-color-primary',
        '[&_svg]:size-agentos-icon-icon-size-md16',
        className,
      )}
      {...props}
    >
      <X aria-hidden="true" />
      <span className="sr-only">{closeLabel}</span>
    </ModalClose>
  )
}

export type ModalSemantic = 'info' | 'success' | 'warning' | 'danger'

const semanticIconMap: Record<
  ModalSemantic,
  { Icon: LucideIcon; className: string }
> = {
  info: {
    Icon: Info,
    className: 'text-agentos-brand-info-color-info',
  },
  success: {
    Icon: CircleCheck,
    className: 'text-agentos-brand-success-color-success',
  },
  warning: {
    Icon: CircleAlert,
    className: 'text-agentos-brand-warning-color-warning',
  },
  danger: {
    Icon: CircleX,
    className: 'text-agentos-brand-error-color-error',
  },
}

function ModalSemanticIcon({
  semantic,
  className,
}: {
  semantic: ModalSemantic
  className?: string
}) {
  const { Icon, className: iconClassName } = semanticIconMap[semantic]

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        'size-agentos-icon-icon-size-lg20 [&_svg]:size-agentos-icon-icon-size-lg20',
        iconClassName,
        className,
      )}
      aria-hidden="true"
    >
      <Icon />
    </span>
  )
}

function resolveConfirmTheme(
  semantic?: ModalSemantic | null,
): 'black' | 'danger' {
  if (semantic === 'warning' || semantic === 'danger') {
    return 'danger'
  }
  return 'black'
}

export interface InformationModalProps
  extends Omit<ComponentPropsWithoutRef<typeof Modal>, 'children'>,
    VariantProps<typeof modalContentVariants> {
  title: ReactNode
  description?: ReactNode
  semantic?: ModalSemantic
  showSemanticIcon?: boolean
  showClose?: boolean
  showAction?: boolean
  closeLabel?: string
  cancelLabel?: string
  confirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
  children?: ReactNode
  contentClassName?: string
}

/** Figma modal/semantic-modal：带语义图标的信息确认弹窗 */
function InformationModal({
  title,
  description,
  semantic,
  size = 'sm',
  showSemanticIcon = true,
  showClose = true,
  showAction = true,
  closeLabel = 'Close',
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onCancel,
  onConfirm,
  children,
  contentClassName,
  ...rootProps
}: InformationModalProps) {
  const confirmTheme = resolveConfirmTheme(semantic)
  const shouldShowIcon = Boolean(semantic && showSemanticIcon)

  return (
    <Modal {...rootProps}>
      <ModalContent size={size} className={contentClassName}>
        <ModalHeader>
          <div className="flex min-w-0 items-center gap-agentos-gap-gap-xxs4">
            {shouldShowIcon && semantic ? (
              <ModalSemanticIcon semantic={semantic} />
            ) : null}
            <ModalTitle>{title}</ModalTitle>
          </div>
          {showClose ? <ModalCloseButton closeLabel={closeLabel} /> : null}
        </ModalHeader>

        <ModalBody>
          {children ??
            (description != null && description !== '' ? (
              <ModalDescription>{description}</ModalDescription>
            ) : null)}
        </ModalBody>

        {showAction ? (
          <ModalFooter>
            <div className="flex items-center gap-agentos-gap-gap-xs8">
              <ModalClose asChild>
                <Button
                  theme="black"
                  appearance="outline"
                  size="default"
                  onClick={onCancel}
                >
                  {cancelLabel}
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button
                  theme={confirmTheme}
                  appearance="solid"
                  size="default"
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </Button>
              </ModalClose>
            </div>
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  )
}

InformationModal.displayName = 'InformationModal'

export {
  InformationModal,
  Modal,
  ModalBody,
  ModalClose,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalSemanticIcon,
  ModalTitle,
  ModalTrigger,
  modalContentVariants,
}
