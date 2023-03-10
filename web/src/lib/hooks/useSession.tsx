import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UseSessionOptions, SessionContextValue } from '../types'
import { SessionContext } from '../context/SessionContext'

export function useSession({ required }: UseSessionOptions = {}) {
  const value: SessionContextValue | undefined = useContext(SessionContext)
  const navigate = useNavigate()

  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  const requiredAndNotLoading = required && value.status === 'unauthenticated'

  useEffect(() => {
    if (requiredAndNotLoading) navigate('/login')
  }, [requiredAndNotLoading])

  return value
}
