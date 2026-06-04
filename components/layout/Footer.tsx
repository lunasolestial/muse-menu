'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FOOTER_NAV } from '@/lib/content/navigation'

const CAPS   = 'var(--font-cinzel), "Trajan Pro", serif'
const SERIF  = 'var(--font-cormorant), Georgia, serif'
const SANS   = 'var(--font-dm-sans), system-ui, sans-serif'

// Atmospheric orb — midnight plum / deep aubergine / soft mulberry
function AtmosphericOrb({
  style,
  animate,
  transition,
  className,
}: {
  style: React.CSSProperties
  animate: Record<string, number[]>
  transition: Record<string, unknown>
  className?: string
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      animate={animate}
      transition={transition}
    />
  )
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(214,163,74,0.08)', background: '#0D1014' }}>

      {/* ── Atmospheric glow wrapper — tagline + nav grid ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Midnight plum orb — large, upper-left */}
        <AtmosphericOrb
          className="footer-orb-1"
          style={{
            top: '-10%', left: '-8%',
            width: 'max(260px, 62%)', height: 'max(280px, 140%)',
            background: 'radial-gradient(ellipse 58% 62% at 42% 50%, rgba(42,14,62,0.92) 0%, rgba(24,8,40,0.50) 48%, transparent 72%)',
            zIndex: 0,
          }}
          animate={{
            x: [0, 28, -18, 10, 0],
            y: [0, -18, 26, -8, 0],
            scale: [1, 1.07, 0.96, 1.04, 1],
            opacity: [0.92, 1, 0.80, 0.90, 0.92],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />

        {/* Deep aubergine orb — center-right */}
        <AtmosphericOrb
          className="footer-orb-2"
          style={{
            top: '5%', right: '-8%',
            width: 'max(220px, 52%)', height: 'max(240px, 100%)',
            background: 'radial-gradient(ellipse 52% 58% at 58% 45%, rgba(74,12,96,0.80) 0%, rgba(48,8,66,0.38) 48%, transparent 70%)',
            zIndex: 0,
          }}
          animate={{
            x: [0, -20, 14, -6, 0],
            y: [0, 22, -14, 18, 0],
            scale: [1, 0.93, 1.09, 0.97, 1],
            opacity: [0.80, 0.92, 0.68, 0.84, 0.80],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: 5,
          }}
        />

        {/* Soft mulberry orb — lower-center */}
        <AtmosphericOrb
          className="footer-orb-3"
          style={{
            bottom: '-5%', left: '30%',
            width: 'max(200px, 42%)', height: 'max(200px, 72%)',
            background: 'radial-gradient(ellipse 50% 54% at 50% 58%, rgba(110,34,88,0.72) 0%, rgba(76,20,60,0.34) 48%, transparent 70%)',
            zIndex: 0,
          }}
          animate={{
            x: [0, 16, -24, 8, 0],
            y: [0, -12, 10, -20, 0],
            scale: [1, 1.05, 0.94, 1.08, 1],
            opacity: [0.72, 0.58, 0.84, 0.64, 0.72],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: 10,
          }}
        />

        {/* Brand tagline — full width, prominent */}
        <div style={{
          position: 'relative', zIndex: 1,
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
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr 1fr',
          gap: 'clamp(32px, 5vw, 72px)',
          padding: 'clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px)',
        }}>

          {/* Wordmark */}
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

      </div>{/* end atmospheric wrapper */}

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
