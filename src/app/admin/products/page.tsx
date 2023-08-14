import Aside from '@/app/(components)/layout/Aside/admin/Aside'
import './styles.scss'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { Pagination } from '@/app/(components)'
import ProductItems from './(components)/ProductItems/ProductItems'
import AddProductButton from './(components)/AddProductButton/AddProductButton'
import Selection from './(components)/Selection/Selection'
import { navigationService, productService } from '@/services'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Товары |  EVO PLACE',
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
    <div className="col">
      <Aside />
      <div className="section admin">
        <div className="container">
          <AddProductButton />
          <Selection navigation={navigation} />
          <ProductItems products={products} />
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  )
}
