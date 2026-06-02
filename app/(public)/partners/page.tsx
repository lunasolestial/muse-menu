import Link from 'next/link'
import type { Metadata } from 'next'
import FadeUp from '@/components/motion/FadeUp'

export const metadata: Metadata = { title: 'Partners — Muse & Menu Society' }

export default function PartnersPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">

        <div className="max-w-xl mb-24">
          <FadeUp>
            <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">Partners</p>
            <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
              Craft over reach.<br />
              <em>Partnership by alignment.</em>
            </h1>
            <p className="text-body text-ash leading-relaxed">
              We work with a small number of chefs, makers, and brands whose work
              belongs at this table. Every partnership is editorial — present in
              the room because it earns its place, not because it paid for inventory.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-antique-gold/8 mb-24">
            {[
              {
                title: 'Chefs',
                body: 'We work with chefs who lead with a point of view. Partnership is built around a specific muse and format — a particular occasion, not a general arrangement.',
                href: '/partners/chefs',
                cta: 'Submit credentials',
              },
              {
                title: 'Vendors',
                body: 'Florals, photography, ceramics, music, scent. The invisible elements that make a room. We look for people who do one thing with uncommon care.',
                href: '/partners/vendors',
                cta: 'Submit credentials',
              },
              {
                title: 'Sponsors',
                body: 'Brand partnerships built on alignment. Present in the room because they belong — not as sponsors in the conventional sense, but as considered collaborators.',
                href: '/partners/sponsors',
                cta: 'Request partnership outline',
              },
            ].map((p) => (
              <div key={p.title} className="bg-carbon p-9 space-y-5 flex flex-col">
                <h2 className="font-serif text-title text-bone font-light">{p.title}</h2>
                <p className="text-body-sm text-ash leading-relaxed flex-1">{p.body}</p>
                <Link
                  href={p.href}
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,55,0.55)',
                    transition: 'color 0.25s',
                  }}
                  className="hover:text-antique-gold"
                >
                  {p.cta} →
                </Link>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="border border-antique-gold/8 p-10 max-w-2xl">
            <p className="font-serif text-title text-bone font-light mb-5">
              What partnership looks like
            </p>
            <div className="space-y-4 text-body-sm text-ash leading-relaxed">
              <p>
                Partners are introduced to members the way a muse is — with context,
                without interruption. There are no logo placements. No banner inventory.
              </p>
              <p>
                A partner is present because it belongs in the room. That is the only
                criterion that matters.
              </p>
            </div>
          </div>
        </FadeUp>

      </div>
    </div>
  )
}
