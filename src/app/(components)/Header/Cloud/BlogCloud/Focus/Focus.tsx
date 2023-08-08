import { PostsFavoritesItemType } from '@/types/blog/postsFavorites'
import Link from 'next/link'
import { BsHeart } from 'react-icons/bs'

interface IProps {
  favoritesItems: PostsFavoritesItemType[]
}

export default function Focus(props: IProps) {
  const { favoritesItems } = props
  return (
    <div className="store__info items">
      <Link href="/posts/favorites" className="item">
        {favoritesItems.length > 0 && (
          <div className="count">{favoritesItems.length}</div>
        )}
        <BsHeart />
      </Link>
    </div>
  )
}
