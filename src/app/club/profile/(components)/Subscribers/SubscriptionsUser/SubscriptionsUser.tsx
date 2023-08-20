import { SubscriptionsUserType } from '@/types/club/users'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  users: SubscriptionsUserType[]
}

export default function SubscriptionsUser({ users }: PropsType) {
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

