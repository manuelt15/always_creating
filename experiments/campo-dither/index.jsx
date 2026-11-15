import DitherField from '@/components/DitherField'

export default function CampoDither() {
  return (
    <div className="relative isolate aspect-[4/3] w-full overflow-hidden border border-line bg-ink sm:aspect-[16/9]">
      <div aria-hidden className="dither-gradient pointer-events-none absolute inset-0 opacity-[0.28]" />
      <DitherField className="absolute inset-0" />
      <p className="label pointer-events-none absolute bottom-4 left-4">Mueve el cursor por encima</p>
    </div>
  )
}
