import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArtistCardGrid from '@/components/ArtistCardGrid'
import NewsletterForm from '@/components/NewsletterForm'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'
import { buildRoster } from '@/lib/roster'

async function getArtists() {
  try {
    await connectDB()
    return await Artist.find({}).sort({ order: 1, createdAt: 1 }).lean()
  } catch {
    return []
  }
}

export default async function ArtistsPage() {
  const list = (await getArtists()).map((artist) => ({
    ...artist,
    _id: artist._id?.toString?.() || artist._id,
  }))
  const artists = buildRoster(list)

  return (
    <>
      <Navbar />

      <main id="main">
        <section className="shell pb-16 pt-12 sm:pb-24 sm:pt-20">
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
            <p className="label">Index / Artists</p>
            <p className="label text-right">{String(artists.length).padStart(2, '0')} in the room</p>
          </div>

          <h1 className="mt-10 max-w-[14ch] font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[0.88] tracking-[-0.035em] text-paper">
            Everyone in <span className="italic text-lime">the room.</span>
          </h1>

          <p className="body-copy mt-6 max-w-[46ch]">
            The full index of artists in always creating. Two founders today, and whoever
            joins next.
          </p>

          <div className="mt-14">
            <ArtistCardGrid artists={artists} />
          </div>
        </section>

        <section className="border-t border-line">
          <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label text-lime">Stay close</p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] tracking-[-0.02em] text-paper">
                Occasional notes from the room.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="body-copy mb-6 max-w-[42ch]">
                What we are making, who is joining, what is still unfinished. No schedule,
                no noise.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
