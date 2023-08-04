export function setTokensToLocalStorage(
  accessToken: string,
  refreshToken: string
) {
  window.localStorage.setItem('accessToken', accessToken)
  window.localStorage.setItem('refreshToken', refreshToken)
}

export async function setTokensToCookie(accessToken: string, refreshToken: string) {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const { cookies } = await import('next/headers')

    cookies().set('accessToken', accessToken)
    cookies().set('refreshToken', refreshToken)
    // const { cookies } = await import('next/headers'),
    //   token = cookies().get('accessToken')?.value

    // if (token) {
    //   accessToken = token
    // }
  } else {
    document.cookie = `accessToken=${accessToken}`
    document.cookie = `refreshToken=${refreshToken}`
  }
  // window.localStorage.setItem('accessToken', accessToken)
  // window.localStorage.setItem('refreshToken', refreshToken)
}

export function removeTokensInLocalStorage() {
  window.localStorage.removeItem('accessToken')
  window.localStorage.removeItem('refreshToken')
}
