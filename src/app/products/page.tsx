import { productService } from '@/services/shop/products'
import { IProduct } from '@/types/shop/products'
import { IParams } from '@/utils/createUrlParams'
import { Pagination, ProductItems, Selection } from './(componnets)/'
import './styles.scss'

interface IProps {
  searchParams: IParams
}

interface IProductsResponse {
  products: IProduct[]
  totalCount: string
}

async function getProducts(searchParams: IParams) {
  const res = await productService.getAll(searchParams)
  const products = res.data
  const totalCount = res.headers['x-total-count']
  return { products, totalCount }
}

export default async function Products({ searchParams }: IProps) {
  const { products, totalCount }: IProductsResponse = await getProducts(
    searchParams
  )
  return (
    <>
      <Selection />
      <ProductItems products={products} />
      <Pagination totalCount={totalCount} />
    </>
  )
}
