export type RecommendationsStateType = {
  recommendItems: RecommendItemType[] | null
  pagination: PaginationType
  loadingStatus: string
}

export type RecommendItemType = {
  _id: string
  fullName: string
  about: string
  avatarUrl: string | null
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}
