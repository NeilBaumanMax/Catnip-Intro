import Link from 'next/link'
import { getSettings, getProducts, getCases } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import CaseCard from '@/components/CaseCard'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [settingsRes, productsRes, casesRes] = await Promise.all([
    getSettings(), getProducts(), getCases(),
  ])

  const settings = settingsRes.ok ? settingsRes.data : null
  const products = productsRes.ok ? (productsRes.data || []).slice(0, 4) : []
  const caseItems = casesRes.ok ? (casesRes.data || []).slice(0, 4) : []
  const backendDown = !settingsRes.ok && !productsRes.ok && !casesRes.ok

  return (
    <div>
      {/* Backend error banner */}
      {backendDown && (
        <div className="bg-red-50 border-b border-red-200 text-red-600 text-sm text-center py-2 px-4">
          后端服务未连接，部分内容无法加载。请确认后端已启动。
        </div>
      )}

      <section className="bg-gradient-to-br from-blue-50 to-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {settings?.company_name || 'Catnip Intro'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {settings?.slogan || '专业企业服务'}
          </p>
          {settings?.description && (
            <p className="text-gray-500 max-w-xl mx-auto mb-8">{settings.description}</p>
          )}
          <Link href="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            联系我们
          </Link>
        </div>
      </section>

      {products.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">产品展示</h2>
            <Link href="/products" className="text-sm text-blue-600 hover:underline">查看全部 →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {caseItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">案例展示</h2>
            <Link href="/cases" className="text-sm text-blue-600 hover:underline">查看全部 →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseItems.map((c) => <CaseCard key={c.id} item={c} />)}
          </div>
        </section>
      )}

      {!backendDown && !products.length && !caseItems.length && (
        <section className="text-center py-16 text-gray-400">
          <p>暂无内容，请先通过后台添加产品和案例。</p>
        </section>
      )}
    </div>
  )
}
