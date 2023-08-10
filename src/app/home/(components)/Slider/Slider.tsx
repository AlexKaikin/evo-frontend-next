import slide1Url from '@/assets/img/slider/slide-1.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { BsDot } from 'react-icons/bs'

export default function Slider() {
  return (
    <div className="home__slider fade-in">
      <div className="slider__content">
        <span>пространство для сообщества EVO</span>
        <div className="slider__title">EVO PLACE</div>
        <div className="slider__category">
          <Link href="/products">Магазин</Link> <BsDot />
          <Link href="/posts">Блог</Link> <BsDot />
          <Link href="/club">Социальная сеть</Link>
        </div>
      </div>
      <Image
        src={slide1Url}
        fill
        sizes="(max-width: 1800px) 100vw"
        alt="slide"
      />
    </div>
  )
}
