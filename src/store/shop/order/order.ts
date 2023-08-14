import { orderService } from '@/services/shop/orders'
import {
  CreateOrderItemType,
  IOrder,
  OrderStateType,
} from '@/types/shop/order'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Заказы
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: OrderStateType = {
  orderItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  status: Status.Loading,
}

export const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orderItems = action.payload
      state.status = Status.Success
    },
    setTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setUpdateOrder: (state, action: PayloadAction<IOrder>) => {
      const newItem = action.payload
      state.orderItems.splice(
        state.orderItems.findIndex(item => item.id === newItem.id),
        1,
        newItem
      )
    },
  },
})

/**
 * Action
 */
export const {
  setOrders,
  setTotalItems,
  setCurrentPage,
  setStatus,
  setUpdateOrder,
} = order.actions

export default order.reducer

/**
 * Selector
 */
export const orderSelector = (state: RootState) => state.order

/**
 * thunk
 */
export const getOrders =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await orderService.getAll(getState().order.pagination)
      dispatch(setOrders(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const createOrder =
  (values: CreateOrderItemType) =>
  async (dispatch: Function, getState: Function) => {
    values.cartItems = getState().cart.cartItems
    values.totalCost = getState().cart.totalCost

    try {
      await orderService.create(values)
    } catch (err) {
      console.log(err)
    }
  }

export const orderActions = { ...order.actions, getOrders, createOrder }
