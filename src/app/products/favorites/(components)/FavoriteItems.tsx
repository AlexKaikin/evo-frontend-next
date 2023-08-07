'use client'

import { Rating } from '@/components/'
import { getNoun } from '@/utils/noun'
import Link from 'next/link'
import { useAppSelector } from '@/store/store'
import { favoritesSelector } from '@/store/shop/favorites/favorites'

export default function FavoriteItems() {
  const { favoritesItems } = useAppSelector(favoritesSelector)
  if (!favoritesItems.length) return <div>Товаров нет</div>
  return (
    <div className="products__items product">
      {favoritesItems?.map(product => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          className="product__item"
        >
          <div className="product__img">
            <img
              src={product.imgUrl}
              alt={`${product.title} фото`}
            />
          </div>
          <div className="product__title">
            {product.title} <span className="from">- от</span>{' '}
            <span className="manufacturer">{product.manufacturer}</span>
          </div>
          {!!product.rating && (
            <div className="product__rating">
              <Rating number={product.rating} />{' '}
              <span>
                ({product.ratingCount}{' '}
                {getNoun(product.ratingCount, ['отзыв', 'отзыва', 'отзывов'])})
              </span>
            </div>
          )}
          <div className="product__price">{product.price} руб./100 грамм</div>
        </Link>
      ))}
    </div>
  )
}
