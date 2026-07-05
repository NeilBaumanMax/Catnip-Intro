import Image from 'next/image'
import { getProduct, getImageUrl } from '@/lib/api'
import { fallbackProducts } from '@/lib/fallback'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getProduct(Number(id))
  const fb = fallbackProducts.find((p) => p.id === Number(id))

  if (!res.ok && !fb) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center page-enter">
        <div className="bg-red-500/20 backdrop-blur border border-red-500/30 text-red-300 rounded-lg p-4 mb-4 inline-block text-sm">
          {res.error || '加载失败，请确认后端已启动'}
        </div>
        <div><Link href="/products" className="text-[#00AEEF] hover:underline">← 返回产品列表</Link></div>
      </div>
    )
  }

  const apiData = res.ok ? res.data : null
  const product = apiData || fb
  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center page-enter">
        <p className="text-gray-400 text-lg">产品不存在</p>
        <Link href="/products" className="text-[#00AEEF] hover:underline mt-4 inline-block">← 返回产品列表</Link>
      </div>
    )
  }

  const name = (product as { name: string }).name
  const category = (product as { category?: string }).category || ''
  const summary = (product as { summary?: string }).summary || ''
  const description = (product as { description?: string }).description || ''
  const image_url = (product as { image_url?: string }).image_url || (product as { image?: string }).image || ''
  const tags = (product as { tags?: string[] }).tags || []

  return (
    <div className="page-enter">
      {/* Full-page background */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/products-bg.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/88 via-[#0a1628]/72 to-[#0a1628]/88" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <Link href="/products" className="text-gray-400 text-sm hover:text-white mb-6 inline-block transition-colors">← 返回产品列表</Link>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-white/5 backdrop-blur rounded-2xl overflow-hidden ring-1 ring-white/20">
                {image_url ? (
                  <img src={getImageUrl(image_url)} alt={name} className="w-full" />
                ) : (
                  <div className="h-72 flex items-center justify-center text-7xl">🖥️</div>
                )}
              </div>
              <div>
                {category && <span className="text-sm text-[#00AEEF] bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">{category}</span>}
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">{name}</h1>
                {summary && <p className="text-lg text-gray-300 leading-relaxed mb-5">{summary}</p>}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t: string) => (
                      <span key={t} className="text-sm text-white/80 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        {description && (
          <section className="pb-16">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-10">
                <h2 className="text-xl font-bold text-white mb-6">产品详情</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line text-base">{description}</div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
