import defaultAvatar from '@/assets/img/user/users.jpg'
import { SubscriptionsGroupType } from '@/types/club/users'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  groups: SubscriptionsGroupType[]
}

export default function SubscriptionsGroup({ groups }: IProps) {
  return (
    <div className="show-users">
      {groups.map(item => (
        <Link
          href={`/club/groups/${item._id}`}
          className="followed-user"
          key={item._id}
        >
          <div className="followed-user__avatar">
            <Image
              fill
              sizes="(max-width: 1800px) 33vw"
              src={item?.avatarUrl ? item.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="followed-user__name">{item.title}</div>
        </Link>
      ))}
    </div>
  )
}
