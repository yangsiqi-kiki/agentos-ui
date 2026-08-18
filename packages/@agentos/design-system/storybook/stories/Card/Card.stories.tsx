import type { Meta, StoryObj } from '@storybook/react'
import { Ellipsis } from 'lucide-react'
import { Avatar } from '../../../src/components/atoms/avatar'
import { Button } from '../../../src/components/atoms/button'
import { Checkbox } from '../../../src/components/atoms/checkbox'
import { Tag } from '../../../src/components/atoms/tag'
import { Title } from '../../../src/components/atoms/title'
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../../../src/components/molecules/card'

const meta = {
  title: 'Molecules/Card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const sampleBody =
  'Provided AI-powered sales enablement for 539 direct-operated Li Auto retail stores through three core capabilities: knowledge Q&A, intelligent customer follow-up, and one-click quotation generation. Supported the entire sales journey from customer reception, product presentation, and test drive to quotation and approval workflows. Increased test-drive-to-sales conversion rates by 15–25% and reduced new sales advisor onboarding time from 3 months to 1 month.'

export const Default: Story = {
  render: () => (
    <Card className="max-w-[524px]">
      <CardTitle>
        <div className="flex w-full items-center gap-agentos-gap-gap-xs8">
          <Avatar
            size="default"
            shape="square"
            fallback="💍"
            className="bg-agentos-neutral-bg-color-bg-container-disabled"
          />
          <div className="min-w-0 flex-1">
            <Title level="s2" title="Store AI Sales Assistant" />
          </div>
          <Tag color="romantic-red" size="sm">
            P1
          </Tag>
        </div>
      </CardTitle>
      <CardContent>
        <p className="pl-agentos-margin-margin16 font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text">
          {sampleBody}
        </p>
      </CardContent>
      <CardFooter showDivider>
        <div className="flex w-full items-center gap-agentos-margin-margin-xs8">
          <div className="size-agentos-icon-icon-size-md16 shrink-0" />
          <div className="flex min-w-0 flex-1 flex-wrap content-start items-start gap-agentos-margin-margin-xxs4">
            <Tag size="sm">Autonomous Planning</Tag>
            <Tag size="sm">Single-Agent</Tag>
            <Tag size="sm">Single-Agent</Tag>
            <Tag size="sm">Single-Agent</Tag>
            <Tag size="sm">Single-Agent</Tag>
            <Tag size="sm">Single-Agent</Tag>
          </div>
          <Button theme="black" size="sm">
            Use
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

export const WithCheckboxTitle: Story = {
  render: () => (
    <Card className="max-w-[524px]">
      <CardTitle>
        <div className="flex w-full items-center gap-agentos-margin-margin-xs8">
          <Checkbox aria-label="Select document" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text-description">
              Clinical Trial Protocol Template
            </p>
            <Title level="s2" title="Docname.doc #1" />
          </div>
          <Button
            theme="black"
            appearance="ghost"
            size="icon"
            aria-label="More actions"
          >
            <Ellipsis aria-hidden="true" />
          </Button>
        </div>
      </CardTitle>
      <CardContent>
        <div className="flex gap-agentos-margin-margin-xs8 pl-agentos-margin-margin16">
          <div className="flex min-w-0 flex-1 flex-col gap-agentos-gap-gap-xs8">
            <p className="font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text">
              {sampleBody}
            </p>
            <p className="truncate font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text-description">
              Source: demo-document.pdf
            </p>
          </div>
          <div className="size-20 shrink-0 overflow-hidden rounded-agentos-rounded-lg8 bg-agentos-mask-base" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-agentos-margin-margin-xs8">
          <div className="size-agentos-icon-icon-size-md16 shrink-0" />
          <div className="flex min-w-0 flex-1 flex-wrap content-center items-center gap-agentos-margin-margin-xxs4">
            <span className="truncate font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 tracking-agentos-normal text-agentos-neutral-text-color-text-description">
              Recall score: 0.3838
            </span>
            <Tag size="sm">ID:827736512</Tag>
            <Tag size="sm">charactor5,000</Tag>
          </div>
          <Button theme="black" size="sm">
            Use
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

export const Minimal: Story = {
  render: () => (
    <Card className="max-w-[360px]">
      <CardTitle>
        <Title level="s2" title="Card title" />
      </CardTitle>
      <CardContent>
        <p className="font-agentos-en text-agentos-md font-agentos-normal leading-agentos-18 text-agentos-neutral-text-color-text-secondary">
          Custom content goes here.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-end">
          <Button theme="black" size="sm">
            Action
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
}
