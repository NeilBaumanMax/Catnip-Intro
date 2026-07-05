'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const slides = [
  { image: '/images/products/wanwu-agent-board.png', name: '万物有灵 AI Agent 智能板卡', tag: '本地 Agent 智能硬件', desc: '面向本地 Agent 运行、知识库调用、工具执行和硬件控制的智能算力板卡，将自然语言指令转化为本地可执行任务。', tags: ['本地部署', 'Agent Runtime', '硬件控制', '私有化运行'], productId: 1 },
  { image: '/images/products/lobsterpi-edge-ai-board.png', name: '龙虾派端侧 AI 控制主板', tag: '端侧 AI 控制主板', desc: '面向端侧大模型部署、设备控制和边缘推理的 AI 控制主板，适合智能硬件、工业控制和机器人场景。', tags: ['端侧 AI', '边缘推理', '设备控制', '工业接口'], productId: 2 },
  { image: '/images/products/opc-ai-employee-box.png', name: 'OPC 智能员工盒子', tag: '智能办公与私有化部署', desc: '面向企业、学校和园区的本地智能员工终端，支持知识库问答、文档处理、流程自动化和私有化部署。', tags: ['智能办公', '本地知识库', '私有化部署', '文档处理'], productId: 3 },
  { image: '/images/products/live2d-smart-accessory.png', name: 'Live2D 智能挂件', tag: 'AI 交互硬件', desc: '结合 Live2D 形象、本地 Agent 能力和智能硬件交互的桌面级 AI 挂件，适合陪伴、展示、教学和品牌互动。', tags: ['Live2D', 'AI 交互', '桌面助手', '创客教育'], productId: 4 },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const id = window.setInterval(next, 4000)
    return () => window.clearInterval(id)
  }, [next])

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
      {/* Left text */}
      <div>
        <p className="text-[#00AEEF] font-medium mb-3 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-orbitron)' }}>
          万物有灵 · 本地 Agent 软硬件一体化
        </p>

        {slides.map((s, i) => (
          <div
            key={i}
            className={`transition-all duration-500 ease-in-out ${
              i === current ? 'opacity-100 max-h-[500px] visible' : 'opacity-0 max-h-0 invisible overflow-hidden'
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
              {s.name}
            </h1>
            <span className="inline-block text-xs text-[#00AEEF] bg-white/10 backdrop-blur px-3 py-1 rounded-full mb-4">{s.tag}</span>
            <p className="text-base text-gray-300 mb-5 max-w-lg leading-relaxed">{s.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {s.tags.map((t) => <span key={t} className="text-xs text-white/70 bg-white/10 backdrop-blur px-3 py-1 rounded-full">{t}</span>)}
            </div>
            <Link href={`/products/${s.productId}`} className="inline-block bg-[#00AEEF] hover:bg-cyan-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 mr-3">
              查看详情
            </Link>
            <Link href="/contact" className="inline-block border border-white/40 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur">
              联系我们
            </Link>
          </div>
        ))}

        {/* Dots */}
        <div className="flex gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? 'w-8 bg-[#00AEEF]' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right image carousel */}
      <div className="hidden md:block relative">
        <div className="relative w-full aspect-[4/3]">
          {slides.map((s, i) => (
            <img
              key={i}
              src={s.image}
              alt={s.name}
              className={`absolute inset-0 w-full h-full object-contain rounded-2xl transition-all duration-700 ease-in-out ${
                i === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
              }`}
            />
          ))}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#00AEEF]/20 to-[#0F3D7A]/20 rounded-3xl blur-xl -z-10" />
        </div>
      </div>
    </div>
  )
}
