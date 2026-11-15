export const FOUNDERS = [
  {
    slug: 'manuel',
    name: 'Manuel',
    role: 'Founding artist',
    discipline: ['Founding artist'],
    intro:
      'Founding artist. Works alongside Moya, chasing the same ideas from another angle.',
    bio:
      'Manuel is one of the two founding artists of always creating. The practice is built in conversation with Moya, following a shared instinct for keeping the process visible instead of polishing it into silence. Part of the room since the first conversation.',
    image: '/dither/manuel-900.png',
    imageSmall: '/dither/manuel-480.png',
    profileImage: '/dither/manuel-900.png',
    order: 1,
  },
  {
    slug: 'moya',
    name: 'Moya',
    role: 'Founding artist',
    discipline: ['Founding artist'],
    intro:
      'Founding artist. Builds a shared language with Manuel out of similar instincts.',
    bio:
      'Moya is one of the two founding artists of always creating. The practice is built closely with Manuel, arriving at the same questions from a different direction. Part of the room from the start, and part of the reason it stays open.',
    image: '/dither/moya-900.png',
    imageSmall: '/dither/moya-480.png',
    profileImage: '/dither/moya-900.png',
    order: 2,
  },
]

function identity(artist) {
  return (artist?.slug || artist?.name || '').toLowerCase()
}

export function buildRoster(apiArtists = []) {
  const founders = new Set(FOUNDERS.map(identity))
  const extra = (apiArtists || [])
    .filter((artist) => artist && !founders.has(identity(artist)))
    .map((artist, index) => ({
      ...artist,
      _id: artist._id?.toString?.() || artist._id,
      order: artist.order ?? FOUNDERS.length + index + 1,
    }))

  return [...FOUNDERS, ...extra]
}
