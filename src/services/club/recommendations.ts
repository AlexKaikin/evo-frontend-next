import { api } from '@/config/api'
import { PaginationType, RecommendItemType } from '@/types/club/recommendations'

export const recommendationService = {
  getRecommendations(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<RecommendItemType[]>(`recommendations/?${$pagination}`)
  },
}
