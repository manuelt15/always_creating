/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // ── always creating palette ──────────────────────────
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        lime: 'var(--lime)',
        ash: 'var(--ash)',
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-raised)',
        },

        // ── semantic aliases ─────────────────────────────────
        background: 'var(--ink)',
        foreground: 'var(--paper)',

        // ── legacy aliases, kept so the remaining routes render ──
        primary: 'var(--ink)',
        secondary: 'var(--surface)',
        card: 'var(--surface)',
        footer: 'var(--ink)',
        border: {
          DEFAULT: 'var(--line)',
          subtle: 'var(--line)',
        },
        text: {
          primary: 'var(--paper)',
          secondary: 'var(--paper)',
          muted: 'var(--ash)',
        },
        brand: {
          DEFAULT: 'var(--lime)',
          dark: 'var(--paper)',
          light: 'var(--lime)',
        },

        // ── shadcn semantic tokens ───────────────────────────
        shadcn: {
          primary: {
            DEFAULT: 'var(--lime)',
            foreground: 'var(--ink)',
          },
          secondary: {
            DEFAULT: 'var(--surface-raised)',
            foreground: 'var(--paper)',
          },
          destructive: {
            DEFAULT: 'var(--paper)',
            foreground: 'var(--ink)',
          },
          muted: {
            DEFAULT: 'var(--surface)',
            foreground: 'var(--ash)',
          },
          accent: {
            DEFAULT: 'var(--surface-raised)',
            foreground: 'var(--paper)',
          },
          popover: {
            DEFAULT: 'var(--surface)',
            foreground: 'var(--paper)',
          },
          card: {
            DEFAULT: 'var(--surface)',
            foreground: 'var(--paper)',
          },
        },
        'shadcn-border': 'var(--line)',
        'shadcn-input': 'var(--surface)',
        'shadcn-ring': 'var(--lime)',
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        md: '0px',
        sm: '0px',
      },
      fontFamily: {
        sans:     ['var(--font-geist)', 'system-ui', 'sans-serif'],
        serif:    ['var(--font-instrument)', 'Georgia', 'serif'],
        mono:     ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        heading:  ['var(--font-instrument)', 'Georgia', 'serif'],
        display:  ['var(--font-instrument)', 'Georgia', 'serif'],
        body:     ['var(--font-geist)', 'system-ui', 'sans-serif'],
        ui:       ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(4.25rem, 13.5vw, 11.5rem)', { lineHeight: '0.8', letterSpacing: '-0.035em' }],
        title:   ['clamp(2.75rem, 6vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        heading: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        body:    ['16px', { lineHeight: '1.7' }],
        small:   ['13px', { lineHeight: '1.55' }],
        micro:   ['11px', { lineHeight: '1.4' }],

        // legacy route aliases
        hero:    ['50px', { lineHeight: '63px', letterSpacing: '-1px' }],
        section: ['44px', { lineHeight: '52px' }],
        hxl:     ['36px', { lineHeight: '1.2' }],
        hlg:     ['32px', { lineHeight: '1.2' }],
        hmd:     ['22px', { lineHeight: '1.3' }],
        hsm:     ['19px', { lineHeight: '1.3', letterSpacing: '-0.3px' }],
        stat:    ['30px', { lineHeight: '1' }],
      },
      maxWidth: {
        content: '1280px',
        page:    '1440px',
      },
      spacing: {
        page: '80px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        rise: 'rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
