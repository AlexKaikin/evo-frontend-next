// import { useState } from 'react'
// import { Modal } from '@/components/common'
// import CreateReview from './CreateReview/CreateReview'
// import ReviewItems from './ReviewItems/ReviewItems'
// import './Reviews.scss'

// type PropsType = {
//   product_Id: string
// }

// function Reviews({ product_Id }: PropsType) {
//   const [showModal, setShowModal] = useState(false)

//   function hideModal() {
//     setShowModal(false)
//   }

//   return (
//     <div className="product__reviews review">
//       <div className="btn p-10 radius-10" onClick={() => setShowModal(true)}>
//         Написать отзыв
//       </div>
//       {showModal && (
//         <Modal title="Оставить отзыв" hideModal={hideModal}>
//           <CreateReview product_Id={product_Id} hideModal={hideModal} />
//         </Modal>
//       )}
//       <ReviewItems product_Id={product_Id} />
//     </div>
//   )
// }

// export default Reviews
