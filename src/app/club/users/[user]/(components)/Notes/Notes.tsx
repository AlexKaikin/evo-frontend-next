import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { notesSelector } from '@/store/club/notes/notes'
import { formatTime } from '@/utils'
import Image from 'next/image'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { NotesError, NotesLoading, NotesNull } from '.'

interface IProps {
  user_Id: string
}

export default function Notes({ user_Id }: IProps) {
  const { setNotesPage, getMoreNotes } = useActions()
  const { noteItems, pagination, loadingStatus } = useSelector(notesSelector)

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && pagination.currentPage < pagination.pagesCount) {
      setNotesPage(pagination.currentPage + 1)
      getMoreNotes(user_Id, 'user')
    }
  })

  if (loadingStatus === 'loading' && pagination.currentPage === 1)
    return <NotesLoading />
  if (loadingStatus === 'error') return <NotesError />
  if (!noteItems.length) return <NotesNull />

  return (
    <div className="user__notes">
      {noteItems.map(note => (
        <div key={note.id} className="user__note">
          <div className="user__avatar">
            <Image
              fill
              src={note.user?.avatarUrl ? note.user.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="note__content note">
            <div className="note__name">{note?.user?.fullName}</div>
            <div className="note__text">
              {note.text.split('\n').map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            <div className="note__time">{formatTime(note?.created)}</div>
          </div>
        </div>
      ))}
      <div ref={ref} className="note__more"></div>
    </div>
  )
}
