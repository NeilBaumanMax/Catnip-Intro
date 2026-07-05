import { getProduct } from '@/lib/api'
import { getImageUrl } from '@/lib/api'
import Link from 'next/link'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getProduct(Number(id))

  if (!res.ok && !res.data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg">产品不存在或已下架</p>
        <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">← 返回产品列表</Link>
      </div>
    )
  }

  const p = res.data!
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/products" className="text-sm text-blue-600 hover:underline mb-6 inline-block">← 返回产品列表</Link>
      {p.image_url && (
        <img src={getImageUrl(p.image_url)} alt={p.name} className="w-full max-h-96 object-cover rounded-lg mb-8" />
      )}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{p.name}</h1>
        {p.category && <span className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{p.category}</span>}
      </div>
      {p.summary && <p className="text-lg text-gray-600 mb-6">{p.summary}</p>}
      {p.description && <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">{p.description}</div>}
    </div>
  )
}
