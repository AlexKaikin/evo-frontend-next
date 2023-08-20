'use client'

import { Modal, Rating } from '@/app/(components)'
import { reviewService } from '@/services'
import { IReview } from '@/types/shop/reviews'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface IProps {
  review: IReview
  hideModal: () => void
}

export default function UpdateReviewForm({ review, hideModal }: IProps) {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IReview>()

  async function onSubmit(data: IReview) {
    data.id = review.id
    const res: any = await reviewService.update(data)
    if (res?.status === 200) {
      router.refresh()
      hideModal()
    } else {
      hideModal()
    }
  }

  return (
    <Modal title="Обновить отзыв" hideModal={hideModal}>
      <div className="review-full items">
        <div className="item review__title">
          <Rating number={review.rating} />
        </div>
        <div className="item">
          {review.body.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <div className="item">
          Товар{' '}
          {typeof review.product === 'object' && (
            <Link href={`/products/${review.product.id}`}>
              {review.product.title}
            </Link>
          )}
        </div>
        <div className="item">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="review__status">
              Статус:
              <select
                {...register('published')}
                defaultValue={review.published}
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
