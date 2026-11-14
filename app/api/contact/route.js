import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ContactMessage from '@/lib/models/ContactMessage'
import { resend, FROM_EMAIL, NOTIFY_EMAIL } from '@/lib/resend'
import { contactConfirmationEmail, contactNotificationEmail } from '@/lib/emails'
import { validateContact } from '@/lib/validation'
import { claveCliente, comprobarLimite } from '@/lib/rate-limit'

const LIMITE_BYTES = 10_000

export async function POST(request) {
  const limite = comprobarLimite(claveCliente(request, 'contacto'))
  if (!limite.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(limite.reintentarEn) } },
    )
  }

  try {
    const bruto = await request.text()
    if (bruto.length > LIMITE_BYTES) {
      return NextResponse.json({ error: 'Message too long' }, { status: 413 })
    }

    let body
    try {
      body = JSON.parse(bruto)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { name, email, message } = body || {}

    const validation = validateContact(body)
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    await connectDB()
    await ContactMessage.create({ name, email, message })

    try {
      await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to:   email,
          subject: 'We got your message — alwayscreating',
          html: contactConfirmationEmail({ name }),
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to:   NOTIFY_EMAIL,
          subject: `New message from ${name.replace(/[\r\n]+/g, ' ')}`,
          html: contactNotificationEmail({ name, email, message }),
        }),
      ])
    } catch (emailErr) {
      console.error('Email error:', emailErr.message)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Contact error:', err.message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
