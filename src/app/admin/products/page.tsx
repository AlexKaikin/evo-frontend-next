import { Pagination } from '@/app/(components)'
import { navigationService, productService } from '@/services'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { AddProductButton, ProductItems, Selection } from './(components)'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Товары | EVO PLACE',
  description: 'Товары...',
}

async function getNavigation() {
  const res = await navigationService.getAll()
  const navigation = res.data
  return navigation
}

async function getProducts(searchParams: IUrlParams) {
  const res = await productService.getAllForAdmin(searchParams)
  const products = res.data
  const totalCount = res.headers['x-total-count']
  return { products, totalCount }
}

export default async function Products({ searchParams }: IProps) {
  const productsData = await getProducts(searchParams)
  const navigationData = await getNavigation()
  const [{ products, totalCount }, navigation] = await Promise.all([
    productsData,
    navigationData,
  ])
  return (
    <div className="section admin products">
      <div className="container">
        <AddProductButton />
        <Selection navigation={navigation} />
        <ProductItems products={products} />
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
