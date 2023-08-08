import cn from 'classnames'
import { useRef, useState } from 'react'
import { CategoryItemType } from '@/types/navigation'
import { BsGrid } from 'react-icons/bs' 
//import CategoriesSkeleton from '@/common/Skeleton/CategoriesSkeleton/CategoriesSkeleton'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useRouter, useSearchParams } from 'next/navigation'
import { scrollToTop } from '@/utils'

interface IProps {
  items: CategoryItemType[]
}

export default function Categories({ items }: IProps) {
  const categoryRef = useRef<HTMLDivElement>(null)
  const [categoryShow, setCategoryShow] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryActive =
    searchParams.get('category') !== null && searchParams.get('category') !== ''
      ? searchParams.get('category')
      : 'Все статьи'

  useOnClickOutside(categoryRef, () => setCategoryShow(false))

  const categoryShowChange = () => {
    if (categoryShow) setCategoryShow(false)
    else setCategoryShow(true)
  }

  const changeCategoryActive = (item: string) => {
    if (item === 'Все статьи') item = ''

    let queryParams

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)

      if (queryParams.has('category')) {
        queryParams.set('category', String(item))
      } else {
        queryParams.append('category', String(item))
      }

      if (queryParams.has('_page')) {
        queryParams.set('_page', String(1))
      }
    }
    const path = window.location.pathname + '?' + queryParams?.toString()
    router.push(path)
    scrollToTop()
    setCategoryShow(false)
  }

  //if (!items.length) return <CategoriesSkeleton />

  return (
    <div ref={categoryRef} className="filter__category">
      <button onClick={categoryShowChange} className="category__mobile">
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
