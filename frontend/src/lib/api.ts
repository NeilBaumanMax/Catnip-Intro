import { APIResponse, Case, MessageRequest, Product, SiteSetting } from '@/types/api'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<APIResponse<T>> {
  const url = `${BASE_URL}${path}`
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    const data = await res.json()
    return data as APIResponse<T>
  } catch {
    return { ok: false, error: '网络请求失败，请检查后端是否已启动' }
  }
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (path.startsWith('/uploads/')) return `${BASE_URL}${path}`
  return path
}

export async function getSettings(): Promise<APIResponse<SiteSetting>> {
  return fetchAPI<SiteSetting>('/api/settings')
}

export async function getProducts(): Promise<APIResponse<Product[]>> {
  return fetchAPI<Product[]>('/api/products')
}

export async function getProduct(id: number): Promise<APIResponse<Product>> {
  return fetchAPI<Product>(`/api/products/${id}`)
}

export async function getCases(): Promise<APIResponse<Case[]>> {
  return fetchAPI<Case[]>('/api/cases')
}

export async function getCase(id: number): Promise<APIResponse<Case>> {
  return fetchAPI<Case>(`/api/cases/${id}`)
}

export async function submitMessage(req: MessageRequest): Promise<APIResponse> {
  return fetchAPI('/api/messages', {
    method: 'POST',
    body: JSON.stringify(req),
  })
}
