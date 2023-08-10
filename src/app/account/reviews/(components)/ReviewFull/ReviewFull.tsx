import { IReview } from '@/types/shop/reviews'
import { Modal, Rating } from '@/app/(components)'
import Link from 'next/link'

interface IProps {
  reviewShow: IReview
  hideModal: () => void
}

export default function ReviewFull({ reviewShow: review, hideModal }: IProps) {
  return (
    <Modal title={`Отзыв`} hideModal={hideModal}>
      <div className="review__full items">
        <div className="item review__rating">
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
      </div>
    </Modal>
  )
}

