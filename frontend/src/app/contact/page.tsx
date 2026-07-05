import { getSettings, getImageUrl } from '@/lib/api'
import ContactForm from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const res = await getSettings()
  const s = res.ok ? res.data : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">联系我们</h1>

      {!res.ok && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6 text-sm">
          {res.error || '加载失败，请确认后端已启动'}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4 text-gray-600">
          {res.ok && s ? (
            <>
              {s.company_name && <p className="text-xl font-bold text-gray-900">{s.company_name}</p>}
              {s.phone && <p><span className="font-medium text-gray-900">电话：</span>{s.phone}</p>}
              {s.email && <p><span className="font-medium text-gray-900">邮箱：</span>{s.email}</p>}
              {s.address && <p><span className="font-medium text-gray-900">地址：</span>{s.address}</p>}
              {s.wechat_qr_url && (
                <div>
                  <p className="font-medium text-gray-900 mb-2">微信公众号</p>
                  <img src={getImageUrl(s.wechat_qr_url)} alt="QR Code" className="w-32 h-32 object-contain border rounded-lg" />
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400">暂无联系信息，请先配置网站设置。</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">在线留言</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
