import { noteService } from '@/services/club/notes'
import {
  NoteItemType,
  NoteStateType,
  PostNoteItemType,
} from '@/types/club/notes'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Заметка
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: NoteStateType = {
  noteItem: null,
  status: Status.Loading,
}

export const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<NoteItemType>) => {
      state.noteItem = action.payload
      state.status = Status.Success
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

/**
 * Action
 */
export const { setNote, setStatus } = note.actions

export default note.reducer

/**
 * Selector
 */
export const noteSelector = (state: RootState) => state.note

/**
 * thunk
 * загрузка заметки
 */
export const getNote = (id: number) => async (dispatch: Function) => {
  dispatch(setStatus(Status.Loading))
  try {
    const res = await noteService.getNote(id)
    dispatch(setNote(res.data))
  } catch (err) {
    dispatch(setStatus(Status.Error))
    console.log(err)
  }
}

/**
 * создать заметку
 */
export const createNote =
  (data: PostNoteItemType) => async (dispatch: Function) => {
    try {
      const res = await noteService.createNote(data)
      dispatch(setNote(res.data))
      return 'ok'
    } catch (err) {
      console.log(err)
      return 'error'
    }
  }

/**
 * обновить заметку
 */
export const updateNote =
  (data: NoteItemType) => async (dispatch: Function) => {
    try {
      await noteService.updateNote(data)
      dispatch(setNote(data))
    } catch (err) {
      console.log(err)
    }
  }

/**
 * удалить заметку
 */
export const deleteNote = (id: number) => async (dispatch: Function) => {
  try {
    await noteService.deleteNote(id)
    return 'ok'
  } catch (err) {
    console.log(err)
    return 'error'
  }
}

export const noteActions = {
  ...note.actions,
  getNote,
  createNote,
  updateNote,
  deleteNote,
}
