import Link from 'next/link'

const LINKS = [
  { href: '/#manifesto', label: 'Manifesto' },
  { href: '/#roster', label: 'Roster' },
  { href: '/artists', label: 'Index' },
  { href: '/#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell grid gap-10 py-12 sm:grid-cols-12 sm:py-16">
        <div className="sm:col-span-5">
          <p className="max-w-[16ch] font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em]">
            Two artists. One open room.
          </p>
        </div>

        <div className="sm:col-span-4 sm:col-start-7">
          <p className="label">Index</p>
          <nav aria-label="Footer" className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors duration-150 hover:text-lime"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-5 sm:col-span-2">
          <p className="label">{new Date().getFullYear()}</p>
          <p className="max-w-[22ch] text-[11px] leading-[1.55] text-ash">
            Dedicated to the ones who never stop creating.
          </p>
        </div>
      </div>

      <div className="grain overflow-hidden border-t border-line">
        <div className="grain-content shell pb-1 pt-8 sm:pt-10">
          <p
            aria-hidden
            className="whitespace-nowrap font-serif text-[clamp(2.85rem,13.2vw,13rem)] leading-[0.9] tracking-[-0.045em] text-paper"
          >
            always creating<span className="text-lime">.</span>
          </p>
        </div>
      </div>

      <div className="shell flex flex-col justify-between gap-2 border-t border-line py-4 sm:flex-row sm:items-center">
        <p className="label">© {new Date().getFullYear()} always creating</p>
      </div>
    </footer>
  )
}
