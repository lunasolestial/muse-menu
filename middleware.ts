import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // ── Protect /members/* ──────────────────────────────────────────────────
  if (path.startsWith('/members')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Role check happens in layout via requireMember()
  }

  // ── Protect /admin/* ────────────────────────────────────────────────────
  if (path.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Role check happens in layout via requireAdmin()
  }

  return response
}

export const config = {
  matcher: ['/members/:path*', '/admin/:path*'],
}
