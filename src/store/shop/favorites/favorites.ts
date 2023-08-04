import { FavoriteItemType, FavoritesStateType } from '@/types/shop/favorites'
import { getLocalStorage } from '@/utils/localStorage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const initialState: FavoritesStateType = {
  favoritesItems: [],
}

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setProductsFavorites: (
      state,
      action: PayloadAction<FavoriteItemType[]>
    ) => {
      state.favoritesItems = action.payload || []
    },
  },
})

export const { setProductsFavorites } = favorites.actions
export default favorites.reducer
export const favoritesSelector = (state: RootState) => state.favorites

export const getProductsFavorites = () => (dispatch: Function) => {
  dispatch(setProductsFavorites(getLocalStorage('favorites')))
}

export const productsFavoritesActions = {
  ...favorites.actions,
  getProductsFavorites,
}
