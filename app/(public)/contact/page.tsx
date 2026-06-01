import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact — Muse & Menu Society' }

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Contact</p>
        <h1 className="font-serif text-display text-bone font-light leading-none mb-10">
          Get in touch.
        </h1>

        <div className="space-y-10">
          {[
            {
              label: 'Membership inquiries',
              body: 'For questions about the application process or membership status.',
              link: { label: 'Apply for consideration', href: '/apply' },
            },
            {
              label: 'Chef & vendor credentials',
              body: 'To submit your work for partnership consideration.',
              link: { label: 'Submit credentials', href: '/partners/chefs' },
            },
            {
              label: 'Sponsorship inquiries',
              body: 'For brand partnership and sponsorship conversations.',
              link: { label: 'Request a partnership outline', href: '/partners/sponsors' },
            },
            {
              label: 'General',
              body: 'For anything else, reach us directly.',
              link: { label: 'hello@museandmenu.com', href: 'mailto:hello@museandmenu.com' },
            },
          ].map((item) => (
            <div key={item.label} className="border-b border-antique-gold/10 pb-8">
              <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">{item.label}</p>
              <p className="text-body text-ash mb-4 leading-relaxed">{item.body}</p>
              <Link
                href={item.link.href}
                className="text-body-sm text-bone hover:text-porcelain transition-colors underline underline-offset-4 decoration-antique-gold/30"
              >
                {item.link.label}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-body-sm text-fog italic font-serif mt-10">
          We read everything. Response times are unhurried but sincere.
        </p>
      </div>
    </div>
  )
}
