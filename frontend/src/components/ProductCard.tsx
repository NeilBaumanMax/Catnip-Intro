import Link from 'next/link'
import { Product } from '@/types/api'
import { getImageUrl } from '@/lib/api'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {product.image_url && (
        <img
          src={getImageUrl(product.image_url)}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        {product.category && (
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        )}
        <h3 className="mt-2 font-semibold text-gray-900">{product.name}</h3>
        {product.summary && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.summary}</p>
        )}
      </div>
    </Link>
  )
}
