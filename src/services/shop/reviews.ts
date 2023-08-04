import { api } from '@/config/api'
import {
  CreateReviewItemType,
  PaginationType,
  ReviewItemType,
} from '@/types/shop/reviews'

export const reviewService = {
  getReviews(product_Id: string) {
    //const pagination = `_page=${currentPage}&_limit=${limitItems}`

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

  createReview(values: CreateReviewItemType) {
    return api.post<ReviewItemType>(`reviews`, values)
  },

  updateReview(data: ReviewItemType) {
    return api.patch<ReviewItemType>(`admin/reviews/${data.id}`, data)
  },

  deleteReview(id: number) {
    return api.delete<ReviewItemType>(`admin/reviews/${id}`)
  },
}
