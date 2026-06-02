import Link from 'next/link'
import type { Metadata } from 'next'
import FadeUp from '@/components/motion/FadeUp'

export const metadata: Metadata = {
  title: 'Contact — Muse & Menu Society',
  description: 'Get in touch with the Muse & Menu Society team.',
}

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-2xl mx-auto">

        <FadeUp>
          <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">Contact</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-4">
            We read<br />
            <em>everything.</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13,
              color: 'rgba(127,122,115,0.65)',
              marginBottom: 60,
              letterSpacing: '0.01em',
            }}
          >
            Response times are unhurried but sincere.
          </p>
        </FadeUp>

        <div className="space-y-0 divide-y divide-antique-gold/8">
          {[
            {
              label: 'Membership',
              body: 'Questions about the application process, your membership status, or the Society\'s invitation windows.',
              link: { label: 'Apply for consideration', href: '/apply' },
            },
            {
              label: 'Chef & maker credentials',
              body: 'To submit your work for partnership consideration with the Society.',
              link: { label: 'Submit credentials', href: '/partners/chefs' },
            },
            {
              label: 'Brand partnerships',
              body: 'For sponsorship and editorial collaboration conversations.',
              link: { label: 'Request a partnership outline', href: '/partners/sponsors' },
            },
            {
              label: 'Everything else',
              body: 'For anything that does not fit neatly above.',
              link: { label: 'hello@museandmenu.com', href: 'mailto:hello@museandmenu.com' },
            },
          ].map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.07}>
              <div className="py-10">
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 9,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,55,0.38)',
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </p>
                <p className="text-body text-ash mb-5 leading-relaxed">{item.body}</p>
                <Link
                  href={item.link.href}
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 12,
                    color: 'rgba(244,239,230,0.82)',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(212,175,55,0.2)',
                    textUnderlineOffset: 4,
                    transition: 'color 0.25s, text-decoration-color 0.25s',
                  }}
                  className="hover:text-porcelain hover:decoration-antique-gold/40"
                >
                  {item.link.label}
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </div>
  )
}
