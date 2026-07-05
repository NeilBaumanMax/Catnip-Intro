import Link from 'next/link'
import { getCases, getImageUrl } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function CasesPage() {
  const res = await getCases()
  const items = res.ok ? (res.data || []) : []

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">解决方案</h1>
          <p className="text-blue-100 text-lg">本地 Agent 落地案例，覆盖教育、企业、工业多场景</p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F8FB]">
        <div className="max-w-7xl mx-auto px-4">
          {!res.ok && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6 text-sm text-center">
              {res.error || '加载失败，请确认后端已启动'}
            </div>
          )}
          {items.length === 0 && res.ok && (
            <p className="text-center text-gray-400 py-12">暂无案例</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((c) => (
              <Link key={c.id} href={`/cases/${c.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="h-52 bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] flex items-center justify-center relative overflow-hidden">
                  {c.image_url ? (
                    <img src={getImageUrl(c.image_url)} alt={c.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <span className="text-5xl text-white/20">📋</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{c.summary}</p>
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
