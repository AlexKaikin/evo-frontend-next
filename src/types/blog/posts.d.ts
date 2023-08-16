export interface IPost {
  _id: string
  id: number
  title: string
  imgUrl: string
  galleryUrl: string[]
  category: string
  viewsCount?: number
  text: string
  published: boolean
  created?: string
}

export interface IFilterPosts {
  category: string
  sort: string
  query: string
}

export interface ICreatePost {
  title: string
  imgUrl: string
  galleryUrl: string[]
  category: string
  text: string
  published: boolean
}

export interface IUpdatePost extends ICreatePost {
  id: number
}