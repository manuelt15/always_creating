import Navbar from '@/components/Navbar'
import ArtistProfile from '@/components/ArtistProfile'
import ContactForm from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'

async function getArtist(slug) {
  try {
    await connectDB()
    const artist = await Artist.findOne({ slug }).lean()
    if (!artist) return null
    return { ...artist, _id: artist._id?.toString?.() || artist._id }
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
