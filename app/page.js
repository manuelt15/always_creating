import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ArtistCardGrid from '@/components/ArtistCardGrid'
import ContactForm from '@/components/ContactForm'
import NewsletterForm from '@/components/NewsletterForm'
import Divider from '@/components/ui/Divider'

async function getFeaturedArtists() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/artists?featured=true`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

const MOCK_ARTISTS = [
  {
    _id: 'mock-1', slug: 'mock-1', name: 'Manuel Torres',
    bio: 'Visual artist and photographer exploring urban landscapes and identity.',
    discipline: ['Visual Art', 'Photography'],
    stats: { releases: 8, listeners: 142000 }, profileImage: null, featured: true,
    email: 'contact.manueltorres@gmail.com',
    social: { instagram: 'https://instagram.com', website: 'https://example.com' },
  },
  {
    _id: 'mock-2', slug: 'mock-2', name: 'Maria Jose',
    bio: 'Electronic music producer and sound designer based in Buenos Aires.',
    discipline: ['Music'],
    stats: { releases: 22, listeners: 380000 }, profileImage: null, featured: true,
    social: { instagram: 'https://instagram.com', spotify: 'https://spotify.com', soundcloud: 'https://soundcloud.com' },
  },
  {
    _id: 'mock-3', slug: 'mock-3', name: 'Combo Running Club',
    bio: 'Collective creating at the intersection of fashion and performance art.',
    discipline: ['Fashion', 'Film'],
    stats: { releases: 5, listeners: 67000 }, profileImage: null, featured: true,
    social: { instagram: 'https://instagram.com', x: 'https://x.com' },
  },
  {
    _id: 'mock-4', slug: 'mock-4', name: 'Maya',
    bio: 'Multidisciplinary artist working across sculpture, film and music.',
    discipline: ['Visual Art', 'Film'],
    stats: { releases: 11, listeners: 195000 }, profileImage: null, featured: true,
    social: { instagram: 'https://instagram.com', youtube: 'https://youtube.com' },
  },
  {
    _id: 'mock-5', slug: 'mock-5', name: 'Carlos Herrera',
    bio: 'Architect and visual thinker building immersive spatial experiences.',
    discipline: ['Architecture'],
    stats: { releases: 3, listeners: 28000 }, profileImage: null, featured: true,
    social: { instagram: 'https://instagram.com', website: 'https://example.com' },
  },
  {
    _id: 'mock-6', slug: 'mock-6', name: '04000s',
    bio: 'Producer and DJ known for blending cumbia digital with experimental electronics.',
    discipline: ['Music'],
    stats: { releases: 18, listeners: 512000 }, profileImage: null, featured: true,
    social: { instagram: 'https://instagram.com', spotify: 'https://spotify.com', soundcloud: 'https://soundcloud.com', x: 'https://x.com' },
  },
]

export default async function HomePage() {
  const artists = await getFeaturedArtists()
  const list = (artists.length > 0 ? artists : MOCK_ARTISTS).slice(0, 3)

  return (
    <>
      <Navbar activePage="home" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary">
        <div className="max-w-content mx-auto px-4 lg:px-page w-full py-20 lg:py-28 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div>
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 border border-text-primary/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-brand text-[10px]">✦</span>
              <span className="font-body text-[10px] tracking-[1px] uppercase text-text-primary">Artists doing great things</span>
            </div>

            <h1 className="font-heading text-[44px] sm:text-[54px] lg:text-[64px] leading-[1.0] text-text-primary mb-7">
              You are not your work. You are how you create.
            </h1>
            <p className="font-body text-[13px] leading-[22px] text-text-secondary max-w-sm mb-10">
              A curated space for discovering creatives. Build a living identity across music, visual art, and beyond.
            </p>
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 font-body font-bold text-[13px] bg-text-primary text-primary rounded-[8px] px-6 py-3 hover:opacity-80 active:scale-[0.98] transition-all duration-150"
            >
              Explore all artists →
            </Link>
          </div>

          {/* Right — globe rings (light bg, black lines = original PNG) */}
          <div className="relative flex items-center justify-end overflow-hidden">
            <img
              src="/globe-rings.png"
              alt=""
              aria-hidden
              className="w-[360px] lg:w-[500px] select-none pointer-events-none translate-x-8 lg:translate-x-16"
            />
          </div>
        </div>

        {/* Stats inline at the bottom of hero */}
        <div className="border-t border-subtle">
          <div className="max-w-content mx-auto px-4 lg:px-page flex flex-col sm:flex-row items-center justify-start gap-0">
            {[
              { num: '10+',  label: 'Creatives worldwide' },
              { num: '20+',  label: 'Creative disciplines' },
              { num: '100%', label: 'Commitment' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="py-8 pr-12 sm:pr-16 pl-0 sm:pl-0">
                  <div className="font-heading text-[32px] text-text-primary leading-none">{stat.num}</div>
                  <div className="font-body text-[11px] text-text-muted mt-1.5">{stat.label}</div>
                </div>
                {i < 2 && <Divider orientation="vertical" className="hidden sm:block h-10 mr-12 sm:mr-16" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="bg-primary border-b border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page py-20">
          <h2 className="font-heading text-[36px] sm:text-[44px] leading-[1.0] text-text-primary uppercase mb-6">
            alwayscreating
          </h2>
          <p className="font-heading text-[18px] sm:text-[22px] leading-[1.5] text-text-primary max-w-3xl">
            Begins as a response to static creation. A space where artists were forced to present finished work, instead of showing how they think, evolve, and exist. It was never about building another platform. It was about creating a bridge between the artist and their world.
          </p>
        </div>
      </section>

      {/* ── Featured Artists ───────────────────────────────── */}
      <section id="artists" className="bg-primary border-b border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading text-[36px] text-text-primary">Featured Artists</h2>
          </div>
          <ArtistCardGrid artists={list} />
          <div className="mt-12 flex justify-center">
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 font-body font-bold text-[13px] border border-brand text-brand rounded-[8px] px-6 py-3 hover:bg-brand hover:text-white transition-all duration-150"
            >
              See more artists →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="bg-primary border-b border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page py-20">
          <div className="border border-subtle rounded-xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-card">
            <div className="flex items-start gap-5">
              <span className="text-brand text-[24px] leading-none mt-1 shrink-0">✦</span>
              <div>
                <h2 className="font-heading text-[28px] sm:text-[36px] leading-[1.0] text-text-primary mb-2">
                  If you're creating,<br />we want to see it.
                </h2>
                <p className="font-body text-[13px] text-text-secondary leading-[22px]">
                  get in touch and let's build something together.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center justify-center font-body font-bold text-[13px] bg-brand text-white rounded-[8px] px-6 py-3 hover:bg-brand-dark active:scale-[0.98] transition-all duration-150"
            >
              Contact us →
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────── */}
      <section id="contact" className="bg-primary border-b border-subtle">
        <div className="max-w-content mx-auto px-4 lg:px-page py-20 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 border border-text-primary/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-brand text-[10px]">✦</span>
              <span className="font-body text-[10px] tracking-[1px] uppercase text-text-primary">Get in touch</span>
            </div>
            <h2 className="font-heading text-[48px] lg:text-[60px] leading-[0.95] text-text-primary mb-6">
              Let's work together.
            </h2>
            <p className="font-body text-[13px] leading-[22px] text-text-secondary max-w-xs">
              Interested in joining, collaborating, or just saying hello? Send us a message and we'll get back to you.
            </p>
          </div>
          <ContactForm />
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
                New artists, curated drops, and creative updates — straight to your inbox.
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
            <a href="#contact" className="font-body text-[12px] text-brand hover:underline transition-colors duration-150">
              Contact →
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
