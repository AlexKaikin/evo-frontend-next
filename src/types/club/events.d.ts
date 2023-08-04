export type EventsStateType = {
  eventItems: EventItemType[]
  pagination: PaginationType
  loadingStatus: string
}

export type EventStateType = {
  eventItem: EventItemType | null
  status: string
}

export type EventItemType = {
  _id: string
  id: number
  galleryUrl: string[]
  text: string
  tags: string[]
  published: boolean
  user?: UserType
  group: GroupType
  created?: string
}

type UserType = {
  _id: string
  fullName: string
  avatarUrl: string | null
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
  token?: string
}

type GroupType = {
  _id: string
  title: string
  avatarUrl: string | null
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}
