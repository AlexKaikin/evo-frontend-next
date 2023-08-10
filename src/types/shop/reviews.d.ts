export type ReviewStateType = {
  reviewItems: IReview[]
  pagination: PaginationType
  status: string
}

export interface IReview {
  _id: string
  id: number
  rating: number
  body: string
  published: string
  created: string
  updated: string
  product: string | ProductType
  user?: any
}

export type ProductType = {
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

export interface ICreateReview {
  rating: number
  body: string
  product: string
}