import Link from 'next/link'
import type { Metadata } from 'next'
import FadeUp from '@/components/motion/FadeUp'

export const metadata: Metadata = {
  title: 'Experience — Muse & Menu Society',
  description: 'An evening with Muse & Menu Society is composed from the first detail to the last. Intimate, atmospheric, unrepeatable.',
}

const SANS  = 'var(--font-dm-sans), system-ui, sans-serif'
const SERIF = 'var(--font-cormorant), Georgia, serif'

const sections = [
  {
    label: 'The setting',
    bg: 'linear-gradient(180deg, rgba(16,9,26,0.60) 0%, rgba(7,8,10,0) 100%)',
    paragraphs: [
      'The room is never assumed. It might be a private residence in late autumn light, a gallery emptied for an evening, a studio with exposed wood and good acoustics. The setting is chosen for what it asks of the people inside it — a quality of attention you cannot name until you have felt it.',
      'Candlelight falls directionally. The edges of the room are allowed to remain in soft shadow. A scent has been placed — one note, chosen with precision — to anchor the evening in something bodily before the first course arrives. Music lives exactly at the threshold of audible. You are aware of it the way you are aware of weather.',
    ],
  },
  {
    label: 'The table',
    bg: 'transparent',
    paragraphs: [
      "The people around you are not there by coincidence. Placement is deliberate. Familiar companions are seated apart; new proximities are proposed. The Society’s belief is that conversation becomes more interesting when you cannot entirely predict it.",
      'Every gathering brings together a small, considered number of people — curated, not collected. A table of twelve or twenty. People who were found worth knowing, placed with care, and trusted to make something of the evening between them.',
    ],
  },
  {
    label: 'The memory',
    bg: 'linear-gradient(180deg, transparent 0%, rgba(14,7,22,0.40) 100%)',
    paragraphs: [
      'The menu is built around a muse: a season, a material, an idea. The chef was given this constraint and composed something irreplaceable from it. Courses arrive when the room is ready, not when the kitchen has finished. You will not be asked how the food was while you are still eating.',
      'The evening ends when the last conversation earns it. You will have a name for it afterward — something you can hold onto, something you will describe to someone else with more precision than you expect. This is not a special event. It is a very particular kind of evening. One that becomes a reference point.',
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="pb-28">

      {/* Page header — atmospheric gradient behind it */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(22,10,38,0.55) 0%, rgba(7,8,10,0) 100%)',
          paddingTop: 'clamp(96px, 14vh, 144px)',
          paddingBottom: 64,
          paddingLeft: 'clamp(24px, 4vw, 80px)',
          paddingRight: 'clamp(24px, 4vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <FadeUp>
            <p style={{
              fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 20,
            }}>
              Experience
            </p>
            <h1
              className="font-serif font-light text-bone"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 32 }}
            >
              Every detail<br />
              <em>is deliberate.</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)', maxWidth: 480 }}>
              An evening with Muse &amp; Menu is not dinner with production value.
              It is a composed experience — the room, the atmosphere, the company,
              the menu — each element chosen to serve a single idea.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Editorial sections */}
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 clamp(24px, 4vw, 80px)' }}>
        {sections.map((section, idx) => (
          <FadeUp key={section.label} delay={idx * 0.06}>
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr)',
                gap: 0,
                padding: 'clamp(48px, 6vh, 72px) 0',
                borderTop: `1px solid rgba(212,175,55,${idx === 0 ? '0.16' : '0.10'})`,
              }}
              className="md:grid-cols-[200px_1fr] md:gap-20"
            >
              {/* Subtle tonal bg per section */}
              {section.bg !== 'transparent' && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    background: section.bg,
                    pointerEvents: 'none', zIndex: 0,
                    marginLeft: 'clamp(-24px, -4vw, -80px)',
                    marginRight: 'clamp(-24px, -4vw, -80px)',
                  }}
                />
              )}

              {/* Section label — elevated treatment */}
              <div style={{ position: 'relative', zIndex: 1, marginBottom: 28 }}>
                <p
                  style={{
                    fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
                    fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                    color: 'rgba(244,239,230,0.72)',
                    lineHeight: 1.15, letterSpacing: '-0.01em',
                  }}
                >
                  {section.label}
                </p>
                <div style={{ width: 28, height: 1, background: 'rgba(212,175,55,0.25)', marginTop: 14 }} />
              </div>

              {/* Body copy */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 580 }}>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: SANS,
                      fontSize: i === 0 ? 16 : 15,
                      lineHeight: 1.82,
                      color: i === 0 ? 'rgba(183,177,166,0.90)' : 'rgba(169,163,154,0.78)',
                      letterSpacing: i === 0 ? '0.005em' : undefined,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Closing — richest surface, set apart */}
      <FadeUp delay={0.1}>
        <div
          style={{
            marginTop: 0,
            background: 'linear-gradient(180deg, rgba(14,7,22,0.50) 0%, rgba(10,5,18,0.55) 100%)',
            borderTop: '1px solid rgba(212,175,55,0.16)',
          }}
        >
          <div
            style={{
              maxWidth: '72rem', margin: '0 auto',
              padding: 'clamp(56px, 8vh, 96px) clamp(24px, 4vw, 80px)',
            }}
          >
            <div style={{ maxWidth: 520 }}>
              <div style={{ width: 36, height: 1, background: 'rgba(212,175,55,0.28)', marginBottom: 36 }} />
              <h2
                className="font-serif font-light text-bone"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', lineHeight: 1.18, letterSpacing: '-0.01em', marginBottom: 22 }}
              >
                Nothing is accidental.<br />
                <em>Nothing is for show.</em>
              </h2>
              <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.82, color: 'rgba(169,163,154,0.75)', marginBottom: 40 }}>
                The full evening is available to members of the Society.
                Membership is by consideration only.
              </p>
              <Link href="/membership" className="btn-consideration">
                Request consideration
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>

    </div>
  )
}
