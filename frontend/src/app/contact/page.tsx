import Image from 'next/image'
import { getSettings } from '@/lib/api'
import ContactForm from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

const cooperation = [
  { text: '学校资料管理 Agent', size: 'text-lg', color: 'text-[#0F3D7A]', delay: '0s' },
  { text: '企业本地知识库', size: 'text-2xl', color: 'text-[#1A56DB]', delay: '0.2s' },
  { text: 'OPC 智能员工盒子', size: 'text-sm', color: 'text-[#00AEEF]', delay: '0.4s' },
  { text: '端侧 AI 控制主板', size: 'text-xl', color: 'text-[#0F3D7A]', delay: '0.1s' },
  { text: '智能硬件定制开发', size: 'text-base', color: 'text-[#1A56DB]', delay: '0.5s' },
  { text: '工业设备智能控制', size: 'text-3xl', color: 'text-[#00AEEF]', delay: '0.3s' },
  { text: 'Agent Runtime', size: 'text-lg', color: 'text-[#0F3D7A]', delay: '0.15s' },
  { text: '私有化部署', size: 'text-xl', color: 'text-[#1A56DB]', delay: '0.35s' },
  { text: '本地 Agent 智能板卡', size: 'text-2xl', color: 'text-[#00AEEF]', delay: '0.25s' },
  { text: '文档处理与流程自动化', size: 'text-base', color: 'text-[#0F3D7A]', delay: '0.45s' },
  { text: '软硬件一体化', size: 'text-3xl', color: 'text-[#1A56DB]', delay: '0.05s' },
  { text: '端侧大模型部署', size: 'text-lg', color: 'text-[#00AEEF]', delay: '0.55s' },
  { text: '创客教育', size: 'text-sm', color: 'text-[#0F3D7A]', delay: '0.6s' },
  { text: '机器人控制', size: 'text-base', color: 'text-[#1A56DB]', delay: '0.3s' },
  { text: '智能办公', size: 'text-xl', color: 'text-[#00AEEF]', delay: '0.7s' },
]

export default async function ContactPage() {
  const res = await getSettings()
  const s = res.ok ? res.data : null

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/contact-bg.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/75 to-[#0a1628]/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#00AEEF] font-medium text-sm mb-3 tracking-widest uppercase">Contact Us</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">让本地 Agent 真正进入你的业务现场</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            无论是学校资料管理、企业知识库、本地智能办公，还是智能硬件与设备控制，我们都可以一起从小场景开始验证。
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '📞', title: '电话', value: s?.phone || '13850240159' },
              { icon: '📍', title: '地址', value: s?.address || '郑州大学国家科技园' },
              { icon: '✉️', title: '邮箱', value: s?.email || 'contact@catnipent.com' },
            ].map((c) => (
              <div key={c.title} className="card-hover bg-[#F6F8FB] rounded-xl p-6 text-center border border-gray-100">
                <span className="text-3xl block mb-3">{c.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-gray-600 text-sm">{c.value}</p>
              </div>
            ))}
          </div>

          {/* Image strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { src: '/product-board.jpg', label: 'AI Agent 智能板卡' },
              { src: '/product-whalebot.jpg', label: '端侧 AI 控制主板' },
              { src: '/team.jpg', label: '团队研发' },
              { src: '/exhibition.jpg', label: '场景展示' },
            ].map((img) => (
              <div key={img.label} className="card-hover rounded-xl overflow-hidden shadow-sm bg-gray-100">
                <Image src={img.src} alt={img.label} width={300} height={200} className="w-full h-40 object-cover" />
                <p className="text-xs text-center text-gray-500 py-2">{img.label}</p>
              </div>
            ))}
          </div>

          {/* Word Cloud Cooperation */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-8">合作方向</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 max-w-3xl mx-auto px-4 py-8">
              {cooperation.map((item) => (
                <span
                  key={item.text}
                  className={`${item.size} ${item.color} font-bold px-4 py-2 rounded-full cursor-default
                    animate-[wordPulse_3s_ease-in-out_infinite] hover:scale-125 hover:shadow-lg transition-all duration-300
                    bg-white/60 backdrop-blur border border-gray-100`}
                  style={{ animationDelay: item.delay }}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">在线留言</h2>
            <div className="bg-[#F6F8FB] rounded-2xl p-8 border border-gray-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
