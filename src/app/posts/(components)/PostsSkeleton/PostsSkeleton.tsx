import './styles.scss'

export default function PostsSkeleton() {
  return (
    <div className="section posts">
      <div className="container">
        <div className="posts__items post">
          {Array(4)
            .fill('item')
            .map((_, i) => (
              <div key={i} className="post__item post skeleton">
                <div className="post__img"></div>
                <div className="post__content">
                  <div className="post__title"></div>
                  <div className="post__meta">
                    <div className="post__category"></div>
                    <div className="post__view"></div>
                    <div className="post__date"></div>
                  </div>
                  <div className="post__text">
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
