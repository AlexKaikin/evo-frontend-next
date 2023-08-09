import Link from 'next/link'
import './AsideNav.scss'

interface IProps {
  navItems: {
    id: number
    url: string
    icon: JSX.Element
    title: string
    end: boolean
  }[]
}

export default function AsideNav({ navItems }: IProps) {
  return (
    <nav className="aside__nav">
      {navItems.map(item => (
        <Link
          key={item.id}
          href={item.url}
          className="nav__item"
        >
          <span>
            {item.icon} {item.title}
          </span>
        </Link>
      ))}
    </nav>
  )
}
