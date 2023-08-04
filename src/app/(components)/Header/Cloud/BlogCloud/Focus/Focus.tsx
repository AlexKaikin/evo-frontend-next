import { PostsFavoritesItemType } from '@/types/blog/postsFavorites'
import { HeartSVG } from '@common/svg'
import { NavLink } from 'react-router-dom'

type PropsType = {
  favoritesItems: PostsFavoritesItemType[]
}

function Focus(props: PropsType) {
  const { favoritesItems } = props

  return (
    <div className="store__info items">
      <NavLink to="/posts/favorites" className="item">
        {favoritesItems.length > 0 && (
          <div className="count">{favoritesItems.length}</div>
        )}
        <HeartSVG />
      </NavLink>
    </div>
  )
}

export default Focus
