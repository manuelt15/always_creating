import Link from 'next/link'

const SECTIONS = [
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'roster', label: 'Roster' },
  { id: 'collaborate', label: 'Collaborate' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ home = false }) {
  const href = (id) => (home ? `#${id}` : `/#${id}`)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 font-serif text-[22px] leading-none tracking-[-0.02em] text-paper sm:text-[24px]"
          aria-label="always creating, home"
        >
          always creating<span className="text-lime">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={href(section.id)}
              className="label transition-colors duration-150 hover:text-paper"
            >
              {section.label}
            </a>
          ))}
          <Link
            href="/artists"
            className="label border-l border-line pl-7 transition-colors duration-150 hover:text-paper"
          >
            Index
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="label hidden items-center gap-2 lg:flex">
            <span className="status-dot" aria-hidden />
            Open call
          </span>
          <a href={href('contact')} className="btn-lime px-4 py-2.5">
            Say hello
          </a>
        </div>
      </div>

      <nav
        aria-label="Sections"
        className="border-t border-line lg:hidden"
      >
        <div className="shell flex items-center gap-6 overflow-x-auto py-2.5">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={href(section.id)}
              className="label shrink-0 whitespace-nowrap transition-colors duration-150 hover:text-paper"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
