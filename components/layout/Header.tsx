'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { href: '/about',      label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/formats',    label: 'Formats' },
  { href: '/calendar',   label: 'Calendar' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/membership', label: 'Membership' },
  { href: '/partners',   label: 'Partners' },
]

export default function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-antique-gold/10 bg-carbon/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="h-16 flex items-center justify-between gap-8">

          {/* Wordmark */}
          <Link href="/" className="shrink-0 group">
            <span className="font-serif text-lg font-light italic text-bone group-hover:text-porcelain transition-colors">
              Muse <span className="text-antique-gold/60">&amp;</span> Menu
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`text-caption tracking-widest uppercase transition-colors ${
                  pathname === n.href
                    ? 'text-bone'
                    : 'text-ash hover:text-bone'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right: member/CTA */}
          <div className="flex items-center gap-4 shrink-0">
            {isAuthenticated ? (
              <Link
                href="/members/dashboard"
                className="text-caption tracking-widest uppercase text-antique-gold hover:text-antique-gold/70 transition-colors"
              >
                Members
              </Link>
            ) : (
              <Link
                href="/membership"
                className="text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-4 py-2 hover:border-antique-gold/60 transition-colors"
              >
                Request Consideration
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-ash hover:text-bone transition-colors p-1"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-antique-gold/10 bg-ink px-6 py-6 space-y-4">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="block text-caption tracking-widest uppercase text-ash hover:text-bone transition-colors"
            >
              {n.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link
              href="/membership"
              onClick={() => setMenuOpen(false)}
              className="block text-caption tracking-widest uppercase text-antique-gold mt-4"
            >
              Request Consideration →
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
