import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ContactMessage from '@/lib/models/ContactMessage'
import { resend, FROM_EMAIL, NOTIFY_EMAIL } from '@/lib/resend'
import { contactConfirmationEmail, contactNotificationEmail } from '@/lib/emails'
import { validateContact } from '@/lib/validation'

export async function POST(request) {
  try {
    const body = await request.json()
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
          subject: `New message from ${name}`,
          html: contactNotificationEmail({ name, email, message }),
        }),
      ])
    } catch (emailErr) {
      console.error('Email error:', emailErr.message)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
