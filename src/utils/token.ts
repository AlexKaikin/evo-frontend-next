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
    document.cookie = 'accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refreshToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = `accessToken=${accessToken}`
    document.cookie = `refreshToken=${refreshToken}`
  },

  removeAll() {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
  },
}
