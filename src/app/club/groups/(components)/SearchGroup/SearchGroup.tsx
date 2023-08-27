import { useActions } from '@/hooks/useActions'
import { groupsSelector } from '@/store/club/groups/groups'
import { useState } from 'react'
import { BsSearch, BsXLg } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export default function SearchGroup() {
  const { setGroupsFilter } = useActions()
  const { filter } = useSelector(groupsSelector)
  const [titleInputValue, setTitleInputValue] = useState(filter.title)

  function searchGroupClick() {
    setGroupsFilter({ title: titleInputValue })
  }

  function groupInputChange(e: any) {
    setTitleInputValue(e.target.value)
  }

  function cleareGroupInput() {
    if (titleInputValue.length) setTitleInputValue('')
    if (filter.title.length) setGroupsFilter({ title: '' })
  }

  return (
    <div className="search-group">
      <input
        onChange={e => groupInputChange(e)}
        type="text"
        name="title"
        value={titleInputValue}
        placeholder="Введите название..."
      />
      {!!titleInputValue.length && (
        <button onClick={cleareGroupInput} className="search-group__clear">
          <BsXLg />
        </button>
      )}
      <button onClick={searchGroupClick} className="search-group__get">
        {' '}
        <BsSearch /> Найти
      </button>
    </div>
  )
}
