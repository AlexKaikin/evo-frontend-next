import { CartItemType, CartStateType } from '@/types/shop/cart'
import { getLocalStorage } from '@/utils/localStorage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const initialState: CartStateType = {
  cartItems: [],
  totalCost: 0,
}

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItemType[]>) => {
      state.cartItems = action.payload || []
      state.totalCost = action.payload?.reduce(
        (totalCost: number, item: CartItemType) => totalCost + item.cost,
        0
      )
    },
  },
})

export const { setCart } = cart.actions
export default cart.reducer
export const cartSelector = (state: RootState) => state.cart

export const getCart = () => (dispatch: Function) => {
  dispatch(setCart(getLocalStorage('cart')))
}

export const cartActions = { ...cart.actions, getCart }
