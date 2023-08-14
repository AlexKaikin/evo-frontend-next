'use client'

import cn from 'classnames'
import React, { useRef, useState } from 'react'
import { SortItemType } from '@/types/navigation'
import {BsSortDown} from 'react-icons/bs'
//import SortingSkeleton from '@/components/common/Skeleton/SortingSkeleton/SortingSkeleton'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useRouter, useSearchParams } from 'next/navigation'
import { scrollToTop } from '@/utils'

type PropsType = {
  items: SortItemType[]
}

export default function Sorting({ items }: PropsType) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sortActive = getSortActive()
  const sortRef = useRef<HTMLDivElement>(null)
  const [sortShow, setSortShow] = useState<boolean>(false)

  useOnClickOutside(sortRef, () => setSortShow(false))

  function getSortActive(){
    const _sort = searchParams.get('_sort')
    const _order = searchParams.get('_order')

    if( _sort === 'price' && _order === 'desc') return 'priceDecrease'
    else if (_sort === 'price' && _order === 'asc') return 'priceIncrease'
    else if (_sort === 'rating' && _order === 'desc') return 'pop'
    else return 'new'
  }

  function changeSortActive(item: string) {
    let queryParams
    let _sort = ''
    let _order = ''

    if (item === 'priceDecrease') {
      _sort = 'price'
      _order = 'desc'
    } else if (item === 'priceIncrease') {
      _sort = 'price'
      _order = 'asc'
    } else if (item === 'pop') {
      _sort = 'rating'
      _order = 'desc'
    } else {
      _sort = 'id'
      _order = 'desc'
    }

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)

      if (queryParams.has('_sort')) {
        queryParams.set('_sort', _sort)
        queryParams.set('_order', _order)
      } else {
        queryParams.append('_sort', _sort)
        queryParams.append('_order', _order)
      }

      if (queryParams.has('_page')) {
        queryParams.set('_page', String(1))
      }
    }
    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
    setSortShow(false)
  }

  //if (!items.length) return <SortingSkeleton />

  return (
    <div ref={sortRef} className="filter__sort sort">
      <BsSortDown /> <span>Сортировка:</span>{' '}
      <button onClick={() => setSortShow(!sortShow)}>
        {items?.map(item => item.type === sortActive && item.title)}
      </button>
      <div className={cn('sort__items', { show: sortShow })}>
        {items.length > 0 &&
          items?.map(item => (
            <button key={item.id} onClick={() => changeSortActive(item.type)}>
              {item.title}
            </button>
          ))}
      </div>
    </div>
  )
}
