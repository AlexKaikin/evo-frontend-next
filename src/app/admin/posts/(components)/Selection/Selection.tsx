'use client'

import { INavLink } from '@/types/navigation'
import Categories from './Categories/Categories'
import './Selection.scss'
import Sorting from './Sorting/Sorting'

interface IProps {
  navigation: INavLink[]
}

export default function Selection({ navigation }: IProps) {
  const categoryItems =
    navigation.find(item => item.url === '/posts')?.filter || []
  const sortItems =
    navigation.find(item => item.url === '/posts')?.sort || []

  return (
    <div className="section posts_selection">
      <div className="container">
        <Categories items={categoryItems} />
        <Sorting items={sortItems} />
      </div>
    </div>
  )
}
