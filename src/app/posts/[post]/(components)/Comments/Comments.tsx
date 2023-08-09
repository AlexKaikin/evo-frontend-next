'use client'

import { Modal } from '@/app/(components)'
import { useState } from 'react'
import CommentItems from './CommentItems/CommentItems'
import './Comments.scss'
import CreateComment from './CreateComment.tsx/CreateComment'

interface IProps {
  post_id: string
}

export default function Comments({ post_id }: IProps) {
  const [showModal, setShowModal] = useState(false)

  function hideModal() {
    setShowModal(false)
  }

  return (
    <div className="post__comments comment">
      <div className="btn p-10" onClick={() => setShowModal(true)}>
        Написать комментарий
      </div>
      {showModal && (
        <Modal title="Оставить комментарй" hideModal={hideModal}>
          <CreateComment post_id={post_id} hideModal={hideModal} />
        </Modal>
      )}
      <CommentItems post_id={post_id} />
    </div>
  )
}
