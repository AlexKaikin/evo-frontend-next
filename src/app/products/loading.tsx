import { Selection } from './(componnets)'
import ProductsSkeleton from './(componnets)/ProductsSkeleton/ProductsSkeleton'
import './styles.scss'

export default function Loading() {
  return (
    <>
      <Selection />
      <ProductsSkeleton />
    </>
  )
}
