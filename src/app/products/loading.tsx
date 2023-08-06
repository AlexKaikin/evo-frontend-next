'use client'

import { Selection } from './(componnets)'
import ProductSkeleton from './(componnets)/ProductSkeleton/ProductSkeleton'
import './styles.scss'

export default function Loading() {
  return (
    <>
      <Selection />
      <div className="section products">
        <div className="container">
          <div className="skeleton products">
            {Array(8)
              .fill('item')
              .map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
