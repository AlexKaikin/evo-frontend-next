'use client'

import { useState } from 'react'

import { Modal } from '@/app/(components)'
import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { useAppSelector } from '@/store/store'
import Link from 'next/link'

interface IProps {
  post_id: string
  hideModal: () => void
}

export default function CreateComment({ post_id, hideModal }: IProps) {
  const { createComment } = useActions()
  const { data } = useAppSelector(authSelector)
  const [modalShow, setModalShow] = useState(false)
  const modaltoggle2 = () => {
    setModalShow(!modalShow)
    hideModal()
  }

  // const formState: CreateCommentType = {
  //   body: '',
  //   post: post_id,
  // }

  // async function formSubmit(values: CreateCommentType) {
  //   const res: any = await createComment(values)
  //   res === 'ok' && setModalShow(true)
  // }

  // function commentValidate(value: string) {
  //   if (!value) return 'Обязательное поле'
  // }

  if (!data)
    return (
      <div className="not-auth">
        Чтобы написать комментарий нужно авторизоваться.{' '}
        <Link href="/login">Вход</Link> |{' '}
        <Link href="/register">Регистрация</Link>
      </div>
    )

  return (
    <>
      {/* <Formik initialValues={formState} onSubmit={formSubmit}>
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form__field">
              <label>Комментарий</label>
              <Field
                type="text"
                name="body"
                as="textarea"
                validate={commentValidate}
              />
            </div>

            {errors.body && touched.body && (
              <div className="form__text_error">{errors.body}</div>
            )}

            <button type="submit" className="form__btn">
              Отправить
            </button>
          </Form>
        )}
      </Formik> */}
      {modalShow && (
        <Modal title="" modalMaxContent hideModal={modaltoggle2}>
          Комментарий отправлен на проверку
        </Modal>
      )}
    </>
  )
}
