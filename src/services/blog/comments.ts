import { api } from '@/config/api'
import {
  CommentItemType,
  CreateCommentType,
  PaginationType,
} from '@/types/blog/comments'

export const commentService = {
  getComments(post_id: string) {
    return api.get<CommentItemType[]>(`posts/${post_id}/comments`)
  },

  getCommentsProfile(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<CommentItemType[]>(`profile/comments?${$pagination}`)
  },

  getCommentsAdmin(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<CommentItemType[]>(`admin/comments?${$pagination}`)
  },

  createComment(values: CreateCommentType) {
    return api.post<CommentItemType>(`comments`, values)
  },

  updateComment(data: CommentItemType) {
    return api.patch<CommentItemType>(`admin/comments/${data.id}`, data)
  },

  deleteComment(id: string) {
    return api.delete<CommentItemType>(`admin/comments/${id}`)
  },
}
