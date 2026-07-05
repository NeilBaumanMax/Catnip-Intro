'use client'

import { getUsername } from '@/lib/adminAuth'
import Link from 'next/link'

const cards = [
  { href: '/admin/products', label: '产品管理', desc: '添加、编辑、删除产品', icon: '📦' },
  { href: '/admin/cases', label: '案例管理', desc: '添加、编辑、删除案例', icon: '📋' },
  { href: '/admin/messages', label: '留言管理', desc: '查看和处理客户留言', icon: '💬' },
  { href: '/admin/settings', label: '网站设置', desc: '修改公司信息、联系方式', icon: '⚙️' },
]

export default function AdminDashboard() {
  const username = getUsername()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">后台管理</h1>
        {username && <p className="text-sm text-gray-500 mt-1">欢迎，{username}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">{card.icon}</span>
            <h2 className="mt-3 font-semibold text-gray-900">{card.label}</h2>
            <p className="mt-1 text-sm text-gray-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
