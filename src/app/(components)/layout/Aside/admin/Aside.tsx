import AsideNav from '@/app/(components)/AsideNav/AsideNav'
import {
  BsBag,
  BsChatText,
  BsEnvelope,
  BsPostcard,
  BsSpeedometer2,
  BsStarHalf,
} from 'react-icons/bs'
import './Aside.scss'

export default function Aside() {
  const navItems = [
    {
      id: 1,
      url: '/admin/dashboard',
      icon: <BsSpeedometer2 />,
      title: 'Дашборд',
    },
    {
      id: 2,
      url: '/admin/products',
      icon: <BsPostcard />,
      title: 'Товары',
    },
    {
      id: 3,
      url: '/admin/reviews',
      icon: <BsStarHalf />,
      title: 'Отзывы',
    },
    {
      id: 4,
      url: '/admin/orders',
      icon: <BsBag />,
      title: 'Заказы',
    },
    {
      id: 5,
      url: '/admin/posts',
      icon: <BsPostcard />,
      title: 'Статьи',
    },
    {
      id: 6,
      url: '/admin/comments',
      icon: <BsChatText />,
      title: 'Комментарии',
    },
    {
      id: 7,
      url: '/admin/feedback',
      icon: <BsEnvelope />,
      title: 'Обратная связь',
    },
  ]

  return (
    <aside className="aside">
      <AsideNav navItems={navItems} />
    </aside>
  )
}
