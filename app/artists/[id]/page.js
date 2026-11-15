import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArtistProfile from '@/components/ArtistProfile'
import ContactForm from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'
import { FOUNDERS } from '@/lib/roster'

async function getArtist(slug) {
  try {
    await connectDB()
    const artist = await Artist.findOne({ slug }).lean()
    if (artist) {
      return { ...artist, _id: artist._id?.toString?.() || artist._id }
    }
  } catch {
    // Sin base de datos, el perfil sigue respondiendo con el roster fundador.
  }

  return FOUNDERS.find((artist) => artist.slug === slug) || null
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const artist = await getArtist(id)
  if (!artist) return { title: 'Artist not found' }
  return {
    title: artist.name,
    description: artist.bio || `${artist.name} on always creating`,
  }
}

export default async function ArtistProfilePage({ params }) {
  const { id } = await params
  const artist = await getArtist(id)
  if (!artist) notFound()

  return (
    <>
      <Navbar />

      <main id="main">
        <ArtistProfile artist={artist} />

        <section id="contact" className="border-t border-line">
          <div className="shell grid gap-8 py-16 sm:py-20 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label text-lime">Contact</p>
              <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.02em] text-paper">
                Reach the room.
              </h2>
              <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.65] text-ash">
                One message reaches the room.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
