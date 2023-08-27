import { SubscriptionsUserType } from '@/types/club/users'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
  users: SubscriptionsUserType[]
}

export default function SubscriptionsUser({ users }: IProps) {
  return (
    <div className="show-users">
      {users.map(user => (
        <Link
          href={`/club/users/${user._id}`}
          className="followed-user"
          key={user._id}
        >
          <div className="followed-user__avatar">
            <Image
              fill
              sizes="(max-width: 1800px) 33vw"
              src={user?.avatarUrl ? user.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="followed-user__name">{user.fullName}</div>
        </Link>
      ))}
    </div>
  )
}
