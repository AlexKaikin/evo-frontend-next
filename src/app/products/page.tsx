import { Pagination } from '@/app/(components)'
import previewImgUrl from '@/assets/img/meta/preview.jpg'
import { SAIT_URL } from '@/config/url'
import { navigationService, productService } from '@/services'
import { IUrlParams } from '@/utils/url'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductItems, ProductsSkeleton, Selection } from './(components)'
import './styles.scss'

interface IProps {
  searchParams: IUrlParams
}

export const metadata: Metadata = {
  title: 'Товары | EVO PLACE',
  description: 'Товары...',
  metadataBase: new URL(SAIT_URL),
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Товары | EVO PLACE',
    description: 'Товары...',
    url: SAIT_URL,
    siteName: 'EVO PLACE',
    images: [
      {
        url: `${previewImgUrl.src}`,
        width: 800,
        height: 600,
      },
    ],
    type: 'website',
  },
}

async function getNavigation() {
  const res = await navigationService.getAll()
  const navigation = res.data
  return navigation
}

async function getProducts(searchParams: IUrlParams) {
  const res = await productService.getAll(searchParams)
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
    <Suspense fallback={<ProductsSkeleton />}>
      <Selection navigation={navigation} />
      <ProductItems products={products} />
      <Pagination totalCount={totalCount} />
    </Suspense>
  )
}
