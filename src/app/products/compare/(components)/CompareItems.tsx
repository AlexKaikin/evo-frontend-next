'use client'

import { CompareItemType } from '@/types/shop/compare'
import { Rating } from '@/components'
import {BsXLg} from 'react-icons/bs'
import { compareSelector } from '@/store/shop/compare/compare'
import { getLocalStorage, getNoun } from '@/utils'
import Link from 'next/link'
import { useAppSelector } from '@/store/store'
import { useActions } from '@/hooks/useActions'

export default function CompareItems() {
  const { getCompare } = useActions()
  const { compareItems } = useAppSelector(compareSelector)

  function deleteProductClick(id: number) {
    const compareItems: CompareItemType[] = getLocalStorage('compare')
    const findProduct = compareItems.find(item => item.id === id)
    findProduct && compareItems.splice(compareItems.indexOf(findProduct), 1)
    localStorage.setItem('compare', JSON.stringify(compareItems))
    getCompare()
  }

  if (!compareItems.length) return <div>Товаров нет</div>

  return (
    <div className="compare__items">
      {compareItems?.map(product => {
        return (
          <div key={product.id} className="compare__item product">
            <div className="product__img">
              <img
                src={(process.env.REACT_APP_SERVER_URL || '') + product.imgUrl}
                alt={product.title}
              />
            </div>
            <div className="product__title">
              <Link href={`/products/${product.id}`}>
                {product.title} <span className="from">- от</span>{' '}
                <span className="manufacturer">{product.manufacturer}</span>
              </Link>
            </div>
            {!!product.rating && (
              <div className="product__rating">
                <Rating number={product.rating} />{' '}
                <span>
                  ({product.ratingCount}{' '}
                  {getNoun(product.ratingCount, ['отзыв', 'отзыва', 'отзывов'])}
                  )
                </span>
              </div>
            )}
            {product.property.country && (
              <div>Страна: {product.property.country}</div>
            )}
            {product.property.town && <div>Город: {product.property.town}</div>}
            {product.property.year && <div>Год: {product.property.year}</div>}

            <div className="product__text">
              {product.text.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="product__delete delete">
              <button
                onClick={() => deleteProductClick(product.id)}
                className="delete__btn"
              >
                Удалить <BsXLg />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
