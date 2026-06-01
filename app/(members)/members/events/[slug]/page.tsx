import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Database } from '@/lib/database.types'

type EventRow = Database['public']['Tables']['events']['Row']
type RSVPRow  = Database['public']['Tables']['rsvps']['Row']

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const user     = await getCurrentUser()

  const { data: rawEvent } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .neq('status', 'draft')
    .single()

  if (!rawEvent) notFound()
  const event = rawEvent as EventRow

  const { data: rawRsvp } = await supabase
    .from('rsvps')
    .select('*')
    .eq('user_id', user!.id)
    .eq('event_id', event.id)
    .maybeSingle()
  const myRsvp = rawRsvp as RSVPRow | null

  const { count: confirmedCount } = await supabase
    .from('rsvps')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', event.id)
    .eq('status', 'confirmed')

  const spotsLeft = event.capacity - (confirmedCount ?? 0)
  const atCapacity = spotsLeft <= 0

  return (
    <div className="max-w-2xl space-y-12">

      <div className="border-b border-antique-gold/10 pb-8">
        <Link href="/members/events" className="text-caption text-ash hover:text-bone transition-colors tracking-widest uppercase mb-6 block">
          ← All events
        </Link>
        <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-3">
          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          {' · '}
          {new Date(event.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </p>
        <h1 className="font-serif text-headline text-bone font-light mb-4">
          {event.theme_title ?? event.name}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-body-sm text-ash">{event.location}</span>
          {!atCapacity && event.status !== 'composed' && (
            <Badge variant="gold">{spotsLeft} {spotsLeft === 1 ? 'seat' : 'seats'} remaining</Badge>
          )}
          {atCapacity && <Badge variant="plum">The table is fully composed</Badge>}
        </div>
      </div>

      {/* Muse note */}
      {(event.muse_note_member || event.muse_note_public) && (
        <section>
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Muse Note</p>
          <p className="font-serif text-body-lg text-bone font-light leading-relaxed italic">
            {event.muse_note_member ?? event.muse_note_public}
          </p>
        </section>
      )}

      {/* Menu preview */}
      {event.menu_full_member && (
        <section>
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">The Menu</p>
          <div className="border border-antique-gold/15 p-6 font-serif text-body text-bone font-light leading-relaxed whitespace-pre-line">
            {event.menu_full_member}
          </div>
        </section>
      )}

      {/* Details */}
      <section className="grid grid-cols-2 gap-4">
        {event.dress_note && (
          <div className="border border-antique-gold/10 p-5">
            <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-2">Dress</p>
            <p className="text-body-sm text-ash">{event.dress_note}</p>
          </div>
        )}
        {event.photo_policy && (
          <div className="border border-antique-gold/10 p-5">
            <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-2">Photography</p>
            <p className="text-body-sm text-ash">{event.photo_policy}</p>
          </div>
        )}
      </section>

      {/* RSVP section */}
      <section className="border-t border-antique-gold/10 pt-8">
        {myRsvp ? (
          <div className="space-y-3">
            <Badge variant={myRsvp.status === 'confirmed' ? 'green' : myRsvp.status === 'waitlisted' ? 'plum' : 'ash'}>
              {myRsvp.status === 'confirmed' ? 'RSVP confirmed' : myRsvp.status === 'waitlisted' ? 'On standby' : myRsvp.status}
            </Badge>
            <p className="text-body-sm text-ash">
              {myRsvp.status === 'confirmed'
                ? 'We look forward to seeing you at the table.'
                : myRsvp.status === 'waitlisted'
                ? 'You are on standby consideration. We will be in touch if a seat becomes available.'
                : 'Your response has been noted.'}
            </p>
            <Link href={`/members/rsvp/${event.id}`} className="text-caption text-antique-gold/60 hover:text-antique-gold transition-colors tracking-widest uppercase">
              Update response →
            </Link>
          </div>
        ) : event.status === 'invitation_release' || event.status === 'announced' ? (
          <div className="space-y-4">
            <p className="text-body-sm text-ash">
              {atCapacity
                ? 'The table is fully composed. You may join standby consideration.'
                : 'Confirm your attendance below.'}
            </p>
            <Link
              href={`/members/rsvp/${event.id}`}
              className="inline-flex text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-8 py-3 hover:border-antique-gold/60 transition-all"
            >
              {atCapacity ? 'Join standby' : 'RSVP for this evening'}
            </Link>
          </div>
        ) : event.status === 'composed' ? (
          <p className="text-body-sm text-ash font-serif italic">The table is fully composed.</p>
        ) : null}
      </section>

    </div>
  )
}
