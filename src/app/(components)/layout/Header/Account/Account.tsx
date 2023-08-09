'use client'

import cn from 'classnames'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AuthStateType } from '@/types/auth'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@//hooks/useActions'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { authSelector } from '@/store/auth/auth'
import Link from 'next/link'
import Image from 'next/image'

type IProps = {
  auth: AuthStateType
}

export default function Account({ auth }: IProps) {
  const { data: user } = useSelector(authSelector)
  const { logout } = useActions()
  //const navigate = useNavigate()
  const [authShow, setAuthShow] = useState<boolean>(false)
  const authRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(authRef, () => setAuthShow(false))

  function AuthShowChange() {
    if (authShow) setAuthShow(false)
    else setAuthShow(true)
  }

  function logoutClick() {
    logout()
    AuthShowChange()
    //navigate('/login')
  }

  return (
    <div ref={authRef} className="auth">
      <button className="auth__btn" onClick={AuthShowChange}>
        <div className="auth__avatar">
          <Image
            src={
              user?.avatarUrl
                ? (process.env.REACT_APP_SERVER_URL || '') + user.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
          />
        </div>
      </button>
      {/* <ul className={cn('auth__items', { show: authShow })}>
        {auth.data ? (
          <>
            <li className="auth__item">
              <Link
                href="/profile"
                onClick={AuthShowChange}
                className="auth__link"
              >
                Профиль
              </Link>
            </li>

            {auth.data.role === 'admin' && (
              <li className="auth__item">
                <Link
                  href="/admin/dashboard"
                  onClick={AuthShowChange}
                  className="auth__link"
                >
                  Менеджер
                </Link>
              </li>
            )}
            <li className="auth__item">
              <button onClick={logoutClick} className="auth__link">
                Выход
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="auth__item">
              <Link
                href="/login"
                onClick={AuthShowChange}
                className="auth__link"
              >
                Вход
              </Link>
            </li>
            <li className="auth__item">
              <Link
                href="/register"
                onClick={AuthShowChange}
                className="auth__link"
              >
                Регистрация
              </Link>
            </li>
          </>
        )}
      </ul> */}
    </div>
  )
}
