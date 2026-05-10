'use client'

import { useState, startTransition } from 'react'
import { addTransitionType, ViewTransition } from 'react'
import ArtistCard from './ArtistCard'
import ArtistOverlay from './ArtistOverlay'

export default function ArtistCardGrid({ artists }) {
  const [selected, setSelected] = useState(null)

  const openOverlay = (artist) => {
    startTransition(() => {
      addTransitionType('open-overlay')
      setSelected(artist)
    })
  }

  const closeOverlay = () => {
    startTransition(() => {
      addTransitionType('close-overlay')
      setSelected(null)
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist, i) => (
          <ViewTransition key={artist._id || artist.slug} default="none">
            <ArtistCard artist={artist} onSelect={openOverlay} index={i} />
          </ViewTransition>
        ))}
      </div>

      {selected && (
        <ViewTransition
          enter={{ 'open-overlay': 'scale-in', default: 'none' }}
          exit={{ 'close-overlay': 'scale-out', default: 'none' }}
          default="none"
        >
          <ArtistOverlay artist={selected} onClose={closeOverlay} />
        </ViewTransition>
      )}
    </>
  )
}
