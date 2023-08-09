'use client'

import { cartSelector } from '@/store/shop/cart/cart'
import { compareSelector } from '@/store/shop/compare/compare'
import { favoritesSelector } from '@/store/shop/favorites/favorites'
import { useAppSelector } from '@/store/store'
import { useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import Focus from './Focus/Focus'
import Search from './Search/Search'

export default function ShopCloud() {
  const { getCart, getCompare, getProductsFavorites } = useActions()
  const cartState = useAppSelector(cartSelector)
  const { compareItems } = useAppSelector(compareSelector)
  const { favoritesItems } = useAppSelector(favoritesSelector)

  useEffect(() => {
    getCart()
    getCompare()
    getProductsFavorites()
  }, [getCart, getCompare, getProductsFavorites])

  return (
    <section className="cloud">
      <div className="container">
        <Search />
        <Focus
          cartState={cartState}
          compareItems={compareItems}
          favoritesItems={favoritesItems}
        />
      </div>
    </section>
  )
}
