import { authService } from '@/services/auth/auth'
import { removeTokensInLocalStorage } from '@/services/auth/auth.helpers'
import {
  AuthDataType,
  AuthStateType,
  LoginType,
  RegisterType,
  SubscriptionsGroupType,
  SubscriptionsUserType,
} from '@/types/auth'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

/**
 * Авторизация
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: AuthStateType = {
  data: null,
  status: Status.Loading,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.data = null
      removeTokensInLocalStorage()
    },

    setLogin: (state, action: PayloadAction<AuthDataType | null>) => {
      state.data = action.payload
      state.status = Status.Success
    },

    setAuthStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },

    setFollowMyProfile: (
      state,
      action: PayloadAction<SubscriptionsUserType>
    ) => {
      if (state.data) {
        const user = {
          _id: action.payload._id,
          id: action.payload.id,
          fullName: action.payload.fullName,
          avatarUrl: action.payload.avatarUrl,
        }

        state.data.subscriptionsUser.push(user)
      }
    },

    setUnFollowMyProfile: (
      state,
      action: PayloadAction<SubscriptionsUserType>
    ) => {
      if (state.data) {
        const user = {
          id: action.payload.id,
          fullName: action.payload.fullName,
          avatarUrl: action.payload.avatarUrl,
        }

        state.data.subscriptionsUser = state.data.subscriptionsUser.filter(
          item => item.id !== user.id
        )
      }
    },

    setFollowGroupInMyProfile: (
      state,
      action: PayloadAction<SubscriptionsGroupType>
    ) => {
      if (state.data) {
        const group = {
          _id: action.payload._id,
          id: action.payload.id,
          title: action.payload.title,
          avatarUrl: action.payload.avatarUrl,
        }

        state.data.subscriptionsGroup.push(group)
      }
    },

    setUnFollowGroupInMyProfile: (
      state,
      action: PayloadAction<SubscriptionsGroupType>
    ) => {
      if (state.data) {
        const group = {
          id: action.payload.id,
          title: action.payload.title,
          avatarUrl: action.payload.avatarUrl,
        }

        state.data.subscriptionsGroup = state.data.subscriptionsGroup.filter(
          item => item.id !== group.id
        )
      }
    },
  },
})

/**
 * Action
 */
export const {
  setLogin,
  setAuthStatus,
  logout,
  setFollowMyProfile,
  setUnFollowMyProfile,
  setFollowGroupInMyProfile,
  setUnFollowGroupInMyProfile,
} = authSlice.actions

export default authSlice.reducer

/**
 * Selector
 */
export const authSelector = (state: RootState) => state.auth

/**
 * thunk
 */
export const register =
  (values: RegisterType) => async (dispatch: Function) => {
    dispatch(setAuthStatus(Status.Loading))
    try {
      const res = await authService.register(values)
      dispatch(setLogin(res))
    } catch (err) {
      dispatch(setAuthStatus(Status.Error))
      console.log(err)
    }
  }

export const login = (values: LoginType) => async (dispatch: Function) => {
  dispatch(setAuthStatus(Status.Loading))
  try {
    const res = await authService.login(values)
    dispatch(setLogin(res))

    return res
  } catch (err) {
    dispatch(setAuthStatus(Status.Error))
    console.log(err)

    return err
  }
}

export const authMe = () => async (dispatch: Function) => {
  dispatch(setAuthStatus(Status.Loading))

  try {
    const res = await authService.getMe()
    dispatch(setLogin(res))
  } catch (err: any) {
    if (err.response.status === 403)
      return dispatch(setAuthStatus(Status.Success))

    return dispatch(setAuthStatus(Status.Error))
  }
}

export const updateUser =
  (data: AuthDataType) => async (dispatch: Function) => {
    try {
      const res: any = await authService.updateUser(data)
      if (res.status === 200) dispatch(setLogin(res.data))

      return res
    } catch (err) {
      console.log(err)

      return err
    }
  }

export const deleteUser = () => async (dispatch: Function) => {
  try {
    const res: any = await authService.deleteUser()
    if (res.data.success) {
      dispatch(setLogin(null))
      window.localStorage.removeItem('token')
    }
  } catch (err) {
    console.log(err)
  }
}

export const authActions = {
  ...authSlice.actions,
  register,
  login,
  authMe,
  updateUser,
  deleteUser,
}
