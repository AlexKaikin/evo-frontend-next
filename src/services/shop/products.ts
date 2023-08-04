import { api } from '@/config/api'
import {
  CreateProductType,
  FilterProductsType,
  PaginationType,
  IProduct,
} from '@/types/shop/products'
import { IParams, createUrlParams } from '@/utils/createUrlParams'

export const productService = {
  getAll(searchParams: IParams) {
    return api.get<IProduct[]>(`products/?${createUrlParams(searchParams)}`)
  },

  getOne(id: number) {
    return api.get<IProduct>(`products/${id}`)
  },
}

export const productAdminService = {
  getProducts(filter: FilterProductsType, pagination: PaginationType) {
    const { currentPage, limitItems } = pagination
    const { query, category, sort } = filter
    const $q = query === '' ? `` : `q=${query}&`
    const $category = category === 'Все чаи' ? `` : `category=${category}&`
    const $pagination = `_page=${currentPage}&_limit=${limitItems}`
    const sorting = (sort: string) => {
      switch (sort) {
        case 'priceDecrease':
          return `_sort=price&_order=desc&`
        case 'priceIncrease':
          return `_sort=price&_order=asc&`
        case 'pop':
          return `_sort=rating&_order=desc&`
        default:
          return `_sort=id&_order=desc&`
      }
    }

    return api.get<IProduct[]>(
      `admin/products/?${$q + $category + sorting(sort) + $pagination}`
    )
  },

  getProduct(id: number) {
    return api.get<IProduct>(`admin/products/${id}`)
  },
  uploadProductImg(formData: any) {
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createProduct(data: CreateProductType) {
    return api.post<IProduct>(`admin/products/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  updateProduct(data: IProduct) {
    return api.patch<IProduct>(`admin/products/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  deleteProduct(id: number) {
    return api.delete<IProduct>(`admin/products/${id}`)
  },
}
