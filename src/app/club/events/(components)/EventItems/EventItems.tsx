import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { eventsSelector } from '@/store/club/events/events'
import { formatTime } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { EventsError, EventsLoading, EventsNull } from '.'

export default function EventItems() {
  const { setEventsPage, getMoreEvents } = useActions()
  const { eventItems, pagination, loadingStatus } = useSelector(eventsSelector)

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && pagination.currentPage < pagination.pagesCount) {
      setEventsPage(pagination.currentPage + 1)
      getMoreEvents()
    }
  })

  if (loadingStatus === 'loading' && pagination.currentPage === 1)
    return <EventsLoading />
  if (loadingStatus === 'error') return <EventsError />
  if (!eventItems.length) return <EventsNull />

  return (
    <div className="user__notes">
      {eventItems.map(event => (
        <div key={event.id} className="user__note">
          <div className="user__avatar">
            <Image
              fill
              src={
                event.user
                  ? event.user.avatarUrl
                    ? event.user.avatarUrl
                    : defaultAvatar
                  : event.group.avatarUrl
                  ? event.group.avatarUrl
                  : defaultAvatar
              }
              alt="avatar"
            />
          </div>
          <div className="note__content note">
            <div className="note__name">
              {event.user ? (
                <Link href={`/club/users/${event.user._id}`}>
                  {event.user.fullName}
                </Link>
              ) : (
                <Link href={`/club/groups/${event.group._id}`}>
                  {event.group.title}
                </Link>
              )}
            </div>
            <div className="note__text">
              {event.text.split('\n').map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            <div className="note__time">{formatTime(event?.created)}</div>
          </div>
        </div>
      ))}
      <div ref={ref} className="note__more"></div>
    </div>
  )
}
