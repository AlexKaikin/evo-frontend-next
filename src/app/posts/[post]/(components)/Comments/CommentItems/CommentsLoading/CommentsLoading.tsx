import './CommentsLoading.scss'

export default function CommentsLoading() {
  return (
    <div className="comments__items skeleton">
      <div className="comments__item item">
        <div className="item__user">
          <div className="item__avatar"></div>
          <div className="item__name"></div>
        </div>
        <div className="item__body">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  )
}
