export type PostsStateType = {
  postItems: IPost[]
  pagination: PaginationType
  filter: FilterType
  status: string
}

export type PostStateType = {
  postItem: IPost | null
  status: string
}

export interface IPost {
  _id: string
  id: number
  title: string
  imgUrl: string
  galleryUrl: string[]
  category: string
  viewsCount?: number
  text: string
  published: boolean
  created?: string
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}

export type FilterType = {
  category: string
  sort: string
  query: string
}

export type NewPostItemType = {
  id: number
  title: string
  imgUrl: string
  galleryUrl: string[]
  category: string
  viewsCount?: number
  text: string
  published: boolean
  created?: string
}