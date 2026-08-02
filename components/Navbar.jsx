'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDark = stored === 'dark'
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-center gap-3 px-4 py-4">
        <Link
          href="/"
          className="font-heading text-[18px] text-foreground uppercase tracking-tight"
        >
          alwayscreating
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="h-8 w-8 rounded-full"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </nav>
  )
}