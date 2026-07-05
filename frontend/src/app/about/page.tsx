import Image from 'next/image'

export const dynamic = 'force-dynamic'

const techRoute = [
  { title: 'Agent Runtime', desc: '本地 Memory、状态持久化、工具调用、多 Agent 调度、工作流自动化。', icon: '🧠' },
  { title: 'Edge AI', desc: '端侧模型推理、本地知识库、低延迟响应、断网可用。', icon: '⚡' },
  { title: 'Hardware', desc: '端侧 AI 控制主板、工业接口、传感器接入、设备控制和边缘部署。', icon: '🔌' },
]

const timeline = [
  { period: '2025 Q4', title: '项目构想阶段', desc: '围绕本地 Agent、端侧 AI 和智能硬件方向形成"万物有灵"项目设想，明确从云端问答工具走向本地智能员工与设备大脑的产品方向。完成核心技术路线预研和市场需求调研。' },
  { period: '2026 Q1', title: '原型验证阶段', desc: '完成本地 Agent Runtime、工具调用、知识库、硬件控制接口等关键技术路线验证。初步形成软硬件一体化产品框架，打通"自然语言指令 → 本地任务执行"的完整链路。' },
  { period: '2026 Q2', title: '样机迭代阶段', desc: '推进龙虾派端侧 AI 控制主板、本地 Agent 智能板卡、OPC 智能员工盒子等产品样机设计。开展学校资料管理、企业知识库和智能办公场景验证，积累早期试点数据。' },
  { period: '2026 Q3', title: '入驻与试点阶段', desc: '依托郑州大学国家科技园推进企业注册、样机打磨、试点落地、知识产权布局和商业化验证。在高校、园区和企业中落地首批试点项目，形成可展示、可交付的早期样板。' },
  { period: '2026 Q4', title: '产品化阶段', desc: '完善标准化硬件版本、软件系统镜像、客户交付流程和售后服务体系。围绕学校、园区、企业和智能硬件客户展开试点复制，实现从定制化交付到标准化产品的关键转型。' },
  { period: '2027', title: '行业方案拓展阶段', desc: '从单点项目交付走向行业解决方案。重点服务政府、学校、安全企业、工业设备和一人公司智能办公场景，构建"定制服务 + 硬件终端 + 私有化部署 + 运维支持"的完整商业模式。' },
]

const glassCard = 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg'
const glassCardHover = 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg card-hover'

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Full-page background */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/about-bg.webp" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/85 via-[#0a1628]/70 to-[#0a1628]/85" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="py-12 md:py-24 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-[#00AEEF] font-medium text-sm mb-3 tracking-widest uppercase">About Catnipent</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">关于科霓朋特</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              面向本地 Agent 软硬件一体化的科技型创业企业。
            </p>
          </div>
        </section>

        {/* Company Intro + Team Image */}
        <section className="pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className={`${glassCard} p-8 md:p-10`}>
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-2xl font-bold text-white mb-6">公司简介</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    科霓朋特科技有限公司是一家面向本地 Agent 软硬件一体化方向发展的科技型创业企业，核心项目为&ldquo;万物有灵&rdquo;。公司围绕人工智能从云端聊天工具向本地智能员工、实体设备智能控制和端侧 AI 基础设施演进的产业趋势，研发可本地部署、可私有化运行、可长期稳定执行任务的智能本地算力板卡及配套 Agent 系统。
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    公司产品面向政府、学校、企业、工业设备、机器人控制、智能办公和创客教育等场景，强调数据不出域、断网可用、本地部署、长期运行和软硬件一体化交付。
                  </p>
                </div>
                <div className="md:col-span-2 rounded-xl overflow-hidden ring-1 ring-white/20">
                  <Image src="/team.jpg" alt="Catnipent 团队" width={400} height={300} className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Route */}
        <section className="pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-[#00AEEF] font-medium text-sm mb-3">技术路线</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Agent Runtime + Edge AI + Hardware</h2>
              <p className="text-gray-400">软硬件一体化技术体系，构建端到端的本地 AI 执行能力</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {techRoute.map((t) => (
                <div key={t.title} className={`${glassCardHover} p-8 text-center`}>
                  <span className="text-4xl block mb-4">{t.icon}</span>
                  <h3 className="font-bold text-white text-lg mb-3">{t.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="pb-8 md:pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-[#00AEEF] font-medium text-sm mb-3">发展历程</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">从构想到产品化</h2>
            </div>
            <div className={`${glassCard} p-6 md:p-8`}>
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 pb-8 last:pb-0 relative">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${i === 0 ? 'bg-[#00AEEF] timeline-dot' : 'bg-white/40'}`} />
                    {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-white/10 mt-2" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#00AEEF] tracking-wider">{item.period}</span>
                    <h3 className="font-bold text-white mt-1.5 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exhibition */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className={`${glassCard} p-4 overflow-hidden`}>
              <Image src="/exhibition.jpg" alt="Catnipent 展示" width={800} height={500} className="rounded-xl mx-auto w-full" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
