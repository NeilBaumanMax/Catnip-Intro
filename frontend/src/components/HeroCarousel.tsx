'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  { src: '/images/products/wanwu-agent-board.jpg', name: '万物有灵 AI Agent 智能板卡', tag: '本地 Agent 智能硬件', desc: '面向本地 Agent 运行、知识库调用、工具执行和硬件控制的智能算力板卡，将自然语言指令转化为本地可执行任务。', tags: ['本地部署', 'Agent Runtime', '硬件控制', '私有化运行'], id: 1 },
  { src: '/images/products/lobsterpi-edge-ai-board.jpg', name: '龙虾派端侧 AI 控制主板', tag: '端侧 AI 控制主板', desc: '面向端侧大模型部署、设备控制和边缘推理的 AI 控制主板，适合智能硬件、工业控制和机器人场景。', tags: ['端侧 AI', '边缘推理', '设备控制', '工业接口'], id: 2 },
  { src: '/images/products/opc-ai-employee-box.jpg', name: 'OPC 智能员工盒子', tag: '智能办公与私有化部署', desc: '面向企业、学校和园区的本地智能员工终端，支持知识库问答、文档处理、流程自动化和私有化部署。', tags: ['智能办公', '本地知识库', '私有化部署', '文档处理'], id: 3 },
  { src: '/images/products/live2d-smart-accessory.jpg', name: 'Live2D 智能挂件', tag: 'AI 交互硬件', desc: '结合 Live2D 形象、本地 Agent 能力和智能硬件交互的桌面级 AI 挂件，适合陪伴、展示、教学和品牌互动。', tags: ['Live2D', 'AI 交互', '桌面助手', '创客教育'], id: 4 },
]

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

export default function HeroCarousel() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const es = new EventSource(`${API}/api/carousel/tick`)
    es.onmessage = (e) => {
      const n = parseInt(e.data, 10)
      if (!isNaN(n) && n >= 0 && n < 4) setI(n)
    }
    es.onerror = () => { es.close() }
    return () => es.close()
  }, [])

  const s = slides[i]

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
      <div>
        <p className="text-[#00AEEF] font-medium mb-3 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-orbitron)' }}>
          万物有灵 · 本地 Agent 软硬件一体化
        </p>
        <h1 className="text-2xl md:text-5xl font-black leading-tight mb-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
          {s.name}
        </h1>
        <span className="inline-block text-xs text-[#00AEEF] bg-white/10 backdrop-blur px-3 py-1 rounded-full mb-4">{s.tag}</span>
        <p className="text-sm md:text-base text-gray-300 mb-5 max-w-lg leading-relaxed">{s.desc}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {s.tags.map((t) => <span key={t} className="text-xs text-white/70 bg-white/10 backdrop-blur px-3 py-1 rounded-full">{t}</span>)}
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link href={`/products/${s.id}`} className="bg-[#00AEEF] hover:bg-cyan-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
            查看详情
          </Link>
          <Link href="/contact" className="border border-white/40 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all backdrop-blur">
            联系我们
          </Link>
        </div>
        <div className="flex gap-2 mt-6">
          {[0, 1, 2, 3].map((n) => (
            <span key={n} className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? 'w-8 bg-[#00AEEF]' : 'w-1.5 bg-white/30'}`} />
          ))}
        </div>
      </div>

      <div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-white/5 max-w-sm mx-auto md:max-w-none">
          {slides.map((slide, n) => (
            <img key={n} src={slide.src} alt={slide.name}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                n === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
