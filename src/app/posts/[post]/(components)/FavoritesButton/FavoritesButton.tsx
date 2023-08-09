'use client'

import cn from 'classnames'
import { useRef } from 'react'
import { IPost } from '@/types/blog/posts'
import { PostsFavoritesItemType } from '@/types/blog/postsFavorites'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import {
  getPostsFavorites,
  postsFavoritesSelector,
} from '@/store/blog/favorites/postsFavorites'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getLocalStorage } from '@/utils'

interface IProps {
  postItem: IPost
}

export default function FavoritesButton({ postItem }: IProps) {
  const dispatch = useAppDispatch()
  const { postsFavoritesItems } = useAppSelector(postsFavoritesSelector)
  const isFavorites = postsFavoritesItems.find(item => item.id === postItem.id)
  const favoritesRef = useRef<HTMLDivElement>(null)

  function favoritesClick() {
    const favoritesItems: PostsFavoritesItemType[] =
      getLocalStorage('postsFavorites')
    const findPost = favoritesItems.find(item => item.id === postItem.id)

    if (findPost) {
      favoritesItems.splice(favoritesItems.indexOf(findPost), 1)
    } else {
      favoritesItems.push(postItem)
    }

    localStorage.setItem('postsFavorites', JSON.stringify(favoritesItems))
    dispatch(getPostsFavorites())
  }

  return (
    <div
      ref={favoritesRef}
      onClick={favoritesClick}
      className={cn('post__like', { active: isFavorites })}
    >
      {isFavorites ? <BsHeartFill /> : <BsHeart />}
    </div>
  )
}
