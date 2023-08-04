import { NavLink } from 'react-router-dom'
import './AsideNav.scss'

type PropsType = {
  navItems: {
    id: number
    url: string
    icon: JSX.Element
    title: string
    end: boolean
  }[]
}

function AsideNav({ navItems }: PropsType) {
  return (
    <nav className="aside__nav">
      {navItems.map(item => (
        <NavLink key={item.id} to={item.url} className="nav__item" end={item.end}>
          <span>
            {item.icon} {item.title}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

export default AsideNav
