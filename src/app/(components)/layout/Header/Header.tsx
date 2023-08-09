'use client'

import { authSelector } from '@/store/auth/auth'
import { navigationSelector } from '@/store/navigation/navigation'
import { useAppSelector } from '@/store/store'
import { Account, Cloud, Logo, Nav, Theme } from '.'
import './styles.scss'

export default function Header() {
  const { navigation } = useAppSelector(navigationSelector)
  const auth = useAppSelector(authSelector)
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Nav items={navigation} />
        <Cloud />
        <Theme />
        <Account auth={auth} />
      </div>
    </header>
  )
}
