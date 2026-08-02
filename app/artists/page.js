import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LadderLine from '@/components/LadderLine'
import ArtistCardGrid from '@/components/ArtistCardGrid'
import NewsletterForm from '@/components/NewsletterForm'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'

async function getArtists() {
  try {
    await connectDB()
    return await Artist.find({}).sort({ order: 1, createdAt: 1 }).lean()
  } catch {
    return []
  }
}

export default async function ArtistsPage() {
  const list = (await getArtists()).map((a) => ({
    ...a,
    _id: a._id?.toString?.() || a._id,
  }))

  return (
    <>
      <Navbar />

      {/* ── Chip + Grid ─────────────────────────────────────── */}
      <section className="bg-background">
        <div className="max-w-content mx-auto px-4 lg:px-page pt-16 pb-20">
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 border border-text-primary/20 rounded-full px-4 py-1.5">
              <span className="text-brand text-[10px]">✦</span>
              <span className="font-body text-[10px] tracking-[1px] uppercase text-text-primary">
                All Artists
              </span>
            </div>
          </div>

          <ArtistCardGrid artists={list} />
        </div>
      </section>

      {/* ── Stay in the loop (popover, same pattern as home) ── */}
      <section className="bg-background flex flex-col items-center justify-center gap-4 pb-20">
        <p className="font-body text-[10px] tracking-[2px] uppercase text-shadcn-muted-foreground">
          ✦ check more ✦
        </p>
        <LadderLine side="right" label="Stay in the loop" contentClassName="w-[min(92vw,460px)] p-4">
          <div className="mb-3">
            <h3 className="font-heading text-[18px] text-foreground">Stay in the loop.</h3>
            <p className="font-body text-[11px] text-foreground/60 mt-1">
              New artists, curated drops, and creative updates — straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </LadderLine>
      </section>

      <Footer />
    </>
  )
}