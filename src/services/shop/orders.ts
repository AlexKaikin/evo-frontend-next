import { api } from '@/config/api'
import { ICreateOrder, IOrder } from '@/types/shop/order'
import { createUrlParams } from '@/utils'
import { IUrlParams } from '@/utils/url'

export const orderService = {
  getAll(searchParams: IUrlParams) {
    return api.get<IOrder[]>(`orders?${createUrlParams(searchParams)}`)
  },

  getAllForAdmin(searchParams: IUrlParams) {
    return api.get<IOrder[]>(`admin/orders?${createUrlParams(searchParams)}`)
  },

  create(values: ICreateOrder) {
    return api.post<IOrder>(`orders`, values)
  },

  update(data: IOrder) {
    return api.patch<IOrder>(`admin/orders/${data.id}`, data)
  },

  delete(id: number) {
    return api.delete<IOrder>(`admin/orders/${id}`)
  },
}
