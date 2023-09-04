import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { AuthDataType } from '@/types/auth'
import { UserItemType } from '@/types/club/users'
import { getNoun } from '@/utils'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { BsFlag } from 'react-icons/bs'
import SubscriptionsGroup from './SubscriptionsGroup/SubscriptionsGroup'
import SubscriptionsUser from './SubscriptionsUser/SubscriptionsUser'

interface IProps {
  user: UserItemType
  myProfile: AuthDataType
}

export default function Subscribers({ user, myProfile }: IProps) {
  const router = useRouter()
  const subscriptionsUserRef = useRef<HTMLDivElement>(null)
  const subscriptionsGroupRef = useRef<HTMLDivElement>(null)
  const subscribersRef = useRef<HTMLDivElement>(null)
  const [showSubscribers, setShowSubscribers] = useState<boolean>(false)
  const [showSubscriptionsUser, setShowSubscriptionsUser] =
    useState<boolean>(false)
  const [showSubscriptionsGroup, setShowSubscriptionsGroup] =
    useState<boolean>(false)
  const isFollow = myProfile.subscriptionsUser.find(item => item.id === user.id)

  const isMutualSubscription =
    !!isFollow && !!myProfile.subscribers.find(item => item.id === user.id)

  useOnClickOutside(subscriptionsUserRef, () => setShowSubscriptionsUser(false))
  useOnClickOutside(subscriptionsGroupRef, () =>
    setShowSubscriptionsGroup(false)
  )
  useOnClickOutside(subscribersRef, () => setShowSubscribers(false))

  function showSubscriptionsUserChange() {
    if (showSubscriptionsUser) setShowSubscriptionsUser(false)
    else setShowSubscriptionsUser(true)
  }

  function showSubscriptionsGroupChange() {
    if (showSubscriptionsGroup) setShowSubscriptionsGroup(false)
    else setShowSubscriptionsGroup(true)
  }

  function showSubscribersChange() {
    if (showSubscribers) setShowSubscribers(false)
    else setShowSubscribers(true)
  }

  function writeMessage() {
    router.push(`/club/messenger/${user._id}`)
  }

  return (
    <>
      <div className="user__followed">
        {!!user.subscribers.length && (
          <div
            ref={subscribersRef}
            onClick={showSubscribersChange}
            className="followed__item"
          >
            <span>{user.subscribers.length}</span>{' '}
            {getNoun(user.subscribers.length, [
              'подписчик',
              'подписчика',
              'подписчиков',
            ])}
            {showSubscribers && <SubscriptionsUser users={user.subscribers} />}
          </div>
        )}

        {!!user.subscriptionsUser.length && (
          <div
            ref={subscriptionsUserRef}
            onClick={showSubscriptionsUserChange}
            className="followed__item"
          >
            <span>{user.subscriptionsUser.length}</span>{' '}
            {getNoun(user.subscriptionsUser.length, [
              'подписка',
              'подписки',
              'подписок',
            ])}
            {showSubscriptionsUser && (
              <SubscriptionsUser users={user.subscriptionsUser} />
            )}
          </div>
        )}

        {!!user.subscriptionsGroup.length && (
          <div
            ref={subscriptionsGroupRef}
            onClick={showSubscriptionsGroupChange}
            className="followed__item"
          >
            <BsFlag /> Участвую в <span>{user.subscriptionsGroup.length}</span>{' '}
            {getNoun(user.subscriptionsGroup.length, [
              'группе',
              'группах',
              'группах',
            ])}
            {showSubscriptionsGroup && (
              <SubscriptionsGroup groups={user.subscriptionsGroup} />
            )}
          </div>
        )}
      </div>

      <div className="user__control">
        {isMutualSubscription && (
          <button onClick={writeMessage} className="btn user__send-message">
            Написать сообщение
          </button>
        )}
      </div>
    </>
  )
}
