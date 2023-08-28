import { useRef, useState } from 'react'
import { AuthDataType } from '@/types/auth'
import { UserItemType } from '@/types/club/users'
import {BsSend} from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'
import {socket} from '@/utils'

interface IProps {
  myProfile: AuthDataType
  user: UserItemType
  roomID: string
}

export default function NewMessageForm({ user, myProfile, roomID }: IProps) {
  const { createMessage } = useActions()
  const [messageValue, setMessageValue] = useState('')
  const messageRef = useRef<HTMLTextAreaElement | null>(null)

  function sendClick() {
    if (messageValue.length) {
      const newMessage = {
        id: new Date().getTime(),
        room: [myProfile._id, user._id],
        roomID: roomID,
        user: myProfile._id,
        text: messageValue,
        date: new Date().getTime(),
        socketID: socket.id,
      }

      const newMessageForSocket = {
        id: new Date().getTime(),
        room: [myProfile._id, user._id],
        roomID: roomID,
        user: {
          id: myProfile.id,
          fullName: myProfile.fullName,
          avatarUrl: myProfile.avatarUrl,
        },
        text: messageValue,
        date: new Date().getTime(),
        socketID: socket.id,
      }

      socket.emit('message', newMessageForSocket)

      createMessage(newMessage)

      setMessageValue('')

      if (messageRef.current) messageRef.current.style.height = 'auto'
    }
  }

  function changeMessage(e: any) {
    setMessageValue(e.target.value)

    if (messageRef.current) {
      messageRef.current.style.height = '1px'
      messageRef.current.style.height =
        25 + messageRef.current.scrollHeight + 'px'
    }
  }

  return (
    <div className="chat__control">
      <textarea
        ref={messageRef}
        onChange={e => changeMessage(e)}
        name="message"
        className="chat__new-message"
        value={messageValue}
      ></textarea>
      <button onClick={sendClick} className="btn message__send">
        <BsSend />
      </button>
    </div>
  )
}
