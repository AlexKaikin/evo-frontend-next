import { ReviewsError, ReviewsLoading, ReviewsNull } from '.'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import defautAvatar from '@assets/img/user/defaultAvatar.png'
import Rating from '@common/Rating/Rating'
import { getReviews, reviewSelector } from '@store/shop/reviews/reviews'
import { useAppDispatch } from '@store/store'
import { formatTime } from '@utils/utils'

type PropsType = {
  product_Id: string
}

function ReviewItems({ product_Id }: PropsType) {
  const { reviewItems, status } = useSelector(reviewSelector)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getReviews(product_Id))
  }, [dispatch, product_Id])

  if (status === 'loading') return <ReviewsLoading />
  if (status === 'error') return <ReviewsError />
  if (!reviewItems.length) return <ReviewsNull />

  return (
    <div className="reviews__items">
      {reviewItems.map(review => (
        <div key={review.id} className="reviews__item review">
          <div className="review__user">
            <div className="review__avatar">
              <img
                src={
                  review.user.avatarUrl
                    ? (process.env.REACT_APP_SERVER_URL || '') +
                      review.user.avatarUrl
                    : defautAvatar
                }
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

export default ReviewItems
