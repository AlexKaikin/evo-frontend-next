import { Metadata } from 'next'
import '../styles.scss'
import FavoriteItems from './(components)/FavoriteItems'

export const metadata: Metadata = {
  title: 'Избранные Товары |  EVO PLACE',
  description: 'Товары...',
}

export default function Favorites() {
  return (
    <div className="section products">
      <div className="container">
        <div className="section__title">Избранные товары</div>
        <FavoriteItems />
      </div>
    </div>
  )
}
