import './styles.scss'

export default function ProductSkeleton() {
  return (
    <section className="section product-one skeleton">
      <div className="container">
        <div className="go-back-button">
          <div className="round-wrap"></div>
          <div className="text"></div>
        </div>
      </div>
      <div className="container">
        <div className="product__slider">
          <div className="slider__carousel">
            <div className="carousel__wrapper">
              <div className="carousel__items">
                <div className="carousel__item"></div>
                <div className="carousel__item"></div>
                <div className="carousel__item"></div>
              </div>
            </div>
          </div>

          <div className="slider__img"></div>
        </div>

        <div className="product__title-container">
          <div className="product__title"></div>
          <div className="product__rating"></div>
          <div className="product__quantity"></div>
          <div className="product__calc">
            <div className="product__quantity quantity">
              <div className="quantity__title"></div>
              <div className="quantity__content"></div>
            </div>
            <div className="product__price price">
              <div className="price__title"></div>
              <div className="price__number"></div>
            </div>
          </div>
          <div className="product__add">
            <button className="bookmark"></button>
            <button className="heart"></button>
            <button className="btn">В корзину</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tab">
          <div className="tab__titles items">
            <button className="btn tab__title title-1">Описание</button>
            <button className="btn tab__title title-2">Характеристики</button>
            <button className="btn tab__title title-3">Отзывы</button>
          </div>

          <div className="tab__content content-1">
            <div className="product__text">Описание</div>
            <div className="product__text">Описание</div>
            <div className="product__text">Описание</div>
          </div>
        </div>
      </div>
    </section>
  )
}
