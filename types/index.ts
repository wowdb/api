export interface WowheadResult {
  cat?: number
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
  skill?: number[]
}

export interface WowheadResults {
  template: string
  type: string
  data: WowheadResult[]
}

export interface WowheadComment {
  body: string
  comments?: WowheadComment[]
  date: string
  id: number
  rating: number
  replies?: WowheadReply[]
  user: string
}

export interface WowheadReply {
  body: string
  commentid: number
  creationdate: string
  rating: number
  username: string
}

export interface WowheadMeta {
  [key: string]: {
    name_enus?: string
    icon?: string
  }
}

export interface Skills {
  [id: number]: {
    icon?: string
    id: number
    name: string
  }
}
