'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { groupSelector } from '@/store/club/group/group'
import { recommendationsSelector } from '@/store/club/recommendations/recommendations'
import { scrollToTop } from '@/utils'
import './styles.scss'
import { Notes, GroupItem, CreateNote } from './(components)'
import Recommendations from '../../(components)/Recommendations/Recommendations'
import { useParams } from 'next/navigation'

export default function Group() {
  const { getGroup, getRecommendations } = useActions()
  const { data: myProfile } = useSelector(authSelector)
  const { groupItem: group, groupStatus } = useSelector(groupSelector)
  const { recommendItems } = useSelector(recommendationsSelector)
  const { group: groupId } = useParams()


  useEffect(() => {
    if (groupId) getGroup(String(groupId))
    getRecommendations()
    scrollToTop()
  }, [groupId, getGroup, getRecommendations])

  return (
    <section className="club">
        <div className="club__content group">
          <div className="group__content">
            <GroupItem
              group={group}
              groupStatus={groupStatus}
              myProfile={myProfile}
            />
            {!!group && group.creator === myProfile?._id && (
              <CreateNote group_id={group._id} />
            )}
            {!!group && <Notes group={group} />}
          </div>
        </div>
        <Recommendations recommendItems={recommendItems} />
    </section>
  )
}
