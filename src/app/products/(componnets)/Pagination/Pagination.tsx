'use client'

import { scrollToTop } from '@/utils/utils'
import cn from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import './PaginationCreator.scss'

interface IProps {
  totalCount: string
}

export default function Pagination({ totalCount }: IProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = getCurrentPage()
  const pagesCount = Math.ceil(+totalCount / 8)
  const pages: number[] = createPages(pagesCount, currentPage)
  const prevPage = currentPage > 1 ? currentPage - 1 : 1
  const nextPage = currentPage < pages.length ? currentPage + 1 : pages.length
  const limitItems = 8

  function getCurrentPage() {
    return searchParams.get('_page') !== null
      ? Number(searchParams.get('_page'))
      : 1
  }

  function createPages(pagesCount: number, currentPage: number) {
    const pages = []
    if (pagesCount > 5) {
      if (currentPage > 4) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  function changePage(number: number) {
    let queryParams
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)
      if (queryParams.has('_page')) {
        queryParams.set('_page', String(number))
        queryParams.set('_limit', String(limitItems))
      } else {
        queryParams.append('_page', String(number))
        queryParams.append('_limit', String(limitItems))
      }
    }
    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
  }

  if (pages.length === 1) return null

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => changePage(prevPage)} className="page">
          <BsChevronLeft />
        </button>
      )}
      {pages?.map(page => (
        <button
          key={page}
          onClick={() => currentPage !== page && changePage(page)}
          className={cn('page', { active: currentPage === page })}
        >
          {page}
        </button>
      ))}
      {currentPage < pagesCount && (
        <button onClick={() => changePage(nextPage)} className="page">
          <BsChevronRight />
        </button>
      )}
    </div>
  )
}
