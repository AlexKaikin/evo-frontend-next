import { Metadata } from 'next'
import '../styles.scss'
import {FavoriteItems} from './(components)'

export const metadata: Metadata = {
  title: 'Избранные Статьи |  EVO PLACE',
  description: 'Статьи...',
}

export default function Favorites() {
  return (
    <div className="section posts">
      <div className="container">
        <div className="section__title">Избранные статьи</div>
        <FavoriteItems />
      </div>
    </div>
  )
}
