export type FavoritesStateType = {
  favoritesItems: FavoriteItemType[]
}

export type FavoriteItemType = {
  id: number
  title: string
  imgUrl: string
  price: number
  quantity: number
  manufacturer: string
  rating: number
  ratingCount: number
}
