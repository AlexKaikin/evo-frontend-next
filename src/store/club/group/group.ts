import { groupService } from '@/services/club/groups'
import {
  setFollowGroupInMyProfile,
  setUnFollowGroupInMyProfile,
} from '@/store/auth/auth'
import { RootState } from '@/store/store'
import {
  GroupItemType,
  GroupStateType,
  SubscriptionsUserType,
} from '@/types/club/groups'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { getNotes, setNotesStatus } from '../notes/notes'

/**
 * Группа клуба
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: GroupStateType = {
  groupItem: null,
  groupStatus: Status.Loading,
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<GroupItemType>) => {
      state.groupItem = action.payload
      state.groupStatus = Status.Success
    },
    setGroupStatus: (state, action: PayloadAction<string>) => {
      state.groupStatus = action.payload
    },
    setFollowGroup: (state, action: PayloadAction<SubscriptionsUserType>) => {
      if (state.groupItem) {
        const user = {
          _id: action.payload._id,
          id: action.payload.id,
          fullName: action.payload.fullName,
          avatarUrl: action.payload.avatarUrl,
        }

        state.groupItem.subscribers.push(user)
      }
    },
    setUnFollowGroup: (state, action: PayloadAction<SubscriptionsUserType>) => {
      if (state.groupItem) {
        const user = {
          id: action.payload.id,
          fullName: action.payload.fullName,
          avatarUrl: action.payload.avatarUrl,
        }

        state.groupItem.subscribers = state.groupItem.subscribers.filter(
          item => item.id !== user.id
        )
      }
    },
  },
})

/**
 * Action
 */
export const { setGroup, setGroupStatus, setFollowGroup, setUnFollowGroup } =
  groupSlice.actions

export default groupSlice.reducer

/**
 * Selector
 */
export const groupSelector = (state: RootState) => state.group

/**
 * thunk
 * загрузка группы
 */
export const getGroup =
  (id: string) => async (dispatch: Function, getState: Function) => {
    dispatch(setGroupStatus(Status.Loading))
    dispatch(setNotesStatus('loading'))
    try {
      const res = await groupService.getGroup(id)
      dispatch(setGroup(res.data))
      dispatch(getNotes(res.data._id, 'group'))
    } catch (err) {
      dispatch(setGroupStatus(Status.Error))
      console.log(err)
    }
  }

/**
 * создать группу
 */
export const createGroup =
  (data: GroupItemType) => async (dispatch: Function) => {
    try {
      const res = await groupService.createGroup(data)
      dispatch(setGroup(res.data))
      dispatch(getNotes(res.data._id, 'group'))
      return res
    } catch (err) {
      console.log(err)
      return { id: null, status: 'error' }
    }
  }

/**
 * обновить группу
 */
export const updateGroup =
  (data: GroupItemType) => async (dispatch: Function) => {
    try {
      const res = await groupService.updateGroup(data)
      dispatch(setGroup(res.data))
      return res
    } catch (err) {
      console.log(err)
    }
  }

/**
 * удалить группу
 */
export const deleteGroup = (id: number) => async (dispatch: Function) => {
  try {
    await groupService.deleteGroup(id)
  } catch (err) {
    console.log(err)
  }
}

export const followGroup =
  (_id: string) => async (dispatch: Function, getState: Function) => {
    try {
      const res: AxiosResponse = await groupService.followGroup(_id)

      if (res.data.success) {
        dispatch(setFollowGroup(getState().auth.data))
        dispatch(setFollowGroupInMyProfile(getState().group.groupItem))
      }
    } catch (err) {
      console.log(err)
    }
  }

export const unFollowGroup =
  (_id: string) => async (dispatch: Function, getState: Function) => {
    try {
      const res: AxiosResponse = await groupService.unFollowGroup(_id)

      if (res.data.success) {
        dispatch(setUnFollowGroup(getState().auth.data))
        dispatch(setUnFollowGroupInMyProfile(getState().group.groupItem))
      }
    } catch (err) {
      console.log(err)
    }
  }

export const groupActions = {
  ...groupSlice.actions,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  followGroup,
  unFollowGroup,
}
