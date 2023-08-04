'use client'

import { useActions } from '@/hooks/useActions'
import { useAppSelector } from '@/store/store'
import { themeSelector } from '@/store/theme/theme'
import { getLocalStorage } from '@/utils/localStorage'
import { useEffect } from 'react'
import { BsMoonFill, BsSun } from 'react-icons/bs'

export default function Theme() {
  const { setTheme } = useActions()
  const { theme } = useAppSelector(themeSelector)

  function themeChange() {
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', JSON.stringify('light'))
    } else {
      setTheme('dark')
      localStorage.setItem('theme', JSON.stringify('dark'))
    }
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
    <div className="header__thema">
      <div onClick={themeChange} className="theme__btn">
        {theme === 'light' ? <BsMoonFill /> : <BsSun />}
      </div>
    </div>
  )
}
