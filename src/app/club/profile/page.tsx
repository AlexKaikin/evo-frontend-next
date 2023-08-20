'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import {BsGeoAlt} from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { notesSelector } from '@/store/club/notes/notes'
//import { recommendationsSelector } from '@/store/club/recommendations/recommendations'
import CreateNote from './(components)/CRUD/CreateNote/CreateNote'
import './styles.scss'
import MyPageSettings from './(components)/MyPageSettings/MyPageSettings'
import Notes from './(components)/Notes/Notes'
import Subscribers from './(components)/Subscribers/Subscribers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Profile() {
  const { getNotes, getRecommendations } = useActions()
  const { data: user, status } = useSelector(authSelector)
  const notesState = useSelector(notesSelector)
  //const { recommendItems } = useSelector(recommendationsSelector)

  useEffect(() => {
    user && getNotes(user?._id, 'user')
    getRecommendations()
  }, [getNotes, user, getRecommendations])

  if (!user || status === 'loading') redirect('/login')

  return (
    <div className="club">
      <div className="container">
        <div className="club__content user">
          <div className="user__content">
            <div className="column">
              <div className="user__avatar">
                <Image
                  fill
                  sizes="(max-width: 1800px) 50vw"
                  src={user?.avatarUrl ? user.avatarUrl : defaultAvatar}
                  alt="avatar"
                />
              </div>
              <div className="user__info">
                <div className="info__header">
                  <div className="user__nicname">{user.fullName}</div>
                  <MyPageSettings />
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
                  <div className="user__location">
                    <BsGeoAlt /> {user.location}
                  </div>
                )}
                <Subscribers myProfile={user} />
              </div>
            </div>
            <CreateNote user_Id={user._id} />
            <Notes user_Id={user._id} notesState={notesState} />
          </div>
        </div>
        {/* <Recommendations recommendItems={recommendItems} /> */}
      </div>
    </div>
  )
}
