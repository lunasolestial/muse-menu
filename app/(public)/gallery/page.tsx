import type { Metadata } from 'next'
import Link from 'next/link'
import FadeUp from '@/components/motion/FadeUp'

export const metadata: Metadata = {
  title: 'Gallery — Muse & Menu Society',
  description: 'Select images from past Muse & Menu Society gatherings.',
}

const GLIMPSES = [
  { caption: 'Candlelight arrangement — Gilded Harvest',    theme: 'Gilded Harvest',    aspect: 'aspect-[4/5]' },
  { caption: 'The table, composed — Afterlight Atelier',    theme: 'Afterlight Atelier', aspect: 'aspect-square' },
  { caption: 'Second course detail — Noire Night',          theme: 'Noire Night',        aspect: 'aspect-[3/4]' },
  { caption: 'A muse note, hand-lettered',                  theme: 'Garden at Dusk',     aspect: 'aspect-[4/3]' },
  { caption: 'The room before arrival — Coastal Provenance',theme: 'Coastal Provenance', aspect: 'aspect-[4/5]' },
  { caption: 'Florals — Velvet + Vinyl',                    theme: 'Velvet + Vinyl',     aspect: 'aspect-square' },
]

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-18">
          <FadeUp>
            <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">Gallery</p>
            <h1 className="font-serif text-display text-bone font-light leading-none mb-6">
              Glimpses.
            </h1>
            <p className="text-body text-ash leading-relaxed">
              Select images from past gatherings. The full archive — editorial
              recaps, menus, and muse notes — is held for members.
            </p>
          </FadeUp>
        </div>

        {/* Gallery grid */}
        <FadeUp delay={0.1}>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-2 space-y-2">
            {GLIMPSES.map((item, i) => (
              <div
                key={i}
                className={`relative ${item.aspect} break-inside-avoid bg-ink border border-antique-gold/8 overflow-hidden group`}
              >
                {/* Theme label — visible on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 9,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(212,175,55,0.6)',
                        marginBottom: 3,
                      }}
                    >
                      {item.theme}
                    </p>
                    <p className="text-caption text-fog">{item.caption}</p>
                  </div>
                </div>
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Placeholder number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontStyle: 'italic',
                      fontSize: 11,
                      color: 'rgba(212,175,55,0.08)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.theme}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-16 border-t border-antique-gold/8 pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p className="font-serif text-title text-bone font-light max-w-md leading-snug">
              The full archive lives in the<br />
              <em>members area.</em>
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
                flexShrink: 0,
              }}
              className="hover:border-antique-gold/55 hover:text-porcelain"
            >
              Request consideration
            </Link>
          </div>
        </FadeUp>

      </div>
    </div>
  )
}
