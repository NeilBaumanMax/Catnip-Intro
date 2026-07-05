'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于我们' },
  { href: '/products', label: '产品中心' },
  { href: '/cases', label: '解决方案' },
  { href: '/contact', label: '联系我们' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="hidden md:block bg-[#0F3D7A] text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <span>欢迎访问科霓朋特科技 — 让 AI 从云端工具，变成可本地运行的智能员工与设备大脑</span>
          <span>📞 13850240159</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Catnipent" width={40} height={40} className="rounded" />
          <span className="text-lg font-bold text-[#0F3D7A]">Catnipent</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#0F3D7A] hover:bg-blue-50 rounded-lg transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)} aria-label="菜单">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 pb-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block py-3 text-gray-700 border-b border-gray-50 text-sm" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
