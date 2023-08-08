export type ProductsStateType = {
  productItems: ProductItemType[]
  pagination: PaginationType
  filter: IFilterProducts
  status: string
}

export type ProductStateType = {
  productItem: ProductItemType | null
  status: string
}

export type IProduct = {
  _id: string
  id: number
  title: string
  imgUrl: string
  galleryUrl: string[]
  volume: number
  volumeMeasurement: string
  currency: string
  price: number
  quantity: number
  category: string
  rating: number
  ratingCount: number
  manufacturer: string
  property: IProperty
  text: string
  published: boolean
}

interface IProperty {
  country: string
  town: string
  year: number
}

export type PaginationType = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}

export interface IFilterProducts {
  category: string
  sort: string
  q: string
  price_gte: string
  price_lte: string
  ratings: string
  manufacturer: string
}

interface IRatings {
  id: number
  name: string
  checked: boolean
}

export type CreateProductType = {
  title: string
  imgUrl: string
  galleryUrl: string[]
  volume: number
  volumeMeasurement: string
  currency: string
  price: number
  quantity: number
  category: string
  manufacturer: string
  property: IProperty
  text: string
  published: boolean
}