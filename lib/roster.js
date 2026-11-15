export const FOUNDERS = [
  {
    slug: 'manuel',
    name: 'Manuel',
    role: 'Artist',
    discipline: ['Apps', 'Photography'],
    intro:
      'Artist. Builds apps across a varied stack; photographs as a way of looking.',
    bio:
      'Manuel builds apps. He works across a varied stack, from interface to backend, and treats each project as a piece of design rather than a delivery. Photography runs alongside as a personal habit: a way of looking at things rather than a discipline he claims. He is showing work here and open to building with others.',
    image: '/dither/manuel-900.png',
    imageSmall: '/dither/manuel-480.png',
    profileImage: '/dither/manuel-900.png',
    order: 1,
  },
  {
    slug: 'moya',
    name: 'Moya',
    role: 'Artist',
    discipline: ['Photography', 'Art'],
    intro:
      'Artist based in Los Angeles. Photography and art, in that order and at once.',
    bio:
      'Moya is an artist based in Los Angeles. His work sits between photography and art, with the camera as a starting point rather than an end. He is showing work here and open to collaboration.',
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
