export type CommentsStateType = {
  commentItems: CommentItemType[]
  pagination: PaginationType
  status: string
}

export type CommentItemType = {
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

export type CreateCommentType = {
  body: string
  post: string
}