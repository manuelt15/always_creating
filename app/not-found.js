import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'No encontrado',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main id="main">
        <section className="shell py-20 sm:py-28">
          <p className="label text-accent">404</p>
          <h1 className="mt-4 text-title text-paper">Aquí no hay nada.</h1>
          <p className="body-copy mt-6 max-w-[44ch]">
            Puede que el experimento ya no exista o que el enlace esté mal escrito.
          </p>
          <Link href="/#experimentos" className="btn-primary mt-10">
            Ver los experimentos
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}
