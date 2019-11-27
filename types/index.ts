export interface WowheadResult {
  description?: string
  icon?: string
  id: number
  level?: string
  name?: string
  namealliance?: string
  namehorde?: string
  pieces?: number[]
  points?: number
  portraitalliance?: string
  portraithorde?: string
  quality?: number
  reagents?: number[][]
}

export interface WowheadResults {
  template: string
  type: string
  data: WowheadResult[]
}

export interface WowheadComment {
  body: string
  date: string
  id: number
  rating: number
  replies?: WowheadComment[]
  user: string
}

export type WowheadMeta = {
  [key: string]: {
    name_enus?: string
    icon?: string
  }
}
