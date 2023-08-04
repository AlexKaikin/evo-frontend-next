export type RoomsStateType = {
  roomItems: RoomType[]
  pagination: PaginationType
  loadingStatus: string
}

export type RoomType = {
  _id: string
  id: number
  users: UserType[]
  lastMessage: string
  created: string
  updated: string
}

type UserType = {
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