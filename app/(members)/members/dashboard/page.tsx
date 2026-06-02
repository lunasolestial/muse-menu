import { getCurrentUser, getActiveMembership } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { TIER_LABEL } from '@/lib/database.types'
import type { Database } from '@/lib/database.types'
import Link from 'next/link'

type EventRow = Database['public']['Tables']['events']['Row']

export default async function MemberDashboard() {
  const user = await getCurrentUser()
  if (!user) return null

  const membership = await getActiveMembership(user.id)
  const tier = membership?.tier
  const isPreferredOrPatron = tier === 'salon' || tier === 'patron'
  const isPatron = tier === 'patron'

  const supabase = await createClient()

  const eventsResult = await supabase
    .from('events')
    .select('*')
    .in('status', ['invitation_release', 'announced'])
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(3)
  const events = eventsResult.data as EventRow[] | null

  const quickLinks = [
    { href: '/members/profile',      label: 'My Preferences',     sub: 'Taste, seating, notes' },
    ...(isPreferredOrPatron ? [{ href: '/members/composition', label: 'Composition Notes', sub: 'Concierge seating intake' }] : []),
    { href: '/members/archive',      label: 'Archive',            sub: 'Past gatherings' },
    { href: '/members/room-culture', label: 'Room Culture',       sub: 'Our shared etiquette' },
    ...(isPatron ? [{ href: '/members/patron',  label: 'Patron Perks',       sub: 'Bar privilege · bottle policy' }] : []),
    { href: '/members/support',      label: 'Support',            sub: 'Reach the team' },
  ]

  return (
    <div className="space-y-14">

      {/* Welcome */}
      <div className="border-b border-antique-gold/10 pb-8">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">Members</p>
        <h1 className="font-serif text-headline text-bone font-light">
          Welcome{user.name ? `, ${user.name.split(' ')[0]}` : ''}.
        </h1>
        {membership && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(212,175,55,0.55)', display: 'inline-block', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 9,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(212,175,55,0.60)',
              }}
            >
              {TIER_LABEL[membership.tier]} Member
            </span>
          </div>
        )}
      </div>

      {/* Active invitation windows */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50">Open Invitations</p>
          <Link href="/members/events" className="text-caption text-ash hover:text-bone transition-colors tracking-widest uppercase">
            All events →
          </Link>
        </div>

        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/members/events/${event.slug}`}
                className="border border-antique-gold/10 p-6 hover:border-antique-gold/30 transition-colors group"
              >
                <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-2">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
                <h3 className="font-serif text-title text-bone font-light group-hover:text-porcelain transition-colors">
                  {event.theme_title ?? event.name}
                </h3>
                <p className="text-body-sm text-ash mt-2 leading-relaxed line-clamp-2">
                  {event.muse_note_member ?? event.muse_note_public}
                </p>
                <p className="text-caption text-antique-gold/40 tracking-widest uppercase mt-4">
                  {event.status === 'invitation_release' ? 'Invitation release' : 'Announced'}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-antique-gold/10 p-8 text-center">
            <p className="text-ash text-body-sm">
              No open invitations at this time.<br />
              <span className="text-fog">Invitation windows are released to members first.</span>
            </p>
          </div>
        )}
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-antique-gold/10 p-5 hover:border-antique-gold/25 transition-colors group"
          >
            <p className="text-body-sm text-bone font-medium group-hover:text-porcelain transition-colors">
              {item.label}
            </p>
            <p className="text-caption text-fog mt-1">{item.sub}</p>
          </Link>
        ))}
      </section>

    </div>
  )
}
