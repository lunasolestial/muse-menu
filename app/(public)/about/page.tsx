import Link from 'next/link'
import type { Metadata } from 'next'
import FadeUp from '@/components/motion/FadeUp'

export const metadata: Metadata = {
  title: 'About — Muse & Menu Society',
  description: 'A privately convened supper society. Where meals meet meaning.',
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">

      {/* Hero statement */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto mb-28">
        <FadeUp>
          <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-6">About</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-10">
            Where meals<br />
            <em>meet meaning.</em>
          </h1>
          <div className="max-w-xl space-y-5 text-body text-ash leading-relaxed">
            <p>
              Muse &amp; Menu is a privately convened supper society. We gather a small,
              considered number of people around a table shaped by a single idea.
              The room matters. The pacing matters. The placement of guests matters.
              Nothing arrives without intention.
            </p>
            <p>
              Each gathering is composed — the room, the light, the menu, the company.
              Not assembled; composed. There is a difference.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Principles */}
      <section className="border-y border-antique-gold/8 bg-ink py-22 px-6 md:px-10 mb-28">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-14">
              How we gather
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {[
              {
                title: 'A room composed,\nnot filled.',
                body: 'Every placement is considered. The guest next to you is not coincidence. Conversation, contrast, and care are the criteria — not availability.',
              },
              {
                title: 'Cinematic\natmosphere.',
                body: 'Lighting, music, and scent are given the same care as the menu. The room sets the register. Everything else follows from there.',
              },
              {
                title: 'Warm\ndiscretion.',
                body: 'The standard is high because the care behind it is genuine. Members are not processed. They are recognized, remembered, and looked after.',
              },
            ].map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.08}>
                <div className="space-y-4">
                  <h3 className="font-serif text-title text-bone font-light whitespace-pre-line leading-snug">
                    {p.title}
                  </h3>
                  <div className="w-7 h-px bg-antique-gold/22" />
                  <p className="text-body-sm text-ash leading-relaxed">{p.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* The muse */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto mb-28">
        <FadeUp>
          <div className="max-w-2xl">
            <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">The Muse</p>
            <h2 className="font-serif text-headline text-bone font-light mb-7 leading-none">
              A frame,<br />
              <em>not a gimmick.</em>
            </h2>
            <div className="space-y-4 text-body-sm text-ash leading-relaxed">
              <p>
                Each gathering is anchored by a muse — a season, a material, a feeling,
                an idea. It gives the chef a constraint. It gives the guest an entry
                point. It makes the evening possible to remember.
              </p>
              <p>
                The muse shapes the menu without overwhelming it. It gives the
                evening its reason — a thread that runs from the room through
                every course and out into the conversation.
              </p>
              <p className="text-fog italic font-serif text-sm">
                Noire Night. Garden at Dusk. Gilded Harvest.
                Afterlight Atelier. Velvet + Vinyl.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Membership in Charlotte */}
      <section className="border-t border-antique-gold/8 bg-ink py-20 px-6 md:px-10 mb-28">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">
                  Charlotte, NC
                </p>
                <h2 className="font-serif text-headline text-bone font-light leading-none mb-6">
                  Rooted in one city.<br />
                  <em>Privately convened.</em>
                </h2>
              </div>
              <div className="space-y-4 text-body-sm text-ash leading-relaxed">
                <p>
                  Muse &amp; Menu Society is not a touring series or a ticketed concept.
                  It is a standing institution — rooted in Charlotte, built around a
                  community that returns.
                </p>
                <p>
                  The Society grows by invitation and consideration. There are no
                  open registrations. Every new member is known to someone already
                  at the table.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto text-center">
        <FadeUp>
          <div className="w-8 h-px bg-antique-gold/22 mx-auto mb-8" />
          <p className="font-serif text-title text-bone font-light mb-7">
            Membership is by consideration.<br />Applications are reviewed personally.
          </p>
          <Link
            href="/membership"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.88)',
              border: '1px solid rgba(212,175,55,0.26)',
              padding: '13px 34px',
              display: 'inline-block',
              transition: 'all 0.3s',
            }}
            className="hover:border-antique-gold/55 hover:text-porcelain"
          >
            Request consideration
          </Link>
        </FadeUp>
      </section>

    </div>
  )
}
