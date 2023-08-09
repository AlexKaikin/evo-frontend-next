import './styles.scss'

export default function PostsSkeleton() {
  return (
    <div className="section posts">
      <div className="container">
        <div className="skeleton one-post">
          <div className="container post__go-back">
            <div className="go-back__icon"></div>
            <div className="go-back__text"></div>
          </div>
          <div className="container">
            <div className="post__text">
              <div className="post__header">
                <div className="post__title"></div>
                <div className="post__meta">
                  <div className="post__category"></div>
                  <div className="post__view"></div>
                  <div className="post__date"></div>
                </div>
              </div>
              <div className="post__img"></div>
              <p></p>
              <p></p>
              <br />
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <br />
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
