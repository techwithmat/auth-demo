export type LoginForm = {
  password: string
  email: string
}

export type RegisterForm = LoginForm & { password_confirmation: string }
