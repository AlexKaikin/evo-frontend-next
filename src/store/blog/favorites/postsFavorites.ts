import {
  PostsFavoritesItemType,
  PostsFavoritesStateType,
} from '@/types/blog/postsFavorites'
import { getLocalStorage } from '@/utils/localStorage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const initialState: PostsFavoritesStateType = {
  postsFavoritesItems: [],
}

export const postsFavorites = createSlice({
  name: 'postsFavorites',
  initialState,
  reducers: {
    setPostFavorite: (
      state,
      action: PayloadAction<PostsFavoritesItemType[]>
    ) => {
      state.postsFavoritesItems = action.payload || []
    },
  },
})

export const { setPostFavorite } = postsFavorites.actions
export default postsFavorites.reducer
export const postsFavoritesSelector = (state: RootState) => state.postsFavorites

export const getPostsFavorites = () => (dispatch: Function) => {
  dispatch(setPostFavorite(getLocalStorage('postsFavorites')))
}

export const postsFavoritesActions = {
  ...postsFavorites.actions,
  getPostsFavorites,
}