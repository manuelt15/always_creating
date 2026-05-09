import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'

export async function GET(request, { params }) {
  try {
    await connectDB()
    const artist = await Artist.findOne({ slug: params.id }).lean()
    if (!artist) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(artist)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
