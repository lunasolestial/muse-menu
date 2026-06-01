import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Muse & Menu Society',
  description: 'A private supper society convened around intentional hospitality.',
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">

      {/* Hero statement */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto mb-24">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-6">About</p>
        <h1 className="font-serif text-display text-bone font-light leading-none mb-10">
          Where meals<br />
          <em>meet meaning.</em>
        </h1>
        <div className="max-w-xl space-y-5 text-body text-ash leading-relaxed">
          <p>
            {/* [TODO: refine with internal Muse & Menu copy] */}
            Muse & Menu Society is not a restaurant. It is not an event series.
            It is a privately convened supper society — a recurring gathering for a
            curated membership, held in intimate spaces where the table itself is the work.
          </p>
          <p>
            Each evening is composed: the lighting, the music, the scent of the room,
            the pacing of the meal. Nothing is accidental. Nothing is transactional.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-antique-gold/10 bg-ink py-20 px-6 md:px-10 mb-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-12">How we gather</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Curated room,\nnot full room.',
                body: 'A seat is never simply available. Every guest is considered. The table is composed for conversation, for contrast, for care.',
              },
              {
                title: 'Cinematic\natmosphere.',
                body: 'Lighting, music, and scent are chosen with the same intention as the menu. The room is part of the experience — never incidental.',
              },
              {
                title: 'Warm\ndiscretion.',
                body: 'Luxury without stiffness. We are not formal. We are unhurried. Members are recognized, not processed.',
              },
            ].map((p) => (
              <div key={p.title} className="space-y-4">
                <h3 className="font-serif text-title text-bone font-light whitespace-pre-line">{p.title}</h3>
                <div className="w-8 h-px bg-antique-gold/30" />
                <p className="text-body-sm text-ash leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The muse */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">The Muse</p>
            <h2 className="font-serif text-headline text-bone font-light mb-6">
              Muse-led menus.<br />
              <em>Member-led moments.</em>
            </h2>
            <div className="space-y-4 text-body-sm text-ash leading-relaxed">
              <p>
                {/* [TODO: refine with internal Muse & Menu copy] */}
                Each gathering is anchored by a muse — a concept, a season, a material,
                a feeling — that gives the chef a constraint and the guest an entry point.
              </p>
              <p>
                The muse is a frame, not a gimmick. It shapes the menu without
                overwhelming it. It gives the evening a reason to remember itself.
              </p>
            </div>
          </div>
          {/* Decorative element — replace with actual image */}
          <div className="aspect-[3/4] border border-antique-gold/15 bg-ink flex items-center justify-center">
            <span className="font-serif text-sm italic text-antique-gold/30">
              {/* [TODO: muse illustration placeholder] */}
              Image forthcoming
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto text-center">
        <div className="w-12 h-px bg-antique-gold/30 mx-auto mb-8" />
        <p className="font-serif text-title text-bone font-light mb-6">
          Priority consideration is offered<br />by invitation and application.
        </p>
        <Link
          href="/membership"
          className="inline-flex items-center gap-3 text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-10 py-4 hover:border-antique-gold/60 hover:text-porcelain transition-all"
        >
          Request consideration
        </Link>
      </section>

    </div>
  )
}
