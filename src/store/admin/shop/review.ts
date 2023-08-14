import { reviewService } from '@/services/shop/reviews'
import { IReview, ReviewStateType } from '@/types/shop/reviews'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Отзывы в панеле администратора
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

export const reviewsAdmin = createSlice({
  name: 'reviewsAdmin',
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
} = reviewsAdmin.actions

export default reviewsAdmin.reducer

/**
 * Selector
 */
export const reviewsAdminSelector = (state: RootState) => state.reviewsAdmin

/**
 * thunk
 */
// export const getReviewsAdmin =
//   () => async (dispatch: Function, getState: Function) => {
//     dispatch(setStatus(Status.Loading))
//     try {
//       const res = await reviewService.getReviewsAdmin(
//         getState().reviewsAdmin.pagination
//       )
//       dispatch(setReviews(res.data))
//       res.headers['x-total-count'] &&
//         dispatch(setTotalItems(res.headers['x-total-count']))
//     } catch (err) {
//       console.warn(err)
//     }
//   }

export const updateReview =
  (value: IReview) => async (dispatch: Function) => {
    try {
      await reviewService.update(value)
      dispatch(setUpdateReview(value))
      return 'ok'
    } catch (err) {
      console.warn(err)
    }
  }

export const deleteReview = (id: number) => async (dispatch: Function) => {
  try {
    await reviewService.delete(id)
  } catch (err) {
    console.log(err)
  }
}
