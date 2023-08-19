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
      {navItems.map(link => (
        <Link
          key={link.id}
          href={link.url}
          className={cn('nav__item', {
            active: pathname === link.url ? 'active' : '',
          })}
        >
          <span>{link.icon} {link.title}</span>
        </Link>
      ))}
    </nav>
  )
}
