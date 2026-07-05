import { getSettings } from '@/lib/api'
import ContactForm from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const res = await getSettings()
  const s = res.ok ? res.data : null

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">联系我们</h1>
          <p className="text-blue-100 text-lg">准备好让 AI 真正落地？我们随时为您提供支持</p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F8FB]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <span className="text-3xl">📞</span>
              <h3 className="font-bold text-gray-900 mt-3 mb-2">电话</h3>
              <p className="text-gray-600">{s?.phone || '13850240159'}</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <span className="text-3xl">📍</span>
              <h3 className="font-bold text-gray-900 mt-3 mb-2">地址</h3>
              <p className="text-gray-600">{s?.address || '郑州大学国家科技园'}</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <span className="text-3xl">✉️</span>
              <h3 className="font-bold text-gray-900 mt-3 mb-2">邮箱</h3>
              <p className="text-gray-600">{s?.email || 'contact@catnipent.com'}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">在线留言</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
