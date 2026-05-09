import { Courier_Prime, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cyGrotesk = localFont({
  src: './fonts/CyGroteskStd-GrandDemi.otf',
  variable: '--font-cy',
})

export const metadata = {
  title: 'alwayscreating — Artist Landing Page',
  description: 'Dedicated to the ones who never stop creating.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${courierPrime.variable} ${inter.variable} ${cyGrotesk.variable}`}>
      <body className="bg-primary text-text-primary font-body min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
