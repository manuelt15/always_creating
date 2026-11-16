'use client'

import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from '@ui-sdk/react/segmented-control'
import { DEFAULT_THEME, THEMES, applyTheme } from '@/lib/theme'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  // El tema real ya lo puso el script de <head>; aquí solo se sincroniza el control.
  useEffect(() => {
    const current = document.documentElement.dataset.theme || DEFAULT_THEME
    setTheme(current)
    applyTheme(current)
  }, [])

  // Fundido entre temas con View Transitions; sin soporte o con movimiento reducido, cambio directo.
  // flushSync hace que el control ya marque el tema nuevo cuando se toma la captura final.
  const change = (next) => {
    const swap = () => {
      flushSync(() => setTheme(next))
      applyTheme(next)
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) return swap()
    document.startViewTransition(swap)
  }

  return (
    <div className="mt-8">
      <p id="theme-label" className="label">Tema</p>
      <SegmentedControl
        aria-labelledby="theme-label"
        value={theme}
        onValueChange={change}
        className="theme-switch mt-3"
      >
        <SegmentedControlIndicator className="theme-switch-indicator" />
        {THEMES.map((option) => (
          <SegmentedControlItem key={option.id} value={option.id} className="theme-switch-item">
            <span
              aria-hidden
              className="block h-2.5 w-2.5 shrink-0 border border-line-strong"
              style={{ background: option.swatch }}
            />
            {option.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    </div>
  )
}
