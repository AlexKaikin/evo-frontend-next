'use client'

import Rating from '@/app/(components)/Rating/Rating'
import { formatTime } from '@/utils'
import { useState } from 'react'
import { IReview } from '@/types/shop/reviews'
import ReviewFull from '../ReviewFull/ReviewFull'

interface IProps {
  reviews: IReview[]
}

export default function ReviewItems({ reviews }: IProps) {
  const [reviewShow, setReviewShow] = useState<IReview | null>(null)

  function hideModal() {
    setReviewShow(null)
  }

  if (!reviews.length) return <div>Отзывов нет</div>

  return (
    <div>
      <div className="review__items">
        <div className="review__item">
          <div>Отзыв</div>
          <div>Рейтинг</div>
          <div>Создан</div>
          <div>Статус</div>
        </div>
        {reviews.map(review => (
          <div key={review.id} className="review__item">
            <button
              onClick={() => setReviewShow(review)}
              className="review__title"
            >
              {review.body.slice(0, 30) + '...'}
            </button>
            <div className="review__rating">
              <Rating number={review.rating} />
            </div>
            <div>{formatTime(review.created)}</div>
            <div>{review.published}</div>
          </div>
        ))}
      </div>

      {reviewShow && (
        <ReviewFull reviewShow={reviewShow} hideModal={hideModal} />
      )}
    </div>
  )
}

