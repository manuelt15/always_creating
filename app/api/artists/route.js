import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Artist from '@/lib/models/Artist'

export async function GET(request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')

    const query = featured === 'true' ? { featured: true } : {}
    const artists = await Artist.find(query).sort({ order: 1, createdAt: 1 }).lean()

    return NextResponse.json(artists)
  } catch (err) {
    console.error('Artists error:', err.message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
