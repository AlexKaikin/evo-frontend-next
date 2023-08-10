'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import './styles.scss'

interface IProps {
  navItems: {
    id: number
    url: string
    icon: JSX.Element
    title: string
  }[]
}

export default function AsideNav({ navItems }: IProps) {
 const pathname = usePathname()
  return (
    <nav className="aside__nav">
      {navItems.map(item => (
        <Link
          key={item.id}
          href={item.url}
          className={cn('nav__item', {
            active: pathname === item.url ? 'active' : '',
          })}
        >
          <span>
            {item.icon} {item.title}
          </span>
        </Link>
      ))}
    </nav>
  )
}
