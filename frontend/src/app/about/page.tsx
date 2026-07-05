import { getSettings } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const res = await getSettings()
  const s = res.ok ? res.data : null

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">关于我们</h1>

      {!res.ok && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6 text-sm">
          {res.error || '加载失败，请确认后端已启动'}
        </div>
      )}

      {res.ok && !s && <p className="text-gray-400">暂无信息，请先配置网站设置。</p>}

      {s && (
        <div className="space-y-6">
          {s.description && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{s.description}</p>
            </div>
          )}
          <div className="border-t border-gray-200 pt-6 space-y-3 text-gray-600">
            {s.address && <p><span className="font-medium text-gray-900">地址：</span>{s.address}</p>}
            {s.phone && <p><span className="font-medium text-gray-900">电话：</span>{s.phone}</p>}
            {s.email && <p><span className="font-medium text-gray-900">邮箱：</span>{s.email}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
