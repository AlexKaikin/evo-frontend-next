import { api, options } from '@/config/api'
import {
  NoteItemType,
  PaginationType,
  CreateNote,
} from '@/types/club/notes'

export const noteService = {
  getNotes(user_Id: string, by: string, pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    return api.get<NoteItemType[]>(`notes/${user_Id}/?by=${by}&${$pagination}`)
  },

  getNote(id: number) {
    return api.get<NoteItemType>(`notes/${id}`)
  },

  uploadNoteImg(formData: any) {
    return api.post('/upload', formData, options.multipart)
  },

  createNote(data: CreateNote) {
    return api.post<NoteItemType>(`notes/`, data, options.json)
  },

  updateNote(data: NoteItemType) {
    return api.patch<NoteItemType>(`notes/${data.id}`, data, options.json)
  },

  deleteNote(id: number) {
    return api.delete<NoteItemType>(`notes/${id}`)
  },
}
