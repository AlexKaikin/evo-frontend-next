import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { UserItemType } from '@/types/club/users'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { usersSelector } from '@/store/club/users/users'
import { UsersError, UsersLoading, UsersNull } from './'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
  items: UserItemType[]
  status: string
}

function UserItems({ items, status }: IProps) {
  const { ref, inView } = useInView({ threshold: 0 })
  const { getMoreUsers, setUsersPage } = useActions()
  const { pagination } = useSelector(usersSelector)

  useEffect(() => {
    if (inView && pagination.currentPage < pagination.pagesCount) {
      setUsersPage(pagination.currentPage + 1)
      getMoreUsers()
    }
  })

  if (status === 'error') return <UsersError />
  if (status === 'loading') return <UsersLoading />
  if (!items.length) return <UsersNull />

  return (
    <div className="users__items user">
      {items?.map(user => {
        return (
          <Link href={`/club/users/${user._id}`} key={user._id} className="user__item">
            <div className="user__img">
              <Image
              fill
                src={
                  user?.avatarUrl
                    ? user.avatarUrl
                    : defaultAvatar
                }
                alt="avatar"
              />
            </div>
            <div className="user__name">{user.fullName}</div>
          </Link>
        )
      })}
      <div ref={ref} className="users__more"></div>
    </div>
  )
}

export default UserItems
