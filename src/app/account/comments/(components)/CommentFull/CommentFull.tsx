import { Modal } from '@/app/(components)'
import { IComment } from '@/types/blog/comments'
import Link from 'next/link'

interface IProps {
  showComment: IComment
  hideModal: () => void
}

export default function CommentFull({
  showComment: comment,
  hideModal,
}: IProps) {
  return (
    <Modal title={`Комментарий`} hideModal={hideModal}>
      <div className="comment__full items">
        <div className="item">
          {comment.body.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <div className="item">
          Статья{' '}
          {typeof comment.post === 'object' && (
            <Link href={`/posts/${comment.post.id}`}>{comment.post.title}</Link>
          )}
        </div>
      </div>
    </Modal>
  )
}
