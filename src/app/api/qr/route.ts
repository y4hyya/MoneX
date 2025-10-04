import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { usdAmount, monAmount, rate } = await request.json()

    if (!usdAmount || !monAmount || !rate) {
      return NextResponse.json(
        { error: 'Missing required fields: usdAmount, monAmount, rate' },
        { status: 400 }
      )
    }

    // Generate unique transaction ID
    const txnId = uuidv4()
    
    // Get merchant wallet address from environment
    const merchantWallet = process.env.NEXT_PUBLIC_MERCHANT_WALLET_ADDRESS

    if (!merchantWallet) {
      throw new Error('Merchant wallet address not configured')
    }

    // Create deeplink
    const params = new URLSearchParams({
      recipient: merchantWallet,
      amount: monAmount.toString(),
      txnId: txnId,
      currency: 'MONAD',
      usdAmount: usdAmount.toString(),
      rate: rate.toString()
    })
    
    const deeplink = `monadpay://pay?${params.toString()}`

    // Generate QR code data URL (base64 encoded)
    // In a real implementation, you would use a QR code library on the server
    // For now, we'll return the deeplink and let the client generate the QR
    const qrData = {
      deeplink,
      qrText: deeplink, // Client will generate QR from this
      txnId,
      recipient: merchantWallet,
      amount: monAmount,
      currency: 'MONAD',
      usdAmount,
      rate,
      timestamp: Date.now()
    }

    return NextResponse.json(qrData)
  } catch (error) {
    console.error('Error generating QR:', error)
    return NextResponse.json(
      { error: 'Failed to generate payment QR' },
      { status: 500 }
    )
  }
}
