export type OrderStateType = {
  orderItems: OrderItemType[]
  pagination: PaginationType
  status: string
}

export type OrderItemType = {
  _id?: number
  id: number
  name: string
  surname: string
  middleName: string
  region: string
  city: string
  street: string
  home: string
  index: number
  cartItems: CartItemType[]
  totalCost: number
  status: string
  created: string
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}

export type CreateOrderItemType = {
  name: string
  surname: string
  middleName: string
  region: string
  city: string
  street: string
  home: string
  index: number
  cartItems: CartItemType[]
  totalCost: number
}
