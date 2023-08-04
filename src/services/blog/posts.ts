import { api } from '@/config/api'
import {
  FilterType,
  NewPostItemType,
  PaginationType,
  IPost,
} from '@/types/blog/posts'
import { IParams, createUrlParams } from '@/utils/createUrlParams'

export const postService = {
  getPosts(filter: FilterType, pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const { query, category, sort } = filter
    const $q = query === '' ? `` : `q=${query}&`
    const $category = category === 'Все статьи' ? `` : `category=${category}&`
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    const sorting = (sort: string) => {
      switch (sort) {
        case 'viewsCount':
          return `_sort=viewsCount&_order=desc&`
        default:
          return `_sort=id&_order=desc&`
      }
    }

    return api.get<IPost[]>(
      `posts/?${$q + $category + sorting(sort) + $pagination}`
    )
  },

  getPost(id: number) {
    return api.get<IPost>(`posts/${id}`)
  },

  getAll(searchParams: IParams) {
    return api.get<IPost[]>(`posts/?${createUrlParams(searchParams)}`)
  },

  getOne(id: number) {
    return api.get<IPost>(`posts/${id}`)
  },
}

export const postAdminService = {
  getPosts(filter: FilterType, pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const { query, category, sort } = filter
    const $q = query === '' ? `` : `q=${query}&`
    const $category = category === 'Все статьи' ? `` : `category=${category}&`
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    const sorting = (sort: string) => {
      switch (sort) {
        case 'viewsCount':
          return `_sort=viewsCount&_order=desc&`
        default:
          return `_sort=id&_order=desc&`
      }
    }

    return api.get<IPost[]>(
      `admin/posts/?${$q + $category + sorting(sort) + $pagination}`
    )
  },

  getPost(id: number) {
    return api.get<IPost>(`admin/posts/${id}`)
  },
  uploadPostImg(formData: any) {
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createPost(data: NewPostItemType) {
    return api.post<IPost>(`admin/posts/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  updatePost(data: IPost) {
    return api.patch<IPost>(`admin/posts/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  deletePost(id: number) {
    return api.delete<IPost>(`admin/posts/${id}`)
  },
}
