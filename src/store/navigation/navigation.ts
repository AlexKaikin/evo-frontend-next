import { navigationhService } from '@/services/navigation'
import { INavigationItem, INavigationState } from '@/types/navigation'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: INavigationState = {
  navigation: [],
  status: Status.Loading,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigationStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    
    setNavigation: (state, action: PayloadAction<INavigationItem[]>) => {
      state.navigation = action.payload
      state.status = Status.Success
    },
  },
})

export const { setNavigation, setNavigationStatus } = navigationSlice.actions

export default navigationSlice.reducer

export const navigationSelector = (state: RootState) => state.navigation
export const productsCategorySelector = (state: RootState) =>
  state.navigation.navigation.find(item => item.url === '/products')?.filter ||
  []
export const productsSortSelector = (state: RootState) =>
  state.navigation.navigation.find(item => item.url === '/products')?.sort || []
export const postsCategorySelector = (state: RootState) =>
  state.navigation.navigation.find(item => item.url === '/posts')?.filter || []
export const postsSortSelector = (state: RootState) =>
  state.navigation.navigation.find(item => item.url === '/posts')?.sort || []

export const getNavigation = () => async (dispatch: Function) => {
  dispatch(setNavigationStatus(Status.Loading))

  try {
    const res = await navigationhService.getAll()
    dispatch(setNavigation(res.data))
  } catch (err) {
    dispatch(setNavigationStatus(Status.Error))
    console.log(err)
  }
}

export const navigationActions = { ...navigationSlice.actions, getNavigation }
