export type LoginForm = {
  password: string
  email: string
}

export type RegisterForm = LoginForm & { password_confirmation: string }

export type User = {
  user_id: string
  email: string
}

export type Session = {
  user: User
  expires: string
}

export type UseSessionOptions = {
  required?: boolean
}

export type SessionContextValue = {
  data: Session | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
}

export interface SessionProviderProps {
  children: React.ReactNode
}
