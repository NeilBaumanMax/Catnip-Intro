export interface SiteSetting {
  id: number
  company_name: string
  slogan: string
  description: string
  phone: string
  email: string
  address: string
  logo_url: string
  wechat_qr_url: string
}

export interface Product {
  id: number
  name: string
  category: string
  summary: string
  description: string
  image_url: string
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface Case {
  id: number
  title: string
  summary: string
  content: string
  image_url: string
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface MessageRequest {
  name: string
  phone: string
  email: string
  company: string
  content: string
}

export interface Message {
  id: number
  name: string
  phone: string
  email: string
  company: string
  content: string
  status: string
  created_at: string
  updated_at: string
}

export interface APIResponse<T = unknown> {
  ok: boolean
  data?: T
  error?: string
  message?: string
}
