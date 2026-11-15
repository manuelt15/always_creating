import Link from 'next/link'
import Tag from './ui/Tag'
import DitherImage from './DitherImage'

export default function ArtistProfile({ artist }) {
  const {
    name,
    slug,
    role,
    bio,
    discipline = [],
    stats = {},
    profileImage,
    image,
    imageSmall,
  } = artist

  return (
    <article className="shell py-12 sm:py-20">
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
        <p className="label text-lime">Profile / {slug}</p>
        <Link
          href="/artists"
          className="label transition-colors duration-150 hover:text-paper"
        >
          Back to index
        </Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
            {image ? (
              <DitherImage
                large={image}
                small={imageSmall}
                alt={`Dithered portrait of ${name}`}
                sizes="(max-width: 1023px) 100vw, 40vw"
                priority
                className="h-full w-full object-cover"
              />
            ) : profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="h-full w-full object-cover grayscale"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="label">Portrait pending</span>
              </div>
            )}
            <div className="scanlines absolute inset-0" aria-hidden />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-2">
          <div className="flex flex-wrap gap-2">
            {(discipline.length ? discipline : ['Artist']).map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>

          <h1 className="mt-6 font-serif text-[clamp(3.2rem,7vw,6rem)] leading-[0.88] tracking-[-0.035em] text-paper">
            {name}
          </h1>

          <p className="label mt-3 text-lime">{role || 'Artist'}</p>

          {bio && (
            <p className="mt-7 max-w-[52ch] text-[15px] leading-[1.7] text-paper sm:text-[16px]">
              {bio}
            </p>
          )}

          {(stats.releases > 0 || stats.listeners > 0) && (
            <dl className="mt-10 flex gap-12 border-y border-line py-6">
              {stats.releases > 0 && (
                <div>
                  <dt className="label">Releases</dt>
                  <dd className="mt-2 font-serif text-[34px] leading-none text-paper">
                    {stats.releases}
                  </dd>
                </div>
              )}
              {stats.listeners > 0 && (
                <div>
                  <dt className="label">Listeners</dt>
                  <dd className="mt-2 font-serif text-[34px] leading-none text-paper">
                    {stats.listeners.toLocaleString('en-US')}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="dither-rule mt-10" aria-hidden />

          <a href="#contact" className="btn-lime mt-8">
            Start a conversation
          </a>
        </div>
      </div>
    </article>
  )
}
