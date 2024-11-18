// src/context/AuthContext.js
'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Session } from '@supabase/supabase-js'
import { createClient } from 'utils/supabase/client'

type AuthProviderProps = {
  children: React.ReactNode
}

type Auth = {
  session: Session | null
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
}

const AuthContext = createContext<Auth | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, _session) => {
        if (session?.user?.id == _session?.user?.id) return

        if (
          session &&
          (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED')
        ) {
          setSession(session)
        }

        if (_event === 'SIGNED_OUT') {
          setSession(null)
        }
      }
    )

    return () => listener?.subscription.unsubscribe()
  }, [supabase])

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
