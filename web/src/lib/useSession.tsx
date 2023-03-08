import { useState, useMemo, createContext, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SESSION_URL } from './constants'
import type { Session, UseSessionOptions, SessionContextValue, SessionProviderProps } from './types'

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function useSession({ required }: UseSessionOptions = {}) {
  const value: SessionContextValue | undefined = useContext(SessionContext)
  const navigate = useNavigate()

  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  const requiredAndNotLoading = required && value.status === 'unauthenticated'

  useEffect(() => {
    if (requiredAndNotLoading) {
      navigate('/login')
    }
  }, [requiredAndNotLoading, navigate])

  return value
}

export function SessionProvider(props: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(SESSION_URL, { credentials: 'include' })
      .then((response) => {
        if (!response.ok) {
          setLoading(false)
          return
        }
        return response.json()
      })
      .then((data) => {
        setLoading(false)
        setSession(data)
      })
  }, [])

  const value: any = useMemo(
    () => ({
      data: session,
      status: loading ? 'loading' : session ? 'authenticated' : 'unauthenticated'
    }),
    [session, loading]
  )

  return <SessionContext.Provider value={value}>{props.children}</SessionContext.Provider>
}
