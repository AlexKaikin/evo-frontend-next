import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useActions } from '@/hooks/useActions'
import { AuthDataType } from '@/types/auth'
import { ChatMessageType, MessagesStateType } from '@/types/club/chat'
import { UserItemType } from '@/types/club/users'
import { formatTime, socket } from '@/utils'
import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface IProps {
  myProfile: AuthDataType
  user: UserItemType
  messagesState: MessagesStateType
}

export default function Messages({ myProfile, user, messagesState }: IProps) {
  const { setMessagesPage, getMoreMessages } = useActions()
  const { messageItems, pagination, roomID } = messagesState
  const [messages, setMessages] = useState<ChatMessageType[]>(messageItems)
  const scrollToBottomChatRef = useRef<HTMLDivElement | null>(null)
  const [isScrollActive, setIsScrollActive] = useState(true)
  const [isMoreMessage, setIsMoreMessage] = useState(false)
  const { ref, inView } = useInView({ threshold: 0 })

  function scrollHandler(e: any) {
    const chatMessages = e.currentTarget
    const isScrolled =
      Math.abs(
        chatMessages.scrollHeight -
          chatMessages.scrollTop -
          chatMessages.clientHeight
      ) < 50

    if (isScrolled) {
      if (!isScrollActive) {
        setIsScrollActive(true)
      }
    } else {
      if (isScrollActive) {
        setIsScrollActive(false)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsMoreMessage(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (inView && pagination.currentPage < pagination.pagesCount) {
      setMessagesPage(pagination.currentPage + 1)

      setIsMoreMessage(false)

      setTimeout(() => {
        setIsMoreMessage(true)
      }, 1000)

      const fetchData = async () => {
        const beforeMessages: any = await getMoreMessages(user._id)
        beforeMessages && setMessages([...beforeMessages, ...messages])
      }

      fetchData()
    }
  }, [
    inView,
    getMoreMessages,
    messages,
    pagination.currentPage,
    pagination.pagesCount,
    setMessagesPage,
    user._id,
  ])

  useEffect(() => {
    isScrollActive &&
      scrollToBottomChatRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
  }, [isScrollActive, messages])

  useEffect(() => {
    roomID &&
      socket.on(roomID, data => {
        setMessages([...messages, data])
      })
  }, [roomID, messages])

  return (
    <div className="chat__messages" onScroll={scrollHandler}>
      <div className="messages__wrap">
        {isMoreMessage && <div ref={ref} className="message__more"></div>}
        {messages.map(message => (
          <div key={message.id} className="chat__message">
            <div className="column">
              <div className="message__avatar">
                <Image
                  fill
                  src={
                    message?.user.avatarUrl
                      ? message.user.avatarUrl
                      : defaultAvatar
                  }
                  alt="avatar"
                />
              </div>
              <div
                className={cn('message__content', {
                  sender: message.user.fullName !== myProfile.fullName,
                })}
              >
                <div className="message__header">
                  <div className="message__user">{message.user.fullName}</div>
                  <div className="message__time">
                    {formatTime(`${message.date}`)}
                  </div>
                </div>
                <div className="message__text">
                  {message.text.split('\n').map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollToBottomChatRef}></div>
      </div>
    </div>
  )
}
