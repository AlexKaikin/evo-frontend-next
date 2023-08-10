import { api } from '@/config/api'
import { IComment, ICreateComment, PaginationType } from '@/types/blog/comments'
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

  getCommentsAdmin(pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`

    return api.get<IComment[]>(`admin/comments?${$pagination}`)
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
