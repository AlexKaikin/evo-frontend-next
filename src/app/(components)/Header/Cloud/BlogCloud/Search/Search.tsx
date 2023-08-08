'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BsSearch } from 'react-icons/bs'

export default function Search() {
  const searchParams = useSearchParams()
  const queryParam = getQueryParam()
  const [query, setQuery] = useState(queryParam)
  const router = useRouter()

  function getQueryParam() {
    const queryParam = searchParams.get('q')
    if (queryParam) return queryParam
    else return ''
  }

  function searchClick(e: any) {
    e.preventDefault()
    if (query) router.push(`/posts/?q=${query}`)
    else router.push(`posts`)
  }

  useEffect(() => {
    const qParam = searchParams.get('q')
    if (qParam !== null) setQuery(qParam)
    else setQuery('')
  }, [searchParams])

  return (
    <div className="store__search">
      <form className="form">
        <input
          onChange={e => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Найти статью..."
          required
        />
        <button onClick={searchClick} type="submit" className="">
          <BsSearch />
        </button>
      </form>
    </div>
  )
}
