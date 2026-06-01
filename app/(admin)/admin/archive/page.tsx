import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Database } from '@/lib/database.types'

type ArchivePost = Database['public']['Tables']['archive_posts']['Row']

export default async function AdminArchivePage() {
  const supabase = await createClient()
  const { data: rawPosts } = await supabase
    .from('archive_posts')
    .select('*')
    .order('published_at', { ascending: false, nullsFirst: true })

  const posts = (rawPosts ?? []) as ArchivePost[]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption text-antique-gold/50 tracking-widest uppercase mb-1">Admin</p>
          <h1 className="font-serif text-headline text-bone font-light">Archive</h1>
        </div>
      </div>

      <div className="border border-antique-gold/10 divide-y divide-antique-gold/8">
        {posts.length === 0 && (
          <div className="p-8 text-center text-ash text-body-sm">No archive posts yet.</div>
        )}
        {posts.map((post) => (
          <div key={post.id} className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <p className="text-body-sm text-bone font-medium">{post.title}</p>
                <Badge variant={post.published_at ? 'green' : 'ash'}>
                  {post.published_at ? 'Published' : 'Draft'}
                </Badge>
                <Badge variant={post.visibility === 'members_only' ? 'plum' : 'ash'}>
                  {post.visibility === 'members_only' ? 'Members' : 'Public excerpt'}
                </Badge>
              </div>
              <p className="text-caption text-fog line-clamp-1">{post.lede}</p>
            </div>
            <p className="text-caption text-fog shrink-0">
              {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Unpublished'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
