'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isLoggedIn, getUsername, clearToken } from '@/lib/adminAuth'
import { ping } from '@/lib/adminApi'

const navItems = [
  { href: '/admin', label: '后台首页', icon: '🏠' },
  { href: '/admin/products', label: '产品管理', icon: '📦' },
  { href: '/admin/cases', label: '案例管理', icon: '📋' },
  { href: '/admin/messages', label: '留言管理', icon: '💬' },
  { href: '/admin/settings', label: '网站设置', icon: '⚙️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const username = getUsername()

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/admin/login')
      return
    }
    ping().then((res) => {
      if (!res.ok) {
        clearToken()
        router.push('/admin/login')
      } else {
        setVerifying(false)
      }
    })
  }, [router])

  const handleLogout = () => {
    clearToken()
    router.push('/admin/login')
  }

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">验证登录状态...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-4 border-b border-gray-700">
          <Link href="/admin" className="text-lg font-bold">Catnip Admin</Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-20">
          <button className="md:hidden p-2 text-gray-600" onClick={() => setSidebarOpen(true)} aria-label="菜单">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-4 ml-auto">
            {username && <span className="text-sm text-gray-600">{username}</span>}
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 transition-colors">
              退出登录
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
