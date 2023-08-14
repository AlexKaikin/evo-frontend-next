'use client'

import { INavigationItem } from '@/types/navigation'
import Categories from './Categories/Categories'
import Filter from './Filter/Filter'
import './Selection.scss'
import Sorting from './Sorting/Sorting'

interface IProps {
  navigation: INavigationItem[]
}

export default function Selection({ navigation }: IProps) {
  const categoryItems =
    navigation.find(item => item.url === '/products')?.filter || []
  const sortItems =
    navigation.find(item => item.url === '/products')?.sort || []

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
