import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminOverview() {
  const supabase = await createClient()

  const [
    { count: memberCount },
    { count: pendingApplications },
    { count: upcomingEvents },
    { count: partnerInquiries },
  ] = await Promise.all([
    supabase.from('memberships').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('memberships').select('*', { count: 'exact', head: true }).eq('status', 'applied'),
    supabase.from('events').select('*', { count: 'exact', head: true }).gte('date', new Date().toISOString()),
    supabase.from('partner_inquiries').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Active Members',       value: memberCount ?? 0,       href: '/admin/members' },
    { label: 'Pending Applications', value: pendingApplications ?? 0, href: '/admin/members?filter=applied' },
    { label: 'Upcoming Events',      value: upcomingEvents ?? 0,    href: '/admin/events' },
    { label: 'Partner Inquiries',    value: partnerInquiries ?? 0,  href: '/admin/partners' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-1">Admin</p>
        <h1 className="font-serif text-headline text-bone font-light">Society Overview</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border border-antique-gold/10 p-6 hover:border-antique-gold/30 transition-colors group"
          >
            <p className="font-serif text-3xl text-bone font-light">{s.value}</p>
            <p className="text-caption text-ash tracking-widest uppercase mt-1 group-hover:text-bone transition-colors">
              {s.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
