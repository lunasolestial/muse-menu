import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Partners — Muse & Menu Society' }

export default function PartnersPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">

        <div className="max-w-xl mb-20">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Partners</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
            Serious work.<br />
            <em>Selective collaboration.</em>
          </h1>
          <p className="text-body text-ash leading-relaxed">
            {/* [TODO: refine with internal Muse & Menu copy] */}
            Muse & Menu Society partners with chefs, artisans, florists, photographers,
            and brands who bring craft and intentionality to what they do.
            Partnership is not transactional — it is editorial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-antique-gold/10 mb-20">
          {[
            {
              title: 'Chefs',
              body: 'We work with chefs who lead with a point of view — not a brand deal. Each partnership is built around a specific muse and format.',
              href: '/partners/chefs',
              cta: 'Submit credentials',
            },
            {
              title: 'Vendors',
              body: 'Florals, photography, ceramics, music, and the invisible elements that make a room. We are always looking for people who do one thing exceptionally.',
              href: '/partners/vendors',
              cta: 'Submit credentials',
            },
            {
              title: 'Sponsors',
              body: 'Brand partnerships shaped around the Society ethos — present and considered, never interruptive. Alignment matters more than reach.',
              href: '/partners/sponsors',
              cta: 'Request partnership outline',
            },
          ].map((p) => (
            <div key={p.title} className="bg-carbon p-8 space-y-5 flex flex-col">
              <h2 className="font-serif text-title text-bone font-light">{p.title}</h2>
              <p className="text-body-sm text-ash leading-relaxed flex-1">{p.body}</p>
              <Link
                href={p.href}
                className="text-caption tracking-widest uppercase text-antique-gold/60 hover:text-antique-gold transition-colors"
              >
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>

        <div className="border border-antique-gold/10 p-8 max-w-2xl">
          <p className="font-serif text-title text-bone font-light mb-4">
            What partnership looks like
          </p>
          <div className="space-y-3 text-body-sm text-ash leading-relaxed">
            <p>Every partner is introduced to members with the same care we give a muse — contextually, without interruption.</p>
            <p>We do not sell banner placements. We do not offer logo drops. What we offer is narrative integration and a room that listens.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
