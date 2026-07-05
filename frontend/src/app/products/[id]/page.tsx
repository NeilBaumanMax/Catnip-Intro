import { getProduct, getImageUrl } from '@/lib/api'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getProduct(Number(id))

  if (!res.ok) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-4 inline-block text-sm">
          {res.error || '加载失败，请确认后端已启动'}
        </div>
        <div><Link href="/products" className="text-[#1A56DB] hover:underline">← 返回产品列表</Link></div>
      </div>
    )
  }

  if (!res.data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">产品不存在或已下架</p>
        <Link href="/products" className="text-[#1A56DB] hover:underline mt-4 inline-block">← 返回产品列表</Link>
      </div>
    )
  }

  const p = res.data
  return (
    <div>
      <section className="bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/products" className="text-blue-200 text-sm hover:text-white mb-4 inline-block">← 返回产品列表</Link>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white/10 rounded-xl overflow-hidden">
              {p.image_url ? (
                <img src={getImageUrl(p.image_url)} alt={p.name} className="w-full" />
              ) : (
                <div className="h-64 flex items-center justify-center text-6xl">📦</div>
              )}
            </div>
            <div>
              {p.category && <span className="text-xs text-[#00AEEF] bg-cyan-900/50 px-3 py-1 rounded-full">{p.category}</span>}
              <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{p.name}</h1>
              {p.summary && <p className="text-lg text-blue-100 leading-relaxed">{p.summary}</p>}
            </div>
          </div>
        </div>
      </section>

      {p.description && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">产品详情</h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">{p.description}</div>
          </div>
        </section>
      )}
    </div>
  )
}
