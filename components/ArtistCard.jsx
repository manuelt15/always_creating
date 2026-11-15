import Link from 'next/link'
import DitherImage from './DitherImage'

function Portrait({ artist, sizes }) {
  const { name, image, imageSmall, profileImage } = artist

  if (image) {
    return (
      <DitherImage
        large={image}
        small={imageSmall}
        alt={`Dithered portrait of ${name}`}
        sizes={sizes}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
    )
  }

  if (profileImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={profileImage}
        alt={`Portrait of ${name}`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-surface">
      <span className="label">Portrait pending</span>
    </div>
  )
}

export default function ArtistCard({ artist, onSelect, index = 0, variant = 'grid' }) {
  const { name, slug, bio, intro, discipline = [] } = artist
  const isRoster = variant === 'roster'
  const sizes = isRoster
    ? '(max-width: 767px) 100vw, 45vw'
    : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'

  const action = onSelect ? (
    <button
      type="button"
      onClick={() => onSelect(artist)}
      className="label shrink-0 text-lime transition-colors duration-150 hover:text-paper"
    >
      Open profile
    </button>
  ) : (
    <Link
      href={`/artists/${slug}`}
      className="label shrink-0 text-lime transition-colors duration-150 hover:text-paper"
    >
      Open profile
    </Link>
  )

  return (
    <article
      className="group flex animate-rise flex-col border-t border-line pt-4"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="label text-lime">{String(index + 1).padStart(2, '0')}</span>
        <span className="label text-right">{discipline[0] || 'Artist'}</span>
      </div>

      <div className="relative mt-4 aspect-[4/5] overflow-hidden border border-line bg-surface transition-colors duration-300 group-hover:border-ash">
        <Portrait artist={artist} sizes={sizes} />
        <div className="scanlines absolute inset-0" aria-hidden />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h3
          className={`font-serif leading-[0.9] tracking-[-0.02em] text-paper ${
            isRoster
              ? 'text-[clamp(2.1rem,3.6vw,3.4rem)]'
              : 'text-[clamp(1.7rem,2.6vw,2.2rem)]'
          }`}
        >
          {name}
        </h3>
        {action}
      </div>

      <p
        className={`mt-3 max-w-[44ch] text-paper ${
          isRoster
            ? 'text-[14px] leading-[1.65] sm:text-[15px]'
            : 'text-[13px] leading-[1.6]'
        }`}
      >
        {intro || bio}
      </p>

      <div className="dither-rule mt-6" aria-hidden />
    </article>
  )
}
