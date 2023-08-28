import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { SubscriptionsUserType } from '@/types/club/users'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  users: SubscriptionsUserType[]
}

export default function SubscriptionsUser({ users }: IProps) {
  return (
    <div className="show-users">
      {users.map(item => (
        <Link
          href={`/club/users/${item._id}`}
          className="followed-user"
          key={item._id}
        >
          <div className="followed-user__avatar">
            <Image
              fill
              src={item?.avatarUrl ? item.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="followed-user__name">{item.fullName}</div>
        </Link>
      ))}
    </div>
  )
}
