import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSession } from '@/lib/auth'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <>
      <Header isAuthenticated={!!session} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
