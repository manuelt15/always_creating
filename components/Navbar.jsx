import Link from 'next/link'

export default function Navbar({ home = false }) {
  const href = (id) => (home ? `#${id}` : `/#${id}`)

  return (
    <header className={home ? 'absolute inset-x-0 top-0 z-40' : 'relative z-40'}>
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 font-serif text-[22px] leading-none tracking-[-0.02em] text-paper sm:text-[24px]"
          aria-label="always creating, inicio"
        >
          always creating<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-7">
          <nav aria-label="Principal" className="hidden sm:block">
            <a
              href={href('experimentos')}
              className="label transition-colors duration-150 hover:text-paper"
            >
              Experimentos
            </a>
          </nav>
          <span className="label hidden items-center gap-2 lg:flex">
            <span className="status-dot" aria-hidden />
            Laboratorio
          </span>
          <a href={href('puerta')} className="btn-primary px-4 py-2.5">
            Dejar una idea
          </a>
        </div>
      </div>

      <nav aria-label="Secciones" className="sm:hidden">
        <div className="shell py-2.5">
          <a
            href={href('experimentos')}
            className="label transition-colors duration-150 hover:text-paper"
          >
            Experimentos
          </a>
        </div>
      </nav>
    </header>
  )
}
