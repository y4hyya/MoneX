import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pair = searchParams.get('pair')

    if (!pair) {
      return NextResponse.json(
        { error: 'Pair parameter is required' },
        { status: 400 }
      )
    }

    if (pair !== 'MONAD_USD') {
      return NextResponse.json(
        { error: 'Only MONAD_USD pair is supported' },
        { status: 400 }
      )
    }

    // Mock rate: 1 MONAD = $0.50 (so 1 USD = 2 MONAD)
    const rate_monad_per_usd = 2.0
    const ts = new Date().toISOString()
    
    // Create mock signature (in production, use proper HMAC with secret key)
    const payload = `rate_monad_per_usd=${rate_monad_per_usd}&ts=${ts}`
    const secret = 'mock-secret-key' // In production, use environment variable
    const signature = createHmac('sha256', secret).update(payload).digest('base64')

    return NextResponse.json({
      rate_monad_per_usd,
      ts,
      signature
    })
  } catch (error) {
    console.error('Error fetching rate:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate' },
      { status: 500 }
    )
  }
}
