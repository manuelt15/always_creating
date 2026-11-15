import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Confirmación',
  robots: { index: false },
}

// Llega aquí desde /api/contact/confirm, que redirige con el resultado.
const ESTADOS = {
  ok: {
    etiqueta: 'Confirmado',
    titulo: 'Tu mensaje está en camino.',
    texto: 'Gracias por pasar. Te he mandado una copia a tu correo. Lo leo todo, y si hay algo que contestar, te escribo.',
  },
  usado: {
    etiqueta: 'Ya confirmado',
    titulo: 'Este enlace ya se usó.',
    texto: 'El mensaje se confirmó antes, así que ya me ha llegado. No hace falta hacer nada más.',
  },
  invalido: {
    etiqueta: 'Enlace no válido',
    titulo: 'A este enlace le falta algo.',
    texto: 'Copia el enlace completo del correo, o vuelve a escribir desde el formulario.',
  },
  error: {
    etiqueta: 'Algo ha fallado',
    titulo: 'No he podido confirmar el mensaje.',
    texto: 'Prueba otra vez en un rato con el mismo enlace del correo.',
  },
}

export default async function ConfirmacionPage({ searchParams }) {
  const { estado } = await searchParams
  const { etiqueta, titulo, texto } = ESTADOS[estado] || ESTADOS.invalido

  return (
    <>
      <Navbar />

      <main id="main">
        <section className="shell py-20 sm:py-28">
          <p className="label text-accent">{etiqueta}</p>
          <h1 className="mt-4 max-w-[18ch] text-title text-paper">{titulo}</h1>
          <p className="body-copy mt-6 max-w-[46ch]">{texto}</p>
          <Link href="/#experimentos" className="btn-primary mt-10">
            Ver los experimentos
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}
