import { orderService } from '@/services/shop/orders'
import { OrderItemType, OrderStateType } from '@/types/shop/order'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Заказы в панеле администратора
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

export const orderAdmin = createSlice({
  name: 'orderAdmin',
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
} = orderAdmin.actions

export default orderAdmin.reducer

/**
 * Selector
 */

export const orderAdminSelector = (state: RootState) => state.orderAdmin

/**
 * thunk
 */
export const getOrdersAdmin =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await orderService.getOrdersAdmin(
        getState().orderAdmin.pagination
      )
      dispatch(setOrders(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const updateOrder =
  (value: OrderItemType) => async (dispatch: Function) => {
    try {
      await orderService.updateOrder(value)
      dispatch(setUpdateOrder(value))
      return 'ok'
    } catch (err) {
      console.warn(err)
    }
  }

export const deleteOrder = (id: number) => async (dispatch: Function) => {
  try {
    await orderService.deleteOrder(id)
  } catch (err) {
    console.log(err)
  }
}
