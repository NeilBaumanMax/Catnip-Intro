import Link from 'next/link'
import { Case } from '@/types/api'
import { getImageUrl } from '@/lib/api'

export default function CaseCard({ item }: { item: Case }) {
  return (
    <Link
      href={`/cases/${item.id}`}
      className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {item.image_url && (
        <img
          src={getImageUrl(item.image_url)}
          alt={item.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        {item.summary && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.summary}</p>
        )}
      </div>
    </Link>
  )
}
