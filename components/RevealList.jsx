'use client'

import { useEffect, useRef } from 'react'

// Lista que revela sus elementos al entrar en pantalla, una sola vez y escalonados.
// Solo oculta los que están por debajo del borde al montarse: lo que ya se ve no parpadea,
// y sin JavaScript (o con movimiento reducido) todo queda visible como siempre.
const STAGGER_MS = 60

export default function RevealList({ className, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const list = ref.current
    if (!list || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pending = [...list.children].filter(
      (item) => item.getBoundingClientRect().top > window.innerHeight,
    )
    if (!pending.length) return
    pending.forEach((item) => {
      item.dataset.reveal = 'hidden'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            entry.target.style.setProperty('--reveal-delay', `${i * STAGGER_MS}ms`)
            entry.target.dataset.reveal = 'shown'
            observer.unobserve(entry.target)
          })
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    pending.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  )
}
