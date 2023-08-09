'use client'

import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { IPost } from '@/types/blog/posts'
import { formatTime } from '@/utils'
import Image from 'next/image'
import { BsClock, BsEye, BsFolder2Open } from 'react-icons/bs'
import Comments from "../Comments/Comments"
import FavoritesButton from '../FavoritesButton/FavoritesButton'

interface IProps {
  post: IPost
}

export default function PostItem({ post }: IProps) {
  return (
    <div className="section post">
      <div className="container post__go-back">
        <GoBackButton />
      </div>
      <div className="container">
        <div className="post__text">
          <div className="post__header">
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
              <FavoritesButton postItem={post} />
            </div>
          </div>
          {post.imgUrl && (
            <div className="post__img">
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={post.imgUrl}
                alt={post.title}
              />
            </div>
          )}
          {post.text.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <Comments post_id={post._id} />
      </div>
    </div>
  )
}
