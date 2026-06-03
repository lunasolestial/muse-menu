import Link from 'next/link'
import type { Metadata } from 'next'
import FadeUp from '@/components/motion/FadeUp'

export const metadata: Metadata = {
  title: 'Membership — Muse & Menu Society',
  description: 'A standing relationship. Three tiers of Society membership.',
}

const TIERS = [
  {
    name: 'Society',
    descriptor: 'Where it begins.',
    pricing: 'From $25 / mo',
    pricingAlt: '$250 / yr' as string | undefined,
    position: 'Entry',
    access: [
      'Members-first invitations',
      'Member seat pricing',
      'Preferences held on file',
      'Full archive access',
    ],
    note: undefined as string | undefined,
    featured: false,
  },
  {
    name: 'Preferred Seat',
    descriptor: 'Priority + concierge.',
    pricing: 'From $75 / mo',
    pricingAlt: '$750 / yr' as string | undefined,
    position: 'Preferred',
    access: [
      'All Society access',
      'Best member seat pricing',
      'Seat hold during your window',
      'Concierge placement',
      'Muse reveal delivered with guaranteed styling lead time',
    ],
    note: undefined as string | undefined,
    featured: true,
  },
  {
    name: 'Patron',
    descriptor: 'The inner table.',
    pricing: 'Extended',
    pricingAlt: undefined as string | undefined,
    position: 'Extended',
    access: [
      'All Preferred Seat access',
      'First invitation release',
      'Patron Bar Privilege (capped)',
      'Bottle held on arrival (quarterly)',
      'Chef introduction / post-dinner access',
    ],
    note: 'Patron membership is extended. Preferred Seat members may signal interest for consideration.\nMembers-first. Limited public release only if needed.',
    featured: false,
  },
]

export default function MembershipPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-24">
          <FadeUp>
            <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">Membership</p>
            <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
              A standing<br />
              <em>relationship.</em>
            </h1>
            <p className="text-body text-ash leading-relaxed">
              Membership is not a ticketing arrangement. It is a standing
              relationship — one in which you are remembered, accommodated, and
              considered. The table is composed with you in mind.
            </p>
          </FadeUp>
        </div>

        {/* Tiers */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-antique-gold/8 mb-4">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`p-9 flex flex-col${tier.featured ? ' tier-card-featured' : ''}`}
                style={{
                  background: tier.featured
                    ? 'linear-gradient(180deg, rgba(42,22,54,0.18) 0%, #07080A 100%)'
                    : '#07080A',
                }}
              >
                <div className="mb-7">
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 9,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'rgba(212,175,55,0.38)',
                      marginBottom: 6,
                    }}
                  >
                    {tier.descriptor}
                  </p>
                  <h2 className="font-serif text-headline text-bone font-light">{tier.name}</h2>
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 14, color: 'rgba(212,175,55,0.80)' }}>
                      {tier.pricing}
                    </span>
                    {tier.pricingAlt && (
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, letterSpacing: '0.06em', color: 'rgba(127,122,115,0.55)' }}>
                        or {tier.pricingAlt}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full h-px bg-antique-gold/12 mb-7" />

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.access.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: 'rgba(169,163,154,0.8)',
                      }}
                    >
                      <span style={{ color: 'rgba(212,175,55,0.36)', marginTop: 2, flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div>
                  {tier.note && (
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontStyle: 'italic',
                        fontSize: 14,
                        color: 'rgba(127,122,115,0.7)',
                        marginBottom: 18,
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {tier.note}
                    </p>
                  )}
                  {tier.position !== 'Extended' && (
                    <Link
                      href="/apply"
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 10,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: tier.featured ? 'rgba(212,175,55,0.88)' : 'rgba(244,239,230,0.82)',
                        border: `1px solid ${tier.featured ? 'rgba(212,175,55,0.42)' : 'rgba(212,175,55,0.22)'}`,
                        padding: '11px 24px',
                        display: 'block',
                        textAlign: 'center',
                        transition: 'all 0.3s',
                      }}
                      className="hover:border-antique-gold/60"
                    >
                      Request consideration
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Billing note */}
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(127,122,115,0.5)', textAlign: 'center', marginTop: 20, marginBottom: 56 }}>
          Annual membership, payable monthly.
        </p>

        {/* Seat pricing */}
        <FadeUp delay={0.08}>
          <div className="max-w-2xl mx-auto border border-antique-gold/8 p-10 mb-20">
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.42)', marginBottom: 22 }}>
              Muse Dinner seat pricing
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {([
                { label: 'Preferred Seat members',       price: 'From $295' },
                { label: 'Society members',              price: 'From $325' },
                { label: 'Non-members / public release', price: 'From $375' },
                { label: 'Patron seats (limited 2–4)',   price: 'From $525', note: 'Includes Patron Bar Privilege' },
              ] as { label: string; price: string; note?: string }[]).map((row, i, arr) => (
                <div
                  key={row.label}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none' }}
                >
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: 'rgba(169,163,154,0.75)' }}>
                    {row.label}
                    {row.note && (
                      <span style={{ fontSize: 11, color: 'rgba(127,122,115,0.5)', display: 'block', marginTop: 2 }}>{row.note}</span>
                    )}
                  </span>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: 'rgba(244,239,230,0.82)', flexShrink: 0, marginLeft: 16 }}>
                    {row.price}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 14, color: 'rgba(127,122,115,0.65)', lineHeight: 1.65, marginTop: 22 }}>
              Members receive first release and member pricing. Limited public release occurs only if seats remain.
            </p>
          </div>
        </FadeUp>

        {/* What membership is not */}
        <FadeUp delay={0.05}>
          <div className="max-w-2xl mx-auto border border-antique-gold/8 p-12 text-center space-y-6 mb-16">
            <p className="font-serif text-title text-bone font-light">
              What membership is not
            </p>
            <div className="w-8 h-px bg-antique-gold/22 mx-auto" />
            <div className="space-y-4 text-body-sm text-ash leading-relaxed">
              <p>Not a subscription. Not a ticket. Not a loyalty program.</p>
              <p>
                Membership is a standing consideration — a relationship in which you are
                remembered, known, and accommodated. The Society knows who you are
                and why you are at the table.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Final CTA */}
        <FadeUp>
          <div className="text-center">
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 11,
                letterSpacing: '0.12em',
                color: 'rgba(127,122,115,0.6)',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Applications are reviewed personally
            </p>
            <Link
              href="/apply"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 10,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,230,0.88)',
                border: '1px solid rgba(212,175,55,0.26)',
                padding: '13px 40px',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
              className="hover:border-antique-gold/55 hover:text-porcelain"
            >
              Begin your application
            </Link>
          </div>
        </FadeUp>

      </div>
    </div>
  )
}
