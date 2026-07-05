import Link from 'next/link'
import Image from 'next/image'
import { fallbackProducts } from '@/lib/fallback'
import { getProducts, getCases, getImageUrl } from '@/lib/api'

export const dynamic = 'force-dynamic'

const scenarios = [
  { icon: '🏫', title: '学校/园区', desc: '图书管理 Agent、资料问答、知识库部署' },
  { icon: '🏢', title: '企业办公', desc: '私有化知识库、流程自动化、智能员工' },
  { icon: '🏭', title: '工业控制', desc: '端侧 AI 控制主板、设备智能控制' },
  { icon: '🤖', title: '机器人/创客', desc: '智能板卡、Live2D 交互、AI 硬件开发' },
]

const whyUs = [
  { title: '软硬件一体化', desc: '从 AI 板卡到 Agent 系统全套交付' },
  { title: '本地私有化', desc: '数据不出域，满足政企安全合规要求' },
  { title: '长期运行', desc: 'Agent 可持续稳定执行复杂业务流程' },
  { title: '深度定制', desc: '行业 Agent 定制开发 + 本地知识库部署' },
]

export default async function HomePage() {
  const [productsRes, casesRes] = await Promise.all([getProducts(), getCases()])
  const apiProducts = productsRes.ok ? (productsRes.data || []) : []
  const caseItems = casesRes.ok ? (casesRes.data || []).slice(0, 3) : []

  // Merge: prefer API products, fill with fallback to ensure 4
  const displayProducts = fallbackProducts.map((fb) => {
    const api = apiProducts.find((p: { name: string }) => p.name === fb.name)
    const img = (api && api.image_url) ? (api.image_url as string) : fb.image
    if (api) return { ...fb, image_url: img, id: api.id }
    return { ...fb, image_url: img, id: fb.id }
  })

  return (
    <div className="page-enter overflow-hidden">
      {/* Hero */}
      <section className="relative text-white overflow-hidden py-20 md:py-28 flex items-center">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/80 to-[#0a1628]/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#00AEEF] font-medium mb-4 text-sm tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-orbitron)' }}>
                万物有灵 · 本地 Agent 软硬件一体化
              </p>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                让 AI 从云端工具<br />变成可本地运行的<br />
                <span className="text-[#00AEEF]">智能员工与设备大脑</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                科霓朋特科技面向端侧大模型部署、设备控制和本地智能执行，提供本地 Agent 智能板卡、端侧 AI 控制主板与私有化 Agent 系统。
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/products" className="bg-[#00AEEF] hover:bg-cyan-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25">
                  查看产品
                </Link>
                <Link href="/contact" className="border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur">
                  联系我们
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00AEEF]/30 to-[#0F3D7A]/30 rounded-3xl blur-xl" />
              <Image src="/images/products/wanwu-agent-board.png" alt="万物有灵 AI Agent 智能板卡" width={500} height={375} className="relative rounded-2xl shadow-2xl ring-1 ring-white/20 w-full max-w-lg mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Matrix */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-grid" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#00AEEF] font-medium text-sm mb-3">核心产品</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">软硬件一体化产品矩阵</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              围绕本地 Agent、端侧 AI、智能硬件和私有化部署，构建可交付、可维护、可落地的 AI 硬件产品体系。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="card-hover bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group">
                <div className="h-48 bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] flex items-center justify-center relative overflow-hidden">
                  {(p as { image_url?: string }).image_url ? (
                    <img src={getImageUrl((p as { image_url: string }).image_url)} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <div className="text-center text-white/30">
                      <span className="text-5xl block mb-2">
                        {p.id === 1 ? '🖥️' : p.id === 2 ? '🔌' : p.id === 3 ? '📦' : '🎭'}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] text-white/80 bg-white/10 backdrop-blur px-2 py-0.5 rounded-full">{p.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1.5">{p.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.slice(0, 3).map((t: string) => (
                      <span key={t} className="text-[10px] text-[#0F3D7A] bg-blue-50 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <span className="text-sm text-[#1A56DB] font-medium group-hover:underline">查看详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-20 bg-[#F6F8FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#00AEEF] font-medium text-sm mb-3">应用场景</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">覆盖多行业本地智能场景</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((s) => (
              <div key={s.title} className="card-hover bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      {caseItems.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#00AEEF] font-medium text-sm mb-3">落地案例</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">客户实践</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseItems.map((c: { id: number; title: string; summary: string; image_url: string }) => (
                <Link key={c.id} href={`/cases/${c.id}`} className="card-hover bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                  <div className="h-48 bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] flex items-center justify-center">
                    {c.image_url ? (
                      <img src={getImageUrl(c.image_url)} alt={c.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="text-4xl text-white/30">📋</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{c.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Us */}
      <section className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">为什么选择 Catnipent</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyUs.map((w) => (
              <div key={w.title} className="text-center p-6">
                <h3 className="font-bold text-lg mb-2 text-[#00AEEF]">{w.title}</h3>
                <p className="text-sm text-gray-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0F3D7A] to-[#1A56DB] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">准备好让 AI 真正落地了吗？</h2>
          <p className="text-lg text-blue-100 mb-8">联系我们，了解本地 Agent 如何为您的场景赋能</p>
          <Link href="/contact" className="inline-block bg-[#00AEEF] hover:bg-cyan-400 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25">
            立即咨询
          </Link>
        </div>
      </section>
    </div>
  )
}
