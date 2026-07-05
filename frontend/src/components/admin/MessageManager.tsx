'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getMessages, setMessageStatus, deleteMessage } from '@/lib/adminApi'
import { isLoggedIn } from '@/lib/adminAuth'
import type { Message } from '@/types/api'

const statusLabels: Record<string, string> = {
  new: '新留言', processing: '处理中', processed: '已处理',
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-600', processing: 'bg-yellow-50 text-yellow-600', processed: 'bg-green-50 text-green-600',
}

export default function MessageManager() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')
  const [detail, setDetail] = useState<Message | null>(null)

  const load = useCallback(async () => {
    setError('')
    const res = await getMessages(filter || undefined)
    if (!res.ok) { setError(res.error || '加载失败'); setMessages([]); setLoading(false); return }
    setMessages(res.data as Message[] || [])
    setLoading(false)
  }, [filter])

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/admin/login'); return }
    const init = async () => {
      const res = await getMessages(filter || undefined)
      if (!res.ok) { setError(res.error || '加载失败'); setMessages([]) } else { setMessages(res.data as Message[] || []) }
      setLoading(false)
    }
    init()
  }, [filter, router])

  const handleStatus = async (msg: Message, status: string) => {
    const res = await setMessageStatus(msg.id, status)
    if (res.ok) { load() } else { setError(res.error || '操作失败') }
  }

  const handleDelete = async (msg: Message) => {
    if (!confirm(`确定删除 ${msg.name} 的留言？`)) return
    const res = await deleteMessage(msg.id)
    if (res.ok) { load(); setDetail(null) } else { setError(res.error || '删除失败') }
  }

  if (loading) return <div className="text-gray-400 py-8">加载中...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">留言管理</h1>
        <select value={filter} onChange={e => { setFilter(e.target.value); setLoading(true) }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">全部</option>
          <option value="new">新留言</option>
          <option value="processing">处理中</option>
          <option value="processed">已处理</option>
        </select>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">{error}</div>}

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">留言详情</h3>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">姓名：</span><span className="font-medium">{detail.name}</span></div>
              {detail.company && <div><span className="text-gray-500">公司：</span>{detail.company}</div>}
              <div><span className="text-gray-500">手机：</span>{detail.phone || '-'}</div>
              <div><span className="text-gray-500">邮箱：</span>{detail.email || '-'}</div>
              <div><span className="text-gray-500">状态：</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[detail.status]}`}>{statusLabels[detail.status] || detail.status}</span>
              </div>
              <div><span className="text-gray-500">时间：</span>{detail.created_at}</div>
              <div className="border-t pt-3 mt-3">
                <p className="text-gray-700 whitespace-pre-line">{detail.content}</p>
              </div>
              <div className="flex gap-2 pt-2">
                {detail.status !== 'processing' && <button onClick={() => handleStatus(detail, 'processing')} className="text-xs px-3 py-1 rounded bg-yellow-50 text-yellow-700 hover:bg-yellow-100">标记处理中</button>}
                {detail.status !== 'processed' && <button onClick={() => handleStatus(detail, 'processed')} className="text-xs px-3 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100">标记已处理</button>}
                <button onClick={() => handleDelete(detail)} className="text-xs px-3 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 ml-auto">删除</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">姓名</th>
              <th className="px-4 py-3 hidden md:table-cell">联系方式</th>
              <th className="px-4 py-3 hidden md:table-cell">状态</th>
              <th className="px-4 py-3 hidden md:table-cell">时间</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">暂无留言</td></tr>
            )}
            {messages.map(m => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{m.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{m.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{m.phone || m.email}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[m.status]}`}>{statusLabels[m.status] || m.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{m.created_at?.slice(0, 16)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setDetail(m)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100">详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
