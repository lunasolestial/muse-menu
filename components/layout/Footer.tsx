'use client'
import Link from 'next/link'
import { FOOTER_NAV } from '@/lib/content/navigation'

const CAPS   = 'var(--font-cinzel), "Trajan Pro", serif'
const SERIF  = 'var(--font-cormorant), Georgia, serif'
const SANS   = 'var(--font-dm-sans), system-ui, sans-serif'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(214,163,74,0.08)', background: '#0D1014' }}>

      {/* Brand tagline — full width, prominent */}
      <div style={{
        padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)',
        borderBottom: '1px solid rgba(214,163,74,0.08)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.6rem, 4vw, 3.6rem)', lineHeight: 1.25,
          letterSpacing: '-0.01em', color: 'rgba(244,239,230,0.82)',
          marginBottom: 'clamp(12px, 1.8vw, 22px)',
        }}>
          Muse-led menus.
        </p>
        <p style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.6rem, 4vw, 3.6rem)', lineHeight: 1.25,
          letterSpacing: '-0.01em', color: 'rgba(214,163,74,0.55)',
        }}>
          Member-led moments.
        </p>
      </div>

      {/* Nav grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr 1fr',
        gap: 'clamp(32px, 5vw, 72px)',
        padding: 'clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px)',
      }}>

        {/* Wordmark — Pinyon Script, same as header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', opacity: 0.84, transition: 'opacity 0.2s' }}
            className="logo-luster hover:opacity-100">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.22em', lineHeight: 1, marginBottom: 9 }}>
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.65rem, 2.5vw, 2.3rem)', color: 'rgba(214,163,74,0.90)', letterSpacing: '0.025em' }}>Muse</span>
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.9rem, 1.3vw, 1.15rem)', color: 'rgba(214,163,74,0.38)', alignSelf: 'center', letterSpacing: '0.06em' }}>&amp;</span>
              <span style={{ fontFamily: CAPS, fontWeight: 400, fontSize: 'clamp(1.15rem, 1.65vw, 1.6rem)', color: 'rgba(214,163,74,0.90)', letterSpacing: '0.26em', textTransform: 'uppercase' }}>Menu</span>
            </div>
            <div style={{ fontFamily: CAPS, fontSize: 8, letterSpacing: '0.44em', textTransform: 'uppercase', color: 'rgba(214,163,74,0.28)', paddingLeft: '0.08em' }}>
              Society
            </div>
          </Link>
          <p style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(127,122,115,0.5)', letterSpacing: '0.04em' }}>
            Charlotte, NC
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p style={{ fontFamily: CAPS, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(214,163,74,0.32)', marginBottom: 18 }}>
            Navigate
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {FOOTER_NAV.navigate.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: CAPS, fontSize: 9, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(169,163,154,0.55)',
                display: 'block', textDecoration: 'none', transition: 'color 0.2s',
              }} className="hover:text-bone">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Society */}
        <div>
          <p style={{ fontFamily: CAPS, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(214,163,74,0.32)', marginBottom: 18 }}>
            Society
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {FOOTER_NAV.society.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: CAPS, fontSize: 9, letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: label === 'Request consideration' ? 'rgba(214,163,74,0.58)' : 'rgba(169,163,154,0.55)',
                display: 'block', textDecoration: 'none', transition: 'color 0.2s',
              }} className="hover:text-bone">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
        padding: 'clamp(16px, 2vw, 24px) clamp(24px, 6vw, 80px)',
        borderTop: '1px solid rgba(214,163,74,0.08)',
      }}>
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(127,122,115,0.38)' }}>
          © {new Date().getFullYear()} Muse &amp; Menu Society
        </p>
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 12, color: 'rgba(214,163,74,0.24)' }}>
          A private supper society. Charlotte, NC.
        </p>
      </div>

    </footer>
  )
}
