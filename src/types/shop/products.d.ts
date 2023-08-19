export interface IProduct {
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
  property: IProductProperty
  text: string
  published: boolean
}

interface IProductProperty {
  country: string
  town: string
  year: number
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

export interface ICreateProduct
  extends Omit<IProduct, 'id' | '_id' | 'rating' | 'ratingCount'> {}

export interface IUpdateProduct extends ICreateProduct {
  id: number
}