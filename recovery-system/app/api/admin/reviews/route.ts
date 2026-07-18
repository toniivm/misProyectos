import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '../../../../lib/firebase'
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore'

const ADMIN_SECRET = process.env.ADMIN_SECRET

export async function GET(req: NextRequest) {
  if (req.headers.get('x-admin-secret') !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const db = getDb()
  if (!db) return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 })

  const status = req.nextUrl.searchParams.get('status') || 'pending'
  const published = status === 'published'

  const q = query(
    collection(db, 'reviews'),
    where('published', '==', published),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  const reviews = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))

  return NextResponse.json({ ok: true, reviews })
}

export async function PATCH(req: NextRequest) {
  if (req.headers.get('x-admin-secret') !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const db = getDb()
  if (!db) return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 })

  const { reviewId, published } = await req.json()
  if (!reviewId || typeof published !== 'boolean') {
    return NextResponse.json({ ok: false, error: 'Missing reviewId or published' }, { status: 400 })
  }

  const ref = doc(db, 'reviews', reviewId)
  await updateDoc(ref, { published })

  return NextResponse.json({ ok: true })
}
