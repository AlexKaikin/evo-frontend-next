import cn from 'classnames'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { CompareItemType } from '@/types/shop/compare'
import { IProduct } from '@/types/shop/products'
import {BsBookmark} from 'react-icons/bs'
import { compareSelector, getCompare } from '@/store/shop/compare/compare'
import { useAppDispatch } from '@/store/store'
import { getLocalStorage } from '@/utils/localStorage'

type PropsType = {
  product: IProduct
}

function BookMarkButton({ product }: PropsType) {
  const dispatch = useAppDispatch()
  const { compareItems } = useSelector(compareSelector)
  const bookMarkRef = useRef<HTMLButtonElement>(null)
  const isCompare = compareItems.find(item => item.id === product.id)

  function compareClick() {
    const comapreItems: CompareItemType[] = getLocalStorage('compare')
    const findProduct = comapreItems.find(item => item.id === product.id)

    function msgShow(msg: string) {
      bookMarkRef.current?.insertAdjacentHTML('beforeend', msg)
      setTimeout(() => {
        if (bookMarkRef.current?.querySelector('.msg')) {
          let msgShow = bookMarkRef.current.querySelector('.msg')
          if (msgShow !== null) msgShow.outerHTML = ''
        }
      }, 5000)
    }

    if (findProduct) {
      comapreItems.splice(comapreItems.indexOf(findProduct), 1)
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
      comapreItems.push(product)
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
    localStorage.setItem('compare', JSON.stringify(comapreItems))
    dispatch(getCompare())
  }
  return (
    <button
      ref={bookMarkRef}
      onClick={compareClick}
      className={cn('bookmark', { active: isCompare })}
    >
      <BsBookmark />
    </button>
  )
}

export default BookMarkButton
