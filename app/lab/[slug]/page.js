import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CommentDialog from '@/components/CommentDialog'
import { EXPERIMENTS, KINDS, STATUS, formatDate, getExperiment } from '@/lib/experiments'
import { EXPERIMENT_COMPONENTS } from '@/lib/experiment-components'

export function generateStaticParams() {
  return EXPERIMENTS.map(({ slug }) => ({ slug }))
}

// openGraph y twitter de una página sustituyen a los del layout: se heredan a mano
// (imagen, nombre del sitio, idioma y tarjeta grande) y se cambia solo lo propio.
export async function generateMetadata({ params }, parent) {
  const { slug } = await params
  const experiment = getExperiment(slug)
  if (!experiment) return {}
  const { openGraph, twitter } = await parent
  const title = `E/${experiment.number} ${experiment.title}`
  return {
    title,
    description: experiment.summary,
    alternates: { canonical: `/lab/${slug}` },
    openGraph: {
      siteName: openGraph?.siteName,
      locale: openGraph?.locale,
      images: openGraph?.images,
      type: 'article',
      url: `/lab/${slug}`,
      title,
      description: experiment.summary,
    },
    twitter: {
      card: twitter?.card,
      images: twitter?.images,
      title,
      description: experiment.summary,
    },
  }
}

export default async function ExperimentPage({ params }) {
  const { slug } = await params
  const experiment = getExperiment(slug)
  if (!experiment) notFound()

  const { number, kind, title, date, status, medium, summary, question, learned, body, images } = experiment
  const Experiment = kind === 'code' ? EXPERIMENT_COMPONENTS[slug] : null

  const experiments = EXPERIMENTS.map(({ slug, number, title }) => ({ slug, number, title }))

  return (
    <>
      <Navbar />

      <main id="main">
        <section>
          <div className="shell pb-10 pt-10 sm:pb-12 sm:pt-14">
            <Link href="/#experimentos" className="label transition-colors duration-150 hover:text-paper">
              Volver a los experimentos
            </Link>

            <p className="label mt-10 text-accent">E/{number}</p>
            <h1 className="mt-4 text-title text-paper">{title}</h1>
            <p className="body-copy mt-6 max-w-[52ch]">{summary}</p>

            <ul aria-label="Ficha" className="mt-8 flex flex-wrap gap-2">
              <li className="chip">
                <span className="sr-only">Tipo: </span>
                {KINDS[kind]}
              </li>
              <li className="chip">
                <span className={status === 'running' ? 'status-dot' : 'block h-1.5 w-1.5 bg-ash'} aria-hidden />
                <span className="sr-only">Estado: </span>
                {STATUS[status]}
              </li>
              <li className="chip">
                <span className="sr-only">Fecha: </span>
                <time dateTime={date}>{formatDate(date)}</time>
              </li>
              {medium.map((item) => (
                <li key={item} className="chip text-ash">
                  <span className="sr-only">Medio: </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="shell">
            <div className="border border-line bg-surface">
              <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
                <p className="label">E/{number} / {KINDS[kind]}</p>
                <CommentDialog experiment={{ slug, number, title }} experiments={experiments} />
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                {Experiment ? <Experiment /> : null}

                {kind === 'design' ? (
                  <div className="grid gap-8">
                    {(images || []).map((image) => (
                      <figure key={image.src}>
                        <div className="border border-line bg-ink">
                          <img
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                            decoding="async"
                            className="mx-auto block h-auto max-h-[80vh] w-auto max-w-full"
                          />
                        </div>
                        {image.caption ? (
                          <figcaption className="label mt-3">{image.caption}</figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                ) : null}

                {body?.length ? (
                  <div className={kind === 'idea' ? 'max-w-[62ch]' : 'mt-10 max-w-[62ch]'}>
                    {body.map((paragraph) => (
                      <p key={paragraph} className="body-copy mt-5 first:mt-0 text-paper">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>

              {question || learned ? (
                <div className="grid border-t border-line lg:grid-cols-2">
                  {question ? (
                    <div className="p-4 sm:p-6 lg:p-8">
                      <p className="label">Qué quería probar</p>
                      <p className="mt-4 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] text-paper">
                        {question}
                      </p>
                    </div>
                  ) : null}
                  {learned ? (
                    <div className="border-t border-line p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                      <p className="label">Qué he aprendido</p>
                      <p className="body-copy mt-4">{learned}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
