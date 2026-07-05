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

// --- Product admin ---

export async function createProduct(data: Record<string, unknown>): Promise<APIResponse<unknown>> {
  return fetchAdmin('/api/admin/products', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateProduct(id: number, data: Record<string, unknown>): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteProduct(id: number): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/products/${id}`, { method: 'DELETE' })
}

export async function setProductVisibility(id: number, isVisible: boolean): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/products/${id}/visibility`, { method: 'PATCH', body: JSON.stringify({ isVisible }) })
}

// --- Case admin ---

export async function createCase(data: Record<string, unknown>): Promise<APIResponse<unknown>> {
  return fetchAdmin('/api/admin/cases', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateCase(id: number, data: Record<string, unknown>): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/cases/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteCase(id: number): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/cases/${id}`, { method: 'DELETE' })
}

export async function setCaseVisibility(id: number, isVisible: boolean): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/cases/${id}/visibility`, { method: 'PATCH', body: JSON.stringify({ isVisible }) })
}

// --- Message admin ---

export async function getMessages(status?: string): Promise<APIResponse<unknown[]>> {
  const qs = status ? `?status=${encodeURIComponent(status)}` : ''
  return fetchAdmin(`/api/admin/messages${qs}`)
}

export async function getMessage(id: number): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/messages/${id}`)
}

export async function setMessageStatus(id: number, status: string): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/messages/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
}

export async function deleteMessage(id: number): Promise<APIResponse<unknown>> {
  return fetchAdmin(`/api/admin/messages/${id}`, { method: 'DELETE' })
}

// --- Settings admin ---

export async function updateSettings(data: Record<string, unknown>): Promise<APIResponse<unknown>> {
  return fetchAdmin('/api/admin/settings', { method: 'PUT', body: JSON.stringify(data) })
}
