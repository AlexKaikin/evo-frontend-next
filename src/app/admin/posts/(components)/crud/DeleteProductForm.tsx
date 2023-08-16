'use client'

import { Modal } from '@/app/(components)'
import { postService } from '@/services'
import { useRouter } from 'next/navigation'

interface IProps {
  id: number
  hideModal: () => void
}

export default function DeleteProductForm({ id, hideModal }: IProps) {
  const router = useRouter()

  async function deleteClick() {
    const res: any = await postService.delete(id)
    if(res?.status === 200){
      router.refresh()
      hideModal()
    } else {
      console.log('ошибка удаления статьи')
    }
  }

  return (
    <Modal title="Удалить статью" modalMaxContent hideModal={hideModal}>
      <p>Вы действительно хотите удалить статью?</p>
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
