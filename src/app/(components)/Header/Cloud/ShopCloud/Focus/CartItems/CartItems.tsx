import { useActions } from '@/hooks/useActions'
import { CartItemType, CartStateType } from '@/types/shop/cart'
import { getLocalStorage } from '@/utils/localStorage'
import Image from 'next/image'
import Link from 'next/link'
import { BsTrash } from 'react-icons/bs'

interface IProps {
  cartState: CartStateType
  showCartOnClick: () => void
}

export default function CartItems({ cartState, showCartOnClick }: IProps) {
  const { getCart } = useActions()
  const { cartItems, totalCost } = cartState

  function deleteProductClick(id: number) {
    const cartItems: CartItemType[] = getLocalStorage('cart')
    const findProduct = cartItems.find(item => item.id === id)
    findProduct && cartItems.splice(cartItems.indexOf(findProduct), 1)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    getCart()
  }

  return (
    <>
      {cartItems?.map(product => (
        <div key={product.id} className="cart__item">
          <div className="product__img">
            <Image
              src={(process.env.REACT_APP_SERVER_URL || '') + product.imgUrl}
              alt={product.title}
              width={80}
              height={80}
            />
          </div>
          <div className="product__info">
            <Link href={`/products/${product.id}`} onClick={showCartOnClick}>
              {product.title}
            </Link>
            <div className="product__cost">{product.cost} руб.</div>
            <div className="product__quantity">
              <div className="quantity__number">{product.quantity} шт.</div>
              <div className="product__delete">
                <button
                  onClick={() => deleteProductClick(product.id)}
                  className="delete__btn"
                >
                  <BsTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="cart__totalprice">
        Сумма заказа <br /> <span>{totalCost}</span> руб.
      </div>
    </>
  )
}
