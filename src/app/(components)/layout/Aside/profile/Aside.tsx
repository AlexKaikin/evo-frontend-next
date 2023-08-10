import {BsBag, BsPerson, BsStarHalf, BsChatLeftText} from 'react-icons/bs'
import './Aside.scss'
import AsideNav from '@/app/(components)/AsideNav/AsideNav'

export default function Aside() {
  const navItems = [
    {
      id: 1,
      url: '/account/profile',
      icon: <BsPerson />,
      title: 'Профиль',
    },
    {
      id: 2,
      url: '/account/orders',
      icon: <BsBag />,
      title: 'Заказы',
    },
    {
      id: 3,
      url: '/account/reviews',
      icon: <BsStarHalf />,
      title: 'Отзывы',
    },
    {
      id: 4,
      url: '/account/comments',
      icon: <BsChatLeftText />,
      title: 'Комментарии',
    },
  ]

  return (
    <aside className="aside">
      <AsideNav navItems={navItems} />
    </aside>
  )
}
