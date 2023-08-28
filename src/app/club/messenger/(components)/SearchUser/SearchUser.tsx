import defaultAvatar from '@/assets/img/user/defaultAvatar.png'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { roomService } from '@/services/club/rooms'
import { UserItemType } from '@/types/club/users'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { BsSearch, BsXLg } from 'react-icons/bs'

export default function SearchUser() {
  const [nameInputValue, setNameInputValue] = useState('')
  const [isShowUsers, setIsShowUsers] = useState(false)
  const usersRef = useRef<HTMLDivElement>(null)
  const [users, setUsers] = useState<UserItemType[]>([])

  useOnClickOutside(usersRef, () => setIsShowUsers(false))

  async function showUsersClick() {
    setIsShowUsers(true)
    const { data } = await roomService.getRoomUsers(nameInputValue)
    setUsers(data)
  }

  function userInputChange(e: any) {
    setNameInputValue(e.target.value)
    fromeSearchDebounce(e.target.value)
    console.log(e.target.value)
  }

  async function cleareUserInput() {
    if (nameInputValue.length) {
      setNameInputValue('')
      setIsShowUsers(false)
    }
  }

  const fromeSearchDebounce = useMemo(
    () =>
      debounce(async (nameInputValue: string) => {
        const { data } = await roomService.getRoomUsers(nameInputValue)
        setUsers(data)
      }, 3000),
    []
  )

  return (
    <div ref={usersRef} className="search-user">
      <input
        onChange={e => userInputChange(e)}
        onClick={showUsersClick}
        type="text"
        name="user"
        value={nameInputValue}
        placeholder="Введите имя..."
        autoComplete="off"
      />
      {!!nameInputValue.length && (
        <button onClick={cleareUserInput} className="search-user__clear">
          <BsXLg />
        </button>
      )}
      <div className="search-user__get">
        {' '}
        <BsSearch />
      </div>

      {isShowUsers && (
        <div className="user__items">
          {users.length
            ? users.map(user => (
                <Link href={user._id} key={user._id} className="user__item">
                  <div className="user__avatar">
                    <Image
                      fill
                      src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
                      alt="avatar"
                    />
                  </div>
                  <div className="user__name">{user.fullName}</div>
                </Link>
              ))
            : 'Не найдено'}
        </div>
      )}
    </div>
  )
}
