import { eventService } from '@/services/club/events'
import { RootState } from '@/store/store'
import { EventItemType, EventsStateType } from '@/types/club/events'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * События в социальной сети
 */

enum loadingStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: EventsStateType = {
  eventItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  loadingStatus: loadingStatus.Loading,
}

export const events = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventItemType[]>) => {
      state.eventItems = action.payload
      state.loadingStatus = loadingStatus.Success
    },
    setMoreEvents: (state, action: PayloadAction<EventItemType[]>) => {
      state.eventItems = [...state.eventItems, ...action.payload]
      state.loadingStatus = loadingStatus.Success
    },
    updateEvents: (state, action: PayloadAction<number>) => {
      state.eventItems = state.eventItems.filter(
        item => item.id !== action.payload
      )
    },
    setEventsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setEventsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setEventsStatus: (state, action: PayloadAction<string>) => {
      state.loadingStatus = action.payload
    },
  },
})

/**
 * Action
 */
export const {
  setEvents,
  setEventsTotalItems,
  setEventsPage,
  setEventsStatus,
  setMoreEvents,
  updateEvents,
} = events.actions

export default events.reducer

/**
 * Selector
 */
export const eventsSelector = (state: RootState) => state.events

/**
 * thunk
 * загрузка событий
 */
export const getEvents =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setEventsStatus(loadingStatus.Loading))
    dispatch(setEventsPage(1))
    try {
      const res = await eventService.getEvents(getState().notes.pagination)
      dispatch(setEvents(res.data))
      res.headers['x-total-count'] &&
        dispatch(setEventsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setEventsStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const getMoreEvents =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setEventsStatus(loadingStatus.Loading))
    try {
      const res = await eventService.getEvents(getState().notes.pagination)
      dispatch(setMoreEvents(res.data))
      res.headers['x-total-count'] &&
        dispatch(setEventsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setEventsStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const eventsActions = { ...events.actions, getEvents, getMoreEvents }
