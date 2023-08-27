import { NotesError, NotesLoading, NotesNull } from '.'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { GroupItemType } from '@/types/club/groups'
import defaultAvatar from '@/assets/img/user/users.jpg'
import { BsTrash3 } from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'
import { authSelector } from '@/store/auth/auth'
import { notesSelector } from '@/store/club/notes/notes'
import { formatTime } from '@/utils'
import Image from 'next/image'

interface IProps {
  group: GroupItemType
}

export default function Notes({ group }: IProps) {
  const { data: user } = useSelector(authSelector)
  const { setNotesPage, getMoreNotes, deleteNote, updateNotes } = useActions()
  const { noteItems, pagination, loadingStatus } = useSelector(notesSelector)

  const { ref, inView } = useInView({ threshold: 0 })

  async function deleteNoteClick(id: number) {
    const res: any = await deleteNote(id)
    if (res === 'ok') updateNotes(id)
  }

  useEffect(() => {
    if (inView && pagination.currentPage < pagination.pagesCount) {
      setNotesPage(pagination.currentPage + 1)
      getMoreNotes(group._id, 'group')
    }
  })

  if (loadingStatus === 'loading' && pagination.currentPage === 1)
    return <NotesLoading />
  if (loadingStatus === 'error') return <NotesError />
  if (!noteItems.length) return <NotesNull />

  return (
    <div className="group__notes">
      {noteItems.map(note => (
        <div key={note.id} className="group__note">
          {user?._id === group.creator && (
            <div className="note__edit">
              <button
                onClick={() => deleteNoteClick(note.id)}
                className="delete-note"
              >
                <BsTrash3 />{' '}
              </button>
            </div>
          )}
          <div className="group__avatar">
            <Image
              fill
              sizes="(max-width: 1800px) 33vw"
              src={group.avatarUrl ? group.avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="note__content note">
            {/* <div className="note__name">{group.title}</div> */}
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
