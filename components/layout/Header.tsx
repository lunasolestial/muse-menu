'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import NavOverlay from '@/components/layout/NavOverlay'
import { MAIN_NAV } from '@/lib/content/navigation'

const CAPS   = 'var(--font-cinzel), "Trajan Pro", serif'
const SERIF  = 'var(--font-cormorant), Georgia, serif'
const SANS   = 'var(--font-dm-sans), system-ui, sans-serif'
const GOLD   = 'rgba(214,163,74,0.92)'

export default function Header({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const pathname    = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        height: 'clamp(52px, 6vh, 72px)',
        background: 'rgba(7,8,10,0.80)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(214,163,74,0.08)',
      }}>

        {/* Wordmark */}
        <Link
          href="/"
          className="logo-luster"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: '0.22em', lineHeight: 1 }}
        >
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.5rem, 2.15vw, 2rem)', color: GOLD, letterSpacing: '0.025em' }}>Muse</span>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)', color: 'rgba(214,163,74,0.45)', alignSelf: 'center', letterSpacing: '0.06em' }}>&amp;</span>
          <span style={{ fontFamily: CAPS, fontWeight: 400, fontSize: 'clamp(1.05rem, 1.5vw, 1.4rem)', color: GOLD, letterSpacing: '0.26em', textTransform: 'uppercase' }}>Menu</span>
        </Link>

        {/* Desktop nav — Cinzel, all 7 routes */}
        <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: 'clamp(18px, 2.5vw, 40px)' }}>
          {MAIN_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: CAPS,
                fontSize: 9,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: pathname === href ? 'rgba(244,239,230,0.95)' : 'rgba(169,163,154,0.62)',
                textDecoration: 'none',
                transition: 'color 0.22s, border-color 0.22s',
                borderBottom: pathname === href ? '1px solid rgba(214,163,74,0.55)' : '1px solid transparent',
                paddingBottom: 3,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(244,239,230,0.92)' }}
              onMouseLeave={e => { if (pathname !== href) (e.currentTarget as HTMLElement).style.color = 'rgba(169,163,154,0.62)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          {isAuthenticated ? (
            <Link href="/members/dashboard" style={{
              fontFamily: CAPS, fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(214,163,74,0.72)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}>
              Members
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  fontFamily: CAPS, fontSize: 9, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(214,163,74,0.52)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                className="hidden md:inline-block"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(214,163,74,0.9)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(214,163,74,0.52)' }}
              >
                Sign in
              </Link>
              <Link href="/membership" style={{
                fontFamily: CAPS, fontSize: 9, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(244,239,230,0.88)',
                border: '1px solid rgba(214,163,74,0.28)', padding: '9px 22px',
                textDecoration: 'none', transition: 'border-color 0.25s, color 0.25s',
                display: 'inline-block',
              }}
              className="hidden md:inline-block hover:border-antique-gold/55 hover:text-porcelain">
                Request consideration
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden"
            aria-label="Open navigation"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
              <line x1="0" y1="1"  x2="22" y2="1"  stroke="rgba(169,163,154,0.75)" strokeWidth="1.2" strokeLinecap="square"/>
              <line x1="4" y1="7"  x2="22" y2="7"  stroke="rgba(169,163,154,0.75)" strokeWidth="1.2" strokeLinecap="square"/>
              <line x1="0" y1="13" x2="22" y2="13" stroke="rgba(169,163,154,0.75)" strokeWidth="1.2" strokeLinecap="square"/>
            </svg>
          </button>
        </div>
      </header>

      <NavOverlay isOpen={open} onClose={() => setOpen(false)} isAuthenticated={isAuthenticated} />
    </>
  )
}
