export type PostsFavoritesStateType = {
  postsFavoritesItems: PostsFavoritesItemType[]
}

export type PostsFavoritesItemType = {
  id: number
  title: string
  imgUrl: string
  category: string
  viewsCount?: number
  created?: string
  text: string 
}
