import { Rating } from '@/components/'
import { IProduct } from '@/types/shop/products'
import { getNoun } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs'

interface IProps {
  products: IProduct[]
}

export default function Products({ products }: IProps) {
  return (
    <div className="section home__products">
      <div className="products__header">
        <div className="products__title">Новые товары</div>
        <Link href={`/products/`} className="products__all">
          Посмотреть все <BsChevronRight />
        </Link>
      </div>
      <div className="products__items product">
        {products?.map(product => {
          return (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="product__item fade-in"
            >
              <div className="product__img">
                <Image
                  fill
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
          )
        })}
      </div>
    </div>
  )
}
