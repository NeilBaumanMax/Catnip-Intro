import Link from 'next/link'
import Image from 'next/image'
import { getProducts, getCases } from '@/lib/api'
import { getImageUrl } from '@/lib/api'

export const dynamic = 'force-dynamic'

const features = [
  { icon: '🔒', title: '本地部署', desc: '数据不出域，断网可用，私有化运行' },
  { icon: '🧠', title: 'Agent Runtime', desc: '自然语言→设备控制，长期稳定执行任务' },
  { icon: '⚡', title: '端侧智能', desc: '软硬件一体化交付，开箱即用' },
  { icon: '🛡️', title: '安全可信', desc: '面向政府、学校、企业级场景' },
]

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
  const products = productsRes.ok ? (productsRes.data || []).slice(0, 4) : []
  const caseItems = casesRes.ok ? (casesRes.data || []).slice(0, 3) : []

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F3D7A] via-[#1A56DB] to-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#00AEEF] font-medium mb-4 text-sm tracking-widest uppercase">万物有灵 · 本地 Agent 软硬件一体化</p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                让 AI 从云端工具
                <br />
                变成可本地运行的
                <br />
                <span className="text-[#00AEEF]">智能员工与设备大脑</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-lg leading-relaxed">
                科霓朋特科技 — 面向端侧大模型部署、设备控制和本地智能执行的软硬件一体化产品，
                将自然语言指令转化为本地可执行任务。
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/products" className="bg-[#00AEEF] hover:bg-cyan-400 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  查看产品
                </Link>
                <Link href="/contact" className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  联系我们
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image src="/product-board.jpg" alt="AI Agent 智能板卡" width={600} height={400} className="rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#00AEEF] font-medium text-sm mb-2">核心技术能力</p>
            <h2 className="text-3xl font-bold text-gray-900">为什么选择本地 Agent</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center p-6 rounded-xl bg-[#F6F8FB] hover:shadow-md transition-shadow">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="py-20 bg-[#F6F8FB]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#00AEEF] font-medium text-sm mb-2">核心产品</p>
              <h2 className="text-3xl font-bold text-gray-900">软硬件一体化产品矩阵</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                  <div className="h-48 bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] flex items-center justify-center relative overflow-hidden">
                    {p.image_url ? (
                      <img src={getImageUrl(p.image_url)} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <span className="text-4xl text-white/30">📦</span>
                    )}
                  </div>
                  <div className="p-5">
                    {p.category && <span className="text-xs text-[#00AEEF] bg-cyan-50 px-2 py-0.5 rounded-full">{p.category}</span>}
                    <h3 className="font-bold text-gray-900 mt-2 mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{p.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/products" className="text-[#1A56DB] font-medium hover:underline">查看全部产品 →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Scenarios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#00AEEF] font-medium text-sm mb-2">应用场景</p>
            <h2 className="text-3xl font-bold text-gray-900">覆盖多行业本地智能场景</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((s) => (
              <div key={s.title} className="border border-gray-100 rounded-xl p-6 hover:border-[#00AEEF] transition-colors">
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
        <section className="py-20 bg-[#F6F8FB]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#00AEEF] font-medium text-sm mb-2">解决方案</p>
              <h2 className="text-3xl font-bold text-gray-900">落地案例</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseItems.map((c) => (
                <Link key={c.id} href={`/cases/${c.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
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
            <div className="text-center mt-8">
              <Link href="/cases" className="text-[#1A56DB] font-medium hover:underline">查看全部案例 →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Us */}
      <section className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">为什么选择 Catnipent</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">准备好让 AI 真正落地了吗？</h2>
          <p className="text-lg text-blue-100 mb-8">联系我们，了解本地 Agent 如何为您的场景赋能</p>
          <Link href="/contact" className="inline-block bg-[#00AEEF] hover:bg-cyan-400 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors">
            立即咨询
          </Link>
        </div>
      </section>
    </div>
  )
}
