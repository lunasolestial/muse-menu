import Link from 'next/link'
import type { Metadata } from 'next'
import FadeUp from '@/components/motion/FadeUp'
import { FORMATS, FLAGSHIP_FORMAT } from '@/lib/content/formats'

export const metadata: Metadata = {
  title: 'Formats — Muse & Menu Society',
  description: 'The table takes different forms. Three expressions of the Society, each built for a specific kind of evening.',
}

const SANS = 'var(--font-dm-sans), system-ui, sans-serif'

export default function FormatsPage() {
  const flagship  = FLAGSHIP_FORMAT
  const adjacent  = FORMATS.filter(f => f.tier !== 'flagship')

  return (
    <div className="pt-32 pb-24">

      {/* Page header */}
      <div className="px-6 md:px-10 max-w-4xl mx-auto mb-24">
        <FadeUp>
          <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 18 }}>
            Formats
          </p>
          <h1
            className="font-serif font-light text-bone"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 28 }}
          >
            The table takes<br />
            <em>different forms.</em>
          </h1>
          <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: 'rgba(169,163,154,0.8)', maxWidth: 520 }}>
            Each format exists for a reason. The scale, the intimacy, the kind of
            evening that becomes possible — none are interchangeable.
          </p>
        </FadeUp>
      </div>

      {/* ── Flagship — ceremonial full-width treatment ─────────────────── */}
      <section className="border-y border-antique-gold/8 bg-ink mb-0">
        <div className="px-6 md:px-10 max-w-6xl mx-auto py-20">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
              <div>
                <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 12 }}>
                  {flagship.num} — Flagship
                </p>
                <h2
                  className="font-serif font-light text-bone"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 14 }}
                >
                  {flagship.name}
                </h2>
                <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.38)', fontStyle: 'italic', marginBottom: 28 }}>
                  {flagship.subline}
                </p>
                <dl style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {([
                    ['Guests',  flagship.guests],
                    ['Format',  flagship.format],
                    ['Cadence', flagship.cadence],
                    ['Access',  flagship.access],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <dt style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(127,122,115,0.55)', width: 68, flexShrink: 0 }}>{k}</dt>
                      <dd style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(169,163,154,0.8)' }}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <p
                  className="font-serif font-light text-bone"
                  style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.9rem)', lineHeight: 1.35, marginBottom: 24 }}
                >
                  One chef. One muse. One evening that belongs entirely to the idea
                  that called it into being.
                </p>
                <div style={{ width: 36, height: 1, background: 'rgba(212,175,55,0.2)', marginBottom: 24 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {flagship.description.map((p, i) => (
                    <p key={i} style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.78, color: 'rgba(169,163,154,0.8)' }}>
                      {p}
                    </p>
                  ))}
                </div>
                {flagship.notes && flagship.notes.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
                    {flagship.notes.map((note, i) => (
                      <div key={i}>
                        <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.38)', marginBottom: 6 }}>
                          {note.heading}
                        </p>
                        <p style={{ fontFamily: SANS, fontSize: 12, fontStyle: 'italic', color: 'rgba(127,122,115,0.6)', whiteSpace: 'pre-line' }}>
                          {note.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Adjacent formats ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto py-20">
        <FadeUp>
          <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 48 }}>
            Adjacent expressions
          </p>
        </FadeUp>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {adjacent.map((f, idx) => (
            <FadeUp key={f.id} delay={idx * 0.06}>
              <div
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] format-card"
                style={{ background: 'rgba(13,16,20,0.8)', border: '1px solid rgba(212,175,55,0.08)' }}
              >
                <div style={{ padding: '32px', borderBottom: '1px solid rgba(212,175,55,0.08)' }} className="md:border-b-0 md:border-r">
                  <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.22em', color: 'rgba(212,175,55,0.38)', marginBottom: 12 }}>{f.num}</p>
                  <h2 className="font-serif font-light text-bone" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', lineHeight: 1.2, marginBottom: 20 }}>
                    {f.name}
                  </h2>
                  <dl style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {([
                      ['Guests',  f.guests],
                      ['Format',  f.format],
                      ['Cadence', f.cadence],
                      ['Access',  f.access],
                    ] as [string, string][]).map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', gap: 10 }}>
                        <dt style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(127,122,115,0.55)', width: 60 }}>{k}</dt>
                        <dd style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(169,163,154,0.75)' }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.36)', fontStyle: 'italic' }}>
                    {f.character}
                  </p>
                </div>
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {f.description.map((p, i) => (
                    <p key={i} style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.78, color: 'rgba(169,163,154,0.8)' }}>{p}</p>
                  ))}
                  {f.notes && f.notes.length > 0 && (
                    <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: 16, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {f.notes.map((note, i) => (
                        <div key={i}>
                          <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.38)', marginBottom: 5 }}>
                            {note.heading}
                          </p>
                          <p style={{ fontFamily: SANS, fontSize: 12, fontStyle: 'italic', color: 'rgba(127,122,115,0.55)', whiteSpace: 'pre-line' }}>
                            {note.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="px-6 md:px-10 max-w-4xl mx-auto text-center">
        <FadeUp>
          <div style={{ width: 36, height: 1, background: 'rgba(212,175,55,0.2)', margin: '0 auto 28px' }} />
          <p className="font-serif font-light text-bone" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.7rem)', marginBottom: 28 }}>
            Access to all formats begins with<br />membership consideration.
          </p>
          <Link href="/membership" className="btn-consideration">
            Request consideration
          </Link>
        </FadeUp>
      </div>

    </div>
  )
}
