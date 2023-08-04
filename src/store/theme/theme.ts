import { ThemeStateType } from '@/types/theme'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: ThemeStateType = {
  theme: '',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
  },
})

/**
 * Action
 */
export const { setTheme } = themeSlice.actions

export default themeSlice.reducer

/**
 * Selector
 */
export const themeSelector = (state: RootState) => state.theme
