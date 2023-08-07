import defautAvatar from '@/assets/img/user/defaultAvatar.png'
import Rating from '@/components/Rating/Rating'
import { useActions } from '@/hooks/useActions'
import { reviewSelector } from '@/store/shop/reviews/reviews'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { formatTime } from '@/utils/utils'
import Image from 'next/image'
import { useEffect } from 'react'
import { ReviewsError, ReviewsLoading, ReviewsNull } from '.'

type PropsType = {
  product_Id: string
}

export default function ReviewItems({ product_Id }: PropsType) {
  const { getReviews } = useActions()
  const { reviewItems, status } = useAppSelector(reviewSelector)

  useEffect(() => {
    getReviews(product_Id)
  }, [getReviews, product_Id])

  if (status === 'loading') return <ReviewsLoading />
  if (status === 'error') return <ReviewsError />
  if (!reviewItems.length) return <ReviewsNull />

  return (
    <div className="reviews__items">
      {reviewItems.map(review => (
        <div key={review.id} className="reviews__item review fade-in">
          <div className="review__user">
            <div className="review__avatar">
              <Image
                src={
                  review.user.avatarUrl ? review.user.avatarUrl : defautAvatar
                }
                width={70}
                height={70}
                alt="avatar"
              />
            </div>
          </div>
          <div className="review__body">
            <div className="review__header">
              <div className="review__name">{review.user.fullName}, </div>
              <div className="review__date">{formatTime(review.created)}</div>
            </div>
            <div className="review__rating">
              <Rating number={review.rating} />
            </div>
            {review.body.split('\n').map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
