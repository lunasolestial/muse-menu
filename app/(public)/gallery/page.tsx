import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Gallery — Muse & Menu Society' }

// Placeholder gallery items — replace with real CMS/Supabase images
const GLIMPSES = [
  { caption: 'The candlelight arrangement, Autumn gathering', aspect: 'aspect-[4/5]' },
  { caption: 'The table, composed', aspect: 'aspect-square' },
  { caption: 'Detail: amuse-bouche, second course', aspect: 'aspect-[3/4]' },
  { caption: 'A muse note, hand-lettered', aspect: 'aspect-[4/3]' },
  { caption: 'The room before arrival', aspect: 'aspect-[4/5]' },
  { caption: 'Florals by our partner', aspect: 'aspect-square' },
]

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-16">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Gallery</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-6">
            Glimpses.
          </h1>
          <p className="text-body text-ash leading-relaxed">
            {/* [TODO: refine with internal Muse & Menu copy] */}
            Select images from past gatherings.
            The full archive — with editorial recaps, menus, and muse notes —
            is available to members.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-3 space-y-3">
          {GLIMPSES.map((item, i) => (
            <div key={i} className={`relative ${item.aspect} break-inside-avoid bg-ink border border-antique-gold/10 overflow-hidden group`}>
              {/* Placeholder — replace with next/image */}
              <div className="absolute inset-0 flex items-end p-4">
                <p className="text-caption text-fog opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </p>
              </div>
              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* [TODO: replace with actual image] */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-antique-gold/10 text-caption tracking-widest uppercase">Image {i + 1}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-body-sm text-fog mt-12 italic font-serif">
          Full recaps and galleries are available in the members archive.
        </p>

      </div>
    </div>
  )
}
