import type { LoginForm, RegisterForm } from './types'
import { URL } from './constants'

export async function getCsrfToken() {
  const csrfResponse = await fetch(`${URL}/auth/csrf`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!csrfResponse.ok) throw Error('An error occurred')

  const { csrf_token } = await csrfResponse.json()

  return csrf_token
}

export async function signIn(data: RegisterForm) {
  const response = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Csrf-Token': await getCsrfToken()
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw Error('An error occurred')

  return response.json()
}

export async function login(data: LoginForm) {
  const response = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Csrf-Token': await getCsrfToken()
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw Error('An error occurred')

  return response.json()
}

export async function logOut() {
  const response = await fetch(`${URL}/auth/logout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-Csrf-Token': await getCsrfToken()
    }
  })

  if (!response.ok) throw Error('An error occurred')

  return response.json()
}
