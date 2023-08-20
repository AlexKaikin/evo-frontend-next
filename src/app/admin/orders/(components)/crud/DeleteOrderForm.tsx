'use client'

import { Modal } from '@/app/(components)'
import { orderService } from '@/services'
import { useRouter } from 'next/navigation'

interface IProps {
  id: number
  hideModal: () => void
}

export default function DeleteOrderForm({ id, hideModal }: IProps) {
  const router = useRouter()

  async function deleteClick() {
    const res: any = await orderService.delete(id)
    if(res?.status === 200){
      router.refresh()
      hideModal()
    } else {
      console.log('ошибка удаления заказа')
    }
  }

  return (
    <Modal title="Удалить заказ" modalMaxContent hideModal={hideModal}>
      <p>Вы действительно хотите удалить заказ?</p>
      <div className="button-wrapper">
        <button className="btn btn-warning" onClick={deleteClick}>
          Удалить
        </button>
        <button className="btn btn-light" onClick={hideModal}>
          Отмена
        </button>
      </div>
    </Modal>
  )
}
