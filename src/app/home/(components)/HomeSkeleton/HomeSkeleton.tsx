import './styles.scss'

export default function HomeSkeleton() {
  return (
    <>
      <div className="home__slider-skeleton"></div>
      <div className="section products">
        <div className="container">
          <div className="skeleton products">
            {Array(4)
              .fill('item')
              .map((_, i) => (
                <div key={i} className="product__item">
                  <div className="product__img">
                    <div></div>
                  </div>
                  <div className="product__title"></div>
                  <div className="product__rating"></div>
                  <div className="product__price">
                    <span></span> <span></span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
