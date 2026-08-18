import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Upload,
  type UploadFileItem,
} from '../../../src/components/molecules/upload'

const doneFile: UploadFileItem = {
  uid: '1',
  name: 'employeelist.doc',
  status: 'done',
}

const uploadingFile: UploadFileItem = {
  uid: '2',
  name: 'employeelist.doc',
  status: 'uploading',
  percent: 45,
}

const errorFile: UploadFileItem = {
  uid: '3',
  name: 'employeelist.XLSX',
  status: 'error',
  errorMessage:
    'Import failed, Table name: product, Row: 2, Column [daily_avg_sales]: [Data length exceeds limit (max 50 characters)]',
}

const meta = {
  title: 'Molecules/Upload',
  component: Upload,
  argTypes: {
    trigger: {
      control: 'select',
      options: ['button', 'drag'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Upload>

export default meta
type Story = StoryObj<typeof meta>

function ControlledUpload(
  props: Omit<ComponentProps<typeof Upload>, 'fileList' | 'onSelect'> & {
    initialFiles?: UploadFileItem[]
  },
) {
  const { initialFiles = [], ...rest } = props
  const [fileList, setFileList] = useState<UploadFileItem[]>(initialFiles)

  return (
    <Upload
      {...rest}
      fileList={fileList}
      onSelect={(files) => {
        const next = files.map((file, index) => ({
          uid: `${Date.now()}-${index}`,
          name: file.name,
          status: 'done' as const,
        }))
        setFileList(rest.multiple ? [...fileList, ...next] : next)
      }}
      onRemove={(file) => {
        setFileList((prev) => prev.filter((item) => item.uid !== file.uid))
      }}
    />
  )
}

export const ButtonTrigger: Story = {
  args: {
    fileList: [doneFile],
    trigger: 'button',
    triggerLabel: 'Upload',
    onSelect: () => undefined,
  },
  render: (args) => (
    <ControlledUpload
      {...args}
      initialFiles={args.fileList}
      trigger="button"
    />
  ),
}

export const DragTrigger: Story = {
  args: {
    fileList: [doneFile, uploadingFile],
    trigger: 'drag',
    onSelect: () => undefined,
  },
  render: (args) => (
    <ControlledUpload
      {...args}
      initialFiles={args.fileList}
      trigger="drag"
    />
  ),
}

export const Uploading: Story = {
  args: {
    fileList: [uploadingFile],
    trigger: 'button',
    onSelect: () => undefined,
  },
}

export const Error: Story = {
  args: {
    fileList: [errorFile],
    trigger: 'button',
    onSelect: () => undefined,
    onRemove: () => undefined,
  },
}

export const AllVariants: Story = {
  args: {
    fileList: [],
    onSelect: () => undefined,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="m-0 text-agentos-sm text-agentos-neutral-text-color-text-description">
          Button + File List
        </p>
        <Upload
          trigger="button"
          triggerLabel="Upload"
          fileList={[doneFile, uploadingFile]}
          onSelect={() => undefined}
          onRemove={() => undefined}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="m-0 text-agentos-sm text-agentos-neutral-text-color-text-description">
          Drag + File List
        </p>
        <Upload
          trigger="drag"
          fileList={[doneFile, errorFile]}
          onSelect={() => undefined}
          onRemove={() => undefined}
          onDownload={() => undefined}
        />
      </div>
    </div>
  ),
}
