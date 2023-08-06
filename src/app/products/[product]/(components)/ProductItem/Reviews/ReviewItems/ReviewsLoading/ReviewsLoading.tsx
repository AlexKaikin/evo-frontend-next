import './ReviewsLoading.scss'

function ReviewsLoading() {
  return (
    <div className="reviews__items skeleton">
      <div className="reviews__item review">
        <div className="review__user">
          <div className="review__avatar"></div>
        </div>
        <div className="review__body">
          <div className="review__header">
            <div className="review__name"></div>
            <div className="review__date"></div>
          </div>
          <div className="review__rating"></div>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default ReviewsLoading
