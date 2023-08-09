'use client'

import { postsFavoritesSelector } from '@/store/blog/favorites/postsFavorites'
import { useAppSelector } from '@/store/store'
import { formatTime } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsClock, BsEye, BsFolder2Open } from 'react-icons/bs'

export default function FavoriteItems() {
  const { postsFavoritesItems } = useAppSelector(postsFavoritesSelector)
  if (!postsFavoritesItems.length) return <div>Не найдено</div>
  return (
    <div className="posts__items post">
      {postsFavoritesItems.map(post => {
        return (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className="post__item fade-in"
          >
            <div className="post__img">
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={post.imgUrl}
                alt={`${post.title} фото`}
              />
            </div>
            <div>
              <div className="post__title">{post.title}</div>
              <div className="post__meta">
                <div className="post__category">
                  <BsFolder2Open /> {post.category}
                </div>
                <div className="post__view">
                  <BsEye /> {post.viewsCount}
                </div>
                <div className="post__date">
                  <BsClock /> {formatTime(post.created)}
                </div>
              </div>
              <div className="post__text">
                {post.text
                  .slice(0, 140)
                  .concat('...')
                  .split('\n')
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
