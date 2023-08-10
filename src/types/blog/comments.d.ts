export type CommentsStateType = {
  commentItems: IComment[]
  pagination: PaginationType
  status: string
}

export interface IComment {
  _id: string
  id: number
  body: string
  published: string
  created: string
  updated: string
  post: string | PostType
  user?: any
}

export type PostType = {
  _id: string
  title: string
  id: number
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}

export interface ICreateComment {
  body: string
  post: string
}