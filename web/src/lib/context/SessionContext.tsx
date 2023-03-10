import { useState, createContext, useEffect } from 'react'
import type { Session, SessionContextValue, SessionProviderProps } from '../types'
import { getSession } from '../services/auth'

const _DEMOAUTH = {
  _getSession: () => {}
}

export const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function SessionProvider(props: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    _DEMOAUTH._getSession = async () => {
      try {
        const data = await getSession()

        setSession(data)
      } catch (error) {
        console.error('useSession.tsx', error)
      } finally {
        setLoading(false)
      }
    }

    _DEMOAUTH._getSession()

    return () => {
      _DEMOAUTH._getSession = () => {}
    }
  }, [])

  useEffect(() => {
    const visibilityHandler = async () => {
      if (document.visibilityState === 'visible') _DEMOAUTH._getSession()
    }

    document.addEventListener('visibilitychange', visibilityHandler, false)

    return () => {
      document.removeEventListener('visibilitychange', visibilityHandler, false)
    }
  }, [])

  return (
    <SessionContext.Provider
      value={{
        data: session,
        status: loading ? 'loading' : session ? 'authenticated' : 'unauthenticated'
      }}
    >
      {props.children}
    </SessionContext.Provider>
  )
}
