import { useRef, useState } from 'react'
import { AuthDataType } from '@/types/auth'
import { GroupItemType } from '@/types/club/groups'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { getNoun } from '@/utils'
import SubscriptionsUser from './SubscriptionsUser/SubscriptionsUser'

interface IProps {
  group: GroupItemType
  myProfile: AuthDataType
}

export default function Subscribers({ group, myProfile }: IProps) {
  const subscribersRef = useRef<HTMLDivElement>(null)
  const [showSubscribers, setShowSubscribers] = useState<boolean>(false)

  useOnClickOutside(subscribersRef, () => setShowSubscribers(false))

  function showSubscribersChange() {
    if (showSubscribers) setShowSubscribers(false)
    else setShowSubscribers(true)
  }

  return (
    <>
      <div className="group__followed">
        {!!group.subscribers?.length && (
          <div
            ref={subscribersRef}
            onClick={showSubscribersChange}
            className="followed__item"
          >
            <span>{group.subscribers.length}</span>{' '}
            {getNoun(group.subscribers.length, [
              'участник',
              'участника',
              'участников',
            ])}
            {showSubscribers && <SubscriptionsUser users={group.subscribers} />}
          </div>
        )}
      </div>
    </>
  )
}
