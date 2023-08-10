'use client'

import { IComment } from '@/types/blog/comments'
import { formatTime } from '@/utils'
import { useState } from 'react'
import CommentFull from '../CommentFull/CommentFull'

interface IProps {
  comments: IComment[]
}

export default function CommentItems({ comments }: IProps) {
  const [showComment, setShowComment] = useState<IComment | null>(null)

  function hideModal() {
    setShowComment(null)
  }

  if (!comments.length) return <div>Комментарий нет</div>

  return (
    <div>
      <div className="comment__items">
        <div className="comment__item">
          <div>Комментарий</div>
          <div>Создан</div>
          <div>Статус</div>
        </div>
        {comments.map(comment => (
          <div key={comment.id} className="comment__item">
            <button
              onClick={() => setShowComment(comment)}
              className="comment__title"
            >
              {comment.body.slice(0, 30) + '...'}
            </button>
            <div>{formatTime(comment.created)}</div>
            <div>{comment.published}</div>
          </div>
        ))}
      </div>

      {showComment && (
        <CommentFull showComment={showComment} hideModal={hideModal} />
      )}
    </div>
  )
}
