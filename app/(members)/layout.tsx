import { requireMember } from '@/lib/auth'
import Link from 'next/link'

const MEMBER_NAV = [
  { href: '/members/dashboard',    label: 'Home' },
  { href: '/members/events',       label: 'Events' },
  { href: '/members/archive',      label: 'Archive' },
  { href: '/members/room-culture', label: 'Room Culture' },
  { href: '/members/profile',      label: 'My Profile' },
  { href: '/members/support',      label: 'Support' },
]

export default async function MembersLayout({ children }: { children: React.ReactNode }) {
  const user = await requireMember() // redirects if not authenticated or not member

  return (
    <div className="min-h-screen bg-carbon">
      {/* Members nav bar */}
      <header className="border-b border-antique-gold/10 bg-ink/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="h-14 flex items-center justify-between gap-6">
            <Link href="/" className="font-serif text-base font-light italic text-bone/70 hover:text-bone transition-colors">
              Muse <span className="text-antique-gold/40">&amp;</span> Menu
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {MEMBER_NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-caption tracking-widest uppercase text-ash hover:text-bone transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-antique-gold/60" />
              <span className="text-caption text-antique-gold/60 tracking-widest uppercase">
                {user.name ?? user.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {children}
      </main>
    </div>
  )
}
