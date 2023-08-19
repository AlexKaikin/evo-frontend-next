import { api } from '@/config/api'
import { INavLink } from '@/types/navigation'

export const navigationService = {
  getAll() {
    return api.get<INavLink[]>(`navigation`)
  },
}
