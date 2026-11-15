import { Instrument_Serif } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { themeBootScript } from '@/lib/theme'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const DESCRIPTION =
  'El laboratorio de Manuel Torres: ideas escritas, código, diseños y experimentos sin terminar. Una forma de entrenar la creatividad, con la puerta abierta a ideas y comentarios.'

// Imagen de las metas: public/og-image.png (la portada en dither). Se regenera con
// node tools/generate-og.mjs. Las páginas de experimento la heredan.
const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'always creating. Titular en blanco y azul hielo sobre una trama de puntos azul.',
}

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'always creating',
    template: '%s / always creating',
  },
  description: DESCRIPTION,
  applicationName: 'always creating',
  authors: [{ name: 'Manuel Torres', url: 'https://www.manueltorres.pro/' }],
  creator: 'Manuel Torres',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'always creating',
    title: 'always creating',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'always creating',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export const viewport = {
  themeColor: '#040A1E',
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Antes de pintar, para que no parpadee el tema por defecto. En desarrollo React
            avisa de un <script> en el árbol: es esperado, en el HTML del servidor se ejecuta. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-dvh bg-ink font-sans text-paper antialiased">
        <a href="#main" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  )
}
