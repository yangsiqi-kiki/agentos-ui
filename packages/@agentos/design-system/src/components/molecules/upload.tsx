import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'
import {
  UploadTrigger,
  type UploadTriggerVariant,
} from '../atoms/upload-trigger'
import {
  UploadFileListItem,
  type UploadFileStatus,
} from './upload-file-list-item'

export type { UploadFileStatus }

export interface UploadFileItem {
  uid: string
  name: string
  status: UploadFileStatus
  percent?: number
  errorMessage?: string
}

export interface UploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  fileList: UploadFileItem[]
  trigger?: UploadTriggerVariant
  accept?: string
  multiple?: boolean
  disabled?: boolean
  triggerLabel?: ReactNode
  dragTitle?: ReactNode
  dragDescription?: ReactNode
  downloadLabel?: string
  removeLabel?: string
  onSelect: (files: File[]) => void
  onRemove?: (file: UploadFileItem) => void
  onDownload?: (file: UploadFileItem) => void
}

export const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      className,
      fileList,
      trigger = 'button',
      accept,
      multiple = false,
      disabled = false,
      triggerLabel,
      dragTitle,
      dragDescription,
      downloadLabel,
      removeLabel,
      onSelect,
      onRemove,
      onDownload,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const inputId = useId()
    const [dragHovered, setDragHovered] = useState(false)

    function openFilePicker() {
      if (disabled) return
      inputRef.current?.click()
    }

    function emitFiles(fileListLike: FileList | null) {
      if (!fileListLike || fileListLike.length === 0) return
      const files = Array.from(fileListLike)
      onSelect(multiple ? files : files.slice(0, 1))
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
      emitFiles(event.target.files)
    }

    function handleDragOver(event: DragEvent<HTMLButtonElement>) {
      event.preventDefault()
      if (disabled) return
      setDragHovered(true)
    }

    function handleDragLeave(event: DragEvent<HTMLButtonElement>) {
      event.preventDefault()
      setDragHovered(false)
    }

    function handleDrop(event: DragEvent<HTMLButtonElement>) {
      event.preventDefault()
      setDragHovered(false)
      if (disabled) return
      emitFiles(event.dataTransfer.files)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full flex-col gap-6',
          className,
        )}
        {...props}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="sr-only"
          tabIndex={-1}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
        />

        <UploadTrigger
          variant={trigger}
          disabled={disabled}
          label={triggerLabel}
          title={dragTitle}
          description={dragDescription}
          hovered={trigger === 'drag' ? dragHovered : undefined}
          onClick={openFilePicker}
          onDragOver={trigger === 'drag' ? handleDragOver : undefined}
          onDragLeave={trigger === 'drag' ? handleDragLeave : undefined}
          onDrop={trigger === 'drag' ? handleDrop : undefined}
        />

        {fileList.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            {fileList.map((file) => (
              <UploadFileListItem
                key={file.uid}
                name={file.name}
                status={file.status}
                percent={file.percent}
                errorMessage={file.errorMessage}
                downloadLabel={downloadLabel}
                removeLabel={removeLabel}
                onDownload={
                  onDownload ? () => onDownload(file) : undefined
                }
                onRemove={onRemove ? () => onRemove(file) : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  },
)

Upload.displayName = 'Upload'
