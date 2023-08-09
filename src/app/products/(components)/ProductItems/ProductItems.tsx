import { Rating } from '@/app/(components)'
import { IProduct } from '@/types/shop/products'
import { getNoun } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  products: IProduct[]
}

export default function ProductItems({ products }: IProps) {
  return (
    <div className="section products">
      <div className="container">
        <div className="products__items product">
          {products.map(product => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="product__item"
            >
              <div className="product__img">
                <Image
                  src={product.imgUrl}
                  fill
                  sizes="(max-width: 1800px) 50vw"
                  alt={product.title}
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
                    {getNoun(product.ratingCount, [
                      'отзыв',
                      'отзыва',
                      'отзывов',
                    ])}
                    )
                  </span>
                </div>
              )}
              <div className="product__price">
                {product.price} {product.currency}/{product.volume}{' '}
                {product.volumeMeasurement}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
