import { useRef, useState } from 'react'
import { CartItemType } from '@/types/shop/cart'
import { IProduct } from '@/types/shop/products'
import {BsBag, BsPlusLg, BsDashLg} from 'react-icons/bs'
import { getCart } from '@/store/shop/cart/cart'
import { useAppDispatch } from '@/store/store'
import { getLocalStorage } from '@/utils/localStorage'
import BookMarkButton from '../BookMarkButton/BookMarkButton'
import FavoritesButton from '../FavoritesButton/FavoritesButton'

type PropsType = {
  product: IProduct
}

function AddToCart({ product }: PropsType) {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState(product.price)

  function increment() {
    setQuantity(prevQuantity => prevQuantity + 1)
    setCost(prevCost => prevCost + product.price)
  }

  function decriment() {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
      setCost(prevCost => prevCost - product.price)
    }
  }

  // проверка введённого значения в количество товара
  function quantityBlur(e: React.FocusEvent<HTMLInputElement>) {
    let number = +e.target.value
    if (Number.isNaN(number) || number < 1) {
      // если значение NaN или отрицательное, то
      setQuantity(1)
      setCost(product.price)
    }
  }

  // изменить количество товара через input
  function quantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!Number.isNaN(+e.target.value)) {
      // если значение не NaN, то...
      setQuantity(+e.target.value)
      setCost(product.price * +e.target.value)
    }
  }

  const addCartRef = useRef<HTMLButtonElement>(null)

  function addToCartClick() {
    const cartItems: CartItemType[] = getLocalStorage('cart')
    const findProduct = cartItems.find(item => item.id === product.id)
    const addToCart = {
      // создание товара
      id: product.id,
      imgUrl: product.imgUrl,
      title: product.title,
      price: product.price,
      quantity: quantity,
      cost: cost,
    }

    if (!findProduct) {
      cartItems.push(addToCart)
    } else {
      findProduct.quantity = quantity
      findProduct.cost = cost
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))
    dispatch(getCart())

    // сообщение о добавлении
    const msg = document.createElement('div')
    msg.classList.add('msg')
    msg.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-plus-lg"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
      /></svg>`
    addCartRef.current?.insertAdjacentElement('beforeend', msg)
    setTimeout(() => msg.remove(), 5000)
  }

  return (
    <>
      <div className="product__calc">
        <div className="product__quantity quantity">
          <div className="quantity__title">Количество</div>
          <div className="quantity__content">
            <button onClick={decriment}>
              <BsDashLg />
            </button>
            <input
              type="text"
              onBlur={quantityBlur}
              onChange={quantityChange}
              value={quantity}
              className="quantity__number"
              min="1"
              max="7"
            />
            <button onClick={increment}>
              <BsPlusLg />
            </button>
          </div>
        </div>
        <div className="product__price price">
          <div className="price__title">Стоимость</div>
          <div className="price__number">{cost} руб.</div>
        </div>
      </div>
      <div className="product__add">
        <BookMarkButton product={product} />
        <FavoritesButton product={product} />
        <button
          ref={addCartRef}
          className="btn radius-10"
          onClick={addToCartClick}
        >
          В корзину <BsBag />
        </button>
      </div>
    </>
  )
}

export default AddToCart
