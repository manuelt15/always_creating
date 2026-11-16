import Link from 'next/link'
import { KINDS, STATUS, formatDate } from '@/lib/experiments'

export default function ExperimentCard({ experiment }) {
  const { slug, number, kind, title, date, status, medium, summary, images } = experiment
  const cover = kind === 'design' ? images?.[0] : null

  return (
    <Link
      href={`/lab/${slug}`}
      className="group flex h-full flex-col border border-line bg-surface card-press hover:border-line-strong"
    >
      {cover ? (
        <div className="scanlines relative h-28 overflow-hidden bg-ink sm:h-36">
          <img
            src={cover.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-80 transition-opacity duration-150 group-hover:opacity-100"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className={kind === 'code' ? 'dither-gradient h-28 opacity-60 sm:h-36' : 'grain h-28 sm:h-36'}
        />
      )}
      <div className="dither-rule" aria-hidden />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-accent">E/{number}</span>
          <span className="label">{KINDS[kind]}</span>
        </div>

        <h3 className="mt-6 font-serif text-[clamp(1.9rem,2.6vw,2.4rem)] leading-[1] tracking-[-0.015em] text-paper">
          {title}
        </h3>
        <p className="mt-4 text-[14px] leading-[1.6] text-ash">{summary}</p>

        <dl className="mt-auto border-t border-line pt-4">
          <div className="mt-6 flex items-baseline justify-between gap-4">
            <dt className="sr-only">Estado</dt>
            <dd className="label flex items-center gap-2 text-paper">
              <span className={status === 'running' ? 'status-dot' : 'block h-1.5 w-1.5 bg-ash'} aria-hidden />
              {STATUS[status]}
            </dd>
            <dt className="sr-only">Fecha</dt>
            <dd className="label">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </div>
          <dt className="sr-only">Medio</dt>
          <dd className="label mt-3">{medium.join(' / ')}</dd>
        </dl>
      </div>
    </Link>
  )
}
