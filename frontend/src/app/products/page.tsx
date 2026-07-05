import Link from 'next/link'
import { getProducts, getImageUrl } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const res = await getProducts()
  const products = res.ok ? (res.data || []) : []

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">产品中心</h1>
          <p className="text-blue-100 text-lg">软硬件一体化产品矩阵，从 AI 板卡到 Agent 系统</p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F8FB]">
        <div className="max-w-7xl mx-auto px-4">
          {!res.ok && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6 text-sm text-center">
              {res.error || '加载失败，请确认后端已启动'}
            </div>
          )}
          {products.length === 0 && res.ok && (
            <p className="text-center text-gray-400 py-12">暂无产品</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="h-52 bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] flex items-center justify-center relative overflow-hidden">
                  {p.image_url ? (
                    <img src={getImageUrl(p.image_url)} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <span className="text-5xl text-white/20">📦</span>
                  )}
                </div>
                <div className="p-6">
                  {p.category && <span className="text-xs text-[#00AEEF] bg-cyan-50 px-2 py-0.5 rounded-full">{p.category}</span>}
                  <h3 className="font-bold text-gray-900 text-lg mt-2 mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{p.summary}</p>
                  <span className="inline-block mt-4 text-sm text-[#1A56DB] font-medium group-hover:underline">了解详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
