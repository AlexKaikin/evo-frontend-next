'use client'

import { FilterType } from '@/types/blog/posts'
import { CategoryItemType, SortItemType } from '@/types/navigation'
import { useActions } from '@/hooks/useActions'
import Categories from './Categories/Categories'
import './Selection.scss'
import Sorting from './Sorting/Sorting'
import { postsCategorySelector, postsSortSelector } from '@/store/navigation/navigation'
import { useAppSelector } from '@/store/store'

// interface IProps {
//   categoryItems: CategoryItemType[]
//   sortItems: SortItemType[]
//   filter: FilterType
// }
// { categoryItems, sortItems, filter }: PropsType
export default function Selection() {
  const categoryItems = useAppSelector(postsCategorySelector)
  const sortItems = useAppSelector(postsSortSelector)
  // const { setPostsCategory, setPostsPage, setPostsSort } = useActions()

  // function changeCategory(category: string) {
  //   setPostsCategory(category)
  // }

  // function changeSort(sort: string) {
  //   setPostsSort(sort)
  //   setPostsPage(1)
  // }

  return (
    <div className="section selection">
      <div className="container">
        <Categories
          items={categoryItems}
          // changeCategory={changeCategory}
          // categoryActive={filter.category}
        />
        <Sorting
          items={sortItems}
          // changeSort={changeSort}
          // sortActive={filter.sort}
        />
      </div>
    </div>
  )
}
