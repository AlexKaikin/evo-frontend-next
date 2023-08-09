'use client'

import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { useAppSelector } from '@/store/store'
import { LoginType } from '@/types/auth'
import cn from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles.scss'
import { useRouter } from 'next/navigation'


export default function Login() {
  const router = useRouter()
  const [errorResponse, setErrorResponse] = useState('')
  const { login } = useActions()
  const auth = useAppSelector(authSelector)
  const { register, handleSubmit, formState } = useForm<LoginType>()
  const { errors } = formState

  const emailValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Неверно заполнен адрес',
    },
  }

  const passwordValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    minLength: {
      value: 4,
      message: 'Длинна пароля должна быть от 4 символов',
    },
  }

  async function onSubmit(data: LoginType) {
    const res: any = await login(data)
    if (res?.status === 201) router.back()
    if (res?.response?.status === 404)
      setErrorResponse('Пользователь не найден')
    if (res?.response?.status === 401) setErrorResponse('Неверный пароль')
  }

  if (auth.data) return router.back()

  return (
    <div className="section auth">
      <div className="container">
        <div className="section__title">Вход</div>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className={cn('form__field')}>
            <label>Почта</label>
            <input {...register('email', emailValidate)} type="text" />
          </div>

          {errors.email && (
            <div className="form__text_error">{errors.email.message}</div>
          )}

          <div className={cn('form__field')}>
            <label>Пароль</label>
            <input
              {...register('password', passwordValidate)}
              type="password"
            />
          </div>

          {errors.password && (
            <div className="form__text_error">{errors.password.message}</div>
          )}

          {!!errorResponse.length && (
            <div className="form__text_error">{errorResponse}</div>
          )}

          <p>
            У вас нет аккаунта? <Link href="/register">Регистрация</Link>
          </p>

          <button type="submit" className="form__btn">
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}
