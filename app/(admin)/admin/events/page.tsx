import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Database } from '@/lib/database.types'

type EventRow = Database['public']['Tables']['events']['Row']

export default async function AdminEventsPage() {
  const supabase = await createClient()
  const { data: rawEvents } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  const events = (rawEvents ?? []) as EventRow[]

  const statusVariant = (s: string) => {
    if (s === 'invitation_release') return 'gold'
    if (s === 'composed') return 'green'
    if (s === 'draft') return 'ash'
    return 'plum'
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-1">Admin</p>
          <h1 className="font-serif text-headline text-bone font-light">Events</h1>
        </div>
        <Link
          href="/admin/events/new"
          className="text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-5 py-2.5 hover:border-antique-gold/60 transition-all"
        >
          + New event
        </Link>
      </div>

      <div className="border border-antique-gold/10 divide-y divide-antique-gold/8">
        {events.length === 0 && (
          <div className="p-8 text-center text-ash text-body-sm">No events yet.</div>
        )}
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/admin/events/${event.id}`}
            className="flex items-center justify-between p-4 hover:bg-white/3 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <p className="text-body-sm text-bone font-medium">{event.theme_title ?? event.name}</p>
                <Badge variant={statusVariant(event.status) as 'gold' | 'green' | 'ash' | 'plum'}>{event.status.replace('_', ' ')}</Badge>
              </div>
              <p className="text-caption text-fog">
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                {' · '}{event.location}
                {' · '}{event.capacity} seats
              </p>
            </div>
            <span className="text-caption text-antique-gold/40 tracking-widest uppercase">Edit →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
