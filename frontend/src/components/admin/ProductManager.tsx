'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getProducts } from '@/lib/api'
import { createProduct, updateProduct, deleteProduct, setProductVisibility } from '@/lib/adminApi'
import { isLoggedIn } from '@/lib/adminAuth'
import type { Product } from '@/types/api'

const emptyForm = { name: '', category: '', summary: '', description: '', imageUrl: '', sortOrder: 0, isVisible: true }

export default function ProductManager() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const load = useCallback(async () => {
    setError('')
    const res = await getProducts()
    if (!res.ok) { setError(res.error || '加载失败'); setProducts([]); setLoading(false); return }
    setProducts(res.data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return }
    const init = async () => {
      setError('')
      const res = await getProducts()
      if (!res.ok) { setError(res.error || '加载失败'); setProducts([]) } else { setProducts(res.data || []) }
      setLoading(false)
    }
    init()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const data = {
      name: form.name, category: form.category, summary: form.summary,
      description: form.description, imageUrl: form.imageUrl,
      sortOrder: Number(form.sortOrder), isVisible: form.isVisible,
    }
    let res
    if (editing) {
      res = await updateProduct(editing.id, data)
    } else {
      res = await createProduct(data)
    }
    if (res.ok) {
      setShowForm(false); setEditing(null); setForm(emptyForm); load()
    } else {
      setError(res.error || '操作失败')
    }
  }

  const handleEdit = (p: Product) => {
    setEditing(p)
    setForm({ name: p.name, category: p.category, summary: p.summary, description: p.description, imageUrl: p.image_url || '', sortOrder: p.sort_order, isVisible: p.is_visible })
    setShowForm(true)
  }

  const handleDelete = async (p: Product) => {
    if (!confirm(`确定删除产品 "${p.name}"？`)) return
    const res = await deleteProduct(p.id)
    if (res.ok) { load() } else { setError(res.error || '删除失败') }
  }

  const handleToggle = async (p: Product) => {
    const res = await setProductVisibility(p.id, !p.is_visible)
    if (res.ok) { load() } else { setError(res.error || '操作失败') }
  }

  if (loading) return <div className="text-gray-400 py-8">加载中...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(!showForm) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          {showForm ? '取消' : '新增产品'}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{editing ? '编辑产品' : '新增产品'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">名称 *</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
              <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">简介</label>
              <input type="text" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">详情</label>
              <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">图片 URL</label>
              <input type="text" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/uploads/products/xxx.png" />
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
            {editing ? '保存修改' : '创建产品'}
          </button>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">名称</th>
              <th className="px-4 py-3 hidden md:table-cell">分类</th>
              <th className="px-4 py-3 hidden md:table-cell">可见</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">暂无产品</td></tr>
            )}
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{p.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_visible ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {p.is_visible ? '可见' : '隐藏'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-1">
                  <button onClick={() => handleToggle(p)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100">
                    {p.is_visible ? '隐藏' : '显示'}
                  </button>
                  <button onClick={() => handleEdit(p)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 text-blue-600">编辑</button>
                  <button onClick={() => handleDelete(p)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 text-red-600">删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
