import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Pinyon_Script, Cinzel } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const pinyonScript = Pinyon_Script({
  variable: '--font-pinyon',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Muse & Menu Society',
  description: 'A private supper society. Muse-led menus. Member-led moments.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://museandmenu.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Muse & Menu Society',
    description: 'Where meals meet meaning.',
    type: 'website',
    images: [{ url: '/share-preview-v2.png', width: 1200, height: 630, alt: 'Muse & Menu Society' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/share-preview-v2.png'],
  },
  other: { 'theme-color': '#07080A' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${pinyonScript.variable} ${cinzel.variable} h-full`}
    >
      <body
        className="min-h-full bg-carbon text-bone font-sans antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-carbon focus:text-bone focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
