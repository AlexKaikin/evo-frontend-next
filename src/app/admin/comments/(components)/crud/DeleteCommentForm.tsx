'use client'

import { Modal } from '@/app/(components)'
import { commentService } from '@/services'
import { useRouter } from 'next/navigation'

interface IProps {
  id: number
  hideModal: () => void
}

export default function DeleteCommentForm({ id, hideModal }: IProps) {
  const router = useRouter()

  async function deleteClick() {
    const res: any = await commentService.delete(id)
    if(res?.status === 200){
      router.refresh()
      hideModal()
    } else {
      console.log('ошибка удаления комментария')
    }
  }

  return (
    <Modal title="Удалить комментарий" modalMaxContent hideModal={hideModal}>
      <p>Вы действительно хотите удалить комментарий?</p>
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
