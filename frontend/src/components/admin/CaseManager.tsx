'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getCases } from '@/lib/api'
import { createCase, updateCase, deleteCase, setCaseVisibility } from '@/lib/adminApi'
import { isLoggedIn } from '@/lib/adminAuth'
import type { Case } from '@/types/api'

const emptyForm = { title: '', summary: '', content: '', imageUrl: '', sortOrder: 0, isVisible: true }

export default function CaseManager() {
  const router = useRouter()
  const [items, setItems] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<Case | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const load = useCallback(async () => {
    setError('')
    const res = await getCases()
    if (!res.ok) { setError(res.error || '加载失败'); setItems([]); setLoading(false); return }
    setItems(res.data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return }
    const init = async () => {
      setError('')
      const res = await getCases()
      if (!res.ok) { setError(res.error || '加载失败'); setItems([]) } else { setItems(res.data || []) }
      setLoading(false)
    }
    init()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const data = {
      title: form.title, summary: form.summary, content: form.content,
      imageUrl: form.imageUrl, sortOrder: Number(form.sortOrder), isVisible: form.isVisible,
    }
    let res
    if (editing) {
      res = await updateCase(editing.id, data)
    } else {
      res = await createCase(data)
    }
    if (res.ok) {
      setShowForm(false); setEditing(null); setForm(emptyForm); load()
    } else {
      setError(res.error || '操作失败')
    }
  }

  const handleEdit = (c: Case) => {
    setEditing(c)
    setForm({ title: c.title, summary: c.summary, content: c.content, imageUrl: c.image_url || '', sortOrder: c.sort_order, isVisible: c.is_visible })
    setShowForm(true)
  }

  const handleDelete = async (c: Case) => {
    if (!confirm(`确定删除案例 "${c.title}"？`)) return
    const res = await deleteCase(c.id)
    if (res.ok) { load() } else { setError(res.error || '删除失败') }
  }

  const handleToggle = async (c: Case) => {
    const res = await setCaseVisibility(c.id, !c.is_visible)
    if (res.ok) { load() } else { setError(res.error || '操作失败') }
  }

  if (loading) return <div className="text-gray-400 py-8">加载中...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">案例管理</h1>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(!showForm) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          {showForm ? '取消' : '新增案例'}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{editing ? '编辑案例' : '新增案例'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">简介</label>
              <input type="text" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">详情</label>
              <textarea rows={3} value={form.content} onChange={e => setForm({...form, content: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">图片 URL</label>
              <input type="text" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/uploads/cases/xxx.png" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                <input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">可见</label>
                <select value={form.isVisible ? '1' : '0'} onChange={e => setForm({...form, isVisible: e.target.value === '1'})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
            {editing ? '保存修改' : '创建案例'}
          </button>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">标题</th>
              <th className="px-4 py-3 hidden md:table-cell">简介</th>
              <th className="px-4 py-3 hidden md:table-cell">可见</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">暂无案例</td></tr>
            )}
            {items.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{c.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{c.title}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell truncate max-w-xs">{c.summary}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_visible ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {c.is_visible ? '可见' : '隐藏'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-1">
                  <button onClick={() => handleToggle(c)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100">
                    {c.is_visible ? '隐藏' : '显示'}
                  </button>
                  <button onClick={() => handleEdit(c)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 text-blue-600">编辑</button>
                  <button onClick={() => handleDelete(c)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 text-red-600">删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
