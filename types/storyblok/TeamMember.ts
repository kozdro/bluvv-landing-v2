import type { Image } from './Image'

export interface TeamMember {
  image: Image
  position?: string
  name: string
  _uid: string
}
