import Link from 'next/link'
import Image from 'next/image'
import { getProducts, getImageUrl } from '@/lib/api'
import { fallbackProducts } from '@/lib/fallback'

export const dynamic = 'force-dynamic'

const glassCard = 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg'

export default async function ProductsPage() {
  const res = await getProducts()
  const apiProducts: { name: string; image_url?: string; id: number }[] = res.ok ? (res.data || []) : []

  const displayProducts = fallbackProducts.map((fb) => {
    const api = apiProducts.find((p) => p.name === fb.name)
    const img = (api && api.image_url) ? (api.image_url as string) : fb.image
    if (api) return { ...fb, image_url: img, id: api.id }
    return { ...fb, image_url: img, id: fb.id }
  })

  return (
    <div className="page-enter">
      {/* Full-page background */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/products-bg.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/88 via-[#0a1628]/72 to-[#0a1628]/88" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="py-12 md:py-24 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-[#00AEEF] font-medium text-sm mb-3 tracking-widest uppercase">Product Center</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">产品中心</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              软硬件一体化产品矩阵 — 从 AI 板卡到 Agent 系统，构建可交付、可维护、可落地的智能硬件产品体系。
            </p>
          </div>
        </section>

        {/* Product Cards */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-6">
            {!res.ok && apiProducts.length === 0 && (
              <div className="bg-white/10 backdrop-blur border border-white/20 text-gray-300 rounded-lg p-4 mb-8 text-sm text-center">
                正在使用离线产品数据展示
              </div>
            )}
            <div className="space-y-6">
              {displayProducts.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className={`card-hover ${glassCard} overflow-hidden flex flex-col md:flex-row group ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    {(p as { image_url?: string }).image_url ? (
                      <img
                        src={getImageUrl((p as { image_url: string }).image_url)}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                        <span className="text-7xl">{['🖥️', '🔌', '📦', '🎭'][i]}</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="text-xs text-white bg-white/20 backdrop-blur px-3 py-1 rounded-full">{p.category}</span>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{p.name}</h2>
                    <p className="text-base text-gray-300 leading-relaxed mb-5">{p.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map((t: string) => (
                        <span key={t} className="text-sm text-white/80 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <span className="text-[#00AEEF] font-medium group-hover:underline text-base">了解详情 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
