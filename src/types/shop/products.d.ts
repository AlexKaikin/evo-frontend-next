export type ProductsStateType = {
  productItems: ProductItemType[]
  pagination: PaginationType
  filter: FilterProductsType
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
  property: PropertyType
  text: string
  published: boolean
}

type PropertyType = {
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

export type FilterProductsType = {
  category: string
  sort: string
  query: string
  priceFrom: string
  priceTo: string
  ratings: RatingsType[]
  manufacturer: string
}

type RatingsType = {
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
  property: PropertyType
  text: string
  published: boolean
}