import { reviewService } from '@/services/shop/reviews'
import { IReview, ReviewStateType } from '@/types/shop/reviews'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Отзывы пользователя
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: ReviewStateType = {
  reviewItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  status: Status.Loading,
}

export const reviewsAccount = createSlice({
  name: 'reviewsAccount',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<IReview[]>) => {
      state.reviewItems = action.payload
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
    setUpdateReview: (state, action: PayloadAction<IReview>) => {
      const newItem = action.payload
      state.reviewItems.splice(
        state.reviewItems.findIndex(item => item.id === newItem.id),
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
  setReviews,
  setTotalItems,
  setCurrentPage,
  setStatus,
  setUpdateReview,
} = reviewsAccount.actions

export default reviewsAccount.reducer

/**
 * Selector
 */
export const reviewAccountSelector = (state: RootState) => state.reviewsAccount

/**
 * thunk
 */
export const getReviewsProfile =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await reviewService.getAllForAccount(
        getState().reviewsAccount.pagination
      )
      dispatch(setReviews(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }
