import { api } from '@/config/api'
import { INavigationItem } from '@/types/navigation'

export const navigationhService = {
  getAll() {
    return api.get<INavigationItem[]>(`navigation`)
  },
}
