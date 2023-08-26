import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { AuthDataType } from '@/types/auth'
import { getNoun } from '@/utils'
import { useRef, useState } from 'react'
import { BsFlag } from 'react-icons/bs'
import { SubscriptionsGroup, SubscriptionsUser } from '.'

interface IProps {
  myProfile: AuthDataType
}

export default function Subscribers({ myProfile }: IProps) {
  const subscriptionsUserRef = useRef<HTMLDivElement>(null)
  const subscriptionsGroupRef = useRef<HTMLDivElement>(null)
  const subscribersRef = useRef<HTMLDivElement>(null)
  const [showSubscribers, setShowSubscribers] = useState<boolean>(false)
  const [showSubscriptionsUser, setShowSubscriptionsUser] =
    useState<boolean>(false)
  const [showSubscriptionsGroup, setShowSubscriptionsGroup] =
    useState<boolean>(false)

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

  return (
    <>
      <div className="user__followed">
        {!!myProfile.subscribers.length && (
          <div
            ref={subscribersRef}
            onClick={showSubscribersChange}
            className="followed__item"
          >
            <span>{myProfile.subscribers.length}</span>{' '}
            {getNoun(myProfile.subscribers.length, [
              'подписчик',
              'подписчика',
              'подписчиков',
            ])}
            {showSubscribers && (
              <SubscriptionsUser users={myProfile.subscribers} />
            )}
          </div>
        )}

        {!!myProfile.subscriptionsUser.length && (
          <div
            ref={subscriptionsUserRef}
            onClick={showSubscriptionsUserChange}
            className="followed__item"
          >
            <span>{myProfile.subscriptionsUser.length}</span>{' '}
            {getNoun(myProfile.subscriptionsUser.length, [
              'подписка',
              'подписки',
              'подписок',
            ])}
            {showSubscriptionsUser && (
              <SubscriptionsUser users={myProfile.subscriptionsUser} />
            )}
          </div>
        )}

        {!!myProfile.subscriptionsGroup.length && (
          <div
            ref={subscriptionsGroupRef}
            onClick={showSubscriptionsGroupChange}
            className="followed__item"
          >
            <BsFlag /> Участвую в{' '}
            <span>{myProfile.subscriptionsGroup.length}</span>{' '}
            {getNoun(myProfile.subscriptionsGroup.length, [
              'группе',
              'группах',
              'группах',
            ])}
            {showSubscriptionsGroup && (
              <SubscriptionsGroup groups={myProfile.subscriptionsGroup} />
            )}
          </div>
        )}
      </div>
    </>
  )
}
