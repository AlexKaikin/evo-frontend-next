export type GroupsStateType = {
  groupItems: GroupItemType[]
  filter: FilterGroupsType
  pagination: PaginationType
  status: string
}

export type GroupStateType = {
  groupItem: GroupItemType | null
  groupStatus: string
}

export type FilterGroupsType = {
  title: string
}

export type GroupItemType = {
  _id: string
  id: number
  title: string
  about: string
  location: string
  private: boolean
  subscribers: SubscriptionsUserType[]
  avatarUrl: string | null
  creator: string
  createdAt: string
  __v?: number
}

type SubscriptionsUserType = {
  _id: string
  id: number
  fullName: string
  avatarUrl: string
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}