import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { GroupItemType } from '@/types/club/groups'
import defaultAvatar from '@/assets/img/user/users.jpg'
import { useActions } from '@/hooks/useActions'
import { groupsSelector } from '@/store/club/groups/groups'
import { GroupsError, GroupsLoading, GroupsNull } from './'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
  items: GroupItemType[]
  status: string
}

export default function GroupItems({ items, status }: IProps) {
  const { ref, inView } = useInView({ threshold: 0 })
  const { getMoreGroups, setGroupsPage } = useActions()
  const { pagination } = useSelector(groupsSelector)

  useEffect(() => {
    if (inView && pagination.currentPage < pagination.pagesCount) {
      setGroupsPage(pagination.currentPage + 1)
      getMoreGroups()
    }
  })

  if (status === 'error') return <GroupsError />
  if (status === 'loading') return <GroupsLoading />
  if (!items.length) return <GroupsNull />

  return (
    <div className="groups__items group">
      {items?.map(group => {
        const about =
          group.about.length < 60
            ? group.about.split('\n').map((item, i) => <p key={i}>{item}</p>)
            : group.about
                .slice(0, 60)
                .concat('...')
                .split('\n')
                .map((item, i) => <p key={i}>{item}</p>)

        return (
          <Link href={`/club/groups/${group._id}`} key={group._id} className="group__item">
            <div className="group__img">
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={group?.avatarUrl ? group.avatarUrl : defaultAvatar}
                alt="avatar"
              />
            </div>
            <div className="group__container">
              <div className="group__title">{group.title}</div>
              <div className="group__about">{about}</div>
            </div>
          </Link>
        )
      })}
      <div ref={ref} className="groups__more"></div>
    </div>
  )
}
