import Link from 'next/link'
import Navbar from '@/components/Navbar'
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
  const list = await getArtists()

  return (
    <>
      <Navbar activePage="artists" />

      {/* ── Header ─────────────────────────────────────────── */}
      <section className="bg-primary border-b border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page pt-16 pb-14">
          <div className="inline-flex items-center gap-2 border border-text-primary/20 rounded-full px-4 py-1.5 mb-8">
            <span className="text-brand text-[10px]">✦</span>
            <span className="font-body text-[10px] tracking-[1px] uppercase text-text-primary">All Artists</span>
          </div>
          <h1 className="font-heading text-[48px] sm:text-[64px] leading-[0.95] text-text-primary mb-4">
            Featured Artists
          </h1>
          <p className="font-body text-[13px] text-text-secondary leading-[22px]">
            Every creator. Every discipline. One space.
          </p>
        </div>
      </section>

      {/* ── Grid ───────────────────────────────────────────── */}
      <section className="bg-primary border-b border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page py-16">
          <ArtistCardGrid artists={list} />
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────── */}
      <section className="bg-secondary border-b border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="font-heading text-[48px] lg:text-[64px] leading-[0.95] text-text-primary mb-3">
                Stay in the loop.
              </h2>
              <p className="font-body text-[13px] text-text-secondary leading-[22px]">
                New artists, curated drops, and cultural essays — delivered<br className="hidden sm:block" /> weekly to people who actually care.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-footer border-t border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page py-10 flex flex-col sm:flex-row items-start justify-between gap-8">
          <div>
            <div className="font-heading text-[18px] text-text-primary mb-1 uppercase">alwayscreating</div>
            <p className="font-body text-[11px] text-text-muted">Dedicated to the ones who never stop creating.</p>
            <p className="font-body text-[11px] text-text-muted mt-3">© {new Date().getFullYear()} alwayscreating. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="font-body text-[12px] text-text-secondary max-w-[240px] sm:text-right leading-[20px]">
              Not curated perfection. Real process. Real identity.
            </p>
            <a href="/#contact" className="font-body text-[12px] text-brand hover:underline transition-colors duration-150">
              Contact →
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
