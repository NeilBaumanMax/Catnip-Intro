import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron', weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Catnipent — 本地 Agent 软硬件一体化',
  description: '科霓朋特科技，让 AI 从云端工具变成可本地运行的智能员工与设备大脑。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={orbitron.variable}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
