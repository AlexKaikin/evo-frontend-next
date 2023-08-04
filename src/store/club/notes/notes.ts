import { noteService } from '@/services/club/notes'
import { RootState } from '@/store/store'
import { NoteItemType, NotesStateType } from '@/types/club/notes'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Заметки в социальной сети
 */

enum loadingStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: NotesStateType = {
  noteItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  loadingStatus: loadingStatus.Loading,
}

export const notes = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<NoteItemType[]>) => {
      state.noteItems = action.payload
      state.loadingStatus = loadingStatus.Success
    },
    setMoreNotes: (state, action: PayloadAction<NoteItemType[]>) => {
      state.noteItems = [...state.noteItems, ...action.payload]
      state.loadingStatus = loadingStatus.Success
    },
    updateNotes: (state, action: PayloadAction<number>) => {
      state.noteItems = state.noteItems.filter(
        item => item.id !== action.payload
      )
    },
    setNotesTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setNotesPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setNotesStatus: (state, action: PayloadAction<string>) => {
      state.loadingStatus = action.payload
    },
  },
})

/**
 * Action
 */
export const {
  setNotes,
  setNotesTotalItems,
  setNotesPage,
  setNotesStatus,
  setMoreNotes,
  updateNotes,
} = notes.actions

export default notes.reducer

/**
 * Selector
 */
export const notesSelector = (state: RootState) => state.notes

/**
 * thunk
 * загрузка заметок
 */
export const getNotes =
  (user_Id: string, by: string) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(setNotesStatus(loadingStatus.Loading))
    dispatch(setNotesPage(1))
    try {
      const res = await noteService.getNotes(
        user_Id,
        by,
        getState().notes.pagination
      )
      dispatch(setNotes(res.data))
      res.headers['x-total-count'] &&
        dispatch(setNotesTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setNotesStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const getMoreNotes =
  (user_Id: string, by: string) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(setNotesStatus(loadingStatus.Loading))
    try {
      const res = await noteService.getNotes(
        user_Id,
        by,
        getState().notes.pagination
      )
      dispatch(setMoreNotes(res.data))
      res.headers['x-total-count'] &&
        dispatch(setNotesTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setNotesStatus(loadingStatus.Error))
      console.log(err)
    }
  }

export const notesActions = { ...notes.actions, getNotes, getMoreNotes }
