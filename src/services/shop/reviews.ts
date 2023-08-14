import { api } from '@/config/api'
import { ICreateReview, IReview } from '@/types/shop/reviews'
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

  getAllForAdmin(searchParams: IUrlParams) {
    return api.get<IReview[]>(`admin/reviews?${createUrlParams(searchParams)}`)
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
