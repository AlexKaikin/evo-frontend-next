import { GoBackButton } from '@/app/(components)'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { UserItemType } from '@/types/club/users'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  user: UserItemType
}

export default function ChatHeader({ user }: IProps) {
  return (
    <div className="chat__header">
      <GoBackButton />
      {user && (
        <div className="user">
          <div className="user__avatar">
            <Image
              fill
              src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <Link href={`/club/users/${user._id}`} className="user__name">
            {user.fullName}
          </Link>
        </div>
      )}
    </div>
  )
}
