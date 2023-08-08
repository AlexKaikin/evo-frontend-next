import { api } from '@/config/api'
import {
  ICreateReview,
  PaginationType,
  ReviewItemType,
} from '@/types/shop/reviews'

export const reviewService = {
  getReviews(product_Id: string) {
    return api.get<ReviewItemType[]>(`reviews/products/${product_Id}`)
  },

  getReviewsProfile(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<ReviewItemType[]>(`reviews/profile/?${$pagination}`)
  },

  getReviewsAdmin(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<ReviewItemType[]>(`admin/reviews?${$pagination}`)
  },

  create(values: ICreateReview) {
    return api.post<ReviewItemType>(`reviews`, values)
  },

  update(data: ReviewItemType) {
    return api.patch<ReviewItemType>(`admin/reviews/${data.id}`, data)
  },

  delete(id: number) {
    return api.delete<ReviewItemType>(`admin/reviews/${id}`)
  },
}
