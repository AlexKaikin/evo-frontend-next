import { reviewService } from '@/services/shop/reviews'
import {
  ICreateReview,
  ReviewItemType,
  ReviewStateType,
} from '@/types/shop/reviews'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

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

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewItemType[]>) => {
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

    setUpdateReview: (state, action: PayloadAction<ReviewItemType>) => {
      const newItem = action.payload
      state.reviewItems.splice(
        state.reviewItems.findIndex(item => item.id === newItem.id),
        1,
        newItem
      )
    },
  },
})

export const {
  setReviews,
  setTotalItems,
  setCurrentPage,
  setStatus,
  setUpdateReview,
} = reviewsSlice.actions
export default reviewsSlice.reducer
export const reviewSelector = (state: RootState) => state.reviews


export const getReviews =
  (product_Id: string) => async (dispatch: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await reviewService.getReviews(product_Id)
      dispatch(setReviews(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const getReviewsProfile =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await reviewService.getReviewsProfile(getState().pagination)
      dispatch(setReviews(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const createReview =
  (values: ICreateReview) =>
  async (dispatch: Function, getState: Function) => {
    try {
      await reviewService.createReview(values)
      return 'ok'
    } catch (err) {
      console.log(err)
    }
  }

export const getReviewsAdmin =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await reviewService.getReviewsAdmin(getState().pagination)
      dispatch(setReviews(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const updateReview =
  (value: ReviewItemType) => async (dispatch: Function) => {
    try {
      await reviewService.updateReview(value)
      dispatch(setUpdateReview(value))
      return 'ok'
    } catch (err) {
      console.warn(err)
    }
  }

export const deleteReview = (id: number) => async (dispatch: Function) => {
  try {
    await reviewService.deleteReview(id)
  } catch (err) {
    console.log(err)
  }
}

export const reviewsActions = { ...reviewsSlice.actions, getReviews, createReview }