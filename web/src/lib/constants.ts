const DEVELOPMENT_URL = import.meta.env.DEV ? 'http://localhost:3000' : ''

export const SESSION_URL = `${DEVELOPMENT_URL}/auth/session`
export const LOGIN_URL = `${DEVELOPMENT_URL}/auth/logout`
export const REGISTER_URL = `${DEVELOPMENT_URL}/auth/register`
