export const token = {
  getAccess() {
    return window.localStorage.getItem('accessToken') || ''
  },

  getRefresh() {
    return window.localStorage.getItem('refreshToken') || ''
  },

  setAll(accessToken: string, refreshToken: string) {
    window.localStorage.setItem('accessToken', accessToken)
    window.localStorage.setItem('refreshToken', refreshToken)
  },

  removeAll() {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
  },
}
