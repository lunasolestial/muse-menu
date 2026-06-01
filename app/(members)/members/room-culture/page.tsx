export default function RoomCulturePage() {
  const principles = [
    {
      title: 'Discretion',
      body: 'What happens in the room stays in the room. Guest lists are never shared. Fellow members are never identified without consent. If you encounter a member outside of an evening, that encounter is yours to navigate with the same care you brought to the table.',
    },
    {
      title: 'Photography',
      body: 'Each evening has a stated photo policy, communicated in your RSVP confirmation. In general: ambient room photography is welcomed; guest faces require consent; the kitchen and service team are photographed only with permission. We ask that posts wait until after the evening has concluded.',
    },
    {
      title: 'Arrival',
      body: 'We ask that members arrive within a ten-minute window of the stated time. The room is composed for a precise experience — early arrival disrupts setup; late arrival disrupts pacing. If you will be delayed, please notify us directly.',
    },
    {
      title: 'The guest relationship',
      body: 'You are the member; your guest is your responsibility. Please brief your guest on the character of the evening, the photo policy, and the spirit of the room before arrival. Guest conduct reflects on your membership.',
    },
    {
      title: 'The table',
      body: 'We seat with intention. If you have a strong preference for or against a particular seating arrangement, let us know through your profile. We cannot always accommodate, but we will always try.',
    },
    {
      title: 'Absence',
      body: 'A confirmed RSVP is a commitment. If you are unable to attend, please notify us as early as possible — no later than 48 hours before the evening. Last-minute cancellations affect the table and the kitchen. Patterns of late cancellation may affect future invitations.',
    },
  ]

  return (
    <div className="max-w-2xl space-y-12">
      <div className="border-b border-antique-gold/10 pb-8">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">Room Culture</p>
        <h1 className="font-serif text-headline text-bone font-light">How we are together.</h1>
        <p className="text-body-sm text-ash mt-3 leading-relaxed max-w-lg">
          {/* [TODO: refine with internal Muse & Menu copy] */}
          These are not rules. They are the culture of the room — what has made
          each gathering work, and what we ask of everyone who joins it.
        </p>
      </div>

      <div className="space-y-10">
        {principles.map((p, i) => (
          <div key={p.title} className="grid grid-cols-[32px_1fr] gap-6">
            <span className="text-caption text-antique-gold/30 tracking-widest pt-0.5">0{i + 1}</span>
            <div className="space-y-3">
              <h2 className="font-serif text-title text-bone font-light">{p.title}</h2>
              <p className="text-body-sm text-ash leading-relaxed">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-antique-gold/10 pt-8">
        <p className="font-serif text-body italic text-ash">
          Questions or concerns about any of the above? Reach us through{' '}
          <a href="mailto:members@museandmenu.com" className="text-antique-gold/60 hover:text-antique-gold transition-colors">
            members@museandmenu.com
          </a>.
        </p>
      </div>
    </div>
  )
}
