import { api } from '@/config/api'
import { EventItemType, PaginationType } from '@/types/club/events'

export const eventService = {
  getEvents(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<EventItemType[]>(`events/?${$pagination}`)
  },
}
