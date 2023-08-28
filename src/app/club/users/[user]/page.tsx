'use client'

import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { recommendationsSelector } from '@/store/club/recommendations/recommendations'
import { userSelector } from '@/store/club/user/user'
import { scrollToTop } from '@/utils'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Recommendations from '../../(components)/Recommendations/Recommendations'
import { Notes, UserItem } from './(components)'
import './styles.scss'

export default function User() {
  const { getUser, getNotes, getRecommendations } = useActions()
  const { data: myProfile } = useSelector(authSelector)
  const { userItem: user, status: statusLoading } = useSelector(userSelector)
  const { recommendItems } = useSelector(recommendationsSelector)
  const { user: userId } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (userId && userId === myProfile?._id) router.push('/club/profile')
    userId && getUser(String(userId))
    userId && getNotes(String(userId), 'user')
    getRecommendations()
    scrollToTop()
  }, [getUser, getNotes, userId, myProfile?._id, getRecommendations, router])

  return (
    <section className="club">
      <div className="club__content user">
        <div className="user__content">
          <UserItem
            user={user}
            statusLoading={statusLoading}
            myProfile={myProfile}
          />
          {!!user && <Notes user_Id={user._id} />}
        </div>
      </div>
      <Recommendations recommendItems={recommendItems} />
    </section>
  )
}
