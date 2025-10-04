import { NextRequest, NextResponse } from 'next/server'

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

    // For demo purposes, we'll use mock rates
    // In production, you would fetch from a real price feed
    const mockRates: Record<string, number> = {
      'MONAD_USD': 0.50, // Mock rate: 1 MONAD = $0.50
      'USD_MONAD': 2.00, // Mock rate: $1 = 2 MONAD
    }

    const rate = mockRates[pair]
    
    if (!rate) {
      return NextResponse.json(
        { error: 'Unsupported currency pair' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      pair,
      rate,
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('Error fetching rate:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate' },
      { status: 500 }
    )
  }
}
