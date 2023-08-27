import defaultAvatar from '@/assets/img/user/users.jpg'
import { useActions } from '@/hooks/useActions'
import { AuthDataType } from '@/types/auth'
import { GroupItemType } from '@/types/club/groups'
import Image from 'next/image'
import { BsGeoAlt } from 'react-icons/bs'
import GroupSettings from '../GroupSettings/GroupSettings'
import Subscribers from '../Subscribers/Subscribers'
import GroupError from './GroupError/GroupError'
import GroupLoading from './GroupLoading/GroupLoading'

interface IProps {
  group: GroupItemType | null
  myProfile: AuthDataType | null
  groupStatus: string
}

export default function GroupItem({ group, groupStatus, myProfile }: IProps) {
  const { followGroup, unFollowGroup } = useActions()
  const isFollow = group?.subscribers?.find(item => item.id === myProfile?.id)

  function followClick() {
    group && followGroup(group._id)
  }

  function unFollowClick() {
    group && unFollowGroup(group._id)
  }

  if (groupStatus === 'loading') return <GroupLoading />
  if (group === null) return <GroupError />

  return (
    <div className="column">
      <div className="group__avatar">
        <Image
          fill
          sizes="(max-width: 1800px) 33vw"
          src={group?.avatarUrl ? group.avatarUrl : defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className="group__info">
        <div className="group__header">
          <div className="group__title">{group.title}</div>
          {isFollow ? (
            <button
              onClick={unFollowClick}
              className="btn btn-light group__follow"
            >
              Отписаться
            </button>
          ) : (
            <button onClick={followClick} className="btn group__follow">
              Подписаться
            </button>
          )}
          {group.creator === myProfile?._id && <GroupSettings group={group} />}
        </div>
        <div className="group__about">
          {group.about.split('\n').map((item: string, i: number) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        {!!group.location.length && (
          <div className="group__about">
            <BsGeoAlt /> {group.location}
          </div>
        )}
        {!!myProfile && <Subscribers group={group} myProfile={myProfile} />}
      </div>
    </div>
  )
}
