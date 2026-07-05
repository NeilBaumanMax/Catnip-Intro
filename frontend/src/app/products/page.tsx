import { getProducts } from '@/lib/api'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const res = await getProducts()
  const products = res.ok ? (res.data || []) : []
  const error = !res.ok ? res.error : null

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">产品展示</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!error && products.length === 0 && (
        <p className="text-gray-400">暂无产品。</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
