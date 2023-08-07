import { useState } from 'react'
import { Modal } from '@/components'
import ReviewItems from './ReviewItems/ReviewItems'
import './Reviews.scss'
import CreateReview from './CreateReview/CreateReview'


interface IProps {
  product_Id: string
}

export default function Reviews({ product_Id }: IProps) {

  const [showModal, setShowModal] = useState(false)

  function hideModal() {
    setShowModal(false)
  }

  return (
    <div className="product__reviews review">
      <div className="btn p-10 radius-10" onClick={() => setShowModal(true)}>
        Написать отзыв
      </div>
      {showModal && (
        <Modal title="Оставить отзыв" hideModal={hideModal}>
          <CreateReview product_Id={product_Id} hideModal={hideModal} />
        </Modal>
      )}
      <ReviewItems product_Id={product_Id} />
    </div>
  )
}
