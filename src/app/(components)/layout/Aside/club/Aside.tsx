import AsideNav from '@common/AsideNav/AsideNav'
import {
  ChatTextSVG,
  FlagSVG,
  MegaphoneSVG,
  PeopleSVG,
  PersonCircleSVG,
} from '@common/svg'

function Aside() {
  const navItems = [
    { id: 1, url: '/club', icon: <PersonCircleSVG />, title: 'Моя страница', end: true },
    { id: 2, url: '/club/messages', icon: <ChatTextSVG />, title: 'Мессенджер', end: false },
    { id: 3, url: '/club/groups', icon: <FlagSVG />, title: 'Группы', end: false },
    {
      id: 4,
      url: '/club/users',
      icon: <PeopleSVG />,
      title: 'Пользователи',
      end: false
    },
    {
      id: 5,
      url: '/club/events',
      icon: <MegaphoneSVG />,
      title: 'События',
      end: false
    },
  ]

  return (
    <aside className="aside">
      <AsideNav navItems={navItems} />
    </aside>
  )
}

export default Aside
