'use client'

import { IOrder } from '@/types/shop/order'
import { formatTime } from '@/utils'
import { useState } from 'react'
import OrderFull from '../OrderFull/OrderFull'

interface IProps {
  orders: IOrder[]
}

export default function OrderItems({ orders }: IProps) {
  const [orderShow, setOrderShow] = useState<IOrder | null>(null)

  function hideModal() {
    setOrderShow(null)
  }

  if (!orders.length) return <div>Заказов нет</div>
  return (
    <div>
      <div className="order__items">
        <div className="order__item order">
          <div>№ заказа</div>
          <div>Создан</div>
          <div>Статус</div>
        </div>
        {orders.map(order => (
          <div key={order.id} className="order__item order">
            <div>
              <button onClick={() => setOrderShow(order)}>
                Заказ №{order.id}
              </button>
            </div>
            <div>{formatTime(order.created)}</div>
            <div>{order.status}</div>
          </div>
        ))}
      </div>

      {orderShow && <OrderFull orderShow={orderShow} hideModal={hideModal} />}
    </div>
  )
}
