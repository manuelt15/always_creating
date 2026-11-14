import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    await connectDB()
    const artist = await Artist.findOne({ slug: id }).lean()
    if (!artist) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(artist)
  } catch (err) {
    console.error('Artist error:', err.message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
