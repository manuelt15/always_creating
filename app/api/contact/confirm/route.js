import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ContactMessage from '@/lib/models/ContactMessage'
import { resend, FROM_EMAIL, NOTIFY_EMAIL } from '@/lib/resend'
import { contactConfirmationEmail, contactNotificationEmail } from '@/lib/emails'

const CABECERAS = { 'content-type': 'text/html; charset=utf-8' }

function pagina(titulo, texto) {
  return new NextResponse(
    `<!doctype html><html lang="es"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${titulo} — alwayscreating</title></head>
    <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f5f4f0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">
      <main style="max-width:420px;padding:40px 32px;border:1px solid #e0ded8;background:#ffffff;">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#1777e5;">// alwayscreating</p>
        <h1 style="margin:0 0 16px;font-size:20px;text-transform:uppercase;letter-spacing:-0.5px;color:#111111;">${titulo}</h1>
        <p style="margin:0;font-size:13px;line-height:1.8;color:#444444;">${texto}</p>
        <p style="margin:24px 0 0;font-size:13px;"><a href="/" style="color:#1777e5;text-decoration:none;">Volver al sitio →</a></p>
      </main>
    </body></html>`,
    { headers: CABECERAS },
  )
}

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token')
  if (!token) {
    return pagina('Enlace no valido', 'Falta el codigo de confirmacion.')
  }

  try {
    await connectDB()
    const doc = await ContactMessage.findOneAndUpdate(
      { token, confirmado: false },
      { confirmado: true, confirmadoEn: new Date() },
      { new: true },
    )

    if (!doc) {
      return pagina('Enlace ya usado', 'Ese enlace no existe o ya se confirmo antes.')
    }

    try {
      await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to:   doc.email,
          subject: 'We got your message — alwayscreating',
          html: contactConfirmationEmail({ name: doc.name }),
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to:   NOTIFY_EMAIL,
          subject: `New message from ${String(doc.name).replace(/[\r\n]+/g, ' ')}`,
          html: contactNotificationEmail({ name: doc.name, email: doc.email, message: doc.message }),
        }),
      ])
    } catch (emailErr) {
      console.error('Email error:', emailErr.message)
    }

    return pagina('Mensaje confirmado', 'Gracias. Tu mensaje ya esta en camino y te responderemos pronto.')
  } catch (err) {
    console.error('Confirm error:', err.message)
    return pagina('Algo fallo', 'No pudimos confirmar el mensaje. Intentalo de nuevo en un rato.')
  }
}
