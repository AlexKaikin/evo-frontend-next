'use client'

import { AddCart } from './'
import cn from 'classnames'
import { useState } from 'react'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import Rating from '@/components/Rating/Rating'
import { getNoun } from '@/utils/utils'
import Slider from './Slider/Slider'
import { IProduct } from "@/types/shop/products"
import Reviews from './Reviews/Reviews'

interface IProps {
    product: IProduct
}

export default function ProductItem({product}: IProps){
    const [tabActive, setTabActive] = useState(1)

    return (
      <div className="section product-one">
        <div className="container">
          <GoBackButton />
        </div>
        <div className="container">
          <Slider product={product} />
          <div className="product__title-container">
            <div className="product__manufacturer">
              От <span>{product.manufacturer}</span>
            </div>
            <div className="product__title">{product.title}</div>
            {!!product.rating && (
              <div className="product__rating">
                <Rating number={product.rating} />{' '}
                <span>
                  ({product.ratingCount}{' '}
                  {getNoun(product.ratingCount, [
                    'отзыв',
                    'отзыва',
                    'отзывов',
                  ])}
                  )
                </span>
              </div>
            )}
            <div className="product__quantity">
              {product.volume} {product.volumeMeasurement}
            </div>
            <AddCart product={product} />
          </div>
        </div>

        <div className="container">
          <div className="tab">
            <div className="tab__titles items">
              <button
                onClick={() => setTabActive(1)}
                className={cn('btn btn-light radius-5 tab__title title-1', {
                  active: tabActive === 1,
                })}
              >
                Описание
              </button>
              <button
                onClick={() => setTabActive(2)}
                className={cn('btn btn-light radius-5 tab__title title-2', {
                  active: tabActive === 2,
                })}
              >
                Характеристики
              </button>
              <button
                onClick={() => setTabActive(3)}
                className={cn('btn btn-light radius-5 tab__title title-3', {
                  active: tabActive === 3,
                })}
              >
                Отзывы
              </button>
            </div>

            {tabActive === 1 && (
              <div className="tab__content content-1">
                <div className="product__text">
                  {product.text.split('\n').map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            )}

            {tabActive === 2 && (
              <div className="tab__content content-2">
                <div className="product__property">
                  <div>Изготовитель: {product.manufacturer}</div>
                  {product.property.country && (
                    <div>Страна: {product.property.country}</div>
                  )}
                  {product.property.town && (
                    <div>Город: {product.property.town}</div>
                  )}
                  {product.property.year && (
                    <div>Год: {product.property.year}</div>
                  )}
                </div>
              </div>
            )}

            {tabActive === 3 && (
              <div className="tab__content content-3">
                <Reviews product_Id={product._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
}