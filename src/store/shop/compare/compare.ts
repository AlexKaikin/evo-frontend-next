import { CompareItemType, CompareStateType } from '@/types/shop/compare'
import { getLocalStorage } from '@/utils/localStorage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const initialState: CompareStateType = {
  compareItems: [],
}

export const compare = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompare: (state, action: PayloadAction<CompareItemType[]>) => {
      state.compareItems = action.payload || []
    },
  },
})

export const { setCompare } = compare.actions
export default compare.reducer
export const compareSelector = (state: RootState) => state.compare
export const getCompare = () => (dispatch: Function) => {
  dispatch(setCompare(getLocalStorage('compare')))
}
export const compareActions = { ...compare.actions, getCompare }