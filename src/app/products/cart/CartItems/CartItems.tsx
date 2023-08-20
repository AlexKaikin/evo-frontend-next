import React from 'react'
import { CartItemType } from '@//types/shop/cart'
import { BsPlusLg, BsTrash3, BsDashLg } from 'react-icons/bs'
import { getLocalStorage } from '@/utils/localStorage'
import Link from 'next/link'
import { useActions } from '@/hooks/useActions'
import Image from 'next/image'

interface IProps {
  cartItems: CartItemType[]
}

export default function CartItems(props: IProps) {
  const { getCart } = useActions()
  // проверка введённого значения в количество товара
  function quantityBlur(e: React.FocusEvent<HTMLInputElement>) {
    // let number = +e.target.value
    // if(Number.isNaN(number) || number < 1){ // если значение NaN или отрицательное, то
    //     setQuantity(1)
    //     setCost(productItem.price)
    // }
  }

  // изменить количество товара через input
  function quantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    // if(!Number.isNaN(+e.target.value)){ // если значение не NaN, то...
    //     setQuantity(+e.target.value)
    //     setCost(productItem.price * (+e.target.value))
    // }
  }

  function increment(id: number) {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине

    if (findProduct) {
      findProduct.quantity += 1
      findProduct.cost += findProduct.price
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))
    getCart()
  }

  function decriment(id: number) {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
    if (findProduct && findProduct.quantity > 1) {
      findProduct.quantity -= 1
      findProduct.cost -= findProduct.price
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
    getCart()
  }

  function deleteProductClick(id: number) {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
    findProduct && cartItems.splice(cartItems.indexOf(findProduct), 1)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    getCart()
  }

  return (
    <div className="cart__items">
      {props.cartItems?.map(item => {
        return (
          <div key={item.id} className="cart__item product">
            <div className="product__img">
              <Image
                fill
                sizes="(max-width: 1800px) 33vw"
                src={item.imgUrl}
                alt={item.title}
              />
            </div>
            <div className="product__title">
              <Link href={`/products/${item.id}`}>{item.title}</Link>
            </div>
            <div className="product__quantity quantity">
              <div className="quantity__content">
                <button onClick={() => decriment(item.id)}>
                  <BsDashLg />
                </button>
                <input
                  type="text"
                  onBlur={quantityBlur}
                  onChange={quantityChange}
                  value={item.quantity}
                  className="quantity__number"
                  min="1"
                  max="7"
                />
                <button onClick={() => increment(item.id)}>
                  <BsPlusLg />
                </button>
              </div>
            </div>
            <div className="product__cost">
              <span>{item.cost}</span> руб.
            </div>
            <div className="product__delete delete">
              <button
                onClick={() => deleteProductClick(item.id)}
                className="delete__btn"
              >
                <BsTrash3 />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
