import { api } from '@/config/api'
import {
  ChatMessageType,
  CreateChatMessageType,
  PaginationType,
} from '@/types/club/chat'

export const messageService = {
  getMessages(user_Id: string, pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<ChatMessageType[]>(`messages/${user_Id}/?${$pagination}`)
  },

  getMessage(id: number) {
    return api.get<ChatMessageType>(`messages/${id}`)
  },

  createMessage(data: CreateChatMessageType) {
    return api.post<ChatMessageType>(`messages/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  updateMessage(data: ChatMessageType) {
    return api.patch<ChatMessageType>(`messages/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  deleteMessage(id: number) {
    return api.delete<ChatMessageType>(`messages/${id}`)
  },
}
