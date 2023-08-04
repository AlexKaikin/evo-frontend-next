import { api } from '@/config/api'
import {
  FilterUsersType,
  PaginationType,
  UserItemType,
} from '@/types/club/users'

export const userService = {
  getUsers(filter: FilterUsersType, pagination: PaginationType) {
    const { name } = filter
    const $q = name === '' ? `` : `q=${name}&`
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<UserItemType[]>(`users/?${$q + $pagination}`)
  },

  getUser(id: string) {
    return api.get<UserItemType>(`users/${id}`)
  },

  followUser(_id: string) {
    return api.patch<string>(`users/follow/${_id}`)
  },

  unFollowUser(_id: string) {
    return api.patch<string>(`users/unfollow/${_id}`)
  },
}
