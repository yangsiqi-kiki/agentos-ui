import { type ClassValue, clsx } from 'clsx'
import { agentosTwMerge } from './tw-merge'

export function cn(...inputs: ClassValue[]) {
  return agentosTwMerge(clsx(inputs))
}
