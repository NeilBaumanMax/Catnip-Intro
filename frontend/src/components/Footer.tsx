import { getSettings } from '@/lib/api'

export default async function Footer() {
  let companyName = 'Catnip Intro'
  let phone = ''
  let email = ''
  let address = ''

  try {
    const res = await getSettings()
    if (res.ok && res.data) {
      companyName = res.data.company_name || companyName
      phone = res.data.phone || ''
      email = res.data.email || ''
      address = res.data.address || ''
    }
  } catch {
    // use defaults
  }

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="font-bold text-gray-900 mb-1">{companyName}</p>
            {address && <p>地址：{address}</p>}
          </div>
          <div>
            {phone && <p>电话：{phone}</p>}
            {email && <p>邮箱：{email}</p>}
          </div>
        </div>
        <p className="mt-6 text-center text-gray-400">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
