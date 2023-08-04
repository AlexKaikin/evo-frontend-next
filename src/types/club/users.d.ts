export type UsersStateType = {
  userItems: UserItemType[]
  filter: FilterUsersType
  pagination: PaginationType
  status: string
}

export type FilterUsersType = {
  name: string
}

export type UserStateType = {
  userItem: UserItemType | null
  status: string
}

export type UserItemType = {
  _id: string
  id: number
  fullName: string
  about: string
  interests: string[]
  location: string
  private: boolean
  avatarUrl: string | null
  subscribers: SubscriptionsUserType[]
  subscriptionsUser: SubscriptionsUserType[]
  subscriptionsGroup: SubscriptionsGroupType[]
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
  token?: string
}

type SubscriptionsUserType = {
  _id: string
  id: number
  fullName: string
  avatarUrl: string
}

type SubscriptionsGroupType = {
  _id: string
  id: number
  title: string
  avatarUrl: string
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}