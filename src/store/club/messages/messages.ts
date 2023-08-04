import { messageService } from '@/services/club/messages'
import { roomService } from '@/services/club/rooms'
import { RootState } from '@/store/store'
import {
  ChatMessageType,
  CreateChatMessageType,
  MessagesStateType,
} from '@/types/club/chat'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Сообщения в мессенджере социальной сети
 */

enum loadingStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: MessagesStateType = {
  messageItems: [],
  roomID: null,
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 20,
    currentPage: 1,
  },
  loadingStatus: loadingStatus.Loading,
}

export const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessageType[]>) => {
      state.messageItems = action.payload.reverse()
      state.loadingStatus = loadingStatus.Success
    },
    setMoreMessages: (state, action: PayloadAction<ChatMessageType[]>) => {
      state.messageItems = [...action.payload.reverse(), ...state.messageItems]
      //state.loadingStatus = loadingStatus.Success
    },
    updateMessages: (state, action: PayloadAction<number>) => {
      state.messageItems = state.messageItems.filter(
        item => item.id !== action.payload
      )
    },
    setMessagesTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setMessagesPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setMessagesStatus: (state, action: PayloadAction<string>) => {
      state.loadingStatus = action.payload
    },
    setMessage: (state, action: PayloadAction<ChatMessageType>) => {
      state.messageItems = [...state.messageItems, action.payload]
    },
    setRoomID: (state, action: PayloadAction<string>) => {
      state.roomID = action.payload
    },
  },
})

/**
 * Action
 */
export const {
  setMessages,
  setMessagesTotalItems,
  setMessagesPage,
  setMessagesStatus,
  setMoreMessages,
  updateMessages,
  setMessage,
  setRoomID,
} = messages.actions

export default messages.reducer

/**
 * Selector
 */
export const messagesSelector = (state: RootState) => state.messages

/**
 * thunk
 * загрузка сообщений
 */
export const getMessages =
  (user_Id: string) => async (dispatch: Function, getState: Function) => {
    dispatch(setMessagesStatus(loadingStatus.Loading))
    dispatch(setMessagesPage(1))

    try {
      const res = await messageService.getMessages(
        user_Id,
        getState().messages.pagination
      )
      dispatch(setMessages(res.data))
      res.headers['x-total-count'] &&
        dispatch(setMessagesTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setMessagesStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const getMoreMessages =
  (user_id: string) => async (dispatch: Function, getState: Function) => {
    //dispatch(setMessagesStatus(loadingStatus.Loading))
    try {
      const res = await messageService.getMessages(
        user_id,
        getState().messages.pagination
      )
      dispatch(setMoreMessages(res.data))
      res.headers['x-total-count'] &&
        dispatch(setMessagesTotalItems(res.headers['x-total-count']))

      return res.data
    } catch (err) {
      dispatch(setMessagesStatus(loadingStatus.Error))
      console.log(err)
    }
  }

/**
 * создать сообщение
 */
export const createMessage =
  (data: CreateChatMessageType) => async (dispatch: Function) => {
    try {
      const res = await messageService.createMessage(data)
      dispatch(setMessage(res.data))
      return { status: 'ok' }
    } catch (err) {
      console.log(err)
      return { id: null, status: 'error' }
    }
  }

export const getRoom = (user_id: string) => async (dispatch: Function) => {
  try {
    const res = await roomService.getRoom(user_id)
    dispatch(setRoomID(res.data._id))
  } catch (err) {
    console.log(err)
  }
}

export const messagesActions = {
  ...messages.actions,
  getMessages,
  getMoreMessages,
  createMessage,
  getRoom,
}
