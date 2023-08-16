export interface INavigationState {
  navigation: INavLink[]
  status: string
}

export interface INavLink {
  id: number
  title: string
  url: string
  filter: ICategoryLink[]
  sort: ISortLink[]
}

export interface ICategoryLink {
  id: number
  title: string
  type: string
}

export interface ISortLink {
  id: number
  title: string
  type: string
}
