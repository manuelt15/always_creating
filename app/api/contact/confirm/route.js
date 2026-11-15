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

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token')
  if (!token) {
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

    const siteUrl = new URL(request.url).origin
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
