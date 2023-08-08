import { CartStateType } from '@/types/shop/cart'
import { CompareItemType } from '@/types/shop/compare'
import { FavoriteItemType } from '@/types/shop/favorites'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import cn from 'classnames'
import { useRef, useState } from 'react'
import { BsBag, BsBookmarks, BsHeart, BsXLg } from 'react-icons/bs'

import CartItems from './CartItems/CartItems'
import Link from 'next/link'

interface IProps {
  cartState: CartStateType
  compareItems: CompareItemType[]
  favoritesItems: FavoriteItemType[]
}

export default function Focus(props: IProps) {
  const { cartState, compareItems, favoritesItems } = props
  const [showCart, setShowCart] = useState<boolean>(false)
  const cartRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(cartRef, () => setShowCart(false))

  function showCartOnClick() {
    if (!showCart) setShowCart(true)
    else setShowCart(false)
  }

  return (
    <div className="store__info items">
      <Link href="/products/compare" className="item bookmark">
        {compareItems.length > 0 && (
          <div className="count">{compareItems.length}</div>
        )}
        <BsBookmarks />
      </Link>
      <Link href="/products/favorites" className="item">
        {favoritesItems.length > 0 && (
          <div className="count">{favoritesItems.length}</div>
        )}
        <BsHeart />
      </Link>
      <div className="item cart-block">
        {cartState.cartItems.length > 0 && (
          <div className="count">{cartState.cartItems.length}</div>
        )}
        <button onClick={showCartOnClick} className="cart">
          <BsBag />
        </button>
      </div>
      <div ref={cartRef} className={cn('cart__items', { show: showCart })}>
        <div className="filter__header">
          <div className="header__title">Корзина</div>
          <button onClick={() => setShowCart(false)}>
            <BsXLg />
          </button>
        </div>
        <div className="cart__body">
          {cartState.cartItems.length > 0 ? (
            <CartItems
              cartState={cartState}
              showCartOnClick={showCartOnClick}
            />
          ) : (
            <div>В корзине пусто</div>
          )}
          <Link
            onClick={showCartOnClick}
            href="/products/cart"
            className="btn p-10"
          >
            Перейти в корзину
          </Link>
        </div>
      </div>
    </div>
  )
}

