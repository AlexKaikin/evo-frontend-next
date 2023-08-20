'use client'

import { Modal } from '@/app/(components)'
import { orderService } from '@/services'
import { IOrder } from '@/types/shop/order'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface IProps {
  order: IOrder
  hideModal: () => void
}

export default function UpdateOrderForm({ order, hideModal }: IProps) {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IOrder>()

  async function onSubmit(data: IOrder) {
    data.id = order.id
    const res: any = await orderService.update(data)
    if (res?.status === 200) {
      router.refresh()
      hideModal()
    } else {
      hideModal()
    }
  }

  return (
    <Modal title="Обновить заказ" hideModal={hideModal} full>
      <div className="order__items">
        {order.cartItems.map(product => (
          <div key={product.id} className="order__item product">
            <div className="product__img">
              <Image
                fill
                sizes="(max-width: 1800px) 33vw"
                src={product.imgUrl}
                alt={product.title}
              />
            </div>
            <div className="product__title">{product.title}</div>
            <div className="product__quantity">{product.quantity} шт.</div>
            <div className="product__cost">
              <span>{product.cost}</span> руб.
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="order__status">
          Статус:
          <select
            {...register('status')}
            defaultValue={order.status}
            name="status"
          >
            <option>Ожидает оплаты</option>
            <option>Отменён</option>
            <option>В пути</option>
            <option>Доставлен</option>
          </select>
          <button type="submit" className="btn p-10">
            Обновить статус
          </button>
        </div>
      </form>
    </Modal>
  )
}
