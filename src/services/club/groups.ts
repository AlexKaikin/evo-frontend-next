import { api, options } from '@/config/api'
import {
  FilterGroupsType,
  GroupItemType,
  PaginationType,
} from '@/types/club/groups'

export const groupService = {
  getGroups(filter: FilterGroupsType, pagination: PaginationType) {
    const { title } = filter
    const $q = title === '' ? `` : `q=${title}&`
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<GroupItemType[]>(`groups/?${$q + $pagination}`)
  },
  getGroup(id: string) {
    return api.get<GroupItemType>(`groups/${id}`)
  },
  uploadGroupImg(formData: any) {
    return api.post('/upload', formData, options.multipart)
  },
  createGroup(data: GroupItemType) {
    return api.post<GroupItemType>(`groups/`, data, options.json)
  },
  updateGroup(data: GroupItemType) {
    return api.patch<GroupItemType>(`groups/${data.id}`, data, options.json)
  },
  deleteGroup(id: number) {
    return api.delete<GroupItemType>(`groups/${id}`)
  },
  followGroup(_id: string) {
    return api.patch<string>(`groups/follow/${_id}`)
  },
  unFollowGroup(_id: string) {
    return api.patch<string>(`groups/unfollow/${_id}`)
  },
}
