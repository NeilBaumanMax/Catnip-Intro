import Image from 'next/image'

export const dynamic = 'force-dynamic'

const milestones = [
  { year: '2025', title: '公司成立', desc: '科霓朋特科技有限公司在郑州大学国家科技园注册成立' },
  { year: '2025', title: '核心项目启动', desc: '“万物有灵”本地 Agent 软硬件一体化项目立项研发' },
  { year: '2025-2026', title: '产品研发', desc: 'AI Agent 智能板卡、龙虾派端侧 AI 主板、OPC 智能员工盒子研发' },
  { year: '2026+', title: '市场拓展', desc: '面向政府、学校、企业、工业控制场景推广落地' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0F3D7A] to-[#1A56DB] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">关于 Catnipent</h1>
          <p className="text-blue-100 text-lg">让 AI 从云端工具，变成可本地运行的智能员工与设备大脑</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">公司简介</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                科霓朋特科技有限公司是一家面向本地 Agent 软硬件一体化方向发展的科技型创业企业，
                核心项目为“万物有灵”。公司围绕人工智能从云端聊天工具向本地智能员工、
                实体设备智能控制和端侧 AI 基础设施演进的产业趋势，研发可本地部署、可私有化运行、
                可长期稳定执行任务的智能本地算力板卡及配套 Agent 系统。
              </p>
              <p className="text-gray-600 leading-relaxed">
                公司产品面向政府、学校、企业、工业设备、机器人控制、智能办公和创客教育等场景，
                强调数据不出域、断网可用、本地部署、长期运行和软硬件一体化交付。
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image src="/team.jpg" alt="Catnipent 团队" width={600} height={400} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Route */}
      <section className="py-16 bg-[#F6F8FB]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">技术路线</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Agent Runtime', desc: '自然语言指令 → 任务拆解 → 工具调用 → 长期执行' },
              { title: 'Edge AI', desc: '端侧大模型部署、本地推理、低功耗运行' },
              { title: 'Hardware', desc: 'AI 智能板卡、控制主板、交互硬件一站式交付' },
            ].map((t) => (
              <div key={t.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-[#0F3D7A] text-lg mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">发展历程</h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00AEEF] mt-1.5" />
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-2" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#00AEEF]">{m.year}</span>
                  <h3 className="font-bold text-gray-900 mt-1">{m.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibition */}
      <section className="py-16 bg-[#F6F8FB]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Image src="/exhibition.jpg" alt="Catnipent 展示" width={800} height={500} className="rounded-xl shadow-lg mx-auto" />
        </div>
      </section>
    </div>
  )
}
