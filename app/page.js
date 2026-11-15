import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionMeta from '@/components/SectionMeta'
import ArtistCardGrid from '@/components/ArtistCardGrid'
import ContactForm from '@/components/ContactForm'
import NewsletterForm from '@/components/NewsletterForm'
import DitherField from '@/components/DitherField'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'
import { buildRoster } from '@/lib/roster'

export const dynamic = 'force-dynamic'

async function getApiArtists() {
  try {
    await connectDB()
    const list = await Artist.find({}).sort({ order: 1, createdAt: 1 }).limit(6).lean()
    return list.map((artist) => ({
      ...artist,
      _id: artist._id?.toString?.() || artist._id,
    }))
  } catch {
    return []
  }
}

const OPEN_TO = [
  'Artists working in any discipline, finished or not.',
  'Work that is still moving and does not need to look resolved.',
  'People who want to build something with someone else in the room.',
]

export default async function HomePage() {
  const apiArtists = await getApiArtists()
  const roster = buildRoster(apiArtists)

  return (
    <>
      <Navbar home />

      <main id="main">
        {/* 001 / Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="shell relative">
            {/* Capa estatica: la textura existe aunque el canvas tarde en arrancar. */}
            <div
              aria-hidden
              className="dither-gradient pointer-events-none absolute inset-0 opacity-[0.28]"
            />
            <DitherField className="absolute inset-0" />
            <div aria-hidden className="dither-veil pointer-events-none absolute inset-0" />

            <div className="relative pb-14 pt-10 sm:pb-20 sm:pt-16">
              <div className="flex items-start justify-between gap-6">
                <p className="label">001 / An open room for making</p>
                <p className="label hidden text-right sm:block">Two artists today, open to more</p>
              </div>

              <h1 className="mt-10 text-display text-paper sm:mt-14">
                <span className="block">always</span>
                <span className="block pl-[7vw] italic text-lime">creating.</span>
              </h1>

              <div className="mt-10 max-w-[46ch] sm:mt-14">
                <p className="max-w-[34ch] text-[15px] leading-[1.7] text-paper sm:text-[16px]">
                  A collaborative space for artists. Two of us are showing work today, and
                  the room is built to hold more. Bring what you are making, unfinished is
                  fine.
                </p>

                <a
                  href="#manifesto"
                  className="label mt-8 inline-flex items-center gap-3 text-paper transition-colors duration-150 hover:text-lime"
                >
                  <span aria-hidden className="block h-8 w-px bg-line" />
                  Read the manifesto
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 002 / Manifesto */}
        <section id="manifesto" className="border-t border-line">
          <div className="shell py-16 sm:py-24">
            <SectionMeta index="002" title="Manifesto" aside="Collaboration over catalogue" />

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
              <h2 className="text-title text-paper lg:col-span-7">
                Two instincts, <span className="italic text-lime">one room.</span> The door
                stays open.
              </h2>

              <div className="lg:col-span-5 lg:pt-2">
                <p className="body-copy">
                  always creating is a room for artists, not a studio and not a gallery: a
                  place to show work while it is still becoming, and to start things with
                  other people. It runs on collaboration. What one person brings, the next
                  one bends.
                </p>
                <p className="body-copy mt-5">
                  Right now the room holds the two of them. It is not a closed duo. The name
                  is an invitation to anyone who recognises that instinct: come in, add a
                  voice, change the shape of the place.
                </p>
                <p className="body-copy mt-5">
                  Nothing here is presented as finished. The work stays in motion, and so
                  does the room.
                </p>

                <dl className="mt-8 border-t border-line">
                  {[
                    ['Open to', 'artists in any medium'],
                    ['Working', 'In collaboration'],
                    ['Room', 'Open to others'],
                  ].map(([term, detail]) => (
                    <div
                      key={term}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-3"
                    >
                      <dt className="label">{term}</dt>
                      <dd className="text-right font-mono text-[11px] uppercase tracking-[0.1em] text-paper">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="grain border-y border-line">
            <div className="grain-content shell py-10 sm:py-14">
              <p className="max-w-[22ch] font-serif text-[clamp(2rem,4.6vw,4rem)] italic leading-[1.02] tracking-[-0.02em] text-paper">
                Keep the process visible.
              </p>
            </div>
          </div>
        </section>

        {/* 003 / Roster */}
        <section id="roster" className="border-t border-line">
          <div className="shell py-16 sm:py-24">
            <SectionMeta index="003" title="In the room" aside="Artists in the room, 01 to 02" />

            <div className="mt-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <p className="body-copy max-w-[52ch]">
                Manuel and Moya are showing work here now. Profiles stay short on purpose:
                the work is the argument. If you make things too, this room has space.
              </p>
              <a
                href="#collaborate"
                className="label shrink-0 text-lime transition-colors duration-150 hover:text-paper"
              >
                Join the room
              </a>
            </div>

            <div className="mt-12">
              <ArtistCardGrid artists={roster} variant="roster" />
            </div>

            <p className="label mt-10">Only two, for now. The next name is not decided.</p>
          </div>
        </section>

        {/* 004 / Collaboration */}
        <section id="collaborate" className="border-t border-line">
          <div className="shell py-12 sm:py-20">
            <div className="frame bg-ink p-6 sm:p-10 lg:p-14">
              <SectionMeta index="004" title="Collaboration" aside="An open invitation" />

              <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <h2 className="text-title text-paper">
                    There is room for <span className="italic text-lime">one more.</span>
                  </h2>
                  <p className="body-copy mt-6 max-w-[46ch]">
                    We are two today. If you make things and the process matters more than
                    the polish, tell us what you are working on. We are looking for the next
                    voice, not a finished portfolio.
                  </p>
                  <a href="#contact" className="btn-lime mt-8">
                    Start a conversation
                  </a>
                </div>

                <div className="lg:col-span-5">
                  <p className="label">Who we want to hear from</p>
                  <ul className="mt-4 border-t border-line">
                    {OPEN_TO.map((item, index) => (
                      <li
                        key={item}
                        className="flex gap-4 border-b border-line py-4"
                      >
                        <span className="label shrink-0 text-lime">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[14px] leading-[1.6] text-paper">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[12px] leading-[1.55] text-ash">
                    There is no application form. Just write.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden className="dither-gradient dither-fade h-[160px] opacity-90 sm:h-[240px]" />
        </section>

        {/* 005 / Contact */}
        <section id="contact" className="border-t border-line">
          <div className="shell py-16 sm:py-24">
            <SectionMeta index="005" title="Contact" aside="One message reaches both" />

            <div className="mt-10 border border-line bg-surface">
              <div className="dither-rule-strong" aria-hidden />

              <div className="grid lg:grid-cols-12">
                <div className="p-5 sm:p-8 lg:col-span-7 lg:p-12">
                  <h2 className="font-serif text-[clamp(2.2rem,4.2vw,3.7rem)] leading-[0.95] tracking-[-0.02em] text-paper">
                    Tell us what you are making.
                  </h2>
                  <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.65] text-ash">
                    Collaboration, a question, or a half formed idea. Write once, it reaches
                    both of us.
                  </p>

                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>

                <aside className="border-t border-line bg-ink p-5 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-12">
                  <p className="label text-lime">Stay close</p>
                  <h3 className="mt-4 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1] tracking-[-0.02em] text-paper">
                    Occasional notes from the room.
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-[14px] leading-[1.65] text-ash">
                    What we are making, who is joining, what is still unfinished. No
                    schedule, no noise.
                  </p>

                  <div className="mt-6">
                    <NewsletterForm />
                  </div>

                  <div className="dither-rule my-8" aria-hidden />

                  <dl>
                    {[
                      ['Reach', 'One message reaches both of us.'],
                      ['Privacy', 'Your details stay here. Never shared with third parties.'],
                    ].map(([term, detail]) => (
                      <div key={term} className="border-t border-line py-4 first:border-t-0 first:pt-0">
                        <dt className="label">{term}</dt>
                        <dd className="mt-2 text-[13px] leading-[1.6] text-paper">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
