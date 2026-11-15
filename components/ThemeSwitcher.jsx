'use client'

import { useEffect, useState } from 'react'
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

  const change = (next) => {
    setTheme(next)
    applyTheme(next)
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
