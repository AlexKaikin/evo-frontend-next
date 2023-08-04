import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useActions } from '@hooks/useActions'
import { SearchSVG } from '@components/common/svg'

type PropsType = {
  query: string
}

function Search({ query }: PropsType) {
  const { setPostsCategory, setPostsPage, setPostsQuery } = useActions()
  const [searchValue, setSearchValue] = useState<string>(query)
  const navigate = useNavigate()
  const searchRef = useRef<HTMLFormElement>(null)

  function SearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    if (e.target.value === '') setPostsQuery('')
  }

  function searchClick(
    e: React.MouseEvent<HTMLButtonElement>,
    searchValue: string
  ) {
    e.preventDefault()
    if (searchValue !== '') {
      setSearchValue(searchValue)
      navigate(`/posts?q=${searchValue}`)
      setPostsQuery(searchValue)
      setPostsPage(1)
      setPostsCategory('Все статьи')
    } else {
      const error = '<p class="error">Пожалуйста, введите запрос</p>'
      searchRef.current?.insertAdjacentHTML('beforeend', error)
      setTimeout(() => {
        if (searchRef.current?.querySelector('.error')) {
          let msgShow = searchRef.current.querySelector('.error')
          if (msgShow !== null) msgShow.outerHTML = ''
        }
      }, 2000)
    }
  }

  const queryValue = new URLSearchParams(useLocation().search).get('q') || ''

  useEffect(() => {
    if (queryValue !== '') {
      setPostsQuery(queryValue)
      setSearchValue(queryValue)
    }
  }, [setPostsQuery, queryValue])

  return (
    <div className="store__search">
      <form ref={searchRef} action="#" className="form">
        <input
          onChange={SearchValueChange}
          value={searchValue}
          type="text"
          placeholder="Найти статью..."
          required
        />
        <button
          onClick={(e) => searchClick(e, searchValue)}
          type="submit"
          className=""
        >
          <SearchSVG />
        </button>
      </form>
    </div>
  )
}

export default Search
