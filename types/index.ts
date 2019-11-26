export type WowheadResult = {
  description?: string
  icon?: string
  id: number
  level?: string
  name?: string
  namealliance?: string
  namehorde?: string
  pieces?: number[]
  points?: string
  portraitalliance?: string
  portraithorde?: string
  quality?: string
  reagents?: string[]
}

export type WowheadResults = {
  template: string
  type: string
  data: WowheadResult[]
}

export type WowheadComment = {
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
