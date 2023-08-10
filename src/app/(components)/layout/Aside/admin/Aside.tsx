import AsideNav from '@common/AsideNav/AsideNav'
import {
  BagSVG,
  ChatTextSVG,
  EnvelopeSVG,
  PostcardSVG,
  Speedometer2SVG,
  StarHalfSVG,
} from '@common/svg'
import './Aside.scss'

function Aside() {
  const navItems = [
    {
      id: 1,
      url: '/admin/dashboard',
      icon: <Speedometer2SVG />,
      title: 'Дашборд',
      end: true,
    },
    {
      id: 2,
      url: '/admin/products',
      icon: <PostcardSVG />,
      title: 'Товары',
      end: true,
    },
    {
      id: 3,
      url: '/admin/reviews',
      icon: <StarHalfSVG />,
      title: 'Отзывы',
      end: true,
    },
    {
      id: 4,
      url: '/admin/orders',
      icon: <BagSVG />,
      title: 'Заказы',
      end: true,
    },
    {
      id: 5,
      url: '/admin/posts',
      icon: <PostcardSVG />,
      title: 'Статьи',
      end: true,
    },
    {
      id: 6,
      url: '/admin/comments',
      icon: <ChatTextSVG />,
      title: 'Комментарии',
      end: true,
    },
    {
      id: 7,
      url: '/admin/feedback',
      icon: <EnvelopeSVG />,
      title: 'Обратная связь',
      end: true,
    },
  ]

  return (
    <aside className="aside">
      <AsideNav navItems={navItems} />
    </aside>
  )
}

export default Aside
