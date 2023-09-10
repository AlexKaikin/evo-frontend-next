'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { INavLink } from '@/types/navigation'
import cn from 'classnames'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { MdMenu } from 'react-icons/md'

interface IProps{
  items: INavLink[]
}

export default function Nav({ items }: IProps) {
  const menuRef = useRef<HTMLElement>(null)
  const [menuShow, setMenuShow] = useState<boolean>(false)

  useOnClickOutside(menuRef, () => setMenuShow(false))

  function menuShowChange() {
    if (menuShow) setMenuShow(false)
    else setMenuShow(true)
  }

  return (
    <nav ref={menuRef} onClick={menuShowChange} className="header__nav nav">
      <ul className={cn('nav__items', { show: menuShow })}>
        {items.map(item => (
          <li key={item.id} className="nav__item">
            <Link href={item.url} className="nav__link">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={menuShowChange} className="mobile__menu">
        <MdMenu />
      </button>
    </nav>
  )
}
