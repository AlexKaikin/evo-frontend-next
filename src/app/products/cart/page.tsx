'use client'

import { authSelector } from '@/store/auth/auth'
import { cartSelector } from '@/store/shop/cart/cart'
import { scrollToTop } from '@/utils/scroll'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { AuthForm, CartItems, OrderForm } from '.'
import './Cart.scss'

export default function Cart() {
  const router = useRouter()
  const auth = useSelector(authSelector)
  const { cartItems, totalCost } = useSelector(cartSelector)
  const [authFormShow, setAuthFormShow] = useState<boolean>(false)
  const [orderFormShow, setOrderFormModalShow] = useState<boolean>(false)
  const orderFormRef = useRef<HTMLDivElement>(null)

  function authModalhide() {
    setAuthFormShow(false)
  }

  function orderFormClick() {
    if (auth.data) {
      setOrderFormModalShow(true)
      setTimeout(() => {
        orderFormRef.current &&
          orderFormRef.current.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          })
      }, 100)
    } else {
      setAuthFormShow(true)
    }
  }

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <div className="section cart">
        <div className="container">
          <div className="section__title">Корзина</div>
          {cartItems.length ? (
            <>
              <CartItems cartItems={cartItems} />
              <div className="cart__total">
                <div>
                  Всего позицый товаров <span>{cartItems.length}</span>
                </div>
                <div>
                  Сумма заказа <span>{totalCost}</span> рублей
                </div>
              </div>
              <div className="cart__btn">
                <button onClick={() => router.back()} className="btn btn-light">
                  <BsChevronLeft /> Вернуться назад
                </button>
                <button onClick={orderFormClick} className="btn btn__buy">
                  Оформить заказ
                </button>
              </div>
            </>
          ) : (
            <div className="cart__items">В корзине пусто</div>
          )}
        </div>
      </div>
      {orderFormShow && <OrderForm orderFormRef={orderFormRef} />}
      {authFormShow && <AuthForm authModaltoggle={authModalhide} />}
    </>
  )
}
