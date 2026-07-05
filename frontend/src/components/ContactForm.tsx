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

  const inputClass = 'w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all'
  const labelClass = 'block text-sm font-medium text-gray-300 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg && (
        <div className={`p-4 rounded-lg text-sm backdrop-blur ${msg.ok ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
          {msg.text}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>姓名 *</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>手机</label>
          <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>邮箱</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>公司</label>
          <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>留言内容 *</label>
        <textarea required rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputClass} />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-[#00AEEF] hover:bg-cyan-400 text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 hover:shadow-lg hover:shadow-cyan-500/25">
        {loading ? '提交中...' : '提交留言'}
      </button>
    </form>
  )
}
