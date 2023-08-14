import { api, options } from '@/config/api'
import { ICreateProduct, IProduct, IUpdateProduct } from '@/types/shop/products'
import { IUrlParams, createUrlParams } from '@/utils/url'

export const productService = {
  getAll(searchParams: IUrlParams) {
    return api.get<IProduct[]>(`products/?${createUrlParams(searchParams)}`)
  },

  getOne(id: number) {
    return api.get<IProduct>(`products/${id}`)
  },

  getAllForAdmin(searchParams: IUrlParams) {
    return api.get<IProduct[]>(
      `admin/products/?${createUrlParams(searchParams)}`
    )
  },

  getOneForAdmin(id: number) {
    return api.get<IProduct>(`admin/products/${id}`)
  },

  uploadProductImg(formData: any) {
    return api.post('/upload', formData, options.multipart)
  },

  create(data: ICreateProduct) {
    return api.post<IProduct>(`admin/products/`, data, options.json)
  },

  update(data: IUpdateProduct) {
    return api.patch<IProduct>(`admin/products/${data.id}`, data, options.json)
  },

  delete(id: number) {
    return api.delete<IProduct>(`admin/products/${id}`)
  },
}
