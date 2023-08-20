'use client'

import { Modal, Rating } from '@/app/(components)'
import { commentService } from '@/services'
import { IComment } from '@/types/blog/comments'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface IProps {
  comment: IComment
  hideModal: () => void
}

export default function UpdateReviewForm({ comment, hideModal }: IProps) {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IComment>()

  async function onSubmit(data: IComment) {
    data.id = comment.id
    const res: any = await commentService.update(data)
    if (res?.status === 200) {
      router.refresh()
      hideModal()
    } else {
      hideModal()
    }
  }

  return (
    <Modal title="Обновить комментарий" hideModal={hideModal}>
      <div className="comment-full items">
        <div className="item">
          {comment.body.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <div className="item">
          Товар{' '}
          {typeof comment.post === 'object' && (
            <Link href={`/posts/${comment.post.id}`}>
              {comment.post.title}
            </Link>
          )}
        </div>
        <div className="item">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="comment__status">
              Статус:
              <select
                {...register('published')}
                defaultValue={comment.published}
                name="published"
              >
                <option>На модерации</option>
                <option>Одобрен</option>
                <option>Отклонён</option>
              </select>
              <button type="submit" className="btn p-10">
                Обновить статус
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}
