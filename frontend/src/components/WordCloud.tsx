'use client'

import { useEffect, useRef } from 'react'

const words = [
  '学校资料管理 Agent', '企业本地知识库', 'OPC 智能员工盒子',
  '端侧 AI 控制主板', '智能硬件定制开发', '工业设备智能控制',
  'Agent Runtime', '私有化部署', '本地 Agent 智能板卡',
  '文档处理与流程自动化', '软硬件一体化', '端侧大模型部署',
  '创客教育', '机器人控制', '智能办公',
]

const palette = ['#00AEEF', '#1A56DB', '#60A5FA', '#38BDF8', '#93C5FD', '#0F3D7A', '#818CF8', '#7DD3FC']
const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl']

export default function WordCloud() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const spans = container.querySelectorAll<HTMLElement>('.wc-word')
    const configs: { x: number; y: number; s: number; c: number }[] = []

    // Initialize random configs
    spans.forEach(() => {
      configs.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 16,
        s: 0.9 + Math.random() * 0.3,
        c: Math.floor(Math.random() * palette.length),
      })
    })

    const tick = () => {
      spans.forEach((el, i) => {
        configs[i].x += (Math.random() - 0.5) * 6
        configs[i].y += (Math.random() - 0.5) * 5
        configs[i].x = Math.max(-24, Math.min(24, configs[i].x))
        configs[i].y = Math.max(-14, Math.min(14, configs[i].y))
        configs[i].s = 0.85 + Math.random() * 0.35
        configs[i].c = (configs[i].c + (Math.random() > 0.7 ? 1 : 0)) % palette.length

        el.style.transform = `translate(${configs[i].x}px, ${configs[i].y}px) scale(${configs[i].s})`
        el.style.color = palette[configs[i].c]
      })
    }

    // Run every 2 seconds for smooth drift
    const timer = setInterval(tick, 2000)
    tick() // Initial tick
    return () => clearInterval(timer)
  }, [])

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center items-center gap-2 md:gap-3 max-w-3xl mx-auto py-6">
      {words.map((w, i) => (
        <span
          key={w}
          className={`wc-word ${sizes[i % sizes.length]} font-bold px-4 py-2 rounded-full cursor-default
            bg-white/10 backdrop-blur border border-white/20 transition-all duration-[2000ms] ease-in-out`}
          style={{ color: palette[i % palette.length] }}
        >
          {w}
        </span>
      ))}
    </div>
  )
}
