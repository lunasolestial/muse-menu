import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience — Muse & Menu Society',
}

const ELEMENTS = [
  { label: 'The Room',    body: 'Intimate spaces, deliberately chosen. Never a restaurant dining room. Often a private residence, a gallery, a studio, or a venue with a particular quality of light and air. The room sets the register for the evening.' },
  { label: 'The Light',   body: 'Lighting is designed for each gathering. Warm, directional, and layered — never overhead, never flat. The table is illuminated; the edges of the room are allowed to remain in soft shadow.' },
  { label: 'The Music',   body: 'A score is built for each evening. Ambient, intentional, and low enough to become atmosphere rather than intrusion. Music is part of the pacing — it shapes how long a course feels, how a conversation opens.' },
  { label: 'The Scent',   body: 'A signature note is chosen for each gathering — something that anchors the muse in the olfactory. A single candle. A diffuser placed precisely. An association that lives in the body long after the evening ends.' },
  { label: 'The Pacing',  body: 'The meal is never rushed. Courses are timed to conversation. The kitchen is briefed. There are no announced transitions. You will not be asked how the food was while you are still eating.' },
  { label: 'The Table',   body: 'Guests are seated with intention. Familiar faces are seated apart by design. New adjacencies are proposed. The table is a curation, not a coincidence.' },
]

export default function ExperiencePage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">

        <div className="max-w-xl mb-20">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">The Experience</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
            Every detail<br />
            <em>is deliberate.</em>
          </h1>
          <p className="text-body text-ash leading-relaxed">
            {/* [TODO: refine with internal Muse & Menu copy] */}
            An evening with Muse & Menu Society is not dinner with production value.
            It is a composed experience — where atmosphere, food, and guest
            work together toward something that can only exist for that room,
            on that evening.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-antique-gold/10">
          {ELEMENTS.map((el, i) => (
            <div key={el.label} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-16 py-10">
              <div>
                <span className="text-caption tracking-widest uppercase text-antique-gold/40">0{i + 1}</span>
                <p className="font-serif text-title text-bone font-light mt-1">{el.label}</p>
              </div>
              <p className="text-body text-ash leading-relaxed max-w-lg">{el.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-antique-gold/10 pt-16 text-center">
          <p className="font-serif text-headline text-bone font-light mb-8 max-w-lg mx-auto">
            The full experience is available to members.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center gap-3 text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-10 py-4 hover:border-antique-gold/60 transition-all"
          >
            Request consideration
          </Link>
        </div>

      </div>
    </div>
  )
}
