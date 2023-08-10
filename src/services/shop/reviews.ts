import { api } from '@/config/api'
import { ICreateReview, IReview, PaginationType } from '@/types/shop/reviews'
import { IUrlParams, createUrlParams } from '@/utils/url'

export const reviewService = {
  getReviews(product_Id: string) {
    return api.get<IReview[]>(`reviews/products/${product_Id}`)
  },

  getAllForAccount(searchParams: IUrlParams) {
    return api.get<IReview[]>(
      `reviews/profile/?${createUrlParams(searchParams)}`
    )
  },

  getReviewsAdmin(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<IReview[]>(`admin/reviews?${$pagination}`)
  },

  create(values: ICreateReview) {
    return api.post<IReview>(`reviews`, values)
  },

  update(data: IReview) {
    return api.patch<IReview>(`admin/reviews/${data.id}`, data)
  },

  delete(id: number) {
    return api.delete<IReview>(`admin/reviews/${id}`)
  },
}
