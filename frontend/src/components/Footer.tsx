import Link from 'next/link'

const products = [
  { name: '万物有灵 AI Agent 智能板卡', href: '/products' },
  { name: '龙虾派端侧 AI 控制主板', href: '/products' },
  { name: 'OPC 智能员工盒子', href: '/products' },
  { name: 'Live2D 智能挂件', href: '/products' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Catnipent</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              让 AI 从云端工具，变成可本地运行的智能员工与设备大脑。
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">产品</h3>
            <ul className="space-y-2 text-sm">
              {products.map((p) => (
                <li key={p.name}><Link href={p.href} className="text-gray-400 hover:text-white transition-colors">{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">联系方式</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 13850240159</li>
              <li>📍 郑州大学国家科技园</li>
              <li>✉️ contact@catnipent.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} 科霓朋特科技有限公司. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
