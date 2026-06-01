import { createClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'
import type { Database } from '@/lib/database.types'

type PartnerInquiry = Database['public']['Tables']['partner_inquiries']['Row']

export default async function AdminPartnersPage() {
  const supabase = await createClient()
  const { data: rawInquiries } = await supabase
    .from('partner_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  const inquiries = (rawInquiries ?? []) as PartnerInquiry[]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-headline text-bone font-light">Partner Inquiries</h1>
      </div>

      <div className="border border-antique-gold/10 divide-y divide-antique-gold/8">
        {inquiries.length === 0 && (
          <div className="p-8 text-center text-ash text-body-sm">No inquiries yet.</div>
        )}
        {inquiries.map((inq) => (
          <div key={inq.id} className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-body-sm text-bone font-medium">{inq.name}</p>
              {inq.brand && <span className="text-body-sm text-ash">— {inq.brand}</span>}
              <Badge variant="gold">{inq.type}</Badge>
            </div>
            <p className="text-caption text-fog">{inq.email}{inq.website && ` · ${inq.website}`}</p>
            {inq.credentials && (
              <p className="text-body-sm text-ash leading-relaxed">{inq.credentials}</p>
            )}
            <p className="text-body-sm text-ash leading-relaxed border-t border-antique-gold/8 pt-3">{inq.message}</p>
            <p className="text-caption text-fog">{new Date(inq.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
