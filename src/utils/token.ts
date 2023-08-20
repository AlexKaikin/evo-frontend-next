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
    document.cookie = 'accessToken= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refreshToken= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = `accessToken=${accessToken} path=/;`
    document.cookie = `refreshToken=${refreshToken} path=/;`
  },

  removeAll() {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    document.cookie = 'accessToken= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refreshToken= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT'
  },
}
