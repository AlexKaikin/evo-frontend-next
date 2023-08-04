import { api } from '@/config/api'
import { PaginationType, RoomType } from '@/types/club/rooms'
import { UserItemType } from '@/types/club/users'

export const roomService = {
  getRooms(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<RoomType[]>(`rooms/?${$pagination}`)
  },

  getRoomUsers(name: string) {
    // const { currentPage, limitItems } = pagination
    // const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<UserItemType[]>(`rooms/search?name=${name}`)
  },

  getRoom(_id: string) {
    return api.get<RoomType>(`rooms/${_id}`)
  },

  createRoom(data: RoomType) {
    return api.post<RoomType>(`rooms/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  updateRoom(data: RoomType) {
    return api.patch<RoomType>(`rooms/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  deleteRoom(id: number) {
    return api.delete<RoomType>(`rooms/${id}`)
  },
}
