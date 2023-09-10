'use client'

import { useActions } from '@//hooks/useActions'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { authSelector } from '@/store/auth/auth'
import { useAppSelector } from '@/store/store'
import { themeSelector } from '@/store/theme/theme'
import { getLocalStorage } from '@/utils'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BsMoonFill, BsSun } from 'react-icons/bs'

export default function Account() {
  const { data: user } = useAppSelector(authSelector)
  const { theme } = useAppSelector(themeSelector)
  const { logout, setTheme } = useActions()
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
  }

  function themeChange() {
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', JSON.stringify('light'))
    } else {
      setTheme('dark')
      localStorage.setItem('theme', JSON.stringify('dark'))
    }
    AuthShowChange()
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme')
      ? getLocalStorage('theme').replace(/["]/g, '')
      : 'light'
    setTheme(themeLocal)
  }, [setTheme])

  return (
    <div ref={authRef} className="auth">
      <button className="auth__btn" onClick={AuthShowChange}>
        <div className="auth__avatar">
          <Image
            height={50}
            width={50}
            src={user?.avatarUrl ? user.avatarUrl : defaultAvatar}
            alt="avatar"
          />
        </div>
      </button>
      <ul className={cn('auth__items', { show: authShow })}>
        {user ? (
          <>
            <li className="auth__item">
              <Link
                href="/account/profile"
                onClick={AuthShowChange}
                className="auth__link"
              >
                Профиль
              </Link>
            </li>

            {user.role === 'admin' && (
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
        <li className="auth__item"></li>
        <li className="auth__item">
          <button onClick={themeChange} className="auth__link">
            {theme === 'light' ? (
              <>
                <BsMoonFill /> Тёмная тема
              </>
            ) : (
              <>
                <BsSun /> Светлая тема
              </>
            )}
          </button>
        </li>
      </ul>
    </div>
  )
}
