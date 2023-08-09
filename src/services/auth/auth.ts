import { api, options } from '@/config/api'
import { AuthDataType, LoginType } from '@/types/auth'
import { token } from '@/utils'

export const authService = {
  async register(values: LoginType) {
    const res = await api.post(`auth/register`, values)
    const { user, accessToken, refreshToken } = res.data
    !!user && token.setAll(accessToken, refreshToken)
    return res
  },

  async login(values: LoginType) {
    const res = await api.post(`auth/login`, values)
    const { user, accessToken, refreshToken } = res.data
    !!user && token.setAll(accessToken, refreshToken)
    return res
  },

  async getMe() {
    const response = await api.post(
      `auth/me`,
      { refreshToken: token.getRefresh() },
      options.json
    )
    const { user, accessToken, refreshToken } = await response.data
    !!user && token.setAll(accessToken, refreshToken)
    return user
  },

  uploadUserAvatar(formData: any) {
    return api.post('/upload', formData, options.multipart)
  },

  updateUser(data: AuthDataType) {
    return api.patch<AuthDataType>(`users`, data, options.json)
  },

  deleteUser() {
    return api.delete<AuthDataType>(`auth/user/delete`)
  },
}
