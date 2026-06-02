'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MAIN_NAV } from '@/lib/content/navigation'

const SANS  = 'var(--font-dm-sans), system-ui, sans-serif'
const SERIF = 'var(--font-cormorant), Georgia, serif'
const GOLD  = 'rgba(214,163,74,0.6)'
const GOLD_DIM = 'rgba(214,163,74,0.22)'

interface Props {
  isOpen:          boolean
  onClose:         () => void
  isAuthenticated: boolean
}

export default function NavOverlay({ isOpen, onClose, isAuthenticated }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 55,
            background: 'linear-gradient(160deg, #07080A 0%, #1E0C2C 55%, #07080A 100%)',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          {/* Close */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px 28px' }}>
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label="Close navigation"
              style={{
                background: 'none', border: '1px solid rgba(214,163,74,0.22)',
                color: 'rgba(214,163,74,0.7)',
                padding: '8px 18px', cursor: 'pointer',
                fontFamily: SANS, fontSize: 9, letterSpacing: '0.28em',
                textTransform: 'uppercase', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(214,163,74,0.55)'; e.currentTarget.style.color = 'rgba(214,163,74,0.95)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(214,163,74,0.22)'; e.currentTarget.style.color = 'rgba(214,163,74,0.7)' }}
            >
              Close
            </motion.button>
          </div>

          {/* Nav links */}
          <nav
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(32px, 6vh, 72px) clamp(32px, 8vw, 120px)',
              gap: 0,
            }}
          >
            {MAIN_NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.5, delay: i * 0.055 + 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  borderBottom: '1px solid rgba(214,163,74,0.08)',
                  padding: 'clamp(14px, 2.2vh, 22px) 0',
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  style={{ textDecoration: 'none', display: 'block', outline: 'none' }}
                  className="group"
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24 }}>
                    <span
                      style={{
                        fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
                        fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)',
                        color: 'rgba(244,239,230,0.88)',
                        lineHeight: 1.05, letterSpacing: '-0.015em',
                        transition: 'color 0.25s',
                      }}
                      className="group-hover:text-porcelain"
                    >
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span
                        style={{
                          fontFamily: SANS, fontSize: 10,
                          letterSpacing: '0.18em', textTransform: 'uppercase',
                          color: 'rgba(127,122,115,0.45)',
                          whiteSpace: 'nowrap', flexShrink: 0,
                          paddingBottom: 6,
                          transition: 'color 0.25s',
                        }}
                        className="hidden sm:block group-hover:text-ash"
                      >
                        {item.sublabel}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
            style={{
              display: 'flex', flexDirection: 'column', gap: 20,
              padding: 'clamp(24px, 4vh, 44px) clamp(32px, 8vw, 120px)',
              borderTop: '1px solid rgba(214,163,74,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {isAuthenticated ? (
                  <Link
                    href="/members/dashboard"
                    onClick={onClose}
                    style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', transition: 'color 0.2s' }}
                  >
                    Members dashboard →
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/membership"
                      onClick={onClose}
                      style={{
                        fontFamily: SANS, fontSize: 10, letterSpacing: '0.24em',
                        textTransform: 'uppercase', color: 'rgba(244,239,230,0.88)',
                        border: '1px solid rgba(214,163,74,0.28)', padding: '12px 32px',
                        display: 'inline-block', textDecoration: 'none', transition: 'all 0.25s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214,163,74,0.55)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214,163,74,0.28)' }}
                    >
                      Request consideration
                    </Link>
                    <Link
                      href="/login"
                      onClick={onClose}
                      style={{
                        fontFamily: SANS, fontSize: 10, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: GOLD_DIM,
                        textDecoration: 'none', transition: 'color 0.2s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = GOLD_DIM }}
                    >
                      Already a member? Sign in →
                    </Link>
                  </>
                )}
              </div>
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: 'rgba(127,122,115,0.4)' }}>
                Charlotte, NC
              </p>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
