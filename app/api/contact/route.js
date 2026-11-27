import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { connectDB } from '@/lib/mongodb'
import ContactMessage from '@/lib/models/ContactMessage'
import { sendEmail } from '@/lib/resend'
import { contactVerifyEmail } from '@/lib/emails'
import { validateContact } from '@/lib/validation'
import { EXPERIMENT_SLUGS, getExperiment } from '@/lib/experiments'
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

    const { name, email, message, kind = 'idea' } = body || {}
    const about = body?.about || null

    const validation = validateContact(body, EXPERIMENT_SLUGS)
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const token = randomUUID()

    await connectDB()
    await ContactMessage.create({ name, email, message, kind, about, token })

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, '')
    await sendEmail({
      to: email,
      subject: 'Confirma tu mensaje, always creating',
      html: contactVerifyEmail({
        url: `${siteUrl}/api/contact/confirm?token=${token}`,
        kind,
        about: getExperiment(about)?.title || null,
        siteUrl,
      }),
    })

    // Nada se entrega hasta que el remitente confirme desde su propio correo.
    return NextResponse.json({ success: true, pending: true }, { status: 201 })
  } catch (err) {
    console.error('Contact error:', err.message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
