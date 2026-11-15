import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionMeta from '@/components/SectionMeta'
import ExperimentCard from '@/components/ExperimentCard'
import ContactForm from '@/components/ContactForm'
import DitherField from '@/components/DitherField'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { sortedExperiments } from '@/lib/experiments'
import { PORTFOLIO_URL, PORTFOLIO_LABEL } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const experiments = sortedExperiments()

  return (
    <>
      <Navbar home />

      <main id="main">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="shell relative">
            {/* El campo se funde por abajo hasta casi el 001: sin línea de corte. */}
            <div className="hero-field pointer-events-none absolute inset-0">
              {/* Capa estatica: la textura existe aunque el canvas tarde en arrancar. */}
              <div aria-hidden className="dither-gradient absolute inset-0 opacity-[0.28]" />
              <DitherField className="absolute inset-0" />
              <div aria-hidden className="dither-veil absolute inset-0" />
            </div>

            <div className="relative pb-32 pt-32 sm:pb-44">
              <h1 className="text-display text-paper">
                <span className="block">always</span>
                <span className="block pl-[7vw] italic text-accent">creating.</span>
              </h1>

              <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
                <div className="hero-copy lg:col-span-6">
                  <p className="max-w-[44ch] text-[15px] leading-[1.7] text-paper sm:text-[16px]">
                    Mi forma de entrenar la creatividad: probar, equivocarme y volver a probar. Aquí
                    dejo lo que me va saliendo por el camino.
                  </p>
                  <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.7] text-ash sm:text-[16px]">
                    A veces es una idea escrita, otras un poco de código, un diseño o cualquier cosa
                    que me apetezca explorar. Cada entrada cuenta en qué punto está y qué quería
                    probar. Si algo te sugiere otra idea, la puerta está al final.
                  </p>

                  <ThemeSwitcher />
                </div>

                {PORTFOLIO_URL ? (
                  <div className="lg:col-span-4 lg:col-start-9">
                    <div className="border border-line border-l-accent bg-ink px-5 py-4">
                      <p className="label text-accent">Trabajo profesional</p>
                      <p className="mt-3 text-[13px] leading-[1.6] text-ash">
                        Esto es un espacio para probar sin compromiso. Mis proyectos, mi experiencia
                        y mi CV están en{' '}
                        <a
                          href={PORTFOLIO_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-paper underline decoration-accent underline-offset-4 transition-colors duration-150 hover:text-accent"
                        >
                          {PORTFOLIO_LABEL}
                          <span className="sr-only"> (se abre en una pestaña nueva)</span>
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* 001 / Experimentos */}
        <section id="experimentos">
          <div className="shell pb-16 pt-2 sm:pb-24">
            <SectionMeta index="001" title="Experimentos" />

            <p className="body-copy mt-10 max-w-[52ch]">
              Ideas escritas y pruebas con código, mezcladas y en orden de llegada. Lo más
              reciente, primero.
            </p>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {experiments.map((experiment) => (
                <li key={experiment.slug}>
                  <ExperimentCard experiment={experiment} />
                </li>
              ))}
            </ul>
          </div>

          {/* Franja entre secciones: el mismo campo del hero, fundido arriba y abajo. */}
          <div className="band-field pointer-events-none relative h-[220px] sm:h-[320px]">
            <div aria-hidden className="dither-gradient absolute inset-0 opacity-[0.28]" />
            <DitherField className="absolute inset-0" />
          </div>
        </section>

        {/* 002 / La puerta */}
        <section id="puerta">
          <div className="shell py-16 sm:py-24">
            <SectionMeta index="002" title="Ideas y comentarios" />

            <div className="mt-10 border border-line bg-surface">
              <div className="dither-rule-strong" aria-hidden />

              <div className="grid lg:grid-cols-12">
                <div className="p-5 sm:p-8 lg:col-span-7 lg:p-12">
                  <h2 className="font-serif text-[clamp(2.2rem,4.2vw,3.7rem)] leading-[0.95] tracking-[-0.02em] text-paper">
                    Deja una idea, o cuéntame qué has visto.
                  </h2>
                  <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.65] text-ash">
                    Algo que te gustaría ver probado aquí, o lo que te ha sugerido un experimento.
                    Una frase basta.
                  </p>

                  <div className="mt-8">
                    <ContactForm experiments={experiments} />
                  </div>
                </div>

                <aside className="border-t border-line bg-ink p-5 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-12">
                  <p className="label text-accent">Cómo funciona</p>
                  <dl className="mt-6">
                    {[
                      ['Confirmación', 'Te llega un correo con un enlace. El mensaje no me llega hasta que lo confirmas.'],
                      ['Respuesta', 'Lo leo todo. Si hay algo que contestar, te escribo al correo que dejes.'],
                      ['Privacidad', 'Tu nombre y tu correo solo sirven para responderte. No se comparten con nadie.'],
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
