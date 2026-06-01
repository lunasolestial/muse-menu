import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Database } from '@/lib/database.types'

type ArchivePost = Database['public']['Tables']['archive_posts']['Row']

export default async function ArchivePage() {
  const supabase = await createClient()
  const { data: rawPosts } = await supabase
    .from('archive_posts')
    .select('*')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })

  const posts = (rawPosts ?? []) as ArchivePost[]

  return (
    <div className="space-y-12">
      <div className="border-b border-antique-gold/10 pb-8">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">Archive</p>
        <h1 className="font-serif text-headline text-bone font-light">Past gatherings.</h1>
        <p className="text-body-sm text-ash mt-2 max-w-lg">
          Editorial recaps, menus, and muse notes from each evening.
        </p>
      </div>

      {posts.length === 0 && (
        <div className="border border-antique-gold/10 p-10 text-center">
          <p className="text-ash text-body-sm font-serif italic">
            The archive is being composed. Past evenings will appear here.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/members/archive/${post.slug}`}
            className="block border border-antique-gold/10 p-6 hover:border-antique-gold/25 transition-colors group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8">
              <div className="shrink-0">
                <p className="text-caption text-antique-gold/50 tracking-widest uppercase">
                  {new Date(post.published_at!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-title text-bone font-light group-hover:text-porcelain transition-colors">
                  {post.title}
                </h2>
                <p className="text-body-sm text-ash leading-relaxed line-clamp-2">{post.lede}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
