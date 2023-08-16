'use client'

import { Modal } from '@/app/(components)'
import { reviewService } from '@/services'
import { useRouter } from 'next/navigation'

interface IProps {
  id: number
  hideModal: () => void
}

export default function DeleteReviewForm({ id, hideModal }: IProps) {
  const router = useRouter()

  async function deleteClick() {
    const res: any = await reviewService.delete(id)
    if(res?.status === 200){
      router.refresh()
      hideModal()
    } else {
      console.log('ошибка удаления отзыва')
    }
  }

  return (
    <Modal title="Удалить отзыв" modalMaxContent hideModal={hideModal}>
      <p>Вы действительно хотите удалить отзыв?</p>
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
