
import { SubscriptionsGroupType } from '@/types/club/users'
import defaultAvatar from '@/assets/img/user/users.jpg'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  groups: SubscriptionsGroupType[]
}

function SubscriptionsGroup({ groups }: PropsType) {
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

export default SubscriptionsGroup
