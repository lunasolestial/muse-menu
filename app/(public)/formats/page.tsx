import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Formats — Muse & Menu Society' }

const FORMATS = [
  {
    name: 'The Salon Table',
    seats: '8 guests',
    cadence: 'Monthly',
    character: 'Singular. Concentrated. Intimate.',
    description: 'One chef. One muse. Eight seats. The Salon Table is the most intimate format — small enough that conversation crosses the full table, large enough that the evening has texture. The menu is composed around a single constraint. The room is chosen for silence and warmth.',
    member_note: 'Salon Table evenings are released to Salon and Patron members first.',
  },
  {
    name: 'The Muse Dinner',
    seats: '16–20 guests',
    cadence: 'Bi-monthly',
    character: 'Composed. Full. Canonical.',
    description: 'The signature format. The Muse Dinner is the full expression of the Society — a complete evening with a chef partner, a curated room, a full multi-course menu, and a full member table. This is where the season is set, where the muse is most fully realised.',
    member_note: 'The Muse Dinner is open to all active members through the invitation release window.',
  },
  {
    name: 'The Society Evening',
    seats: 'By invitation',
    cadence: 'Rare',
    character: 'Private. Unrepeatable.',
    description: 'Held for moments of particular significance — a chef residency, a seasonal milestone, a private convene for a small group with a specific affinity. The Society Evening is not announced; it is extended. Its character changes with the reason for its gathering.',
    member_note: 'Society Evenings are extended by direct invitation to Patron members and select guests.',
  },
  {
    name: 'The Partner Table',
    seats: '10–14 guests',
    cadence: 'Occasional',
    character: 'Collaborative. Brand-woven. Curated.',
    description: 'Convened in partnership with a brand or sponsor whose values align with the Society ethos — a winery, a ceramics maker, a fragrance house. The Partner Table is an evening shaped by that partnership, but hosted with the same compositional care as every other format.',
    member_note: 'Partner Tables are open to members, with partner guest allocation at host discretion.',
  },
]

export default function FormatsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">

        <div className="max-w-xl mb-20">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Formats</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
            The table takes<br />
            <em>different forms.</em>
          </h1>
          <p className="text-body text-ash leading-relaxed">
            {/* [TODO: refine with internal Muse & Menu copy] */}
            Each format is chosen for what it can produce — a particular quality of
            intimacy, a specific scale of experience. None are interchangeable.
          </p>
        </div>

        <div className="space-y-px">
          {FORMATS.map((f, i) => (
            <div key={f.name} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] bg-ink border border-antique-gold/8 hover:border-antique-gold/20 transition-colors">
              <div className="p-8 border-b md:border-b-0 md:border-r border-antique-gold/8">
                <p className="text-caption text-antique-gold/40 tracking-widest uppercase mb-3">0{i + 1}</p>
                <h2 className="font-serif text-title text-bone font-light mb-4">{f.name}</h2>
                <dl className="space-y-1.5">
                  {[['Seats', f.seats], ['Cadence', f.cadence]].map(([k, v]) => (
                    <div key={k} className="flex items-baseline gap-2">
                      <dt className="text-caption text-fog tracking-widest uppercase w-16 shrink-0">{k}</dt>
                      <dd className="text-body-sm text-ash">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-caption text-antique-gold/50 tracking-widest uppercase mt-4 italic">{f.character}</p>
              </div>
              <div className="p-8 space-y-5">
                <p className="text-body text-ash leading-relaxed">{f.description}</p>
                <div className="border-t border-antique-gold/10 pt-4">
                  <p className="text-body-sm text-fog italic">{f.member_note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/calendar"
            className="text-caption tracking-widest uppercase text-ash hover:text-bone transition-colors"
          >
            View forthcoming gatherings →
          </Link>
        </div>

      </div>
    </div>
  )
}
