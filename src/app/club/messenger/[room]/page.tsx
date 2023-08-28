'use client'

import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { messagesSelector } from '@/store/club/messages/messages'
import { userSelector } from '@/store/club/user/user'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ChatHeader, Messages, NewMessageForm } from './(components)'
import './styles.scss'

export default function Room() {
  const { getUser, getRoom, getMessages } = useActions()
  const messagesState = useSelector(messagesSelector)
  const { data: myProfile } = useSelector(authSelector)
  const { userItem: user } = useSelector(userSelector)
  const { room: user_id } = useParams()

  useEffect(() => {
    getUser(String(user_id))
    getRoom(String(user_id))
    getMessages(String(user_id))
  }, [user_id, getUser, getMessages, getRoom])

  return (
    <section className="club">
      <div className="chat__container">
        {user && <ChatHeader user={user} />}
        {myProfile && user && messagesState.loadingStatus === 'success' && (
          <Messages
            messagesState={messagesState}
            myProfile={myProfile}
            user={user}
          />
        )}
        {myProfile && user && messagesState.roomID && (
          <NewMessageForm
            roomID={messagesState.roomID}
            user={user}
            myProfile={myProfile}
          />
        )}
      </div>
    </section>
  )
}
