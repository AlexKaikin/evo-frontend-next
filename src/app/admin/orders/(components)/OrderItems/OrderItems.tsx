'use client'

import { Rating } from '@/app/(components)'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { IReview } from '@/types/shop/reviews'
import { formatTime, text } from '@/utils'
import { useRef, useState } from 'react'
import { BsPencilSquare, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { DeleteOrderForm, UpdateOrderForm } from '../crud'
import { IOrder } from '@/types/shop/order'

interface IProps {
  orders: IOrder[]
}

export default function OrderItems({ orders }: IProps) {
  const [orderItem, setOrderItem] = useState<IOrder | null>(null)
  const [updateOrderShow, setUpdateOrderShow] = useState<boolean>(false)
  const [deleteOrderShow, setDeleteOrderShow] = useState<boolean>(false)
  const [activeControls, setActiveControls] = useState<number>(0)
  const controlsRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(controlsRef, () => setActiveControls(0))

  function showControls(id: number) {
    setActiveControls(id)
  }

  function updateModaltoggle() {
    setUpdateOrderShow(!updateOrderShow)
  }

  function deleteModaltoggle() {
    setDeleteOrderShow(!deleteOrderShow)
  }

  function updateOrder(item: IOrder) {
    setUpdateOrderShow(true)
    setOrderItem(item)
  }

  function deleteOrder(item: IOrder) {
    setDeleteOrderShow(true)
    setOrderItem(item)
  }

  return (
    <div className="order__items">
      <div className="order__item order">
        <div>№ заказа</div>
        <div>Создан</div>
        <div>Статус</div>
        <div></div>
      </div>
      {orders.map(order => {
        return (
          <div key={order.id} className="order__item order">
            <div className="order__title">Заказ №{order.id}</div>
            <div>{formatTime(order.created)}</div>
            <div>{order.status}</div>
            <div className="order__controls">
              <button onClick={() => showControls(order.id)}>
                <BsThreeDotsVertical />
              </button>
              {activeControls === order.id && (
                <div ref={controlsRef} className="controls fade-in">
                  <button onClick={() => updateOrder(order)}>
                    <BsPencilSquare /> Показать
                  </button>
                  <button onClick={() => deleteOrder(order)}>
                    <BsTrash3 /> Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      })}
      {updateOrderShow && orderItem && (
        <UpdateOrderForm order={orderItem} hideModal={updateModaltoggle} />
      )}
      {deleteOrderShow && orderItem && (
        <DeleteOrderForm id={orderItem.id} hideModal={deleteModaltoggle} />
      )}
    </div>
  )
}
