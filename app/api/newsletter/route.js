import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import NewsletterSubscriber from '@/lib/models/NewsletterSubscriber'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await connectDB()
    await NewsletterSubscriber.create({ email })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
