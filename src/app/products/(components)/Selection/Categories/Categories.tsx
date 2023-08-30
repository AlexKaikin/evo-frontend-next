'use client'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { ICategoryLink } from '@/types/navigation'
import { scrollToTop } from '@/utils'
import cn from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { BsGrid } from 'react-icons/bs'

interface IProps {
  items: ICategoryLink[]
}

export default function Categories({ items }: IProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryActive =
    searchParams.get('category') !== null && searchParams.get('category') !== ''
      ? searchParams.get('category')
      : 'Все товары'
  const categoryRef = useRef<HTMLDivElement>(null)
  const [categoryShow, setCategoryShow] = useState<boolean>(false)

  useOnClickOutside(categoryRef, () => setCategoryShow(false))

  const changeCategoryActive = (item: string) => {
    if (item === 'Все товары') item = ''

    let queryParams

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)

      if (queryParams.has('category')) {
        queryParams.set('category', String(item))
      } else {
        queryParams.append('category', String(item))
      }

      if(item === '') queryParams.delete('category')

      if (queryParams.has('_page')) {
        queryParams.set('_page', String(1))
      }
    }
    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
    setCategoryShow(false)
  }

  return (
    <div ref={categoryRef} className="filter__category">
      <button
        onClick={() => setCategoryShow(!categoryShow)}
        className="category__mobile"
      >
        <BsGrid />
        <span>{categoryActive}</span>
      </button>
      <div className={cn('category__items', { show: categoryShow })}>
        {items?.map(item => {
          return (
            <button
              key={item.id}
              className={cn('btn btn-light', {
                active: item.title === categoryActive,
              })}
              onClick={() => changeCategoryActive(item.title)}
            >
              {item.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
