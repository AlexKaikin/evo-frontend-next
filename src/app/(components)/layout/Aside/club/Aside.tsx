import AsideNav from '@/app/(components)/AsideNav/AsideNav'
import {
  BsChatText,
  BsFlag,
  BsMegaphone,
  BsPeople,
  BsPersonCircle,
} from 'react-icons/bs'

export default function Aside() {
  const navItems = [
    {
      id: 1,
      url: '/club/profile',
      icon: <BsPersonCircle />,
      title: 'Моя страница',
      end: true,
    },
    {
      id: 2,
      url: '/club/messages',
      icon: <BsChatText />,
      title: 'Мессенджер',
      end: false,
    },
    {
      id: 3,
      url: '/club/groups',
      icon: <BsFlag />,
      title: 'Группы',
      end: false,
    },
    {
      id: 4,
      url: '/club/users',
      icon: <BsPeople />,
      title: 'Пользователи',
      end: false,
    },
    {
      id: 5,
      url: '/club/events',
      icon: <BsMegaphone />,
      title: 'События',
      end: false,
    },
  ]

  return (
    <aside className="aside">
      <AsideNav navItems={navItems} />
    </aside>
  )
}
