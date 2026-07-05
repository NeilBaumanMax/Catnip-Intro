import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from '@/components/HeroCarousel'
import { fallbackProducts } from '@/lib/fallback'
import { getProducts, getImageUrl } from '@/lib/api'

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
  const productsRes = await getProducts()
  const apiProducts = productsRes.ok ? (productsRes.data || []) : []

  // Merge: prefer API products, fill with fallback to ensure 4
  const displayProducts = fallbackProducts.map((fb) => {
    const api = apiProducts.find((p: { name: string }) => p.name === fb.name)
    const img = (api && api.image_url) ? (api.image_url as string) : fb.image
    if (api) return { ...fb, image_url: img, id: api.id }
    return { ...fb, image_url: img, id: fb.id }
  })

  return (
    <div className="page-enter">
      {/* Hero with carousel */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/80 to-[#0a1628]/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20 w-full">
          <HeroCarousel />
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
