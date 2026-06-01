import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Database } from '@/lib/database.types'

type EventRow = Database['public']['Tables']['events']['Row']

function statusBadge(status: EventRow['status']) {
  const map: Record<EventRow['status'], { label: string; variant: 'gold' | 'green' | 'ash' | 'plum' | 'red' }> = {
    draft:              { label: 'Draft',              variant: 'ash' },
    announced:          { label: 'Announced',          variant: 'ash' },
    invitation_release: { label: 'Invitation release', variant: 'gold' },
    composed:           { label: 'Table composed',     variant: 'plum' },
    waitlist_only:      { label: 'Standby only',       variant: 'ash' },
    archived:           { label: 'Past',               variant: 'ash' },
  }
  const s = map[status] ?? { label: status, variant: 'ash' as const }
  return <Badge variant={s.variant}>{s.label}</Badge>
}

export default async function MemberEventsPage() {
  const user     = await getCurrentUser()
  const supabase = await createClient()

  const { data: rawEvents } = await supabase
    .from('events')
    .select('*')
    .neq('status', 'draft')
    .order('date', { ascending: true })

  const events  = (rawEvents ?? []) as EventRow[]
  const upcoming = events.filter((e) => e.status !== 'archived')
  const past     = events.filter((e) => e.status === 'archived')

  // RSVPs for this user
  const { data: rawRsvps } = await supabase
    .from('rsvps')
    .select('event_id, status')
    .eq('user_id', user!.id)

  const myRsvps = (rawRsvps ?? []) as Array<{ event_id: string; status: string }>
  const rsvpMap = Object.fromEntries(myRsvps.map((r) => [r.event_id, r.status]))

  return (
    <div className="space-y-14">

      <div className="border-b border-antique-gold/10 pb-8">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">Events</p>
        <h1 className="font-serif text-headline text-bone font-light">The full calendar.</h1>
      </div>

      {/* Upcoming */}
      <section className="space-y-4">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50">Forthcoming</p>
        {upcoming.length === 0 && (
          <div className="border border-antique-gold/10 p-8 text-center text-ash text-body-sm">
            No gatherings announced at this time.
          </div>
        )}
        {upcoming.map((event) => {
          const myRsvp = rsvpMap[event.id]
          return (
            <Link
              key={event.id}
              href={`/members/events/${event.slug}`}
              className="block border border-antique-gold/10 p-6 hover:border-antique-gold/30 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-caption text-antique-gold/50 tracking-widest uppercase">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    {statusBadge(event.status)}
                    {myRsvp && (
                      <Badge variant={myRsvp === 'confirmed' ? 'green' : myRsvp === 'waitlisted' ? 'plum' : 'ash'}>
                        {myRsvp === 'confirmed' ? 'RSVP confirmed' : myRsvp === 'waitlisted' ? 'On standby' : myRsvp}
                      </Badge>
                    )}
                  </div>
                  <h2 className="font-serif text-title text-bone font-light group-hover:text-porcelain transition-colors">
                    {event.theme_title ?? event.name}
                  </h2>
                  {event.muse_note_member && (
                    <p className="text-body-sm text-ash leading-relaxed max-w-xl">{event.muse_note_member}</p>
                  )}
                  <p className="text-caption text-fog">{event.location}</p>
                </div>
                {(event.status === 'invitation_release' || event.status === 'announced') && !myRsvp && (
                  <span className="shrink-0 text-caption tracking-widest uppercase border border-antique-gold/30 text-antique-gold px-4 py-2 group-hover:border-antique-gold/60 transition-colors">
                    RSVP
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="space-y-4">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50">Past Gatherings</p>
          <div className="divide-y divide-antique-gold/8">
            {past.map((event) => (
              <div key={event.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <span className="text-caption text-fog w-24 shrink-0">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="font-serif text-body text-ash font-light">{event.theme_title ?? event.name}</span>
                </div>
                <Link href="/members/archive" className="text-caption text-antique-gold/40 hover:text-antique-gold/70 transition-colors tracking-widest uppercase shrink-0">
                  Recap →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
