import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ContactMessage from '@/lib/models/ContactMessage'
import { resend, FROM_EMAIL, NOTIFY_EMAIL } from '@/lib/resend'
import { contactConfirmationEmail, contactNotificationEmail } from '@/lib/emails'

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await connectDB()
    await ContactMessage.create({ name, email, message })

    Promise.all([
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
    ]).catch(() => {})

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
