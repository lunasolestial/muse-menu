import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Database } from '@/lib/database.types'

export const metadata: Metadata = { title: 'Calendar — Muse & Menu Society' }

type EventRow = Database['public']['Tables']['events']['Row']

function statusLabel(status: EventRow['status']) {
  const map: Record<EventRow['status'], string> = {
    draft:              'Coming soon',
    announced:          'Announced',
    invitation_release: 'Invitation release forthcoming',
    composed:           'The table is fully composed',
    waitlist_only:      'Standby consideration only',
    archived:           'Past gathering',
  }
  return map[status] ?? status
}

export default async function CalendarPage() {
  const session  = await getSession()
  const isMember = !!session // simplified; full check in member routes
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .neq('status', 'draft')
    .order('date', { ascending: true })

  const typedEvents = (events ?? []) as EventRow[]
  const upcoming    = typedEvents.filter((e) => e.status !== 'archived')
  const past        = typedEvents.filter((e) => e.status === 'archived').slice(0, 3)

  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Calendar</p>
            <h1 className="font-serif text-display text-bone font-light leading-none">
              Forthcoming<br /><em>gatherings.</em>
            </h1>
          </div>
          {!isMember && (
            <Link href="/membership" className="hidden md:block text-caption tracking-widest uppercase text-antique-gold/60 hover:text-antique-gold transition-colors">
              Members receive the full calendar →
            </Link>
          )}
        </div>

        {/* Upcoming events */}
        <div className="space-y-3 mb-20">
          {upcoming.length === 0 && (
            <div className="border border-antique-gold/10 p-10 text-center">
              <p className="text-ash text-body-sm">No gatherings announced at this time.</p>
              <p className="text-fog text-body-sm mt-1">Invitation windows are released to members first.</p>
            </div>
          )}
          {upcoming.map((event) => (
            <div
              key={event.id}
              className="border border-antique-gold/10 p-6 grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 md:gap-8 items-start hover:border-antique-gold/25 transition-colors"
            >
              {/* Date */}
              <div>
                <p className="font-serif text-2xl text-bone font-light">
                  {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}
                </p>
                <p className="text-caption text-antique-gold/50 tracking-widest uppercase">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Info */}
              <div className="space-y-2">
                {/* Theme — blurred for non-members */}
                <h2
                  className="font-serif text-title text-bone font-light"
                  style={!isMember ? { filter: 'blur(5px)', userSelect: 'none' } : {}}
                >
                  {event.theme_title ?? event.name}
                </h2>
                {event.muse_note_public && (
                  <p
                    className="text-body-sm text-ash leading-relaxed max-w-lg"
                    style={!isMember ? { filter: 'blur(4px)', userSelect: 'none' } : {}}
                  >
                    {event.muse_note_public}
                  </p>
                )}
                <p className="text-caption text-fog">{event.location}</p>
              </div>

              {/* Status */}
              <div className="text-right shrink-0">
                <span className="text-caption tracking-widest uppercase text-antique-gold/40">
                  {statusLabel(event.status)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Non-member prompt */}
        {!isMember && upcoming.length > 0 && (
          <div className="border border-antique-gold/10 bg-midnight-plum/10 p-8 text-center mb-20">
            <p className="font-serif text-title text-bone font-light mb-3">
              Members receive the full calendar.
            </p>
            <p className="text-body-sm text-ash mb-6">
              Theme titles, muse notes, locations, and invitation windows
              are available to active members.
            </p>
            <Link
              href="/membership"
              className="inline-flex text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-8 py-3 hover:border-antique-gold/60 transition-all"
            >
              Request consideration
            </Link>
          </div>
        )}

        {/* Past glimpses */}
        {past.length > 0 && (
          <div>
            <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-6">Past Gatherings</p>
            <div className="space-y-2">
              {past.map((event) => (
                <div key={event.id} className="flex items-center justify-between py-4 border-b border-antique-gold/8 last:border-0">
                  <div className="flex items-center gap-6">
                    <span className="text-caption text-fog w-20 shrink-0">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <span className="font-serif text-body text-bone/60 font-light">{event.theme_title ?? event.name}</span>
                  </div>
                  {isMember && (
                    <Link href={`/members/archive`} className="text-caption text-antique-gold/40 hover:text-antique-gold/70 transition-colors tracking-widest uppercase">
                      Recap →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
