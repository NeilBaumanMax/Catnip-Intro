const TOKEN_KEY = 'admin_token'
const USER_KEY = 'admin_user'

export function saveToken(token: string, username: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, username)
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getUsername(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(USER_KEY)
}

export function clearToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isLoggedIn(): boolean {
  return getToken() !== null
}
