import { api, options } from '@/config/api'
import { IPost, ICreatePost, IUpdatePost } from '@/types/blog/posts'
import { IUrlParams, createUrlParams } from '@/utils/url'

export const postService = {
  getAll(searchParams: IUrlParams) {
    return api.get<IPost[]>(`posts/?${createUrlParams(searchParams)}`)
  },

  getOne(id: number) {
    return api.get<IPost>(`posts/${id}`)
  },

  getAllForAdmin(searchParams: IUrlParams) {
    return api.get<IPost[]>(`admin/posts/?${createUrlParams(searchParams)}`)
  },

  getOneForAdmin(id: number) {
    return api.get<IPost>(`admin/posts/${id}`)
  },

  uploadPostImg(formData: any) {
    return api.post('/upload', formData, options.multipart)
  },

  create(data: ICreatePost) {
    return api.post<IPost>(`admin/posts/`, data, options.json)
  },

  update(data: IUpdatePost) {
    return api.patch<IPost>(`admin/posts/${data.id}`, data, options.json)
  },

  delete(id: number) {
    return api.delete<IPost>(`admin/posts/${id}`)
  },
}
