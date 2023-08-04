export type MessagesStateType = {
  messageItems: ChatMessageType[]
  roomID: string | null
  pagination: PaginationType
  loadingStatus: string
}

export type ChatMessageType = {
  id: number
  user: UserType
  text: string
  date: number
  socketID: string
}

type UserType = {
  id: number
  fullName: string
  avatarUrl: string
}

export type CreateChatMessageType = {
  id: number
  user: string
  text: string
  date: number
  socketID: string
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}