'use client'

import Modal from '@/app/(components)/Modal/Modal'
import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { useAppSelector } from '@/store/store'
import { ICreateReview } from '@/types/shop/reviews'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface IProps {
  product_Id: string
  hideModal: () => void
}

export default function CreateReview({ product_Id, hideModal }: IProps) {
  const { data } = useAppSelector(authSelector)
  const { createReview } = useActions()
  const [modalShow, setModalShow] = useState(false)
  const { register, handleSubmit, formState } = useForm<ICreateReview>()
  const { errors } = formState

  const bodyValidate = {
    required: {
      value: true,
      message: 'Пожалуйста, напишите свой отзыв',
    },
    minLength: {
      value: 10,
      message: 'Отзыв длжен быть от 10 символов',
    },
  }

  async function onSubmit(data: ICreateReview) {
    data.rating = Number(data.rating)
    const res: any = await createReview(data)
    if (res === 'ok') setModalShow(true)
  }

  function hideModalModeration() {
    setModalShow(false)
    hideModal()
  }

  if (!data)
    return (
      <div className="not-auth">
        Чтобы написать отзыв нужно авторизоваться.{' '}
        <Link href="/login">Вход</Link> |{' '}
        <Link href="/register">Регистрация</Link>
      </div>
    )

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__select">
          <label>Рейтинг</label>
          <select {...register('rating')} name="rating">
            <option value="0">Без рейтинга</option>
            <option value="5">5 звёзд</option>
            <option value="4">4 звезды</option>
            <option value="3">3 звезды</option>
            <option value="2">2 звезды</option>
            <option value="1">1 звезда</option>
          </select>
        </div>
        <div className="form__field">
          <label>Отзыв</label>
          <textarea {...register('body', bodyValidate)} name="body" />
        </div>
        {errors.body && (
          <div className="form__text_error">{errors.body.message}</div>
        )}
        <input
          {...register('product')}
          defaultValue={product_Id}
          type="hidden"
        />

        <button type="submit" className="form__btn">
          Отправить
        </button>
      </form>
      {modalShow && (
        <Modal title="" modalMaxContent hideModal={hideModalModeration}>
          Отзыв отправлен на проверку
        </Modal>
      )}
    </>
  )
}
