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
        // ── Original design tokens (kept for legacy components) ──
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        card:      'var(--color-card)',
        footer:    'var(--color-footer)',
        border: {
          DEFAULT: 'var(--color-border)',
          subtle:  'var(--color-border-subtle)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
        },
        brand: {
          DEFAULT: '#1777e5',
          dark:    '#0F51AB',
          xdark:   '#0A3272',
          light:   '#61A7F9',
        },

        // ── shadcn semantic tokens ──
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        shadcn: {
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
        },
        'shadcn-border': 'hsl(var(--border))',
        'shadcn-input': 'hsl(var(--input))',
        'shadcn-ring': 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        heading: ['var(--font-cy)', 'sans-serif'],
        display: ['"Courier Prime"', 'monospace'],
        body:    ['"Courier Prime"', 'monospace'],
        ui:      ['Inter', 'sans-serif'],
      },
      fontSize: {
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}