'use client'

import { useEffect, useRef, useState } from 'react'

export default function StatCounter({ value }) {
  const match   = value.match(/^(\d+)(.*)$/)
  const target  = match ? parseInt(match[1]) : 0
  const suffix  = match ? match[2] : ''

  const [count, setCount]   = useState(0)
  const ref                 = useRef(null)
  const started             = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true

      const duration = 1400
      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(step)
        else setCount(target)
      }

      requestAnimationFrame(step)
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}
