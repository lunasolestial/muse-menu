// Single source of truth for all navigation items.
// Import this wherever nav links are rendered so changes propagate everywhere.

export interface NavItem {
  href: string
  label: string
  sublabel?: string  // descriptive subtitle shown in the full overlay
}

export const MAIN_NAV: NavItem[] = [
  { href: '/experience', label: 'Experience', sublabel: 'What an evening is like' },
  { href: '/formats',    label: 'Formats',    sublabel: 'The table takes different forms' },
  { href: '/calendar',   label: 'Calendar',   sublabel: 'Forthcoming gatherings' },
  { href: '/membership', label: 'Membership', sublabel: 'A standing relationship' },
  { href: '/partners',   label: 'Partners',   sublabel: 'Craft over reach' },
]

export const FOOTER_NAV = {
  navigate: [
    { href: '/about',      label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/formats',    label: 'Formats' },
    { href: '/calendar',   label: 'Calendar' },
    { href: '/contact',    label: 'Contact' },
  ],
  society: [
    { href: '/membership', label: 'Membership' },
    { href: '/apply',      label: 'Request consideration' },
    { href: '/partners',   label: 'Partner with us' },
    { href: '/login',      label: 'Member sign in' },
  ],
} satisfies Record<string, { href: string; label: string }[]>
