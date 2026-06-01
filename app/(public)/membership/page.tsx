import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membership — Muse & Menu Society',
  description: 'Priority consideration, early access, and a composed room. Three tiers of Society membership.',
}

const TIERS = [
  {
    name: 'Society',
    descriptor: 'Entry membership',
    access: [
      'Members-only calendar access',
      'Invitation releases 48 hours before public',
      'Full archive access',
      'Guest request consideration (1 per event)',
      'Member profile — preferences on file',
    ],
    cta: 'Request consideration',
    note: 'Society is the entry point to the room.',
  },
  {
    name: 'Salon',
    descriptor: 'Mid-tier membership',
    featured: true,
    access: [
      'All Society access',
      'Priority invitation window — 72 hours early',
      'Dedicated seating consideration',
      'Two guest request consideration per event',
      'Early previews: muse notes + menu teaser',
      'Salon-only occasional gatherings',
    ],
    cta: 'Request consideration',
    note: 'Salon members shape the room as much as they inhabit it.',
  },
  {
    name: 'Patron',
    descriptor: 'Top-tier membership',
    access: [
      'All Salon access',
      'First invitation release — before all other tiers',
      'Patron table consideration (seated together on request)',
      'Chef introduction and post-dinner access',
      'Exclusive Patron evenings, by private convene',
      'Sponsorship and partnership priority introductions',
    ],
    cta: 'Request consideration',
    note: 'Patron membership is offered by invitation.',
  },
]

export default function MembershipPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Membership</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
            Access.<br />
            Recognition.<br />
            <em className="text-antique-gold/70">Priority.</em>
          </h1>
          <p className="text-body text-ash leading-relaxed">
            {/* [TODO: refine with internal Muse & Menu copy] */}
            Society membership is not a ticket program. It is a relationship.
            Members are remembered, accommodated, and considered — not processed.
            The table is composed with you in mind.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-antique-gold/10 mb-20">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`p-8 space-y-6 flex flex-col ${
                tier.featured
                  ? 'bg-midnight-plum/30 border-t-2 border-t-antique-gold/50'
                  : 'bg-carbon'
              }`}
            >
              <div>
                <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">{tier.descriptor}</p>
                <h2 className="font-serif text-headline text-bone font-light">{tier.name}</h2>
              </div>

              <div className="w-full h-px bg-antique-gold/15" />

              <ul className="space-y-3 flex-1">
                {tier.access.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-sm text-ash">
                    <span className="text-antique-gold/40 mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                <p className="text-xs text-fog italic mb-5">{tier.note}</p>
                <Link
                  href="/apply"
                  className={`block text-center text-caption tracking-widest uppercase py-3 px-6 transition-all ${
                    tier.featured
                      ? 'bg-antique-gold/15 border border-antique-gold/50 text-antique-gold hover:bg-antique-gold/25'
                      : 'border border-antique-gold/25 text-bone hover:border-antique-gold/50'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* What membership is not */}
        <div className="max-w-2xl mx-auto border border-antique-gold/10 p-10 text-center space-y-5">
          <p className="font-serif text-title text-bone font-light">
            What membership is not
          </p>
          <div className="w-8 h-px bg-antique-gold/30 mx-auto" />
          <div className="space-y-3 text-body-sm text-ash leading-relaxed">
            <p>Not a subscription. Not a ticket. Not a loyalty program.</p>
            <p>
              {/* [TODO: refine with internal Muse & Menu copy] */}
              Membership is an ongoing consideration — a standing relationship
              with a society that remembers who you are, what you prefer, and
              why you are at the table.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
