import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import NewsletterSubscriber from '@/lib/models/NewsletterSubscriber'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { newsletterConfirmationEmail } from '@/lib/emails'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await connectDB()
    await NewsletterSubscriber.create({ email })

    await resend.emails.send({
      from: FROM_EMAIL,
      to:   email,
      subject: 'You\'re in — alwayscreating',
      html: newsletterConfirmationEmail(),
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
