import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BsSearch, BsXLg } from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'
import { usersSelector } from '@/store/club/users/users'

export default function SearchUser() {
  const { setUsersFilter } = useActions()
  const { filter } = useSelector(usersSelector)
  const [nameInputValue, setNameInputValue] = useState(filter.name)

  function searchUserClick() {
    setUsersFilter({ name: nameInputValue })
  }

  function userInputChange(e: any) {
    setNameInputValue(e.target.value)
  }

  function cleareUserInput() {
    if (nameInputValue.length) setNameInputValue('')
    if (filter.name.length) setUsersFilter({ name: '' })
  }

  return (
    <div className="search-user">
      <input
        onChange={e => userInputChange(e)}
        type="text"
        name="user"
        value={nameInputValue}
        placeholder="Введите имя..."
      />
      {!!nameInputValue.length && (
        <button onClick={cleareUserInput} className="search-user__clear">
          <BsXLg />
        </button>
      )}
      <button onClick={searchUserClick} className="search-user__get">
        {' '}
        <BsSearch /> Найти
      </button>
    </div>
  )
}
