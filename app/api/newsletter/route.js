import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import NewsletterSubscriber from '@/lib/models/NewsletterSubscriber'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { newsletterConfirmationEmail } from '@/lib/emails'
import { validateEmail } from '@/lib/validation'
import { claveCliente, comprobarLimite } from '@/lib/rate-limit'

const LIMITE_BYTES = 2_000

export async function POST(request) {
  const limite = comprobarLimite(claveCliente(request, 'newsletter'), { limite: 3 })
  if (!limite.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(limite.reintentarEn) } },
    )
  }

  try {
    const bruto = await request.text()
    if (bruto.length > LIMITE_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }

    let body
    try {
      body = JSON.parse(bruto)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { email } = body || {}

    const validation = validateEmail(email)
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    await connectDB()
    await NewsletterSubscriber.create({ email })

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to:   email,
        subject: 'You\'re in — alwayscreating',
        html: newsletterConfirmationEmail(),
      })
    } catch (emailErr) {
      console.error('Email error:', emailErr.message)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    console.error('Newsletter error:', err.message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
