//import { authService } from '@/services/auth/auth'
import { token } from '@/utils'
import axios from 'axios'
import { SERVER_URL } from './url'

export const api = axios.create({
  baseURL: SERVER_URL + '/api',
  //withCredentials: true
})

export const options = {
  multipart: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  json: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
}

api.interceptors.request.use(async config => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const { cookies } = await import('next/headers')
    const accessToken = cookies().get('accessToken')?.value
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  } else {
    const accessToken = token.getAccess()
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  }
  return config
})

// api.interceptors.response.use(
//   config => config,
//   async error => {
//     const originalRequest = error.config

//     if (
//       (error?.response?.status === 401 ||
//         errorCatch(error) === 'jwt expired' ||
//         errorCatch(error) === 'jwt must be provided') &&
//       !!error.config &&
//       error.config._isRetry
//     ) {
//       originalRequest._isRetry = true

//       try {
//         await authService.getMe()

//         return api.request(originalRequest)
//       } catch (error) {
//         if (errorCatch(error) === 'jwt expired') {
//           removeTokensInLocalStorage()
//         }
//       }
//     }

//     throw error
//   }
// )

// const errorCatch = (error: any): string => {
//   const message = error?.response?.data?.message

//   return message
//     ? typeof error.response.data.message === 'object'
//       ? message[0]
//       : message
//     : error.message
// }
