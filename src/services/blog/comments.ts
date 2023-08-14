import { api } from '@/config/api'
import { IComment, ICreateComment } from '@/types/blog/comments'
import { IUrlParams, createUrlParams } from '@/utils/url'

export const commentService = {
  getComments(post_id: string) {
    return api.get<IComment[]>(`posts/${post_id}/comments`)
  },

  getAllForAccount(searchParams: IUrlParams) {
    return api.get<IComment[]>(
      `profile/comments?${createUrlParams(searchParams)}`
    )
  },

  getAllForAdmin(searchParams: IUrlParams) {
    return api.get<IComment[]>(
      `admin/comments?${createUrlParams(searchParams)}`
    )
  },

  createComment(values: ICreateComment) {
    return api.post<IComment>(`comments`, values)
  },

  updateComment(data: IComment) {
    return api.patch<IComment>(`admin/comments/${data.id}`, data)
  },

  deleteComment(id: string) {
    return api.delete<IComment>(`admin/comments/${id}`)
  },
}
