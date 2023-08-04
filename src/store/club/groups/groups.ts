import { groupService } from '@/services/club/groups'
import { RootState } from '@/store/store'
import {
  FilterGroupsType,
  GroupItemType,
  GroupsStateType,
} from '@/types/club/groups'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Группы клуба
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: GroupsStateType = {
  groupItems: [],
  filter: {
    title: '',
  },
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 13,
    currentPage: 1,
  },
  status: Status.Loading,
}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<GroupItemType[]>) => {
      state.groupItems = action.payload
      state.status = Status.Success
    },
    setMoreGroups: (state, action: PayloadAction<GroupItemType[]>) => {
      state.groupItems = [...state.groupItems, ...action.payload]
      state.status = Status.Success
    },
    setGroupsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setGroupsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setGroupsFilter: (state, action: PayloadAction<FilterGroupsType>) => {
      state.filter = action.payload
    },
    setGroupsStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

/**
 * Action
 */
export const {
  setGroups,
  setMoreGroups,
  setGroupsTotalItems,
  setGroupsPage,
  setGroupsStatus,
} = groupsSlice.actions

export default groupsSlice.reducer

/**
 * Selector
 */
export const groupsSelector = (state: RootState) => state.groups

/**
 * thunk
 * загрузка групп
 */
export const getGroups =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setGroupsStatus(Status.Loading))
    dispatch(setGroupsPage(1))
    try {
      const res = await groupService.getGroups(
        getState().groups.filter,
        getState().groups.pagination
      )
      dispatch(setGroups(res.data))
      res.headers['x-total-count'] &&
        dispatch(setGroupsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setGroupsStatus(Status.Error))
      console.log(err)
    }
  }

export const getMoreGroups =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setGroupsStatus(Status.Loading))
    try {
      const res = await groupService.getGroups(
        getState().groups.filter,
        getState().users.pagination
      )
      dispatch(setMoreGroups(res.data))
      res.headers['x-total-count'] &&
        dispatch(setGroupsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setGroupsStatus(Status.Error))
      console.log(err)
    }
  }

export const groupsActions = {
  ...groupsSlice.actions,
  getGroups,
  getMoreGroups,
}
