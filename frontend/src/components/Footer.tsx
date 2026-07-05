import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Catnipent</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              科霓朋特科技 — 让 AI 从云端工具，变成可本地运行的智能员工与设备大脑。
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">产品中心</Link></li>
              <li><Link href="/cases" className="hover:text-white transition-colors">解决方案</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">关于我们</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">联系方式</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 13850240159</li>
              <li>📍 郑州大学国家科技园</li>
              <li>🌐 www.catnipent.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} 科霓朋特科技有限公司. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
