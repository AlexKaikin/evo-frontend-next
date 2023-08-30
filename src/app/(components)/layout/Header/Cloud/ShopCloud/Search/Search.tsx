'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsSearch, BsXLg } from 'react-icons/bs'
import cn from 'classnames'

export default function Search() {
  const searchParams = useSearchParams()
  const queryParam = getQueryParam()
  const [query, setQuery] = useState(queryParam)
  const router = useRouter()
  const [focus, setFocus] = useState(false)

  function getQueryParam() {
    const queryParam = searchParams.get('q')
    if (queryParam) return queryParam
    else return ''
  }

  function searchClick(e: any) {
    e.preventDefault()
    if (query) router.push(`/products/?q=${query}`)
    else router.push(`products`)
  }

  function cleareClick(e: any) {
    e.preventDefault()
    setQuery('')
    router.push(`/products/`)
  }

  useEffect(() => {
    const qParam = searchParams.get('q')
    if (qParam !== null) setQuery(qParam)
    else setQuery('')
  }, [searchParams])

  return (
    <div className="store__search">
      <form className={cn("form", {w100: focus})}>
        <input
          onChange={e => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Найти товар..."
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required
        />
        <div className="search__control">
          {!!query.length && (
            <button onClick={cleareClick} type="submit" className="fade-in">
              <BsXLg />
            </button>
          )}
          <button onClick={searchClick} type="submit" className="">
            <BsSearch />
          </button>
        </div>
      </form>
    </div>
  )
}
