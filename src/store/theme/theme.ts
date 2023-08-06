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

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
export const themeSelector = (state: RootState) => state.theme
