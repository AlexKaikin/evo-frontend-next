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
      {groups.map(group => (
        <Link
          href={`/club/groups/${group._id}`}
          className="followed-user"
          key={group._id}
        >
          <div className="followed-user__avatar">
            <Image
              fill
              src={group?.avatarUrl ? group.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="followed-user__name">{group.title}</div>
        </Link>
      ))}
    </div>
  )
}
