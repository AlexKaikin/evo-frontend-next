import cn from 'classnames'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { FavoriteItemType } from '@/types/shop/favorites'
import { IProduct } from '@/types/shop/products'
import {BsHeart} from 'react-icons/bs'
import {
  favoritesSelector,
  getProductsFavorites,
} from '@/store/shop/favorites/favorites'
import { useAppDispatch } from '@/store/store'
import { getLocalStorage } from '@/utils/localStorage'

type PropsType = {
  product: IProduct
}

function FavoritesButton({ product }: PropsType) {
  const dispatch = useAppDispatch()
  const { favoritesItems } = useSelector(favoritesSelector)
  const isFavorites = favoritesItems.find(item => item.id === product.id)
  const favoritesRef = useRef<HTMLButtonElement>(null)

  function favoritesClick() {
    const favoritesItems: FavoriteItemType[] = getLocalStorage('favorites') // запросить localStorage
    const findProduct = favoritesItems.find(item => item.id === product.id)

    function msgShow(msg: string) {
      favoritesRef.current?.insertAdjacentHTML('beforeend', msg)
      setTimeout(() => {
        if (favoritesRef.current?.querySelector('.msg')) {
          let msgShow = favoritesRef.current.querySelector('.msg')
          if (msgShow !== null) msgShow.outerHTML = ''
        }
      }, 5000)
    }

    if (findProduct) {
      favoritesItems.splice(favoritesItems.indexOf(findProduct), 1)
      const msg = `<div class="msg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-dash-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
          />
        </svg>
      </div>`
      msgShow(msg)
    } else {
      favoritesItems.push(product)
      const msg = `<div class="msg">
        <svg
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
          /></svg>
          </div>`
      msgShow(msg)
    }
    localStorage.setItem('favorites', JSON.stringify(favoritesItems))
    dispatch(getProductsFavorites())
  }

  return (
    <button
      ref={favoritesRef}
      onClick={favoritesClick}
      className={cn('heart', { active: isFavorites })}
    >
      <BsHeart />
    </button>
  )
}

export default FavoritesButton
