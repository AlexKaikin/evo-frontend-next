import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { AuthDataType } from '@/types/auth'
import { UserItemType } from '@/types/club/users'
import Image from 'next/image'
import { BsGeoAlt } from 'react-icons/bs'
import Subscribers from '../Subscribers/Subscribers'
import UserError from './UserError/UserError'
import UserLoading from './UserLoading/UserLoading'

interface IProps {
  user: UserItemType | null
  myProfile: AuthDataType | null
  statusLoading: string
}

export default function UserItem({ user, statusLoading, myProfile }: IProps) {
  const { followUser, unFollowUser } = useActions()
  const isFollow = myProfile?.subscriptionsUser.find(
    item => item.id === user?.id
  )

  function followClick() {
    user && followUser(user._id)
  }

  function unFollowClick() {
    user && unFollowUser(user._id)
  }

  if (statusLoading === 'loading') return <UserLoading />
  if (user === null) return <UserError />

  return (
    <div className="column">
      <div className="user__avatar">
        <Image
          fill
          src={user?.avatarUrl ? user.avatarUrl : defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className="user__info">
        <div className="user__header">
          <div className="user__nicname">{user.fullName}</div>
          {isFollow ? (
            <button
              onClick={unFollowClick}
              className="btn btn-light user__follow"
            >
              Отписаться
            </button>
          ) : (
            <button onClick={followClick} className="btn user__follow">
              Подписаться
            </button>
          )}
        </div>

        <div className="user__about">
          {user.about.split('\n').map((item: string, i: number) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        {!!user.interests.length && (
          <div className="user__interests">
            {user.interests.map(item => (
              <div key={item}>
                <span>#</span>
                {item}
              </div>
            ))}
          </div>
        )}

        {!!user.location.length && (
          <div className="user__about">
            <BsGeoAlt /> {user.location}
          </div>
        )}

        {!!myProfile && <Subscribers user={user} myProfile={myProfile} />}
      </div>
    </div>
  )
}
