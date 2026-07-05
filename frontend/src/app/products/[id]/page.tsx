import { getProduct, getImageUrl } from '@/lib/api'
import { fallbackProducts } from '@/lib/fallback'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getProduct(Number(id))

  // Check fallback
  const fb = fallbackProducts.find((p) => p.id === Number(id))

  if (!res.ok && !fb) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center page-enter">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-4 inline-block text-sm">
          {res.error || '加载失败，请确认后端已启动'}
        </div>
        <div><Link href="/products" className="text-[#1A56DB] hover:underline">← 返回产品列表</Link></div>
      </div>
    )
  }

  const apiData = res.ok ? res.data : null
  const product = apiData || fb

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center page-enter">
        <p className="text-gray-400 text-lg">产品不存在</p>
        <Link href="/products" className="text-[#1A56DB] hover:underline mt-4 inline-block">← 返回产品列表</Link>
      </div>
    )
  }

  const name = (product as { name: string }).name
  const category = (product as { category?: string }).category || ''
  const summary = (product as { summary?: string }).summary || ''
  const description = (product as { description?: string }).description || ''
  const image_url = (product as { image_url?: string }).image_url || ''
  const tags = (product as { tags?: string[] }).tags || []

  return (
    <div className="page-enter">
      <section className="relative bg-gradient-to-br from-[#0F3D7A] via-[#1A56DB] to-[#0a1628] text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] hero-orb bg-[#00AEEF]" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link href="/products" className="text-blue-200 text-sm hover:text-white mb-6 inline-block transition-colors">← 返回产品列表</Link>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white/5 backdrop-blur rounded-2xl overflow-hidden ring-1 ring-white/10">
              {image_url ? (
                <img src={getImageUrl(image_url)} alt={name} className="w-full" />
              ) : (
                <div className="h-72 flex items-center justify-center text-7xl">🖥️</div>
              )}
            </div>
            <div>
              {category && <span className="text-xs text-[#00AEEF] bg-cyan-900/40 backdrop-blur px-3 py-1 rounded-full">{category}</span>}
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{name}</h1>
              {summary && <p className="text-lg text-blue-100 leading-relaxed mb-4">{summary}</p>}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((t: string) => (
                    <span key={t} className="text-xs text-white/80 bg-white/10 backdrop-blur px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {description && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">产品详情</h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">{description}</div>
          </div>
        </section>
      )}
    </div>
  )
}
