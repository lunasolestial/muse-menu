import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/database.types'

type SponsorInquiry = Database['public']['Tables']['sponsor_inquiries']['Row']

export default async function AdminSponsorsPage() {
  const supabase = await createClient()
  const { data: rawInquiries } = await supabase
    .from('sponsor_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  const inquiries = (rawInquiries ?? []) as SponsorInquiry[]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-headline text-bone font-light">Sponsor Inquiries</h1>
      </div>

      <div className="border border-antique-gold/10 divide-y divide-antique-gold/8">
        {inquiries.length === 0 && (
          <div className="p-8 text-center text-ash text-body-sm">No inquiries yet.</div>
        )}
        {inquiries.map((inq) => (
          <div key={inq.id} className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-body-sm text-bone font-medium">{inq.brand}</p>
              <span className="text-ash text-body-sm">— {inq.contact_name}</span>
              {inq.budget_range && (
                <span className="text-caption text-antique-gold/50 tracking-widest uppercase">{inq.budget_range.replace('_', ' ')}</span>
              )}
            </div>
            <p className="text-caption text-fog">{inq.email}{inq.website && ` · ${inq.website}`}</p>
            <p className="text-body-sm text-ash leading-relaxed">{inq.alignment_note}</p>
            <p className="text-caption text-fog">{new Date(inq.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
