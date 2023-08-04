import { userService } from '@/services/club/users'
import { RootState } from '@/store/store'
import {
  FilterUsersType,
  UserItemType,
  UsersStateType,
} from '@/types/club/users'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Пользователи клуба
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: UsersStateType = {
  userItems: [],
  filter: {
    name: '',
  },
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 20,
    currentPage: 1,
  },
  status: Status.Loading,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserItemType[]>) => {
      state.userItems = action.payload
      state.status = Status.Success
    },
    setMoreUsers: (state, action: PayloadAction<UserItemType[]>) => {
      state.userItems = [...state.userItems, ...action.payload]
      state.status = Status.Success
    },
    setUsersTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setUsersPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setUsersFilter: (state, action: PayloadAction<FilterUsersType>) => {
      state.filter = action.payload
    },
    setUsersStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

/**
 * Action
 */
export const {
  setUsers,
  setMoreUsers,
  setUsersTotalItems,
  setUsersPage,
  setUsersStatus,
} = usersSlice.actions

export default usersSlice.reducer

/**
 * Selector
 */
export const usersSelector = (state: RootState) => state.users

/**
 * thunk
 * загрузка пользователей
 */
export const getUsers =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setUsersStatus(Status.Loading))
    dispatch(setUsersPage(1))
    try {
      const res = await userService.getUsers(
        getState().users.filter,
        getState().users.pagination
      )
      dispatch(setUsers(res.data))
      res.headers['x-total-count'] &&
        dispatch(setUsersTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setUsersStatus(Status.Error))
      console.log(err)
    }
  }

export const getMoreUsers =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setUsersStatus(Status.Loading))
    try {
      const res = await userService.getUsers(
        getState().users.filter,
        getState().users.pagination
      )
      dispatch(setMoreUsers(res.data))
      res.headers['x-total-count'] &&
        dispatch(setUsersTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setUsersStatus(Status.Error))
      console.log(err)
    }
  }

export const usersActions = { ...usersSlice.actions, getUsers, getMoreUsers }
