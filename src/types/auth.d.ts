export type RegisterType = {
  fullName: string
  email: string
  password: string
}

export type LoginType = {
  email: string
  password: string
}

export type AuthStateType = {
  data: null | AuthDataType
  status: string
}

export type AuthDataType = {
  _id: string
  id: number
  fullName: string
  about: string
  interests: string[]
  location: string
  private: boolean
  avatarUrl: string
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

export type PostAuthDataType = {
  _id: string
  fullName: string
  about: string
  avatarUrl: string
}

export type UserFormType = {
  id: number
  fullName: string
  about: string
  interests: string | string[]
  location: string
  private: boolean
  avatarUrl: string
}