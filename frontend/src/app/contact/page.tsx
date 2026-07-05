import Image from 'next/image'
import { getSettings } from '@/lib/api'
import ContactForm from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

const colors = ['#00AEEF', '#1A56DB', '#60A5FA', '#38BDF8', '#93C5FD', '#0F3D7A', '#818CF8']

const cooperation = [
  { text: '学校资料管理 Agent', size: 'text-lg', delay: '0s', floatDelay: '0s' },
  { text: '企业本地知识库', size: 'text-2xl', delay: '0.2s', floatDelay: '0.8s' },
  { text: 'OPC 智能员工盒子', size: 'text-sm', delay: '0.4s', floatDelay: '1.6s' },
  { text: '端侧 AI 控制主板', size: 'text-xl', delay: '0.1s', floatDelay: '0.4s' },
  { text: '智能硬件定制开发', size: 'text-base', delay: '0.5s', floatDelay: '2.0s' },
  { text: '工业设备智能控制', size: 'text-3xl', delay: '0.3s', floatDelay: '1.2s' },
  { text: 'Agent Runtime', size: 'text-lg', delay: '0.15s', floatDelay: '0.6s' },
  { text: '私有化部署', size: 'text-xl', delay: '0.35s', floatDelay: '1.4s' },
  { text: '本地 Agent 智能板卡', size: 'text-2xl', delay: '0.25s', floatDelay: '1.0s' },
  { text: '文档处理与流程自动化', size: 'text-base', delay: '0.45s', floatDelay: '1.8s' },
  { text: '软硬件一体化', size: 'text-3xl', delay: '0.05s', floatDelay: '0.2s' },
  { text: '端侧大模型部署', size: 'text-lg', delay: '0.55s', floatDelay: '2.2s' },
  { text: '创客教育', size: 'text-sm', delay: '0.6s', floatDelay: '2.4s' },
  { text: '机器人控制', size: 'text-base', delay: '0.3s', floatDelay: '1.5s' },
  { text: '智能办公', size: 'text-xl', delay: '0.7s', floatDelay: '2.8s' },
]

const glassCard = 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg'
const glassCardHover = 'bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl shadow-lg card-hover'

export default async function ContactPage() {
  const res = await getSettings()
  const s = res.ok ? res.data : null

  return (
    <div className="page-enter">
      {/* Full-page background */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/contact-bg.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/85 via-[#0a1628]/70 to-[#0a1628]/85" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="relative py-20 md:py-24 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-[#00AEEF] font-medium text-sm mb-3 tracking-widest uppercase">Contact Us</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              让本地 Agent 真正进入你的业务现场
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              无论是学校资料管理、企业知识库、本地智能办公，还是智能硬件与设备控制，我们都可以一起从小场景开始验证。
            </p>
          </div>
        </section>

        {/* Contact Cards - glass */}
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: '📞', title: '电话', value: s?.phone || '13850240159' },
                { icon: '📍', title: '地址', value: s?.address || '郑州大学国家科技园' },
                { icon: '✉️', title: '邮箱', value: s?.email || 'contact@catnipent.com' },
              ].map((c) => (
                <div key={c.title} className={`${glassCardHover} p-6 text-center`}>
                  <span className="text-3xl block mb-3">{c.icon}</span>
                  <h3 className="font-bold text-white mb-1">{c.title}</h3>
                  <p className="text-gray-300 text-sm">{c.value}</p>
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
                <div key={img.label} className="card-hover rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur">
                  <Image src={img.src} alt={img.label} width={300} height={200} className="w-full h-40 object-cover opacity-90" />
                  <p className="text-xs text-center text-gray-300 py-2">{img.label}</p>
                </div>
              ))}
            </div>

            {/* Word Cloud */}
            <div className={`${glassCard} p-10 mb-12`}>
              <h2 className="text-xl font-bold text-white text-center mb-8">合作方向</h2>
              <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 max-w-3xl mx-auto">
                {cooperation.map((item, i) => (
                  <span
                    key={item.text}
                    className={`${item.size} font-bold px-4 py-2 rounded-full cursor-default
                      hover:scale-125 hover:bg-white/20 transition-all duration-300
                      bg-white/10 backdrop-blur border border-white/20`}
                    style={{
                      color: colors[i % colors.length],
                      animation: `wordFloat 6s ease-in-out ${item.floatDelay} infinite, wordPulse 3s ease-in-out ${item.delay} infinite`,
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Form - glass */}
            <div className="max-w-lg mx-auto pb-16">
              <h2 className="text-xl font-bold text-white text-center mb-6">在线留言</h2>
              <div className={`${glassCard} p-8`}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
