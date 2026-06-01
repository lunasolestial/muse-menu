import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Database } from '@/lib/database.types'

type ArchivePost = Database['public']['Tables']['archive_posts']['Row']

export default async function ArchiveDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: rawPost } = await supabase
    .from('archive_posts')
    .select('*')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .single()

  if (!rawPost) notFound()
  const post = rawPost as ArchivePost

  const menuHighlights = (post.menu_highlights ?? []) as Array<{ course: string; description: string }>
  const gallery        = (post.gallery ?? []) as Array<{ url: string; caption: string }>

  return (
    <div className="max-w-2xl space-y-14">

      <div className="border-b border-antique-gold/10 pb-8">
        <Link href="/members/archive" className="text-caption text-ash hover:text-bone transition-colors tracking-widest uppercase mb-6 block">← Archive</Link>
        <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-4">
          {new Date(post.published_at!).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        <h1 className="font-serif text-headline text-bone font-light leading-tight mb-4">{post.title}</h1>
        <p className="font-serif text-body-lg text-ash italic leading-relaxed">{post.lede}</p>
      </div>

      {/* Body */}
      <section className="prose prose-sm prose-invert max-w-none text-ash leading-relaxed [&_p]:mb-4">
        {post.body.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      {/* Menu highlights */}
      {menuHighlights.length > 0 && (
        <section>
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-6">The Menu</p>
          <div className="border border-antique-gold/15 divide-y divide-antique-gold/8">
            {menuHighlights.map((item, i) => (
              <div key={i} className="p-5 grid grid-cols-[100px_1fr] gap-4">
                <span className="text-caption text-antique-gold/40 tracking-widest uppercase pt-0.5">{item.course}</span>
                <span className="font-serif text-body text-bone font-light">{item.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Muse notes */}
      {post.muse_notes && (
        <section className="border-l-2 border-antique-gold/25 pl-6">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-3">Muse Notes</p>
          <p className="font-serif text-body-lg text-bone font-light italic leading-relaxed">{post.muse_notes}</p>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section>
          <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-6">Gallery</p>
          <div className="columns-2 gap-3 space-y-3">
            {gallery.map((img, i) => (
              <div key={i} className="relative aspect-square bg-ink border border-antique-gold/10 break-inside-avoid overflow-hidden">
                {/* [TODO: replace with next/image] */}
                <div className="absolute inset-0 flex items-end p-3">
                  <p className="text-[10px] text-fog">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
