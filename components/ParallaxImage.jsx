'use client'

import { useRef, useEffect } from 'react'

export default function ParallaxImage({ src, alt }) {
  const containerRef = useRef(null)
  const imgRef       = useRef(null)

  useEffect(() => {
    const el  = containerRef.current
    const img = imgRef.current
    if (!el || !img) return

    const update = () => {
      const rect         = el.getBoundingClientRect()
      const centerY      = rect.top + rect.height / 2
      const viewportMid  = window.innerHeight / 2
      const ratio        = (centerY - viewportMid) / viewportMid
      const offset       = Math.max(-20, Math.min(20, ratio * 20))
      img.style.transform = `translateY(${offset}px) scale(1.12)`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ transform: 'translateY(0) scale(1.12)', willChange: 'transform' }}
      />
    </div>
  )
}
