export type NotesStateType = {
  noteItems: NoteItemType[]
  pagination: PaginationType
  loadingStatus: string
}

export type NoteStateType = {
  noteItem: NoteItemType | null
  status: string
}

export type NoteItemType = {
  _id: string
  id: number
  galleryUrl: string[]
  text: string
  tags: string[]
  published: boolean
  user?: UserType | null
  group?: GroupType | null
  created?: string
}

export type PostNoteItemType = {
  _id?: string
  id: number
  galleryUrl: string[]
  text: string
  tags: string[]
  published: boolean
  user: sting | null
  group: string | null
  created: string
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
