import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_LIST_ID = process.env.BREVO_LIST_ID

export async function POST(req: NextRequest) {
  if (!BREVO_API_KEY || !BREVO_LIST_ID) {
    return NextResponse.json(
      { ok: false, error: 'Newsletter not configured' },
      { status: 503 }
    )
  }

  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(BREVO_LIST_ID, 10)],
        updateEnabled: true,
      }),
    })

    if (response.ok) {
      return NextResponse.json({ ok: true })
    }

    const data = await response.json()

    if (response.status === 400 && data.message?.includes('already exists')) {
      return NextResponse.json({ ok: true })
    }

    console.error('Brevo API error:', response.status, data)
    return NextResponse.json({ ok: false, error: 'Subscription failed' }, { status: 500 })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
