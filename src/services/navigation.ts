import { api } from '@/config/api'
import { INavigationItem } from '@/types/navigation'

export const navigationService = {
  getAll() {
    return api.get<INavigationItem[]>(`navigation`)
  },
}
