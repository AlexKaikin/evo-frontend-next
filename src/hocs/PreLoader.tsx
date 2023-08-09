'use client'

import Loader from '@/app/(components)/Loader/Loader'
import { useActions } from '@/hooks/useActions'
import { useEffect } from 'react'

interface IProps {
  children: JSX.Element
}

export default function PreLoader({ children }: IProps) {
  const { getNavigation, authMe } = useActions()

  useEffect(() => {
    getNavigation()
    authMe()
  }, [getNavigation, authMe])

  return (
    <>
      <Loader />
      {children}
    </>
  )
}

