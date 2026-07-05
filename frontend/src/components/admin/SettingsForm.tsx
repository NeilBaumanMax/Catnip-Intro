'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSettings } from '@/lib/api'
import { updateSettings } from '@/lib/adminApi'
import { isLoggedIn } from '@/lib/adminAuth'
import type { SiteSetting } from '@/types/api'

export default function SettingsForm() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return }
    const init = async () => {
      const res = await getSettings()
      if (!res.ok) { setError(res.error || '加载失败'); setLoading(false); return }
      const s = res.data
      setSettings(s || null)
      if (s) {
        setForm({
          companyName: s.company_name || '',
          slogan: s.slogan || '',
          description: s.description || '',
          phone: s.phone || '',
          email: s.email || '',
          address: s.address || '',
          logoUrl: s.logo_url || '',
          wechatQrUrl: s.wechat_qr_url || '',
        })
      }
      setLoading(false)
    }
    init()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.companyName.trim()) { setError('公司名称不能为空'); return }
    setSaving(true)
    const res = await updateSettings({
      companyName: form.companyName,
      slogan: form.slogan,
      description: form.description,
      phone: form.phone,
      email: form.email,
      address: form.address,
      logoUrl: form.logoUrl,
      wechatQrUrl: form.wechatQrUrl,
    })
    if (res.ok) {
      setSuccess('网站设置已保存')
      setSettings(res.data as SiteSetting || settings)
    } else {
      setError(res.error || '保存失败')
    }
    setSaving(false)
  }

  if (loading) return <div className="text-gray-400 py-8">加载中...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">网站设置</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公司名称 *</label>
            <input type="text" required value={form.companyName || ''} onChange={e => setForm({...form, companyName: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">宣传语</label>
            <input type="text" value={form.slogan || ''} onChange={e => setForm({...form, slogan: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">公司介绍</label>
            <textarea rows={3} value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
            <input type="text" value={form.phone || ''} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input type="text" value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
            <input type="text" value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
            <input type="text" value={form.logoUrl || ''} onChange={e => setForm({...form, logoUrl: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/uploads/company/logo.png" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">微信二维码 URL</label>
            <input type="text" value={form.wechatQrUrl || ''} onChange={e => setForm({...form, wechatQrUrl: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/uploads/qrcode/wechat.png" />
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
          {saving ? '保存中...' : '保存设置'}
        </button>
      </form>
    </div>
  )
}
