export type CompareStateType = {
  compareItems: CompareItemType[]
}

export type CompareItemType = {
  id: number
  title: string
  text: string
  imgUrl: string
  price: number
  quantity: number
  manufacturer: string
  rating: number
  ratingCount: number
  property: PropertyType
}

type PropertyType = {
  country: string
  town: string
  year: number
}