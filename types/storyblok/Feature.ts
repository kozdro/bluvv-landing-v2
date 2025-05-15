import type { Image } from './Image'

export interface Feature {
  _uid: string
  title: string
  description: string
  icon?: Image
}
