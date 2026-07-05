import { APIResponse } from '@/types/api'
import { getToken, clearToken } from './adminAuth'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

async function fetchAdmin<T>(path: string, options?: RequestInit): Promise<APIResponse<T>> {
  const token = getToken()
  const url = `${BASE_URL}${path}`
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    })
    if (res.status === 401) {
      clearToken()
      return { ok: false, error: '登录已过期，请重新登录' }
    }
    const data = await res.json()
    return data as APIResponse<T>
  } catch {
    return { ok: false, error: '网络请求失败，请确认后端是否已启动' }
  }
}

export async function login(username: string, password: string): Promise<APIResponse<{ token: string; user: { username: string } }>> {
  const url = `${BASE_URL}/api/auth/login`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    return data as APIResponse<{ token: string; user: { username: string } }>
  } catch {
    return { ok: false, error: '网络请求失败，请确认后端是否已启动' }
  }
}

export async function ping(): Promise<APIResponse<{ message: string }>> {
  return fetchAdmin('/api/admin/ping')
}
