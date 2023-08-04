import { roomService } from '@/services/club/rooms'
import { RootState } from '@/store/store'
import { RoomType, RoomsStateType } from '@/types/club/rooms'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Список чатов в мессенджере социальной сети
 */

enum loadingStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: RoomsStateType = {
  roomItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  loadingStatus: loadingStatus.Loading,
}

export const rooms = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomType[]>) => {
      state.roomItems = action.payload
      state.loadingStatus = loadingStatus.Success
    },
    setMoreRooms: (state, action: PayloadAction<RoomType[]>) => {
      state.roomItems = [...state.roomItems, ...action.payload]
      state.loadingStatus = loadingStatus.Success
    },
    updateRooms: (state, action: PayloadAction<number>) => {
      state.roomItems = state.roomItems.filter(
        item => item.id !== action.payload
      )
    },
    setRoomsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setRoomsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setRoomsStatus: (state, action: PayloadAction<string>) => {
      state.loadingStatus = action.payload
    },
    setRoom: (state, action: PayloadAction<RoomType>) => {
      state.roomItems = [...state.roomItems, action.payload]
    },
  },
})

/**
 * Action
 */
export const {
  setRooms,
  setRoomsTotalItems,
  setRoomsPage,
  setRoomsStatus,
  setMoreRooms,
  updateRooms,
  setRoom,
} = rooms.actions

export default rooms.reducer

/**
 * Selector
 */
export const roomsSelector = (state: RootState) => state.rooms

/**
 * thunk
 * загрузка комнат
 */
export const getRooms =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setRoomsStatus(loadingStatus.Loading))
    dispatch(setRoomsPage(1))
    try {
      const res = await roomService.getRooms(getState().rooms.pagination)
      dispatch(setRooms(res.data))
      res.headers['x-total-count'] &&
        dispatch(setRoomsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setRoomsStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const getMoreRooms =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setRoomsStatus(loadingStatus.Loading))
    try {
      const res = await roomService.getRooms(getState().rooms.pagination)
      dispatch(setMoreRooms(res.data))
      res.headers['x-total-count'] &&
        dispatch(setRoomsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setRoomsStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const getRoomUsers =
  (name: string) => async (dispatch: Function, getState: Function) => {
    try {
      const res = await roomService.getRoomUsers(name)

      return res.data
    } catch (err) {
      dispatch(setRoomsStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const roomsActions = {
  ...rooms.actions,
  getRooms,
  getMoreRooms,
  getRoomUsers,
}
