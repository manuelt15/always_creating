import Navbar from '@/components/Navbar'
import ArtistProfile from '@/components/ArtistProfile'
import ContactForm from '@/components/ContactForm'
import { notFound } from 'next/navigation'

async function getArtist(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/artists/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const artist = await getArtist(id)
  if (!artist) return { title: 'Artist not found' }
  return {
    title: `${artist.name} — alwayscreating`,
    description: artist.bio || `${artist.name} on alwayscreating`,
  }
}

export default async function ArtistProfilePage({ params }) {
  const { id } = await params
  const artist = await getArtist(id)
  if (!artist) notFound()

  return (
    <>
      <Navbar />
      <ArtistProfile artist={artist} />
      <ContactForm />
      <footer className="bg-footer border-t border-default">
        <div className="max-w-content mx-auto px-4 lg:px-page py-10">
          <div className="font-display font-bold text-hsm text-text-primary mb-1">alwayscreating</div>
          <p className="font-body text-[12px] text-text-muted">Dedicated to the ones who never stop creating.</p>
        </div>
      </footer>
    </>
  )
}
