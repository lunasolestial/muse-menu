// Canonical format definitions for Muse & Menu Society.
// Used by the formats page and the homepage glimpse section.

export type FormatTier = 'flagship' | 'adjacent' | 'private'

export interface Format {
  id:          string
  num:         string
  name:        string
  subline:     string
  guests:      string
  format:      string
  cadence:     string
  access:      string
  tier:        FormatTier
  character:   string
  description: string[]
  notes?:      { heading: string; body: string }[]
}

export const FORMATS: Format[] = [
  {
    id:       'muse-dinner',
    num:      '01',
    name:     'The Muse Dinner',
    subline:  "The Society's signature supper experience.",
    guests:   '12 – 24, curated',
    format:   'Seated dining, muse-led',
    cadence:  'Monthly',
    access:   'Members, invitation window',
    tier:     'flagship',
    character: "The Society's signature supper experience.",
    description: [
      'The Muse Dinner is the Society in its fullest form: a single table, seated with intention, attended with care. Every element — the room, the light, the scent, the pacing of service — is composed around the muse. The muse gives the chef a constraint and the guest an entry point. It makes the evening possible to hold in memory.',
    ],
    notes: [
      {
        heading: 'Member privilege (Muse Dinner)',
        body: 'Invitation releases first. Preferences held on file. Select offerings reserved for members within the window.',
      },
      {
        heading: 'Sponsorships / collaborations (Muse Dinner)',
        body: 'Permitted when muse-aligned and integrated with restraint — presented as member privilege, never as placement.',
      },
    ],
  },
  {
    id:       'salon-evenings',
    num:      '02',
    name:     'Salon Evenings',
    subline:  'Social. Warm. Structured.',
    guests:   '18 – 35',
    format:   'Lounge + seated mix, movement encouraged',
    cadence:  'Bi-monthly',
    access:   'Members, invitation window',
    tier:     'adjacent',
    character: 'Social. Warm. Structured.',
    description: [
      'A larger gathering with a more social architecture. The room holds a mix of lounge and table — proximity is designed, encounter is invited. Subtle conversation prompts, soft introductions, and one story moment from a guest or maker. Still curated. Still intentional — never incidental.',
    ],
    notes: [
      {
        heading: 'When a collaboration is present',
        body: 'Label the event: Salon Society Evening\nUse this label only when a partner co-authors the muse (chef × brand × artist) and the collaboration shapes the evening.',
      },
    ],
  },
  {
    id:       'private-table',
    num:      '03',
    name:     'Private Table',
    subline:  'Discreet. Premium. Commissioned.',
    guests:   '8 – 12',
    format:   'Chef-led, muse-composed, fully attended',
    cadence:  'By arrangement',
    access:   'Direct arrangement through the Society',
    tier:     'private',
    character: 'Discreet. Premium. Commissioned.',
    description: [
      "The Society's most intimate offering. Eight to twelve guests, a single convener, complete discretion. Commissioned quietly — no public announcement, no general invitation window. The same standards, the same composition, contained within a room that holds nothing more than the people in it.",
    ],
  },
]

export const FLAGSHIP_FORMAT  = FORMATS.find(f => f.tier === 'flagship')!
export const ADJACENT_FORMATS = FORMATS.filter(f => f.tier === 'adjacent')
export const HOMEPAGE_GLIMPSE = FORMATS.filter(f => f.tier !== 'flagship')
