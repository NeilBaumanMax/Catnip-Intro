import { getCase } from '@/lib/api'
import { getImageUrl } from '@/lib/api'
import Link from 'next/link'

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getCase(Number(id))

  if (!res.ok && !res.data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg">案例不存在或已隐藏</p>
        <Link href="/cases" className="text-blue-600 hover:underline mt-4 inline-block">← 返回案例列表</Link>
      </div>
    )
  }

  const c = res.data!
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/cases" className="text-sm text-blue-600 hover:underline mb-6 inline-block">← 返回案例列表</Link>
      {c.image_url && (
        <img src={getImageUrl(c.image_url)} alt={c.title} className="w-full max-h-96 object-cover rounded-lg mb-8" />
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{c.title}</h1>
      {c.summary && <p className="text-lg text-gray-600 mb-6">{c.summary}</p>}
      {c.content && <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">{c.content}</div>}
    </div>
  )
}
