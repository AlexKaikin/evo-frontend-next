export interface INavigationState {
  navigation: INavigationItem[]
  status: string
}

export interface INavigationItem {
  id: number
  title: string
  url: string
  filter: CategoryItemType[]
  sort: SortItemType[]
}

export type CategoryItemType = {
  id: number
  title: string
  type: string
}

export type SortItemType = {
  id: number
  title: string
  type: string
}
