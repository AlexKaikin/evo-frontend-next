import { useActions } from '@/hooks/useActions'
import { postsFavoritesSelector } from '@/store/blog/favorites/postsFavorites'
import { useAppSelector } from '@/store/store'
import { useEffect } from 'react'
import Focus from './Focus/Focus'
import Search from './Search/Search'

export default function BlogCloud() {
  const { getPostsFavorites } = useActions()
  const { postsFavoritesItems } = useAppSelector(postsFavoritesSelector)

  useEffect(() => {
    getPostsFavorites()
  }, [getPostsFavorites])

  return (
    <section className="cloud">
      <div className="container">
        <Search />
        <Focus favoritesItems={postsFavoritesItems} />
      </div>
    </section>
  )
}
