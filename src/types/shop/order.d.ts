export interface IOrder {
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

export interface ICreateOrder
  extends Omit<IProduct, 'id' | '_id' | 'status' | 'created'> {}
