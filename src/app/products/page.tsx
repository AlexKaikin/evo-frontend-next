import { Pagination } from '@/app/(components)'
import { productService } from '@/services/shop/products'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { ProductItems, Selection } from './(components)'

import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Товары |  EVO PLACE',
  description: 'Товары...',
}

async function getProducts(searchParams: IUrlParams) {
  const res = await productService.getAll(searchParams)
  const products = res.data
  const totalCount = res.headers['x-total-count']
  return { products, totalCount }
}

export default async function Products({ searchParams }: IProps) {
  const { products, totalCount } = await getProducts(searchParams)
  return (
    <>
      <Selection />
      <ProductItems products={products} />
      <Pagination totalCount={totalCount} />
    </>
  )
}
