'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于我们' },
  { href: '/products', label: '产品中心' },
  { href: '/contact', label: '联系我们' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Catnipent" width={48} height={48} className="object-contain" />
          <span className="text-lg font-black text-[#0F3D7A]" style={{ fontFamily: 'var(--font-orbitron)' }}>Catnipent</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-5 py-2.5 text-base font-semibold rounded-full transition-all duration-300`}
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  isActive(item.href) ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}>
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#1A56DB] rounded-full shadow-lg shadow-cyan-500/25" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)} aria-label="菜单">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden bg-white/95 backdrop-blur border-t px-6 pb-4 page-enter">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-3 text-sm border-b border-gray-50 ${
                isActive(item.href) ? 'text-[#00AEEF] font-medium' : 'text-gray-600'
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
