import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ContactMessage from '@/lib/models/ContactMessage'
import { sendEmail, NOTIFY_EMAIL } from '@/lib/resend'
import { contactConfirmationEmail, contactNotificationEmail } from '@/lib/emails'
import { getExperiment } from '@/lib/experiments'

// El resultado se enseña en una página del sitio (app/confirmacion/page.js), con su estilo y tema.
function pagina(request, estado) {
  return NextResponse.redirect(new URL(`/confirmacion?estado=${estado}`, request.url), 303)
}

const TOKEN_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token')
  // El token es un randomUUID: lo que no tenga esa forma no llega a la base de datos.
  if (!token || !TOKEN_REGEX.test(token)) {
    return pagina(request, 'invalido')
  }

  try {
    await connectDB()
    const doc = await ContactMessage.findOneAndUpdate(
      { token, confirmado: false },
      { confirmado: true, confirmadoEn: new Date() },
      { new: true },
    )

    if (!doc) {
      return pagina(request, 'usado')
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, '')
    const about = getExperiment(doc.about)?.title || null
    const nombre = String(doc.name).replace(/[\r\n]+/g, ' ')
    await Promise.all([
      sendEmail({
        to: doc.email,
        subject: `${doc.kind === 'comment' ? 'Tu comentario' : 'Tu idea'} ha llegado, always creating`,
        html: contactConfirmationEmail({
          name: doc.name,
          kind: doc.kind,
          about,
          message: doc.message,
          siteUrl,
        }),
      }),
      sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: doc.email,
        subject: `${doc.kind === 'comment' ? 'Comentario' : 'Idea'} de ${nombre}${about ? `, sobre ${about}` : ''}`,
        html: contactNotificationEmail({
          name: doc.name,
          email: doc.email,
          message: doc.message,
          kind: doc.kind,
          about,
          siteUrl,
        }),
      }),
    ])

    return pagina(request, 'ok')
  } catch (err) {
    console.error('Confirm error:', err.message)
    return pagina(request, 'error')
  }
}
