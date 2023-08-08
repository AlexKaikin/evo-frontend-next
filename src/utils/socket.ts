import { SERVER_URL } from '@/config/url'
import { io } from 'socket.io-client'

export const socket = io(SERVER_URL || '', {
  transports: ['websocket'],
})
