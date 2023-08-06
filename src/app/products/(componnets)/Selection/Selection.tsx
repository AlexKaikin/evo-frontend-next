'use client'

import {
  productsCategorySelector,
  productsSortSelector,
} from '@/store/navigation/navigation'
import { useAppSelector } from '@/store/store'
import Categories from './Categories/Categories'
import Filter from './Filter/Filter'
import './Selection.scss'
import Sorting from './Sorting/Sorting'

export default function Selection() {
  const categoryItems = useAppSelector(productsCategorySelector)
  const sortItems = useAppSelector(productsSortSelector)

  return (
    <div className="section products_selection">
      <div className="container">
        <Categories items={categoryItems} />
        <Filter />
        <Sorting items={sortItems} />
      </div>
    </div>
  )
}
