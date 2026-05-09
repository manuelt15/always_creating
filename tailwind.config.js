/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
}
