import Modal from '@/app/(components)/Modal/Modal'
import { IOrder } from '@/types/shop/order'
import Image from 'next/image'

interface IProps {
  orderShow: IOrder
  hideModal: () => void
}

export default function OrderFull({ orderShow: order, hideModal }: IProps) {
  return (
    <Modal title={`Заказ №${order.id}`} hideModal={hideModal} full>
      <div className="container">
        <div className="order__items">
          {order.cartItems.map(products => (
            <div key={products.id} className="order__item product">
              <div className="product__img">
                <Image
                  fill
                  sizes="(max-width: 1800px) 30vw"
                  src={products.imgUrl}
                  alt={products.title}
                />
              </div>
              <div className="product__title">{products.title}</div>
              <div className="product__quantity">{products.quantity} шт.</div>
              <div className="product__cost">
                <span>{products.cost}</span> руб.
              </div>
            </div>
          ))}
        </div>
        <div className="order__total">
          <div>
            Всего позицый товаров <span>{order.cartItems.length}</span>
          </div>
          <div>
            Сумма заказа <span>{order.totalCost}</span> рублей
          </div>
        </div>
        <div className="contacts">
          <div className="contacts__column">
            <div className="order__title">Получатель</div>
            <div className="form__field">
              <label>Фамилия</label>
              <p>{order.surname}</p>
            </div>
            <div className="form__field">
              <label>Имя</label>
              <p>{order.name}</p>
            </div>
            <div className="form__field">
              <label>Отчество</label>
              <p>{order.middleName}</p>
            </div>
          </div>
          <div className="contacts__column">
            <div className="order__title">Адрес</div>
            <div className="form__field">
              <label>Область/край</label>
              <p>{order.region}</p>
            </div>
            <div className="form__field">
              <label>Город</label>
              <p>{order.city}</p>
            </div>
            <div className="form__field">
              <label>Улица</label>
              <p>{order.street}</p>
            </div>
            <div className="form__field">
              <label>Дом и квартира</label>
              <p>{order.home}</p>
            </div>
            <div className="form__field">
              <label>Индекс</label>
              <p>{order.index}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
