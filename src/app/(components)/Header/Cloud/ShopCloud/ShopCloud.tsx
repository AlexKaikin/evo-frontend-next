'use client'

import { cartSelector, getCart } from '@/store/shop/cart/cart'
import { compareSelector, getCompare } from '@/store/shop/compare/compare'
import {
  favoritesSelector,
  getProductsFavorites,
} from '@/store/shop/favorites/favorites'
//import { productsSelector } from '@/store/shop/products/products'
import { useAppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Focus from './Focus/Focus'
import Search from './Search/Search'

export default function ShopCloud() {
  //const { filter } = useSelector(productsSelector)
  const cartState = useSelector(cartSelector)
  const { compareItems } = useSelector(compareSelector)
  const { favoritesItems } = useSelector(favoritesSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCart())
    dispatch(getCompare())
    dispatch(getProductsFavorites())
  }, [dispatch])

  return (
    <section className="cloud">
      <div className="container">
        <Search/>
        <Focus
          cartState={cartState}
          compareItems={compareItems}
          favoritesItems={favoritesItems}
        />
      </div>
    </section>
  )
}
