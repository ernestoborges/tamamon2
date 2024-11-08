'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useRouter } from 'next/navigation'
import { io, Socket } from 'socket.io-client'

import { useAuth } from './auth-context'

interface ISocketContext {
  socket: Socket | null
  connected: boolean
}

const SocketContext = createContext<ISocketContext | undefined>(undefined)

export const useSocketContext = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const router = useRouter()
  const auth = useAuth()
  const session = auth?.session

  const [connected, setConnected] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  useMemo(() => {
    if (session && !socket) {
      const newSocket = io('http://localhost:3000', {
        query: { userId: session?.user.id }
      })

      newSocket.on('connect', () => {
        console.log('conectado ao socket:', newSocket)
        setConnected(true)
      })

      newSocket.on('disconnect', () => {
        setConnected(false)
        router.push('/')
      })

      newSocket.on('reconnect', () => console.log('Reconectado'))

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [session])

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  )
}