'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const move = (e) => {
      if (!dot.current) return
      dot.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={dot}
      className="hidden md:block fixed top-0 left-0 w-3 h-3 rounded-full bg-brand pointer-events-none z-[9999] transition-transform duration-75 ease-out"
    />
  )
}
