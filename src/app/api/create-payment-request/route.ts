import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { amountUSD } = await request.json()

    if (!amountUSD || amountUSD <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Please provide a positive USD amount.' },
        { status: 400 }
      )
    }

    // For demo purposes, use a mock price since Monad might not be on CoinGecko yet
    // In production, you would use a real price feed or oracle
    const monPriceUSD = 0.50 // Mock price: $0.50 per MON

    // Calculate required MON amount (with 6 decimal precision)
    const amountMON = (amountUSD / monPriceUSD).toFixed(6)
    
    // Generate unique transaction ID
    const txnId = uuidv4()
    
    // Get merchant wallet address from environment
    const merchantWallet = process.env.NEXT_PUBLIC_MERCHANT_WALLET_ADDRESS

    if (!merchantWallet) {
      throw new Error('Merchant wallet address not configured')
    }

    // Create payment data payload
    const paymentData = {
      recipient: merchantWallet,
      amountMON: amountMON,
      amountUSD: amountUSD,
      txnId: txnId,
      timestamp: Date.now(),
      priceUSD: monPriceUSD
    }

    return NextResponse.json(paymentData)
  } catch (error) {
    console.error('Error creating payment request:', error)
    return NextResponse.json(
      { error: 'Failed to create payment request' },
      { status: 500 }
    )
  }
}
