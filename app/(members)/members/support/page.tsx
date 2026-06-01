export default function SupportPage() {
  return (
    <div className="max-w-lg space-y-12">
      <div className="border-b border-antique-gold/10 pb-8">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">Support</p>
        <h1 className="font-serif text-headline text-bone font-light">We're here.</h1>
      </div>

      <div className="space-y-8">
        {[
          {
            title: 'RSVP changes or cancellations',
            body: 'Update your RSVP directly through the event page. For cancellations within 48 hours, please reach us directly.',
            contact: 'members@museandmenu.com',
          },
          {
            title: 'Profile & preference updates',
            body: 'Update your preferences at any time through your profile page. Changes take effect at the next invitation.',
            contact: null,
          },
          {
            title: 'Membership status or billing',
            body: 'For questions about your membership tier, status, or payment, reach us directly.',
            contact: 'members@museandmenu.com',
          },
          {
            title: 'General',
            body: 'For anything else — a concern, a question, a note of appreciation. We read everything.',
            contact: 'hello@museandmenu.com',
          },
        ].map((item) => (
          <div key={item.title} className="border-b border-antique-gold/8 pb-6">
            <h2 className="font-serif text-title text-bone font-light mb-2">{item.title}</h2>
            <p className="text-body-sm text-ash leading-relaxed mb-3">{item.body}</p>
            {item.contact && (
              <a
                href={`mailto:${item.contact}`}
                className="text-body-sm text-antique-gold/60 hover:text-antique-gold transition-colors"
              >
                {item.contact}
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="text-body-sm text-fog italic font-serif">
        Response times are unhurried, but nothing goes unread.
      </p>
    </div>
  )
}
