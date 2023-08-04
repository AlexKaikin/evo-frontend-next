import {
  getPostsFavorites,
  postsFavoritesSelector,
} from '@/store/blog/favorites/postsFavorites'
import { postsSelector } from '@/store/blog/posts/posts'
import { useAppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Focus from './Focus/Focus'
import Search from './Search/Search'

export default function BlogCloud() {
  const { filter } = useSelector(postsSelector)
  const { postsFavoritesItems } = useSelector(postsFavoritesSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPostsFavorites())
  }, [dispatch])

  return (
    <section className="cloud">
      <div className="container">
        <Search query={filter.query} />
        <Focus favoritesItems={postsFavoritesItems} />
      </div>
    </section>
  )
}
