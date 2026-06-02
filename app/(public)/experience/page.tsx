import Link from 'next/link'
import type { Metadata } from 'next'
import FadeUp from '@/components/motion/FadeUp'

export const metadata: Metadata = {
  title: 'Experience — Muse & Menu Society',
  description: 'An evening with Muse & Menu Society is composed from the first detail to the last. Intimate, atmospheric, unrepeatable.',
}

const SANS  = 'var(--font-dm-sans), system-ui, sans-serif'
const SERIF = 'var(--font-cormorant), Georgia, serif'

export default function ExperiencePage() {
  return (
    <div className="pt-32 pb-28 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <div style={{ maxWidth: 520, marginBottom: 80 }}>
          <FadeUp>
            <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 18 }}>
              The Experience
            </p>
            <h1 className="font-serif font-light text-bone" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Every detail<br />
              <em>is deliberate.</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)' }}>
              An evening with Muse &amp; Menu is not dinner with production value.
              It is a composed experience — the room, the atmosphere, the company,
              the menu — each element chosen to serve a single idea.
            </p>
          </FadeUp>
        </div>

        {/* Atmospheric prose — three editorial sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Section 1: The Space */}
          <FadeUp>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr)',
                gap: 0,
                padding: '52px 0',
                borderTop: '1px solid rgba(212,175,55,0.08)',
              }}
              className="md:grid-cols-[180px_1fr] md:gap-16"
            >
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', color: 'rgba(244,239,230,0.88)', lineHeight: 1.2, fontWeight: 300 }}>
                  The setting
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)' }}>
                  The room is never assumed. It might be a private residence in late autumn
                  light, a gallery emptied for an evening, a studio with exposed wood and
                  good acoustics. The setting is chosen for what it asks of the people
                  inside it — a quality of attention you cannot name until you have felt it.
                </p>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)' }}>
                  Candlelight falls directionally. The edges of the room are allowed to
                  remain in soft shadow. A scent has been placed — one note, chosen with
                  precision — to anchor the evening in something bodily before the first
                  course arrives. Music lives exactly at the threshold of audible.
                  You are aware of it the way you are aware of weather.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Section 2: The People */}
          <FadeUp delay={0.05}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr)',
                gap: 0,
                padding: '52px 0',
                borderTop: '1px solid rgba(212,175,55,0.08)',
              }}
              className="md:grid-cols-[180px_1fr] md:gap-16"
            >
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', color: 'rgba(244,239,230,0.88)', lineHeight: 1.2, fontWeight: 300 }}>
                  The table
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)' }}>
                  The people around you are not there by coincidence. Placement is
                  deliberate. Familiar companions are seated apart; new proximities
                  are proposed. The Society's belief is that conversation becomes more
                  interesting when you cannot entirely predict it.
                </p>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)' }}>
                  Every gathering brings together a small, considered number of people —
                  curated, not collected. A table of twelve or twenty. People who were
                  found worth knowing, placed with care, and trusted to make something
                  of the evening between them.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Section 3: The Menu and Memory */}
          <FadeUp delay={0.08}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr)',
                gap: 0,
                padding: '52px 0',
                borderTop: '1px solid rgba(212,175,55,0.08)',
              }}
              className="md:grid-cols-[180px_1fr] md:gap-16"
            >
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', color: 'rgba(244,239,230,0.88)', lineHeight: 1.2, fontWeight: 300 }}>
                  The memory
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)' }}>
                  The menu is built around a muse: a season, a material, an idea.
                  The chef was given this constraint and composed something irreplaceable
                  from it. Courses arrive when the room is ready, not when the kitchen
                  has finished. You will not be asked how the food was while you are
                  still eating.
                </p>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.82)' }}>
                  The evening ends when the last conversation earns it. You will have
                  a name for it afterward — something you can hold onto, something you
                  will describe to someone else with more precision than you expect.
                  This is not a special event. It is a very particular kind of evening.
                  One that becomes a reference point.
                </p>
              </div>
            </div>
          </FadeUp>

        </div>

        {/* Closing */}
        <FadeUp delay={0.1}>
          <div
            style={{
              borderTop: '1px solid rgba(212,175,55,0.08)',
              paddingTop: 64,
              marginTop: 0,
              maxWidth: 520,
            }}
          >
            <h2
              className="font-serif font-light text-bone"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 20 }}
            >
              Nothing is accidental.<br />
              <em>Nothing is for show.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.8, color: 'rgba(169,163,154,0.75)', marginBottom: 40 }}>
              The full evening is available to members of the Society.
              Membership is by consideration only.
            </p>
            <Link href="/membership" className="btn-consideration">
              Request consideration
            </Link>
          </div>
        </FadeUp>

      </div>
    </div>
  )
}
