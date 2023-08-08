import { Selection } from './(components)'
import ProductsSkeleton from './(components)/ProductsSkeleton/ProductsSkeleton'
import './styles.scss'

export default function Loading() {
  return (
    <>
      <ProductsSkeleton />
    </>
  )
}
