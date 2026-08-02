import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LadderLine from '@/components/LadderLine'
import ContactForm from '@/components/ContactForm'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'

async function getFeaturedArtists() {
  try {
    await connectDB()
    return await Artist.find({ featured: true }).sort({ order: 1, createdAt: 1 }).lean()
  } catch {
    return []
  }
}

export default async function HomePage() {
  const list = (await getFeaturedArtists())
    .slice(0, 3)
    .map((a) => ({ ...a, _id: a._id?.toString?.() || a._id }))

  return (
    <>
      <Navbar />

      {/* ── Ladder ────────────────────────────────────────── */}
      <section className="bg-background min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center gap-10 sm:gap-14 py-20">
        <p className="font-body text-[10px] tracking-[2px] uppercase text-shadcn-muted-foreground">
          ✦ explore each line ✦
        </p>

        {/* Line 1 — Presentation */}
        <LadderLine side="right" label="About alwayscreating">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-shadcn-primary text-[10px]">✦</span>
              <span className="font-body text-[10px] tracking-[1px] uppercase text-foreground/70">
                alwayscreating
              </span>
            </div>
            <h2 className="font-heading text-[22px] sm:text-[26px] leading-[1.1] text-foreground">
              You are not your work. You are how you create.
            </h2>
            <p className="font-body text-[12px] leading-[20px] text-foreground/70">
              A curated space for discovering creatives. Build a living identity across
              music, visual art, and beyond.
            </p>
            <div className="h-px w-full bg-shadcn-border" />
            <p className="font-body text-[12px] leading-[20px] text-foreground/70">
              Begins as a response to static creation. A space where artists were
              forced to present finished work, instead of showing how they think,
              evolve, and exist. It was never about building another platform. It was
              about creating a bridge between the artist and their world.
            </p>
          </div>
        </LadderLine>

        {/* Line 2 — Featured Artists */}
        <LadderLine side="left" label="Featured artists">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-[20px] text-foreground">Featured Artists</h2>
              <p className="font-body text-[12px] text-foreground/70 mt-1">
                Every creator. Every discipline. One space.
              </p>
            </div>

            {list.length > 0 ? (
              <div className="flex flex-col gap-2">
                {list.map((a) => (
                  <Link
                    key={a._id || a.slug}
                    href="/artists"
                    className="group flex gap-3 items-start rounded-md p-2 -mx-2 hover:bg-shadcn-accent transition-colors"
                  >
                    <div className="h-16 w-14 shrink-0 rounded-md overflow-hidden bg-shadcn-muted">
                      {a.profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.profileImage} alt={a.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <span className="font-heading text-[14px] text-foreground leading-tight">
                        {a.name}
                      </span>
                      {a.discipline?.[0] && (
                        <span className="font-body text-[10px] uppercase tracking-wider text-shadcn-muted-foreground">
                          {a.discipline[0]}
                        </span>
                      )}
                      {a.bio && (
                        <span className="font-body text-[11px] leading-[16px] text-foreground/60 line-clamp-2">
                          {a.bio}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="font-body text-[12px] text-foreground/60">
                No featured artists yet.
              </p>
            )}

            <Link
              href="/artists"
              className="inline-flex items-center gap-1 text-shadcn-primary font-body text-[12px] hover:underline transition-colors w-fit"
            >
              See more artists →
            </Link>
          </div>
        </LadderLine>

        {/* Line 3 — Refined marquee */}
        <LadderLine side="right" label="Always creating" contentClassName="w-[min(92vw,520px)]">
          <div className="flex flex-col gap-4">
            <p className="font-body text-[10px] uppercase tracking-[1px] text-shadcn-muted-foreground">
              always creating
            </p>
            <div className="overflow-hidden">
              <div className="marquee-refined">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="font-heading text-[22px] sm:text-[26px] text-foreground uppercase shrink-0 pr-6 leading-none select-none"
                  >
                    alwayscreating <span className="text-shadcn-primary">✦</span>&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </LadderLine>

        {/* Line 4 — Contact */}
        <LadderLine side="left" label="Contact" contentClassName="w-[min(92vw,460px)] p-4">
          <div className="mb-3">
            <h3 className="font-heading text-[18px] text-foreground">Let&apos;s work together.</h3>
            <p className="font-body text-[11px] text-foreground/60 mt-1">
              Interested in joining or collaborating? Send a message.
            </p>
          </div>
          <ContactForm />
        </LadderLine>
      </section>

      <Footer />
    </>
  )
}