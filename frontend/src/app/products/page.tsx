import Link from 'next/link'
import Image from 'next/image'
import { getProducts, getImageUrl } from '@/lib/api'
import { fallbackProducts } from '@/lib/fallback'

export const dynamic = 'force-dynamic'

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
      <section className="relative text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/products-bg.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/75 to-[#0a1628]/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#00AEEF] font-medium text-sm mb-3 tracking-widest uppercase">Product Center</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">产品中心</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            软硬件一体化产品矩阵 — 从 AI 板卡到 Agent 系统，构建可交付、可维护、可落地的智能硬件产品体系。
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F8FB]">
        <div className="max-w-5xl mx-auto px-6">
          {!res.ok && apiProducts.length === 0 && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-4 mb-8 text-sm text-center">
              正在使用离线产品数据展示，部分动态内容可能不可用。
            </div>
          )}
          <div className="space-y-8">
            {displayProducts.map((p, i) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row group ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:w-2/5 h-56 md:h-auto bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] flex items-center justify-center relative overflow-hidden">
                  {(p as { image_url?: string }).image_url ? (
                    <img src={getImageUrl((p as { image_url: string }).image_url)} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <span className="text-6xl text-white/20">{['🖥️', '🔌', '📦', '🎭'][i]}</span>
                  )}
                </div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center">
                  <span className="text-xs text-[#00AEEF] bg-cyan-50 px-3 py-1 rounded-full w-fit mb-3">{p.category}</span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{p.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((t: string) => (
                      <span key={t} className="text-xs text-[#0F3D7A] bg-blue-50 px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <span className="text-[#1A56DB] font-medium group-hover:underline text-sm">了解详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
