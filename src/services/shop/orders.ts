import { api } from '@/config/api'
import {
  CreateOrderItemType,
  OrderItemType,
  PaginationType,
} from '@/types/shop/order'

export const orderService = {
  getOrders(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<OrderItemType[]>(`orders?${$pagination}`)
  },

  getOrdersAdmin(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<OrderItemType[]>(`admin/orders?${$pagination}`)
  },

  createOrder(values: CreateOrderItemType) {
    return api.post<OrderItemType>(`orders`, values)
  },

  updateOrder(data: OrderItemType) {
    return api.patch<OrderItemType>(`admin/orders/${data.id}`, data)
  },

  deleteOrder(id: number) {
    return api.delete<OrderItemType>(`admin/orders/${id}`)
  },
}
