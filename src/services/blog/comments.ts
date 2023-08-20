import { api } from '@/config/api'
import { IComment, ICreateComment } from '@/types/blog/comments'
import { IUrlParams, createUrlParams } from '@/utils/url'

export const commentService = {
  getAll(post_id: string) {
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

  create(values: ICreateComment) {
    return api.post<IComment>(`comments`, values)
  },

  update(data: IComment) {
    return api.patch<IComment>(`admin/comments/${data.id}`, data)
  },

  delete(id: number) {
    return api.delete<IComment>(`admin/comments/${id}`)
  },
}
