'use client'

import { useActions } from '@/hooks/useActions'
import { usersSelector } from '@/store/club/users/users'
import { scrollToTop } from '@/utils'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SearchUser, UserItems } from './(components)'
import './styles.scss'

export default function Friends() {
  const { getUsers } = useActions()
  const { userItems, filter, status } = useSelector(usersSelector)

  useEffect(() => {
    getUsers()
    scrollToTop()
  }, [getUsers, filter])

  return (
    <div className="club__users">
      <SearchUser />
      <UserItems items={userItems} status={status} />
    </div>
  )
}
