import MuseRevealHero from '@/components/muse/MuseRevealHero'
import Link from 'next/link'

// ── Blurred calendar teaser — public view ─────────────────────────────────
function BlurredCalendarTeaser() {
  const events = [
    { date: 'Jun', theme: 'A Midsummer Composition' },
    { date: 'Jul', theme: 'The Salt Chapter' },
    { date: 'Aug', theme: 'Nocturne & Harvest' },
  ]

  return (
    <section className="py-24 px-6 md:px-10 bg-ink">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-3">The Calendar</p>
            <h2 className="font-serif text-headline text-bone font-light">
              Forthcoming Gatherings
            </h2>
          </div>
          <Link
            href="/calendar"
            className="text-caption tracking-widest uppercase text-ash hover:text-bone transition-colors hidden md:block"
          >
            View calendar →
          </Link>
        </div>

        <div className="space-y-3">
          {events.map((e, i) => (
            <div
              key={i}
              className="relative border border-antique-gold/10 p-5 flex items-center gap-5 overflow-hidden"
            >
              {/* Blurred theme for non-members */}
              <span className="text-caption tracking-widest text-antique-gold/40 w-8 shrink-0">{e.date}</span>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-body text-bone font-light select-none" style={{ filter: 'blur(5px)' }}>
                  {e.theme}
                </p>
              </div>
              <span className="text-caption text-fog text-right shrink-0">Members only</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-body-sm text-ash text-center">
          Members receive the full calendar.{' '}
          <Link href="/membership" className="text-antique-gold/70 hover:text-antique-gold transition-colors underline underline-offset-4 decoration-antique-gold/20">
            Request consideration
          </Link>
        </p>
      </div>
    </section>
  )
}

// ── Formats glimpse ────────────────────────────────────────────────────────
function FormatsGlimpse() {
  const formats = [
    {
      name: 'The Salon Table',
      descriptor: 'Intimate. Eight seats. Singular focus.',
      note: 'A single chef. A single theme. A single evening.',
    },
    {
      name: 'The Muse Dinner',
      descriptor: 'Curated. Sixteen seats. Composed.',
      note: 'Full table. Full menu. The signature format.',
    },
    {
      name: 'The Society Evening',
      descriptor: 'Rare. Invitation-forward.',
      note: 'Reserved for moments of particular significance.',
    },
  ]

  return (
    <section className="py-24 px-6 md:px-10 bg-carbon">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-3">Formats</p>
          <h2 className="font-serif text-headline text-bone font-light max-w-lg">
            The table takes different forms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-antique-gold/10">
          {formats.map((f) => (
            <div key={f.name} className="bg-carbon p-8 space-y-4">
              <p className="text-caption tracking-widest uppercase text-antique-gold/50">{f.descriptor}</p>
              <h3 className="font-serif text-title text-bone font-light">{f.name}</h3>
              <p className="text-body-sm text-ash leading-relaxed">{f.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/formats"
            className="text-caption tracking-widest uppercase text-ash hover:text-bone transition-colors"
          >
            Explore all formats →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Editorial statement ────────────────────────────────────────────────────
function EditorialStatement() {
  return (
    <section className="py-32 px-6 md:px-10 bg-midnight-plum/20 border-y border-antique-gold/10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="w-12 h-px bg-antique-gold/30 mx-auto" />
        <p className="font-serif text-headline text-bone font-light leading-snug">
          {/* [TODO: refine with internal Muse & Menu copy] */}
          "The room is never full for fullness' sake.
          Each guest is considered. Each detail is placed."
        </p>
        <div className="w-12 h-px bg-antique-gold/30 mx-auto" />
        <Link
          href="/membership"
          className="inline-flex items-center gap-3 text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-10 py-4 hover:border-antique-gold/60 hover:text-porcelain transition-all"
        >
          Request consideration
        </Link>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <MuseRevealHero />
      <BlurredCalendarTeaser />
      <FormatsGlimpse />
      <EditorialStatement />
    </>
  )
}
