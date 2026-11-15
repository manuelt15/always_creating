export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink">
      <div className="grain overflow-hidden">
        <div className="grain-content shell pb-1 pt-8 sm:pt-10">
          <p
            aria-hidden
            className="whitespace-nowrap font-serif text-[clamp(2.85rem,13.2vw,13rem)] leading-[0.9] tracking-[-0.045em] text-paper"
          >
            always creating<span className="text-accent">.</span>
          </p>
        </div>
      </div>

      <div className="shell flex flex-col justify-between gap-2 border-t border-line py-4 sm:flex-row sm:items-center">
        <p className="label">© {year} always creating</p>
        <p className="label">Para quien nunca deja de crear.</p>
      </div>
    </footer>
  )
}
