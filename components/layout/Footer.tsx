import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-antique-gold/10 bg-ink py-14 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-caption tracking-widest uppercase text-ash">

        <div>
          <p className="font-serif text-base font-light italic text-bone not-italic normal-case tracking-normal mb-3">
            Muse <span className="text-antique-gold/50">&amp;</span> Menu Society
          </p>
          <p className="normal-case tracking-normal font-sans text-fog text-xs leading-relaxed">
            {/* [TODO: refine with internal Muse & Menu copy] */}
            A private, reservation-only supper society.<br />
            Where meals meet meaning.
          </p>
        </div>

        <div className="space-y-2.5">
          <p className="text-antique-gold/50 mb-3">Navigate</p>
          {[
            ['About', '/about'],
            ['Experience', '/experience'],
            ['Calendar', '/calendar'],
            ['Membership', '/membership'],
            ['Partners', '/partners'],
            ['Contact', '/contact'],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="block hover:text-bone transition-colors">
              {label}
            </Link>
          ))}
        </div>

        <div className="space-y-2.5">
          <p className="text-antique-gold/50 mb-3">Society</p>
          {[
            ['Apply for Membership', '/apply'],
            ['Partner with Us', '/partners/chefs'],
            ['Sponsor Inquiries', '/partners/sponsors'],
            ['Members', '/login'],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="block hover:text-bone transition-colors">
              {label}
            </Link>
          ))}
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-antique-gold/8 flex flex-col md:flex-row justify-between gap-3 text-fog text-[10px] tracking-widest uppercase">
        <p>© {new Date().getFullYear()} Muse & Menu Society. All rights reserved.</p>
        <p className="italic font-serif text-xs normal-case tracking-normal text-antique-gold/30">
          Muse-led menus. Member-led moments.
        </p>
      </div>
    </footer>
  )
}
