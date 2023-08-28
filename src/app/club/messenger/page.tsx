'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { roomsSelector } from '@/store/club/rooms/rooms'
import { formatTime } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { SearchUser } from './(components)'
import './styles.scss'

export default function Messenger() {
  const { getRooms } = useActions()
  const { roomItems } = useSelector(roomsSelector)
  const { data: me } = useSelector(authSelector)

  useEffect(() => {
    getRooms()
  }, [getRooms])

  return (
    <section className="club">
      <div className="club__content">
        <SearchUser />
        <div className="club__rooms">
          {me &&
            roomItems.map(room => (
              <div key={room._id} className="room">
                {room.users.map(
                  user =>
                    user._id !== me._id && (
                      <Link
                        href={`/club/messenger/${user._id}`}
                        key={user._id}
                        className="user__container"
                      >
                        <div className="user__avatar">
                          <Image
                            fill
                            src={
                              user.avatarUrl ? user.avatarUrl : defaultAvatar
                            }
                            alt="avatar"
                          />
                        </div>
                        <div className="user__body">
                          <div className="body__header">
                            <div className="user__name">{user.fullName}</div>
                            <div className="user__date">
                              {formatTime(room.updated)}
                            </div>
                          </div>
                          <div className="user__message">
                            {room.lastMessage}
                          </div>
                        </div>
                      </Link>
                    )
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
