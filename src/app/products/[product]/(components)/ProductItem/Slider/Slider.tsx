import { IProduct } from '@/types/shop/products'
import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'

interface IProps {
  product: IProduct
}

export default function Slider({ product }: IProps) {
  const [imgActive, setImgActive] = useState(product?.imgUrl)
  const [offset, setOffset] = useState(0)

  function sliderUp() {
    const heightSlide =
      document.querySelector('.carousel__item')?.scrollHeight || 0
    const sliderItems: HTMLElement | null =
      document.querySelector('.carousel__items')
    const carouselUp: HTMLButtonElement | null =
      document.querySelector('.carousel__up')
    const carouselDown: HTMLButtonElement | null =
      document.querySelector('.carousel__down')

    if (offset !== 0 && heightSlide && sliderItems) {
      setOffset(offset + (heightSlide + 10))
      sliderItems.style.top = offset + (heightSlide + 10) + 'px'

      if (offset > -2 * (heightSlide + 10) && carouselUp)
        carouselUp.style.visibility = 'hidden'

      if (carouselDown) carouselDown.style.visibility = 'visible'
    }
  }

  function sliderDown() {
    const heightSlide =
      document.querySelector('.carousel__item')?.scrollHeight || 0
    const sliderItems: HTMLElement | null =
      document.querySelector('.carousel__items')
    const slidesCount = document.querySelectorAll('.carousel__item').length - 1
    const carouselUp: HTMLButtonElement | null =
      document.querySelector('.carousel__up')
    const carouselDown: HTMLButtonElement | null =
      document.querySelector('.carousel__down')

    if (offset > -1 * heightSlide * slidesCount && sliderItems && carouselUp) {
      setOffset(offset - (heightSlide + 10))
      sliderItems.style.top = offset - (heightSlide + 10) + 'px'
      carouselUp.style.visibility = 'visible'

      if (offset < -1 * heightSlide * (slidesCount - 3) && carouselDown)
        carouselDown.style.visibility = 'hidden'
    }
  }

  return (
    <div className="product__slider">
      <div className="slider__carousel">
        <button
          className="carousel__up"
          style={{ visibility: 'hidden' }}
          onClick={sliderUp}
        >
          <BsChevronCompactUp />
        </button>
        <div className="carousel__wrapper">
          <div className="carousel__items" style={{ top: '0px' }}>
            <div
              className={cn('carousel__item', {
                active: imgActive === product.imgUrl,
              })}
            >
              <Image
                src={product.imgUrl}
                fill
                sizes="(max-width: 1800px) 33vw"
                onClick={() => setImgActive(product.imgUrl)}
                alt="Картинка не загрузилась"
              />
            </div>
            {product.galleryUrl?.map(item => (
              <div
                key={item.toString()}
                className={cn('carousel__item', {
                  active: imgActive === item,
                })}
              >
                <Image
                  src={item}
                  fill
                  sizes="(max-width: 1800px) 33vw"
                  onClick={() => setImgActive(item)}
                  alt="Картинка не загрузилась"
                />
              </div>
            ))}
          </div>
        </div>
        <button className="carousel__down" onClick={sliderDown}>
          <BsChevronCompactDown />
        </button>
      </div>
      <div className="slider__img">
        <Image
          src={imgActive}
          fill
          sizes="(max-width: 1800px) 50vw"
          alt="Картинка не загрузилась"
        />
      </div>
    </div>
  )
}
