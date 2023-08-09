'use client'

import defautAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { commentsSelector } from '@/store/blog/comments/comments'
import { useAppSelector } from '@/store/store'
import { formatTime } from '@/utils'
import Image from 'next/image'
import { useEffect } from 'react'
import { CommentsError, CommentsLoading, CommentsNull } from '.'

interface IProps {
  post_id: string
}

export default function CommentItems({ post_id }: IProps) {
  const { getComments } = useActions()
  const { commentItems, status } = useAppSelector(commentsSelector)

  useEffect(() => {
    getComments(post_id)
  }, [getComments, post_id])

  if (status === 'loading') return <CommentsLoading />
  if (status === 'error') return <CommentsError />
  if (!commentItems.length) return <CommentsNull />

  return (
    <div className="comments__items">
      {commentItems.map(comment => (
        <div key={comment.id} className="comments__item comment">
          <div className="comment__user">
            <div className="comment__avatar">
              <Image
                height={70}
                width={70}
                src={
                  comment.user.avatarUrl ? comment.user.avatarUrl : defautAvatar
                }
                alt="avatar"
              />
            </div>
          </div>
          <div className="comment__body">
            <div className="comment__header">
              <div className="comment__name">{comment.user.fullName}, </div>
              <div className="comment__date">{formatTime(comment.created)}</div>
            </div>
            {comment.body.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
