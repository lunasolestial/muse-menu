import MuseRevealHero from '@/components/muse/MuseRevealHero'
import FadeUp from '@/components/motion/FadeUp'
import Link from 'next/link'
import { CALENDAR_TEASER } from '@/lib/content/events'
import { FLAGSHIP_FORMAT, HOMEPAGE_GLIMPSE } from '@/lib/content/formats'

const SANS = 'var(--font-dm-sans), system-ui, sans-serif'
const SERIF = 'var(--font-cormorant), Georgia, serif'

function Hairline() {
  return <div style={{ width: 36, height: 1, background: 'rgba(212,175,55,0.22)', margin: '0 auto' }} />
}

// ── Calendar ──────────────────────────────────────────────────────────────────
function CalendarTeaser() {
  const evenings = CALENDAR_TEASER

  return (
    <section
      className="py-28 px-6 md:px-10 border-t border-antique-gold/8"
      style={{ background: 'linear-gradient(180deg, #1E0C2C 0%, #14081E 50%, #0D1014 100%)' }}
    >
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 14 }}>
                The Calendar
              </p>
              {/* Explicit lineHeight avoids "Forthcoming gatherings." running together */}
              <h2 className="font-serif font-light text-bone" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                Forthcoming<br />
                <em>gatherings.</em>
              </h2>
            </div>
            <Link href="/calendar" style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(169,163,154,0.6)', transition: 'color 0.2s' }} className="hidden md:block hover:text-bone">
              Full calendar →
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {evenings.map((e, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr auto',
                  alignItems: 'center',
                  gap: '0 24px',
                  padding: '18px 24px',
                  border: '1px solid rgba(212,175,55,0.09)',
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.38)' }}>
                  {e.season}
                </span>
                <div aria-hidden="true">
                  <p className="font-serif font-light text-bone" style={{ fontSize: '1rem', lineHeight: 1.4, filter: 'blur(5px)' }}>
                    {e.label}
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(127,122,115,0.6)', marginTop: 3, filter: 'blur(4px)' }}>
                    {e.sub}
                  </p>
                </div>
                <span style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(127,122,115,0.4)', whiteSpace: 'nowrap' }}>
                  Members only
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(169,163,154,0.7)', textAlign: 'center', marginTop: 28, lineHeight: 1.6 }}>
            The full calendar is held for members.{' '}
            <Link href="/membership" style={{ color: 'rgba(212,175,55,0.55)', textDecoration: 'underline', textDecorationColor: 'rgba(212,175,55,0.2)', textUnderlineOffset: 4, transition: 'color 0.2s' }} className="hover:text-antique-gold">
              Request consideration
            </Link>
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Flagship Dinner ───────────────────────────────────────────────────────────
function FlagshipStatement() {
  const f = FLAGSHIP_FORMAT
  const specs = [
    ['Guests',  f.guests],
    ['Format',  f.format],
    ['Cadence', f.cadence],
    ['Access',  f.access],
  ]

  return (
    <section
      className="py-36 px-6 md:px-10 border-t border-antique-gold/8"
      style={{ background: 'linear-gradient(180deg, #0D1014 0%, #111318 100%)' }}
    >
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 20 }}>
            {f.name}
          </p>
          <h2
            className="font-serif font-light text-bone"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 40 }}
          >
            The Society&apos;s flagship.<br />
            <em style={{ opacity: 0.85 }}>Every detail composed.</em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {f.description.slice(0, 2).map((p, i) => (
                <p key={i} style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.75, color: 'rgba(169,163,154,0.82)' }}>
                  {p}
                </p>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {specs.map(([k, v]) => (
                <div
                  key={k}
                  style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(30,12,44,0.6)' }}
                >
                  <span style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(127,122,115,0.6)', width: 72, flexShrink: 0 }}>
                    {k}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(169,163,154,0.8)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href="/formats" style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(169,163,154,0.6)', transition: 'color 0.2s' }} className="hover:text-bone">
            All formats →
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Adjacent formats ──────────────────────────────────────────────────────────
function FormatsGlimpse() {
  const formats = HOMEPAGE_GLIMPSE

  return (
    <section
      className="py-28 px-6 md:px-10 border-t border-antique-gold/8"
      style={{ background: '#0F0E12' }}
    >
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 44 }}>
            Adjacent expressions
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 1,
              background: 'rgba(30,12,44,0.4)',
            }}
          >
            {formats.map((f) => (
              <div
                key={f.id}
                style={{ background: '#0F0E12', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.22em', color: 'rgba(30,12,44,0.9)' }}>{f.num}</span>
                  <span style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(127,122,115,0.55)' }}>{f.guests}</span>
                </div>
                <h3 className="font-serif font-light text-bone" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', lineHeight: 1.2 }}>
                  {f.name}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.65, color: 'rgba(169,163,154,0.75)' }}>
                  {f.description[0]}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/formats" style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(169,163,154,0.6)', transition: 'color 0.2s' }} className="hover:text-bone">
              Full format guide →
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Editorial quote ───────────────────────────────────────────────────────────
function EditorialStatement() {
  return (
    <section
      className="py-44 px-6 md:px-10 border-t border-antique-gold/8"
      style={{ background: 'linear-gradient(180deg, #130A1E 0%, #1E0C2C 45%, #130A1E 100%)' }}
    >
      <div className="max-w-lg mx-auto text-center">
        <FadeUp>
          <Hairline />
          <blockquote
            className="font-serif font-light text-bone"
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)', lineHeight: 1.2, letterSpacing: '-0.01em', margin: '40px 0 12px' }}
          >
            &ldquo;The room is never full<br />
            for fullness&rsquo; sake.&rdquo;
          </blockquote>
          <p className="font-serif" style={{ fontStyle: 'italic', fontSize: 13, color: 'rgba(169,163,154,0.55)', marginBottom: 40 }}>
            — on placement
          </p>
          <Hairline />
          <div style={{ marginTop: 44 }}>
            <Link href="/membership" className="btn-consideration">
              Request consideration
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Partners ──────────────────────────────────────────────────────────────────
function PartnersGlimpse() {
  return (
    <section
      className="border-t border-antique-gold/8"
      style={{ background: '#111318', padding: 'clamp(56px, 7vw, 88px) clamp(24px, 2.5vw, 40px)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <FadeUp>
          <div style={{ maxWidth: 320 }}>
            <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 14 }}>
              Partners
            </p>
            <h2 className="font-serif font-light text-bone" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.7rem)', lineHeight: 1.25 }}>
              Craft over reach.<br />
              <em>Partnership by alignment.</em>
            </h2>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              { label: 'Chefs',    href: '/partners/chefs'    },
              { label: 'Vendors',  href: '/partners/vendors'  },
              { label: 'Sponsors', href: '/partners/sponsors' },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                style={{
                  fontFamily: SANS, fontSize: 10, letterSpacing: '0.24em',
                  textTransform: 'uppercase', color: 'rgba(169,163,154,0.65)',
                  border: '1px solid rgba(30,12,44,0.7)', padding: '11px 22px',
                  transition: 'all 0.3s', display: 'inline-block',
                }}
                className="hover:border-antique-gold/35 hover:text-bone"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <MuseRevealHero />
      <CalendarTeaser />
      <FlagshipStatement />
      <FormatsGlimpse />
      <EditorialStatement />
      <PartnersGlimpse />
    </>
  )
}
