// import { Field, Form, Formik } from 'formik'
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { CreateReviewItemType } from '@/types/shop/reviews'
// import Modal from '@/components/common/Modal/Modal'
// import { authSelector } from '@/store/auth/auth'
// import { createReview } from '@/store/shop/reviews/reviews'
// import { useAppDispatch } from '@/store/store'

// type PropsType = {
//   product_Id: string
//   hideModal: () => void
// }

// function CreateReview({ product_Id, hideModal }: PropsType) {
//   const { data } = useSelector(authSelector)
//   const [modalShow, setModalShow] = useState(false)

//   function hideModalModeration() {
//     setModalShow(false)
//     hideModal()
//   }

//   const formState: CreateReviewItemType = {
//     rating: 0,
//     body: '',
//     product: product_Id,
//   }

//   function bodyValidate(value: string) {
//     if (!value) return 'Обязательное поле'
//   }

//   const dispatch = useAppDispatch()
//   const formSubmit = async (
//     values: CreateReviewItemType,
//     { resetForm }: any
//   ) => {
//     const res = await dispatch(createReview(values))

//     if (res === 'ok') {
//       setModalShow(true)
//     }

//     resetForm()
//   }

//   if (!data)
//     return (
//       <div className="not-auth">
//         Чтобы написать отзыв нужно авторизоваться. <Link to="/login">Вход</Link>{' '}
//         | <Link to="/register">Регистрация</Link>
//       </div>
//     )

//   return (
//     <>
//       <Formik initialValues={formState} onSubmit={formSubmit}>
//         {({ errors, touched }) => (
//           <Form className="form">
//             <div className="form__select">
//               <label>Рейтинг</label>
//               <Field type="text" as="select" name="rating">
//                 <option value="0">Без рейтинга</option>
//                 <option value="5">5 звёзд</option>
//                 <option value="4">4 звезды</option>
//                 <option value="3">3 звезды</option>
//                 <option value="2">2 звезды</option>
//                 <option value="1">1 звезда</option>
//               </Field>
//             </div>
//             <div className="form__field">
//               <label>Отзыв</label>
//               <Field
//                 type="text"
//                 name="body"
//                 as="textarea"
//                 validate={bodyValidate}
//               />
//             </div>
//             {errors.body && touched.body && (
//               <div className="form__text_error">{errors.body}</div>
//             )}
//             <button type="submit" className="form__btn">
//               Отправить
//             </button>
//           </Form>
//         )}
//       </Formik>
//       {modalShow && (
//         <Modal title="" modalMaxContent hideModal={hideModalModeration}>
//           Отзыв отправлен на проверку
//         </Modal>
//       )}
//     </>
//   )
// }

// export default CreateReview
