import { api } from '@/config/api'
import {
  CreateOrderItemType,
  OrderItemType,
  PaginationType,
} from '@/types/shop/order'

export const orderService = {
  getAll(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<OrderItemType[]>(`orders?${$pagination}`)
  },

  getAllForAdmin(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<OrderItemType[]>(`admin/orders?${$pagination}`)
  },

  create(values: CreateOrderItemType) {
    return api.post<OrderItemType>(`orders`, values)
  },

  update(data: OrderItemType) {
    return api.patch<OrderItemType>(`admin/orders/${data.id}`, data)
  },

  delete(id: number) {
    return api.delete<OrderItemType>(`admin/orders/${id}`)
  },
}
