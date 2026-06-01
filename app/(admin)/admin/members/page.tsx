import { createClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'
import type { Database, MembershipStatus } from '@/lib/database.types'

type Membership = Database['public']['Tables']['memberships']['Row'] & {
  users: { name: string | null; email: string }
}

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('memberships')
    .select('*, users(name, email)')
    .order('created_at', { ascending: false })

  if (filter) query = query.eq('status', filter as MembershipStatus)

  const { data: rawMemberships } = await query
  const memberships = (rawMemberships ?? []) as unknown as Membership[]

  const statusVariant = (s: string) => {
    if (s === 'active') return 'green'
    if (s === 'applied') return 'gold'
    if (s === 'rejected') return 'red'
    return 'ash'
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-1">Admin</p>
          <h1 className="font-serif text-headline text-bone font-light">Members</h1>
        </div>
        <div className="flex gap-2">
          {['', 'applied', 'active', 'invited', 'paused', 'rejected'].map((f) => (
            <a
              key={f}
              href={f ? `?filter=${f}` : '/admin/members'}
              className={`text-caption tracking-widest uppercase px-3 py-1.5 border transition-colors ${
                filter === f || (!filter && !f)
                  ? 'border-antique-gold/40 text-bone'
                  : 'border-antique-gold/10 text-ash hover:border-antique-gold/25'
              }`}
            >
              {f || 'All'}
            </a>
          ))}
        </div>
      </div>

      <div className="border border-antique-gold/10 divide-y divide-antique-gold/8">
        {memberships.length === 0 && (
          <div className="p-8 text-center text-ash text-body-sm">No members found.</div>
        )}
        {memberships.map((m) => (
          <div key={m.id} className="p-4 grid grid-cols-[1fr_auto] gap-4 items-center">
            <div>
              <p className="text-body-sm text-bone font-medium">{m.users?.name ?? '(no name)'}</p>
              <p className="text-caption text-fog">{m.users?.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-caption text-ash capitalize">{m.tier}</span>
              <Badge variant={statusVariant(m.status) as 'green' | 'gold' | 'red' | 'ash'}>{m.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
