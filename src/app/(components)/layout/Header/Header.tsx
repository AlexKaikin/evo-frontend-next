import { navigationService } from '@/services'
import { Account, Cloud, Logo, Nav, Theme } from '.'
import './styles.scss'

async function getNavigation() {
  const res = await navigationService.getAll()
  const navigation = res.data
  return navigation
}

export default async function Header() {
  const navigation = await getNavigation()
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Nav items={navigation} />
        <Cloud />
        <Theme />
        <Account />
      </div>
    </header>
  )
}
