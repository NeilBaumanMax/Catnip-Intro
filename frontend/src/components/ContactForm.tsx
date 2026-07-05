'use client'

import { useState } from 'react'
import { submitMessage } from '@/lib/api'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', content: '' })
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg(null)

    const res = await submitMessage({
      name: form.name,
      phone: form.phone,
      email: form.email,
      company: form.company,
      content: form.content,
    })

    if (res.ok) {
      setMsg({ ok: true, text: '留言已提交，我们会尽快与您联系！' })
      setForm({ name: '', phone: '', email: '', company: '', content: '' })
    } else {
      setMsg({ ok: false, text: res.error || '提交失败，请稍后再试' })
    }
    setLoading(false)
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent transition-all"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg && (
        <div className={`p-4 rounded-lg text-sm ${msg.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
          {msg.text}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">姓名 *</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">手机</label>
          <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">邮箱</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">公司</label>
          <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">留言内容 *</label>
        <textarea required rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputClass} />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-[#0F3D7A] hover:bg-[#1A56DB] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50">
        {loading ? '提交中...' : '提交留言'}
      </button>
    </form>
  )
}
