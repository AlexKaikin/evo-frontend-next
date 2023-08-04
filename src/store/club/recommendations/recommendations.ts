import { recommendationService } from '@/services/club/recommendations'
import { RootState } from '@/store/store'
import {
  RecommendItemType,
  RecommendationsStateType,
} from '@/types/club/recommendations'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Рекомендации в социальной сети
 */

enum loadingStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: RecommendationsStateType = {
  recommendItems: null,
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  loadingStatus: loadingStatus.Loading,
}

export const recommendations = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setRecommendations: (state, action: PayloadAction<RecommendItemType[]>) => {
      state.recommendItems = action.payload
      state.loadingStatus = loadingStatus.Success
    },
    setMoreRecommendations: (
      state,
      action: PayloadAction<RecommendItemType[]>
    ) => {
      if (state.recommendItems !== null) {
        state.recommendItems = [...state.recommendItems, ...action.payload]
        state.loadingStatus = loadingStatus.Success
      }
    },
    setRecommendationsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setRecommendationsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setRecommendationsStatus: (state, action: PayloadAction<string>) => {
      state.loadingStatus = action.payload
    },
  },
})

/**
 * Action
 */
export const {
  setRecommendations,
  setRecommendationsTotalItems,
  setRecommendationsPage,
  setRecommendationsStatus,
  setMoreRecommendations,
} = recommendations.actions

export default recommendations.reducer

/**
 * Selector
 */
export const recommendationsSelector = (state: RootState) =>
  state.recommendations

/**
 * thunk
 * загрузка рекомендаций
 */
export const getRecommendations =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setRecommendationsStatus(loadingStatus.Loading))
    dispatch(setRecommendationsPage(1))
    try {
      const res = await recommendationService.getRecommendations(
        getState().recommendations.pagination
      )
      dispatch(setRecommendations(res.data))
      res.headers['x-total-count'] &&
        dispatch(setRecommendationsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setRecommendationsStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const getMoreRecommendations =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setRecommendationsStatus(loadingStatus.Loading))
    try {
      const res = await recommendationService.getRecommendations(
        getState().recommendations.pagination
      )
      dispatch(setMoreRecommendations(res.data))
      res.headers['x-total-count'] &&
        dispatch(setRecommendationsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setRecommendationsStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const recommendationsActions = {
  ...recommendations.actions,
  getRecommendations,
  getMoreRecommendations,
}
