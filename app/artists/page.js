import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArtistCardGrid from '@/components/ArtistCardGrid'
import NewsletterForm from '@/components/NewsletterForm'

async function getArtists() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/artists`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

const MOCK_ARTISTS = [
  {
    _id: 'mock-1', slug: 'mock-1', name: 'Manuel Torres',
    bio: 'Multi-channel creator exploring digital expression through Beast, systems, and evolving interfaces.',
    discipline: ['Visual Art', 'Photography'], profileImage: null,
  },
  {
    _id: 'mock-2', slug: 'mock-2', name: 'Maria Jose',
    bio: 'Madrid-based blending designer building identities through systems, concept, and visual coherence.',
    discipline: ['Music'], profileImage: null,
  },
  {
    _id: 'mock-3', slug: 'mock-3', name: 'Combo Running Club',
    bio: 'Multi-based running collective blurring the boundary between movement, identity, and community.',
    discipline: ['Fashion', 'Film'], profileImage: null,
  },
  {
    _id: 'mock-4', slug: 'mock-4', name: 'Moya',
    bio: 'Los Angeles-based photographer shaping visual narratives through light, timing, and perspective.',
    discipline: ['Visual Art', 'Film'], profileImage: null,
  },
  {
    _id: 'mock-5', slug: 'mock-5', name: 'Carlos Herrera',
    bio: 'Buenos Aires-focused creator capturing movement, mindset, and the evolution behind every rule.',
    discipline: ['Architecture'], profileImage: null,
  },
  {
    _id: 'mock-6', slug: 'mock-6', name: '04009c',
    bio: 'LA-based project shaping a brand that exists beyond clothing — rooted in identity, expression, and culture.',
    discipline: ['Music'], profileImage: null,
  },
  {
    _id: 'mock-7', slug: 'mock-7', name: 'Hause of MJ',
    bio: 'Madrid-based creative studio shaping identities through concept, craft, and cultural tension.',
    discipline: ['Fashion'], profileImage: null,
  },
]

export default async function ArtistsPage() {
  const artists = await getArtists()
  const list = artists.length > 0 ? artists : MOCK_ARTISTS

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
