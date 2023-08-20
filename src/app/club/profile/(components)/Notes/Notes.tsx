import { NotesError, NotesLoading, NotesNull } from '.'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { NotesStateType } from '@/types/club/notes'
import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import {BsTrash3} from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'
import { formatTime } from '@/utils'
import Image from 'next/image'

interface IProps {
  notesState: NotesStateType
  user_Id: string
}

export default function Notes({ notesState, user_Id }: IProps) {
  const { deleteNote, setNotesPage, updateNotes, getMoreNotes } = useActions()
  const { noteItems, pagination, loadingStatus } = notesState

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && pagination.currentPage < pagination.pagesCount) {
      setNotesPage(pagination.currentPage + 1)
      getMoreNotes(user_Id, 'user')
    }
  })

  async function deleteNoteClick(id: number) {
    const res: any = await deleteNote(id)
    if (res === 'ok') updateNotes(id)
  }

  if (loadingStatus === 'loading' && pagination.currentPage === 1)
    return <NotesLoading />
  if (loadingStatus === 'error') return <NotesError />
  if (!noteItems.length) return <NotesNull />

  return (
    <div className="user__notes">
      {noteItems.map(note => (
        <div key={note.id} className="user__note">
          <div className="note__edit">
            <button
              onClick={() => deleteNoteClick(note.id)}
              className="delete-note"
            >
              <BsTrash3 />{' '}
            </button>
          </div>
          <div className="user__avatar">
            <Image
              fill
              sizes="(max-width: 1800px) 33vw"
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


