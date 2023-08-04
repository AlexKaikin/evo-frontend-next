import { userService } from '@/services/club/users'
import { setFollowMyProfile, setUnFollowMyProfile } from '@/store/auth/auth'
import { RootState } from '@/store/store'
import {
  SubscriptionsUserType,
  UserItemType,
  UserStateType,
} from '@/types/club/users'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

/**
 * Пользователь клуба
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: UserStateType = {
  userItem: null,
  status: Status.Loading,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserItemType>) => {
      state.userItem = action.payload
      state.status = Status.Success
    },
    setUserStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setFollowUser: (state, action: PayloadAction<SubscriptionsUserType>) => {
      if (state.userItem) {
        const user = {
          _id: action.payload._id,
          id: action.payload.id,
          fullName: action.payload.fullName,
          avatarUrl: action.payload.avatarUrl,
        }

        state.userItem.subscribers.push(user)
      }
    },
    setUnFollowUser: (state, action: PayloadAction<SubscriptionsUserType>) => {
      if (state.userItem) {
        const user = {
          id: action.payload.id,
          fullName: action.payload.fullName,
          avatarUrl: action.payload.avatarUrl,
        }

        state.userItem.subscribers = state.userItem.subscribers.filter(
          item => item.id !== user.id
        )
      }
    },
  },
})

/**
 * Action
 */
export const { setUser, setUserStatus, setFollowUser, setUnFollowUser } =
  userSlice.actions

export default userSlice.reducer

/**
 * Selector
 */
export const userSelector = (state: RootState) => state.user

/**
 * thunk
 * загрузка пользователя
 */
export const getUser =
  (id: string) => async (dispatch: Function, getState: Function) => {
    dispatch(setUserStatus(Status.Loading))
    try {
      const res = await userService.getUser(id)
      dispatch(setUser(res.data))

      return res.data._id
    } catch (err) {
      dispatch(setUserStatus(Status.Error))
      console.log(err)

      return 'error'
    }
  }

export const followUser =
  (_id: string) => async (dispatch: Function, getState: Function) => {
    try {
      const res: AxiosResponse = await userService.followUser(_id)

      if (res.data.success) {
        dispatch(setFollowUser(getState().auth.data))
        dispatch(setFollowMyProfile(getState().user.userItem))
      }
    } catch (err) {
      console.log(err)
    }
  }

export const unFollowUser =
  (_id: string) => async (dispatch: Function, getState: Function) => {
    try {
      const res: AxiosResponse = await userService.unFollowUser(_id)

      if (res.data.success) {
        dispatch(setUnFollowUser(getState().auth.data))
        dispatch(setUnFollowMyProfile(getState().user.userItem))
      }
    } catch (err) {
      console.log(err)
    }
  }

export const userActions = {
  ...userSlice.actions,
  getUser,
  followUser,
  unFollowUser,
}
