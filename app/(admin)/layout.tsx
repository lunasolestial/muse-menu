import { requireAdmin } from '@/lib/auth'
import Link from 'next/link'

const ADMIN_NAV = [
  { href: '/admin',           label: 'Overview' },
  { href: '/admin/events',    label: 'Events' },
  { href: '/admin/members',   label: 'Members' },
  { href: '/admin/archive',   label: 'Archive' },
  { href: '/admin/partners',  label: 'Partners' },
  { href: '/admin/sponsors',  label: 'Sponsors' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin() // redirects if not admin

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-antique-gold/10 bg-carbon flex flex-col">
        <div className="px-5 py-6 border-b border-antique-gold/10">
          <p className="font-serif text-sm italic text-antique-gold/70">Muse &amp; Menu</p>
          <p className="text-caption text-fog tracking-widest uppercase mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {ADMIN_NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block px-3 py-2 text-caption tracking-widest uppercase text-ash hover:text-bone hover:bg-white/3 transition-colors rounded-sm"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-antique-gold/10">
          <Link href="/" className="text-caption text-fog hover:text-ash transition-colors tracking-widest uppercase">
            ← Public site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-10 overflow-auto">
        {children}
      </main>
    </div>
  )
}
