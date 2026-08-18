import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../../src/components/atoms/button'
import {
  InformationModal,
  Modal,
  ModalBody,
  ModalClose,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  type InformationModalProps,
  type ModalSemantic,
} from '../../../src/components/molecules/modal'

const meta = {
  title: 'Molecules/Modal',
  component: InformationModal,
  argTypes: {
    semantic: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
} satisfies Meta<typeof InformationModal>

export default meta
type Story = StoryObj<typeof meta>

function InformationModalDemo({
  defaultOpen = false,
  triggerLabel = 'Open Modal',
  ...props
}: InformationModalProps & { defaultOpen?: boolean; triggerLabel?: string }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <>
      <Button theme="black" appearance="outline" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <InformationModal open={open} onOpenChange={setOpen} {...props} />
    </>
  )
}

const infoDescription =
  'This is an info description which directly indicates a neutral informative change or action. (e.g., "We are providing new services for all developers.")'

const successDescription =
  'This is a success description which directly indicates a successful or positive action. (e.g., "You have registered successfully.")'

const warningDescription =
  'This is a warning description which directly indicates a warning that might need attention. (e.g., "Invalid request, please contact administration.")'

const dangerDescription =
  'This is an error description which directly indicates a dangerous or potentially negative action. (e.g., "It\'s an invalid request.")'

export const Default: Story = {
  render: (args) => (
    <InformationModalDemo
      {...args}
      showSemanticIcon={false}
      title="Info Notification"
      description={infoDescription}
    />
  ),
  args: {
    title: 'Info Notification',
    description: infoDescription,
    size: 'sm',
    showSemanticIcon: false,
  },
}

function semanticStory(
  semantic: ModalSemantic,
  title: string,
  description: string,
): Story {
  return {
    render: (args) => (
      <InformationModalDemo
        {...args}
        semantic={semantic}
        title={title}
        description={description}
      />
    ),
    args: {
      title,
      description,
      semantic,
      size: 'sm',
      showSemanticIcon: true,
    },
  }
}

export const Info: Story = semanticStory(
  'info',
  'Info Notification',
  infoDescription,
)

export const Success: Story = semanticStory(
  'success',
  'Success Notification',
  successDescription,
)

export const Warning: Story = semanticStory(
  'warning',
  'Info Notification',
  warningDescription,
)

export const Danger: Story = semanticStory(
  'danger',
  'Info Notification',
  dangerDescription,
)

export const SizeMd: Story = {
  render: (args) => (
    <InformationModalDemo
      {...args}
      semantic="info"
      title="Info Notification"
      description={infoDescription}
    />
  ),
  args: {
    title: 'Info Notification',
    description: infoDescription,
    semantic: 'info',
    size: 'md',
  },
}

export const SizeLg: Story = {
  render: (args) => (
    <InformationModalDemo
      {...args}
      semantic="info"
      title="Info Notification"
      description={infoDescription}
    />
  ),
  args: {
    title: 'Info Notification',
    description: infoDescription,
    semantic: 'info',
    size: 'lg',
  },
}

const longContentItems = Array.from(
  { length: 12 },
  (_, index) =>
    `Scrollable content section ${index + 1}. The modal stays within the viewport while the body handles overflow.`,
)

export const LongContent: Story = {
  render: (args) => (
    <InformationModalDemo {...args} semantic="info" title="Scrollable Modal">
      <div className="flex flex-col gap-agentos-gap-gap-sm12">
        {longContentItems.map((item) => (
          <p key={item} className="m-0">
            {item}
          </p>
        ))}
      </div>
    </InformationModalDemo>
  ),
  args: {
    title: 'Scrollable Modal',
    semantic: 'info',
    size: 'md',
  },
}

export const SizeFull: Story = {
  render: (args) => (
    <InformationModalDemo
      {...args}
      semantic="info"
      title="Info Notification"
      description={infoDescription}
      triggerLabel="Open Full Screen Modal"
    />
  ),
  args: {
    title: 'Info Notification',
    description: infoDescription,
    semantic: 'info',
    size: 'full',
  },
}

/** 使用 Dialog 风格原语自由组合（命名为 Modal） */
export const Compound: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button theme="black" appearance="outline">
          Open Compound Modal
        </Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Custom Modal</ModalTitle>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <ModalDescription>
            Build custom layouts with Modal primitives backed by Radix Dialog.
          </ModalDescription>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-agentos-gap-gap-xs8">
            <ModalClose asChild>
              <Button theme="black" appearance="outline">
                Cancel
              </Button>
            </ModalClose>
            <ModalClose asChild>
              <Button theme="black" appearance="solid">
                Confirm
              </Button>
            </ModalClose>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
  args: {
    title: 'Custom Modal',
  },
}
