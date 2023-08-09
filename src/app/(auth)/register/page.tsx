'use client'

import { authSelector } from '@/store/auth/auth'
import { useAppSelector } from '@/store/store'
import { RegisterType } from '@/types/auth'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import './styles.scss'
import { useActions } from '@/hooks/useActions'
import { useState } from 'react'

export default function Register() {
  const { register: registration } = useActions()
  const auth = useAppSelector(authSelector)
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<RegisterType>()
  const { errors } = formState
  const [errorResponse, setErrorResponse] = useState('')

  const fullNameValidate = {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/i,
      message: 'Разшенены только латинские буквы и цифры',
    },
    minLength: {
      value: 4,
      message: 'Длинна логина должна быть от 4 символов',
    },
  }

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

  async function onSubmit(data: RegisterType) {
    const res: any = await registration(data)
    if (res?.status === 201) router.back()
    else setErrorResponse('Регистрация не удалась')
  }

  if (auth.data) return router.back()

  return (
    <div className="section auth">
      <div className="container">
        <div className="section__title">Регистрация</div>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div
            className={cn('form__field', {
              form__field_error: errors.fullName,
            })}
          >
            <label>Логин</label>
            <input
              {...register('fullName', fullNameValidate)}
              type="text"
              name="fullName"
            />
          </div>

          {errors.fullName && (
            <div className="form__text_error">{errors.fullName.message}</div>
          )}

          <div
            className={cn('form__field', {
              form__field_error: errors.email,
            })}
          >
            <label>Почта</label>
            <input
              {...register('email', emailValidate)}
              type="email"
              name="email"
            />
          </div>

          {errors.email && (
            <div className="form__text_error">{errors.email.message}</div>
          )}

          <div
            className={cn('form__field', {
              form__field_error: errors.password,
            })}
          >
            <label>Пароль</label>
            <input
              {...register('password', passwordValidate)}
              type="password"
              name="password"
            />
          </div>

          {errors.password && (
            <div className="form__text_error">{errors.password.message}</div>
          )}

          <p>
            У вас есть аккаунт? <Link href="/login">Вход</Link>
          </p>

          <button type="submit" className="form__btn">
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}
