'use client'

import { Modal } from '@/app/(components)'
import { productService } from '@/services'
import { useRouter } from 'next/navigation'

interface IProps {
  id: number
  hideModal: () => void
}

export default function DeleteProductForm({ id, hideModal }: IProps) {
  const router = useRouter()

  async function deleteClick() {
    const res: any = await productService.delete(id)
    if(res?.status === 200){
      router.refresh()
      hideModal()
    } else {
      console.log('ошибка удаления товара')
    }
  }

  return (
    <Modal title="Удалить товар" modalMaxContent hideModal={hideModal}>
      <p>Вы действительно хотите удалить товар?</p>
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
