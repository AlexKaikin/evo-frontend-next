import { productService } from '@/services/shop/products'
import { IProduct } from '@/types/shop/products'
import { notFound } from 'next/navigation'
import ProductItem from './(components)/ProductItem/ProductItem'
import './style.scss'

interface IProps {
  params: { product: string }
}

async function getProduct(productId: string) {
  const res = await productService.getOne(+productId)
  const product = res.data
  if (res.status !== 200) return notFound()
  return product
}

export async function generateMetadata({ params }: IProps) {
  const product: IProduct = await getProduct(params.product)
  return {
    title: product.title + ` |  EVO PLACE`,
    description: product.text.slice(0, 180).concat('...'),
  }
}

export default async function Product({ params }: IProps) {
  const product: IProduct = await getProduct(params.product)
  return <ProductItem product={product} />
}
