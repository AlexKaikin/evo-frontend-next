import { orderService } from '@/services/shop/orders'
import { OrderItemType, OrderStateType } from '@/types/shop/order'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

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

export const orderAccount = createSlice({
  name: 'orderAccount',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderItemType[]>) => {
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
    setUpdateOrder: (state, action: PayloadAction<OrderItemType>) => {
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
} = orderAccount.actions

export default orderAccount.reducer

/**
 * Selector
 */
export const orderAccountSelector = (state: RootState) => state.orderAccount

/**
 * thunk
 */
export const getOrders =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await orderService.getOrders(
        getState().orderAccount.pagination
      )
      dispatch(setOrders(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }
