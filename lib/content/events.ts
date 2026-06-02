// Homepage calendar teaser events.
// Real events come from Supabase via the /calendar page;
// these are the blurred placeholder entries shown on the homepage.

export interface TeaserEvent {
  season: string
  label:  string
  sub:    string
}

export const CALENDAR_TEASER: TeaserEvent[] = [
  { season: 'Jun', label: 'Noire Night',    sub: 'A composition in dark and candlelight' },
  { season: 'Jul', label: 'Garden at Dusk', sub: 'The long summer, briefly interrupted'   },
  { season: 'Sep', label: 'Gilded Harvest', sub: 'Provenance and the turning season'      },
]

// Theme language — used throughout copy for editorial references
export const MUSE_THEMES = [
  'Noire Night',
  'Garden at Dusk',
  'Coastal Provenance',
  'Gilded Harvest',
  'Afterlight Atelier',
  'Velvet + Vinyl',
] as const

export type MuseTheme = typeof MUSE_THEMES[number]
