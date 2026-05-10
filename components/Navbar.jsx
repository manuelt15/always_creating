'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/artists', label: 'Artists' },
  { href: '/#about',  label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ activePage = 'home' }) {
  const [open, setOpen]   = useState(false)
  const [dark, setDark]   = useState(false)

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
    <nav className="sticky top-0 z-50 bg-primary/90 backdrop-blur-sm border-b border-subtle">
      <div className="max-w-content mx-auto px-4 lg:px-page py-4 flex items-center justify-between">
        <Link href="/" className="font-heading text-[18px] text-text-primary uppercase tracking-tight">
          alwayscreating
        </Link>

        <ul className="hidden lg:flex gap-8 items-center">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-[13px] font-body text-text-secondary hover:text-text-primary transition-colors duration-150">
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 text-[13px] font-body text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {dark ? (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="opacity-60">
                  <path d="M6.5 1v1M6.5 11v1M1 6.5H2M11 6.5h1M2.93 2.93l.7.7M9.37 9.37l.7.7M2.93 10.07l.7-.7M9.37 3.63l.7-.7M9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="opacity-60">
                  <path d="M11 7.5A4.5 4.5 0 0 1 5.5 2a4.5 4.5 0 1 0 5.5 5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {dark ? 'lightmode' : 'darkmode'}
            </button>
          </li>
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center justify-center font-body text-[13px] font-bold bg-brand text-white rounded-[8px] px-5 py-2 hover:bg-brand-dark transition-colors duration-150"
        >
          Contact us
        </a>

        <button
          className="lg:hidden text-text-secondary hover:text-text-primary p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-subtle bg-primary px-4 flex flex-col gap-4 ${open ? 'max-h-96 opacity-100 py-4 border-t' : 'max-h-0 opacity-0 py-0'}`}>
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="text-[13px] font-body text-text-secondary hover:text-text-primary transition-colors duration-150" onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          className="inline-flex items-center gap-1.5 text-[13px] font-body text-text-secondary hover:text-text-primary transition-colors duration-150"
        >
          {dark ? (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="opacity-60">
              <path d="M6.5 1v1M6.5 11v1M1 6.5H2M11 6.5h1M2.93 2.93l.7.7M9.37 9.37l.7.7M2.93 10.07l.7-.7M9.37 3.63l.7-.7M9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 9 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="opacity-60">
              <path d="M11 7.5A4.5 4.5 0 0 1 5.5 2a4.5 4.5 0 1 0 5.5 5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {dark ? 'lightmode' : 'darkmode'}
        </button>
        <a href="#contact" onClick={() => setOpen(false)} className="w-full text-center font-body font-bold text-[13px] bg-brand text-white rounded-[8px] px-5 py-2 mt-2">
          Contact us
        </a>
      </div>
    </nav>
  )
}
