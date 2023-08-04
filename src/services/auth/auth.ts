import { api } from '@/config/api'
import { AuthDataType, LoginType } from '@/types/auth'
import { setTokensToCookie, setTokensToLocalStorage } from './auth.helpers'

export const authService = {
  async register(values: LoginType) {
    const response = await api.post(`auth/register`, values)
    const { user, accessToken, refreshToken } = await response.data
    !!user && setTokensToLocalStorage(accessToken, refreshToken)

    return user
  },

  async login(values: LoginType) {
    const response = await api.post(`auth/login`, values)
    const { user, accessToken, refreshToken } = await response.data
    //!!user && setTokensToLocalStorage(accessToken, refreshToken)
    console.log(user, accessToken)
    !!user && setTokensToCookie(accessToken, refreshToken)
    return user
  },

  async getMe() {
    const currentRefreshToken = window.localStorage.getItem('refreshToken')

    const response = await api.post(
      `auth/me`,
      { refreshToken: currentRefreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    )
    const { user, accessToken, refreshToken } = await response.data
    !!user && setTokensToLocalStorage(accessToken, refreshToken)

    return user
  },

  uploadUserAvatar(formData: any) {
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updateUser(data: AuthDataType) {
    return api.patch<AuthDataType>(`users`, data, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  deleteUser() {
    return api.delete<AuthDataType>(`auth/user/delete`)
  },
}
