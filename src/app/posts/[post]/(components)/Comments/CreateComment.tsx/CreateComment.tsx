'use client'

import { useState } from 'react'
import { Modal } from '@/app/(components)'
import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { useAppSelector } from '@/store/store'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ICreateComment } from '@/types/blog/comments'

interface IProps {
  post_id: string
  hideModal: () => void
}

export default function CreateComment({ post_id, hideModal }: IProps) {
  const { createComment } = useActions()
  const { data } = useAppSelector(authSelector)
  const [modalShow, setModalShow] = useState(false)
  const { register, handleSubmit, formState } = useForm<ICreateComment>()
  const { errors } = formState

  function hideModalModeration() {
    setModalShow(!modalShow)
    hideModal()
  }

  const bodyValidate = {
    required: {
      value: true,
      message: 'Пожалуйста, напишите свой отзыв',
    },
    minLength: {
      value: 10,
      message: 'Комментарий длжен быть от 10 символов',
    },
  }

  async function onSubmit(data: ICreateComment) {
    const res: any = await createComment(data)
    if (res === 'ok') setModalShow(true)
  }

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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label>Комментарий</label>
          <textarea {...register('body', bodyValidate)} name="body" />
        </div>

        {errors.body && (
          <div className="form__text_error">{errors.body.message}</div>
        )}

        <input {...register('post')} defaultValue={post_id} type="hidden" />

        <button type="submit" className="form__btn">
          Отправить
        </button>
      </form>
      {modalShow && (
        <Modal title="" modalMaxContent hideModal={hideModalModeration}>
          Комментарий отправлен на проверку
        </Modal>
      )}
    </>
  )
}
