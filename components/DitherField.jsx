'use client'

import { useEffect, useRef } from 'react'

const LIME = [212, 255, 79]
const MAX_COLS = 220
const MAX_ROWS = 130
const FRAME_MS = 1000 / 30
const DOT = 3 // backing pixels per cell: 2x2 dot plus a 1px gap

// Bayer 8x8, the same ordered pattern used by the dithered images.
const BAYER_8 = new Float32Array(
  [
    0, 32, 8, 40, 2, 34, 10, 42,
    48, 16, 56, 24, 50, 18, 58, 26,
    12, 44, 4, 36, 14, 46, 6, 38,
    60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25,
    15, 47, 7, 39, 13, 45, 5, 37,
    63, 31, 55, 23, 61, 29, 53, 21,
  ].map((value) => (value + 0.5) / 64),
)

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value)

export default function DitherField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const state = {
      cols: 0,
      rows: 0,
      base: null,
      image: null,
      waveX: null,
      waveY: null,
      frame: null,
      inView: true,
      last: 0,
      time: 0,
      pointer: { x: 0.68, y: 0.4, tx: 0.68, ty: 0.4, seen: false },
    }

    const measure = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      const cell = width < 640 ? 5 : 6
      const cols = Math.max(1, Math.min(MAX_COLS, Math.floor(width / cell)))
      const rows = Math.max(1, Math.min(MAX_ROWS, Math.floor(height / cell)))

      if (cols === state.cols && rows === state.rows) return false

      state.cols = cols
      state.rows = rows
      canvas.width = cols * DOT
      canvas.height = rows * DOT

      const base = new Float32Array(cols * rows)
      for (let y = 0; y < rows; y += 1) {
        const ny = (y + 0.5) / rows
        for (let x = 0; x < cols; x += 1) {
          const nx = (x + 0.5) / cols
          const noise =
            Math.sin(x * 0.135 + Math.sin(y * 0.085) * 1.6) * 0.5 +
            Math.sin(y * 0.17 - x * 0.05) * 0.5
          const gradient = 0.16 + (1 - ny) * 0.2 + nx * 0.16
          base[y * cols + x] = clamp01(gradient + noise * 0.18)
        }
      }

      state.base = base
      state.image = ctx.createImageData(cols * DOT, rows * DOT)
      state.waveX = new Float32Array(cols)
      state.waveY = new Float32Array(rows)
      return true
    }

    const paint = () => {
      const { cols, rows, base, image, waveX, waveY } = state
      if (!base || !image) return

      const data = image.data
      data.fill(0)

      const time = state.time
      const pointer = state.pointer
      const px = (pointer.seen ? pointer.x : 0.66 + 0.07 * Math.sin(time * 0.0004)) * cols
      const py = (pointer.seen ? pointer.y : 0.38 + 0.05 * Math.cos(time * 0.00033)) * rows
      const radius = Math.max(8, Math.min(cols, rows) * (0.54 + 0.04 * Math.sin(time * 0.0005)))
      const radiusSq = radius * radius

      for (let x = 0; x < cols; x += 1) {
        waveX[x] = Math.sin(x * 0.19 + time * 0.0007)
      }
      for (let y = 0; y < rows; y += 1) {
        waveY[y] = Math.cos(y * 0.15 - time * 0.0009)
      }

      const stride = cols * DOT * 4
      for (let y = 0; y < rows; y += 1) {
        const dy = y - py
        const rowWave = waveY[y]
        for (let x = 0; x < cols; x += 1) {
          const index = y * cols + x
          const dx = x - px
          const distSq = dx * dx + dy * dy
          let light = 0
          if (distSq < radiusSq) {
            const falloff = 1 - distSq / radiusSq
            light = falloff * falloff * falloff
          }

          const value = 0.17 + base[index] * 0.5 + waveX[x] * rowWave * 0.12 + light * 1.06
          if (value <= BAYER_8[((y & 7) << 3) | (x & 7)]) continue

          const alpha = (46 + 209 * clamp01(value)) | 0
          const offset = y * DOT * stride + x * DOT * 4
          for (let dy2 = 0; dy2 < 2; dy2 += 1) {
            const rowOffset = offset + dy2 * stride
            for (let dx2 = 0; dx2 < 2; dx2 += 1) {
              const o = rowOffset + dx2 * 4
              data[o] = LIME[0]
              data[o + 1] = LIME[1]
              data[o + 2] = LIME[2]
              data[o + 3] = alpha
            }
          }
        }
      }

      ctx.putImageData(image, 0, 0)
    }

    const stopLoop = () => {
      if (state.frame !== null) {
        cancelAnimationFrame(state.frame)
        state.frame = null
      }
    }

    const startLoop = () => {
      // Un fotograma ya pintado: en carga lenta o con reduced motion no se ve negro.
      paint()
      if (state.frame !== null || !state.inView || document.hidden || reduceMotion.matches) {
        return
      }
      state.last = performance.now()
      state.frame = requestAnimationFrame(loop)
    }

    const loop = (now) => {
      state.frame = requestAnimationFrame(loop)
      const dt = now - state.last
      if (dt < FRAME_MS - 2) return

      state.last = now
      const step = Math.min(dt, 100)
      state.time += step

      const ease = 1 - Math.exp(-step / 150)
      state.pointer.x += (state.pointer.tx - state.pointer.x) * ease
      state.pointer.y += (state.pointer.ty - state.pointer.y) * ease

      paint()
    }

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = (event.clientX - rect.left) / rect.width
      const ny = (event.clientY - rect.top) / rect.height
      if (nx < -0.15 || nx > 1.15 || ny < -0.15 || ny > 1.15) return

      state.pointer.tx = clamp01(nx)
      state.pointer.ty = clamp01(ny)
      if (!state.pointer.seen || event.type === 'pointerdown') {
        state.pointer.x = state.pointer.tx
        state.pointer.y = state.pointer.ty
      }
      state.pointer.seen = true
    }

    const onVisibility = () => {
      if (document.hidden) stopLoop()
      else startLoop()
    }

    const onMotionPreference = () => {
      if (reduceMotion.matches) {
        stopLoop()
        state.time = 0
        paint()
      } else {
        startLoop()
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      if (measure()) {
        stopLoop()
        if (reduceMotion.matches) {
          state.time = 0
          paint()
        } else {
          startLoop()
        }
      }
    })

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        state.inView = entry.isIntersecting
        if (state.inView) startLoop()
        else stopLoop()
      },
      { threshold: 0 },
    )

    measure()
    if (reduceMotion.matches) {
      paint()
    } else {
      startLoop()
    }

    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    reduceMotion.addEventListener('change', onMotionPreference)

    return () => {
      stopLoop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      reduceMotion.removeEventListener('change', onMotionPreference)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
