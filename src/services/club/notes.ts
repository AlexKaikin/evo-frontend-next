import { api } from '@/config/api'
import {
  NoteItemType,
  PaginationType,
  PostNoteItemType,
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
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  createNote(data: PostNoteItemType) {
    return api.post<NoteItemType>(`notes/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  updateNote(data: NoteItemType) {
    return api.patch<NoteItemType>(`notes/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  deleteNote(id: number) {
    return api.delete<NoteItemType>(`notes/${id}`)
  },
}
