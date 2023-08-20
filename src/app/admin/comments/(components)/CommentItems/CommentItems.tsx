'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { formatTime, text } from '@/utils'
import { useRef, useState } from 'react'
import { BsPencilSquare, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { DeleteCommentForm, UpdateCommentForm } from '../crud'
import { IComment } from '@/types/blog/comments'

interface IProps {
  comments: IComment[]
}

export default function CommentItems({ comments }: IProps) {
  const [commentItem, setCommentItem] = useState<IComment | null>(null)
  const [updateCommentShow, setUpdateCommentShow] = useState<boolean>(false)
  const [deleteCommentShow, setDeleteCommentShow] = useState<boolean>(false)
  const [activeControls, setActiveControls] = useState<number>(0)
  const controlsRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(controlsRef, () => setActiveControls(0))

  function showControls(id: number) {
    setActiveControls(id)
  }

  function updateModaltoggle() {
    setUpdateCommentShow(!updateCommentShow)
  }

  function deleteModaltoggle() {
    setDeleteCommentShow(!deleteCommentShow)
  }

  function updateComment(item: IComment) {
    setUpdateCommentShow(true)
    setCommentItem(item)
  }

  function deleteComment(item: IComment) {
    setDeleteCommentShow(true)
    setCommentItem(item)
  }

  return (
    <div className="comment__items">
      <div className="comment__item">
        <div>Комментарий</div>
        <div>Создан</div>
        <div>Статус</div>
        <div></div>
      </div>
      {comments.map(comment => {
        return (
          <div key={comment.id} className="comment__item">
            <div className="comment__title">{text.cut(comment.body, 50)}</div>
            <div>{formatTime(comment.created)}</div>
            <div>{comment.published}</div>
            <div className="comment__controls">
              <button onClick={() => showControls(comment.id)}>
                <BsThreeDotsVertical />
              </button>

              {activeControls === comment.id && (
                <div ref={controlsRef} className="controls fade-in">
                  <button onClick={() => updateComment(comment)}>
                    <BsPencilSquare /> Показать
                  </button>
                  <button onClick={() => deleteComment(comment)}>
                    <BsTrash3 /> Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      })}
      {updateCommentShow && commentItem && (
        <UpdateCommentForm comment={commentItem} hideModal={updateModaltoggle} />
      )}
      {deleteCommentShow && commentItem && (
        <DeleteCommentForm id={commentItem.id} hideModal={deleteModaltoggle} />
      )}
    </div>
  )
}
